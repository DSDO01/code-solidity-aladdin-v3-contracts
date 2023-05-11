// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import { AccessControlUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import { SafeMathUpgradeable } from "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import { IERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import { SafeERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/SafeERC20Upgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

import { IMarket } from "./interfaces/IMarket.sol";
import { ITreasury } from "./interfaces/ITreasury.sol";

// solhint-disable max-states-count

contract Market is AccessControlUpgradeable, ReentrancyGuardUpgradeable, IMarket {
  using SafeERC20Upgradeable for IERC20Upgradeable;
  using SafeMathUpgradeable for uint256;

  /**********
   * Events *
   **********/

  /// @notice Emitted when the fee ratio for minting fToken is updated.
  /// @param defaultFeeRatio The new default fee ratio, multipled by 1e18.
  /// @param extraFeeRatio The new extra fee ratio, multipled by 1e18.
  event UpdateMintFeeRatioFToken(uint128 defaultFeeRatio, int128 extraFeeRatio);

  /// @notice Emitted when the fee ratio for minting xToken is updated.
  /// @param defaultFeeRatio The new default fee ratio, multipled by 1e18.
  /// @param extraFeeRatio The new extra fee ratio, multipled by 1e18.
  event UpdateMintFeeRatioXToken(uint128 defaultFeeRatio, int128 extraFeeRatio);

  /// @notice Emitted when the fee ratio for redeeming fToken is updated.
  /// @param defaultFeeRatio The new default fee ratio, multipled by 1e18.
  /// @param extraFeeRatio The new extra fee ratio, multipled by 1e18.
  event UpdateRedeemFeeRatioFToken(uint128 defaultFeeRatio, int128 extraFeeRatio);

  /// @notice Emitted when the fee ratio for redeeming xToken is updated.
  /// @param defaultFeeRatio The new default fee ratio, multipled by 1e18.
  /// @param extraFeeRatio The new extra fee ratio, multipled by 1e18.
  event UpdateRedeemFeeRatioXToken(uint128 defaultFeeRatio, int128 extraFeeRatio);

  /// @notice Emitted when the market config is updated.
  /// @param stabilityRatio The new start collateral ratio to enter system stability mode, multiplied by 1e18.
  /// @param liquidationRatio The new start collateral ratio to enter incentivized user liquidation mode, multiplied by 1e18.
  /// @param selfLiquidationRatio The new start collateral ratio to enter self liquidation mode, multiplied by 1e18.
  /// @param recapRatio The new start collateral ratio to enter recap mode, multiplied by 1e18.
  event UpdateMarketConfig(
    uint64 stabilityRatio,
    uint64 liquidationRatio,
    uint64 selfLiquidationRatio,
    uint64 recapRatio
  );

  /// @notice Emitted when the incentive config is updated.
  /// @param stabilityIncentiveRatio The new incentive ratio for system stability mode, multiplied by 1e18.
  /// @param liquidationIncentiveRatio The new incentive ratio for incentivized user liquidation mode, multiplied by 1e18.
  /// @param selfLiquidationIncentiveRatio The new incentive ratio for self liquidation mode, multiplied by 1e18.
  event UpdateIncentiveConfig(
    uint64 stabilityIncentiveRatio,
    uint64 liquidationIncentiveRatio,
    uint64 selfLiquidationIncentiveRatio
  );

  /// @notice Emitted when the whitelist status for settle is changed.
  /// @param account The address of account to change.
  /// @param status The new whitelist status.
  event UpdateLiquidationWhitelist(address account, bool status);

  /// @notice Emitted when the platform contract is changed.
  /// @param platform The address of new platform.
  event UpdatePlatform(address platform);

  /// @notice Pause or unpause mint.
  /// @param status The new status for mint.
  event PauseMint(bool status);

  /// @notice Pause or unpause redeem.
  /// @param status The new status for redeem.
  event PauseRedeem(bool status);

  /// @notice Pause or unpause fToken mint in system stability mode.
  /// @param status The new status for mint.
  event PauseFTokenMintInSystemStabilityMode(bool status);

  /// @notice Pause or unpause xToken redeem in system stability mode.
  /// @param status The new status for redeem.
  event PauseXTokenRedeemInSystemStabilityMode(bool status);

  /*************
   * Constants *
   *************/

  /// @notice The role for emergency dao.
  bytes32 public constant EMERGENCY_DAO_ROLE = keccak256("EMERGENCY_DAO_ROLE");

  /// @dev The precision used to compute nav.
  uint256 private constant PRECISION = 1e18;

  /***********
   * Structs *
   ***********/

  /// @dev Compiler will pack this into single `uint256`.
  struct FeeRatio {
    // The default fee ratio, multiplied by 1e18.
    uint128 defaultFeeRatio;
    // The extra delta fee ratio, multiplied by 1e18.
    int128 extraFeeRatio;
  }

  /// @dev Compiler will pack this into single `uint256`.
  struct MarketConfig {
    // The start collateral ratio to enter system stability mode, multiplied by 1e18.
    uint64 stabilityRatio;
    // The start collateral ratio to enter incentivized user liquidation mode, multiplied by 1e18.
    uint64 liquidationRatio;
    // The start collateral ratio to enter self liquidation mode, multiplied by 1e18.
    uint64 selfLiquidationRatio;
    // The start collateral ratio to enter recap mode, multiplied by 1e18.
    uint64 recapRatio;
  }

  /// @dev Compiler will pack this into single `uint256`.
  struct IncentiveConfig {
    // The incentive ratio for system stability mode, multiplied by 1e18.
    uint64 stabilityIncentiveRatio;
    // The incentive ratio for incentivized user liquidation mode, multiplied by 1e18.
    uint64 liquidationIncentiveRatio;
    // The incentive ratio for self liquidation mode, multiplied by 1e18.
    uint64 selfLiquidationIncentiveRatio;
  }

  /*************
   * Variables *
   *************/

  /// @notice The address of Treasury contract.
  address public treasury;

  /// @notice The address of platform contract;
  address public platform;

  /// @notice The address base token;
  address public baseToken;

  /// @notice The address fractional base token.
  address public fToken;

  /// @notice The address leveraged base token.
  address public xToken;

  /// @notice The market config in each mode.
  MarketConfig public marketConfig;

  /// @notice The incentive config in each mode.
  IncentiveConfig public incentiveConfig;

  /// @notice The mint fee ratio for fToken.
  FeeRatio public fTokenMintFeeRatio;

  /// @notice The mint fee ratio for xToken.
  FeeRatio public xTokenMintFeeRatio;

  /// @notice The redeem fee ratio for fToken.
  FeeRatio public fTokenRedeemFeeRatio;

  /// @notice The redeem fee ratio for xToken.
  FeeRatio public xTokenRedeemFeeRatio;

  /// @notice Whether the sender is allowed to do self liquidation.
  mapping(address => bool) public liquidationWhitelist;

  /// @notice Whether the mint is paused.
  bool public mintPaused;

  /// @notice Whether the redeem is paused.
  bool public redeemPaused;

  /// @notice Whether to pause fToken mint in system stability mode
  bool public fTokenMintInSystemStabilityModePaused;

  /// @notice Whether to pause xToken redeem in system stability mode
  bool public xTokenRedeemInSystemStabilityModePaused;

  /************
   * Modifier *
   ************/

  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "only Admin");
    _;
  }

  modifier onlyEmergencyDAO() {
    require(hasRole(EMERGENCY_DAO_ROLE, msg.sender), "only Emergency DAO");
    _;
  }

  modifier cachePrice() {
    ITreasury(treasury).cacheTwap();
    _;
  }

  /***************
   * Constructor *
   ***************/

  function initialize(address _treasury, address _platform) external initializer {
    AccessControlUpgradeable.__AccessControl_init();
    ReentrancyGuardUpgradeable.__ReentrancyGuard_init();

    treasury = _treasury;
    platform = _platform;

    baseToken = ITreasury(_treasury).baseToken();
    fToken = ITreasury(_treasury).fToken();
    xToken = ITreasury(_treasury).xToken();
  }

  /****************************
   * Public Mutated Functions *
   ****************************/

  /// @inheritdoc IMarket
  function mint(
    uint256 _amount,
    address _recipient,
    uint256 _minFOut,
    uint256 _minXOut
  ) external override nonReentrant returns (uint256 _fOut, uint256 _xOut) {
    address _baseToken = baseToken;
    if (_amount == uint256(-1)) {
      _amount = IERC20Upgradeable(_baseToken).balanceOf(msg.sender);
    }
    require(_amount > 0, "mint zero amount");

    ITreasury _treasury = ITreasury(treasury);
    require(_treasury.totalUnderlying() == 0, "only initialize once");

    uint256 _collateralRatio = _treasury.collateralRatio();

    MarketConfig memory _marketConfig = marketConfig;
    require(_collateralRatio >= _marketConfig.stabilityRatio, "Not normal mode");

    IERC20Upgradeable(_baseToken).safeTransferFrom(msg.sender, address(_treasury), _amount);
    (_fOut, _xOut) = _treasury.mint(_amount, _recipient, ITreasury.MintOption.Both);
    require(_fOut >= _minFOut, "insufficient fToken output");
    require(_xOut >= _minXOut, "insufficient xToken output");

    require(_treasury.collateralRatio() >= _marketConfig.stabilityRatio, "not normal mode after mint");

    emit Mint(msg.sender, _recipient, _amount, _fOut, _xOut, 0);
  }

  /// @inheritdoc IMarket
  function mintFToken(
    uint256 _amount,
    address _recipient,
    uint256 _minFOut
  ) external override nonReentrant cachePrice returns (uint256 _fOut) {
    require(!mintPaused, "mint is paused");

    address _baseToken = baseToken;
    if (_amount == uint256(-1)) {
      _amount = IERC20Upgradeable(_baseToken).balanceOf(msg.sender);
    }
    require(_amount > 0, "mint zero amount");

    ITreasury _treasury = ITreasury(treasury);

    if (fTokenMintInSystemStabilityModePaused) {
      uint256 _collateralRatio = _treasury.collateralRatio();
      require(_collateralRatio > marketConfig.stabilityRatio, "fToken mint paused");
    }

    uint256 _maxBaseInBeforeSystemStabilityMode = _treasury.tryMintFTokenTo(marketConfig.stabilityRatio);

    uint256 _amountWithoutFee = _deductMintFee(_amount, fTokenMintFeeRatio, _maxBaseInBeforeSystemStabilityMode);

    IERC20Upgradeable(_baseToken).safeTransferFrom(msg.sender, address(_treasury), _amountWithoutFee);
    (_fOut, ) = _treasury.mint(_amountWithoutFee, _recipient, ITreasury.MintOption.FToken);
    require(_fOut >= _minFOut, "insufficient fToken output");

    emit Mint(msg.sender, _recipient, _amount, _fOut, 0, _amount - _amountWithoutFee);
  }

  /// @inheritdoc IMarket
  function mintXToken(
    uint256 _amount,
    address _recipient,
    uint256 _minXOut
  ) external override nonReentrant cachePrice returns (uint256 _xOut) {
    require(!mintPaused, "mint is paused");

    address _baseToken = baseToken;
    if (_amount == uint256(-1)) {
      _amount = IERC20Upgradeable(_baseToken).balanceOf(msg.sender);
    }
    require(_amount > 0, "mint zero amount");

    ITreasury _treasury = ITreasury(treasury);
    uint256 _maxBaseInBeforeSystemStabilityMode = _treasury.tryMintXTokenTo(marketConfig.stabilityRatio);

    uint256 _amountWithoutFee = _deductMintFee(_amount, xTokenMintFeeRatio, _maxBaseInBeforeSystemStabilityMode);

    IERC20Upgradeable(_baseToken).safeTransferFrom(msg.sender, address(_treasury), _amountWithoutFee);
    (, _xOut) = _treasury.mint(_amountWithoutFee, _recipient, ITreasury.MintOption.XToken);
    require(_xOut >= _minXOut, "insufficient xToken output");

    emit Mint(msg.sender, _recipient, _amount, 0, _xOut, _amount - _amountWithoutFee);
  }

  /// @inheritdoc IMarket
  function addBaseToken(
    uint256 _amount,
    address _recipient,
    uint256 _minXOut
  ) external override nonReentrant cachePrice returns (uint256 _xOut) {
    require(!mintPaused, "mint is paused");

    ITreasury _treasury = ITreasury(treasury);
    uint256 _collateralRatio = _treasury.collateralRatio();

    MarketConfig memory _marketConfig = marketConfig;
    require(
      _marketConfig.recapRatio <= _collateralRatio && _collateralRatio < _marketConfig.stabilityRatio,
      "Not system stability mode"
    );

    // take fee to platform
    FeeRatio memory _ratio = xTokenMintFeeRatio;
    uint256 _feeRatio = uint256(int256(_ratio.defaultFeeRatio) + _ratio.extraFeeRatio);
    if (_feeRatio > 0) {
      uint256 _fee = (_amount * _feeRatio) / PRECISION;
      IERC20Upgradeable(baseToken).safeTransferFrom(msg.sender, platform, _fee);
      _amount = _amount - _fee;
    }

    IERC20Upgradeable(baseToken).safeTransferFrom(msg.sender, address(_treasury), _amount);
    _xOut = _treasury.addBaseToken(_amount, incentiveConfig.stabilityIncentiveRatio, _recipient);
    require(_xOut >= _minXOut, "insufficient xToken output");

    emit AddCollateral(msg.sender, _recipient, _amount, _xOut);
  }

  /// @inheritdoc IMarket
  function redeem(
    uint256 _fAmt,
    uint256 _xAmt,
    address _recipient,
    uint256 _minBaseOut
  ) external override nonReentrant cachePrice returns (uint256 _baseOut) {
    require(!redeemPaused, "redeem is paused");

    if (_fAmt == uint256(-1)) {
      _fAmt = IERC20Upgradeable(fToken).balanceOf(msg.sender);
    }
    if (_xAmt == uint256(-1)) {
      _xAmt = IERC20Upgradeable(xToken).balanceOf(msg.sender);
    }
    require(_fAmt > 0 || _xAmt > 0, "redeem zero amount");
    require(_fAmt == 0 || _xAmt == 0, "only redeem single side");

    ITreasury _treasury = ITreasury(treasury);
    MarketConfig memory _marketConfig = marketConfig;

    uint256 _feeRatio;
    if (_fAmt > 0) {
      uint256 _maxFTokenInBeforeSystemStabilityMode = _treasury.tryRedeemFTokenTo(_marketConfig.stabilityRatio);
      _feeRatio = _computeRedeemFeeRatio(_fAmt, fTokenRedeemFeeRatio, _maxFTokenInBeforeSystemStabilityMode);
    } else {
      if (xTokenRedeemInSystemStabilityModePaused) {
        uint256 _collateralRatio = _treasury.collateralRatio();
        require(_collateralRatio > _marketConfig.stabilityRatio, "xToken redeem paused");
      }

      uint256 _maxXTokenInBeforeSystemStabilityMode = _treasury.tryRedeemXTokenTo(_marketConfig.stabilityRatio);
      _feeRatio = _computeRedeemFeeRatio(_xAmt, xTokenRedeemFeeRatio, _maxXTokenInBeforeSystemStabilityMode);
    }

    _baseOut = _treasury.redeem(_fAmt, _xAmt, msg.sender);
    uint256 _balance = IERC20Upgradeable(baseToken).balanceOf(address(this));
    // consider possible slippage
    if (_balance < _baseOut) {
      _baseOut = _balance;
    }

    uint256 _fee = (_baseOut * _feeRatio) / PRECISION;
    if (_fee > 0) {
      IERC20Upgradeable(baseToken).safeTransferFrom(msg.sender, platform, _fee);
      _baseOut = _baseOut - _fee;
    }
    require(_baseOut >= _minBaseOut, "insufficient base output");

    IERC20Upgradeable(baseToken).safeTransfer(_recipient, _baseOut);

    emit Redeem(msg.sender, _recipient, _fAmt, _xAmt, _baseOut, _fee);
  }

  /// @inheritdoc IMarket
  function liquidate(
    uint256 _fAmt,
    address _recipient,
    uint256 _minBaseOut
  ) external override nonReentrant cachePrice returns (uint256 _baseOut) {
    require(!redeemPaused, "redeem is paused");

    ITreasury _treasury = ITreasury(treasury);
    uint256 _collateralRatio = _treasury.collateralRatio();

    MarketConfig memory _marketConfig = marketConfig;
    require(
      _marketConfig.recapRatio <= _collateralRatio && _collateralRatio < _marketConfig.liquidationRatio,
      "Not liquidation mode"
    );

    _baseOut = _treasury.liquidate(_fAmt, incentiveConfig.liquidationIncentiveRatio, msg.sender, _recipient);
    require(_baseOut >= _minBaseOut, "insufficient base output");

    emit UserLiquidate(msg.sender, _recipient, _fAmt, _baseOut);
  }

  /// @inheritdoc IMarket
  function selfLiquidate(
    uint256 _baseAmt,
    uint256 _minFToken,
    bytes calldata _data
  ) external override nonReentrant cachePrice returns (uint256 _baseOut, uint256 _fAmt) {
    require(!redeemPaused, "redeem is paused");
    require(liquidationWhitelist[msg.sender], "not liquidation whitelist");

    ITreasury _treasury = ITreasury(treasury);
    uint256 _collateralRatio = _treasury.collateralRatio();

    MarketConfig memory _marketConfig = marketConfig;
    require(
      _marketConfig.recapRatio <= _collateralRatio && _collateralRatio < _marketConfig.selfLiquidationRatio,
      "Not self liquidation mode"
    );

    (_baseOut, _fAmt) = _treasury.selfLiquidate(
      _baseAmt,
      incentiveConfig.selfLiquidationIncentiveRatio,
      platform,
      _data
    );
    require(_fAmt >= _minFToken, "insufficient fToken liquidated");

    emit SelfLiquidate(msg.sender, _baseAmt, _baseOut, _fAmt);
  }

  /// @inheritdoc IMarket
  function onSelfLiquidate(uint256 _baseAmt, bytes calldata _data) external override returns (uint256 _fAmt) {
    require(msg.sender == treasury, "only called by treasury");
    (address _target, bytes memory _calldata) = abi.decode(_data, (address, bytes));

    address _baseToken = baseToken;
    IERC20Upgradeable(_baseToken).safeApprove(_target, 0);
    IERC20Upgradeable(_baseToken).safeApprove(_target, _baseAmt);

    // solhint-disable-next-line avoid-low-level-calls
    (bool _success, ) = _target.call(_calldata);
    require(_success, "call failed");

    address _fToken = fToken;
    _fAmt = IERC20Upgradeable(_fToken).balanceOf(address(this));
    IERC20Upgradeable(_fToken).safeTransfer(msg.sender, _fAmt);
  }

  /*******************************
   * Public Restricted Functions *
   *******************************/

  /// @notice Update the fee ratio for redeeming.
  /// @param _defaultFeeRatio The new default fee ratio, multipled by 1e18.
  /// @param _extraFeeRatio The new extra fee ratio, multipled by 1e18.
  /// @param _isFToken Whether we are updating for fToken.
  function updateRedeemFeeRatio(
    uint128 _defaultFeeRatio,
    int128 _extraFeeRatio,
    bool _isFToken
  ) external onlyAdmin {
    require(_defaultFeeRatio <= PRECISION, "default fee ratio too large");
    if (_extraFeeRatio < 0) {
      require(uint128(-_extraFeeRatio) <= _defaultFeeRatio, "delta fee too small");
    } else {
      require(uint128(_extraFeeRatio) <= PRECISION - _defaultFeeRatio, "total fee too large");
    }

    if (_isFToken) {
      fTokenRedeemFeeRatio = FeeRatio(_defaultFeeRatio, _extraFeeRatio);
      emit UpdateRedeemFeeRatioFToken(_defaultFeeRatio, _extraFeeRatio);
    } else {
      xTokenRedeemFeeRatio = FeeRatio(_defaultFeeRatio, _extraFeeRatio);
      emit UpdateRedeemFeeRatioXToken(_defaultFeeRatio, _extraFeeRatio);
    }
  }

  /// @notice Update the fee ratio for minting.
  /// @param _defaultFeeRatio The new default fee ratio, multipled by 1e18.
  /// @param _extraFeeRatio The new extra fee ratio, multipled by 1e18.
  /// @param _isFToken Whether we are updating for fToken.
  function updateMintFeeRatio(
    uint128 _defaultFeeRatio,
    int128 _extraFeeRatio,
    bool _isFToken
  ) external onlyAdmin {
    require(_defaultFeeRatio <= PRECISION, "default fee ratio too large");
    if (_extraFeeRatio < 0) {
      require(uint128(-_extraFeeRatio) <= _defaultFeeRatio, "delta fee too small");
    } else {
      require(uint128(_extraFeeRatio) <= PRECISION - _defaultFeeRatio, "total fee too large");
    }

    if (_isFToken) {
      fTokenMintFeeRatio = FeeRatio(_defaultFeeRatio, _extraFeeRatio);
      emit UpdateMintFeeRatioFToken(_defaultFeeRatio, _extraFeeRatio);
    } else {
      xTokenMintFeeRatio = FeeRatio(_defaultFeeRatio, _extraFeeRatio);
      emit UpdateMintFeeRatioXToken(_defaultFeeRatio, _extraFeeRatio);
    }
  }

  /// @notice Update the market config.
  /// @param _stabilityRatio The start collateral ratio to enter system stability mode to update, multiplied by 1e18.
  /// @param _liquidationRatio The start collateral ratio to enter incentivized user liquidation mode to update, multiplied by 1e18.
  /// @param _selfLiquidationRatio The start collateral ratio to enter self liquidation mode to update, multiplied by 1e18.
  /// @param _recapRatio The start collateral ratio to enter recap mode to update, multiplied by 1e18.
  function updateMarketConfig(
    uint64 _stabilityRatio,
    uint64 _liquidationRatio,
    uint64 _selfLiquidationRatio,
    uint64 _recapRatio
  ) external onlyAdmin {
    require(
      _stabilityRatio > _liquidationRatio &&
        _liquidationRatio > _selfLiquidationRatio &&
        _selfLiquidationRatio > _recapRatio,
      "invalid market config"
    );

    marketConfig = MarketConfig(_stabilityRatio, _liquidationRatio, _selfLiquidationRatio, _recapRatio);

    emit UpdateMarketConfig(_stabilityRatio, _liquidationRatio, _selfLiquidationRatio, _recapRatio);
  }

  /// @notice Update the incentive config.
  /// @param _stabilityIncentiveRatio The incentive ratio for system stability mode to update, multiplied by 1e18.
  /// @param _liquidationIncentiveRatio The incentive ratio for incentivized user liquidation mode to update, multiplied by 1e18.
  /// @param _selfLiquidationIncentiveRatio The incentive ratio for self liquidation mode to update, multiplied by 1e18.
  function updateIncentiveConfig(
    uint64 _stabilityIncentiveRatio,
    uint64 _liquidationIncentiveRatio,
    uint64 _selfLiquidationIncentiveRatio
  ) external onlyAdmin {
    require(_stabilityIncentiveRatio > 0, "incentive too small");
    require(_selfLiquidationIncentiveRatio > 0, "incentive too small");
    require(_liquidationIncentiveRatio > _selfLiquidationIncentiveRatio, "invalid incentive config");

    incentiveConfig = IncentiveConfig(
      _stabilityIncentiveRatio,
      _liquidationIncentiveRatio,
      _selfLiquidationIncentiveRatio
    );

    emit UpdateIncentiveConfig(_stabilityIncentiveRatio, _liquidationIncentiveRatio, _selfLiquidationIncentiveRatio);
  }

  /// @notice Change address of platform contract.
  /// @param _platform The new address of platform contract.
  function updatePlatform(address _platform) external onlyAdmin {
    platform = _platform;

    emit UpdatePlatform(_platform);
  }

  /// @notice Update the whitelist status for self liquidation account.
  /// @param _account The address of account to update.
  /// @param _status The status of the account to update.
  function updateLiquidationWhitelist(address _account, bool _status) external onlyAdmin {
    liquidationWhitelist[_account] = _status;

    emit UpdateLiquidationWhitelist(_account, _status);
  }

  /// @notice Pause mint in this contract
  /// @param _status The pause status.
  function pauseMint(bool _status) external onlyEmergencyDAO {
    mintPaused = _status;

    emit PauseMint(_status);
  }

  /// @notice Pause redeem in this contract
  /// @param _status The pause status.
  function pauseRedeem(bool _status) external onlyEmergencyDAO {
    redeemPaused = _status;

    emit PauseRedeem(_status);
  }

  /// @notice Pause fToken mint in system stability mode.
  /// @param _status The pause status.
  function pauseFTokenMintInSystemStabilityMode(bool _status) external onlyEmergencyDAO {
    fTokenMintInSystemStabilityModePaused = _status;

    emit PauseFTokenMintInSystemStabilityMode(_status);
  }

  /// @notice Pause xToken redeem in system stability mode
  /// @param _status The pause status.
  function pauseXTokenRedeemInSystemStabilityMode(bool _status) external onlyEmergencyDAO {
    xTokenRedeemInSystemStabilityModePaused = _status;

    emit PauseXTokenRedeemInSystemStabilityMode(_status);
  }

  /**********************
   * Internal Functions *
   **********************/

  /// @dev Internal function to deduct mint fee for base token.
  /// @param _baseIn The amount of base token.
  /// @param _ratio The mint fee ratio.
  /// @param _maxBaseInBeforeSystemStabilityMode The maximum amount of base token can be deposit before entering system stability mode.
  /// @return _baseInWithoutFee The amount of base token without fee.
  function _deductMintFee(
    uint256 _baseIn,
    FeeRatio memory _ratio,
    uint256 _maxBaseInBeforeSystemStabilityMode
  ) internal returns (uint256 _baseInWithoutFee) {
    uint256 _maxBaseIn = _maxBaseInBeforeSystemStabilityMode.mul(PRECISION).div(PRECISION - _ratio.defaultFeeRatio);
    // compute fee
    uint256 _fee;
    if (_baseIn <= _maxBaseIn) {
      _fee = _baseIn.mul(_ratio.defaultFeeRatio).div(PRECISION);
    } else {
      _fee = _maxBaseIn.mul(_ratio.defaultFeeRatio).div(PRECISION);
      _fee = _fee.add(
        (_baseIn - _maxBaseIn).mul(uint256(int256(_ratio.defaultFeeRatio) + _ratio.extraFeeRatio)).div(PRECISION)
      );
    }

    _baseInWithoutFee = _baseIn.sub(_fee);
    // take fee to platform
    if (_fee > 0) {
      IERC20Upgradeable(baseToken).safeTransferFrom(msg.sender, platform, _fee);
    }
  }

  /// @dev Internal function to deduct mint fee for base token.
  /// @param _amountIn The amount of fToken or xToken.
  /// @param _ratio The redeem fee ratio.
  /// @param _maxInBeforeSystemStabilityMode The maximum amount of fToken/xToken can be redeemed before entering system stability mode.
  /// @return _feeRatio The computed fee ratio for base token redeemed.
  function _computeRedeemFeeRatio(
    uint256 _amountIn,
    FeeRatio memory _ratio,
    uint256 _maxInBeforeSystemStabilityMode
  ) internal pure returns (uint256 _feeRatio) {
    if (_amountIn <= _maxInBeforeSystemStabilityMode) {
      return _ratio.defaultFeeRatio;
    }
    uint256 _fee = _maxInBeforeSystemStabilityMode.mul(_ratio.defaultFeeRatio);
    _fee = _fee.add(
      (_amountIn - _maxInBeforeSystemStabilityMode).mul(uint256(int256(_ratio.defaultFeeRatio) + _ratio.extraFeeRatio))
    );
    return _fee.div(_amountIn);
  }
}
