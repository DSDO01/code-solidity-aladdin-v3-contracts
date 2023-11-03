// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts-v4/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts-v4/token/ERC20/utils/SafeERC20.sol";

import { IZap } from "../../interfaces/IZap.sol";

import { ConcentratorStrategyBase } from "./ConcentratorStrategyBase.sol";

// solhint-disable reason-string

abstract contract ManualCompoundingStrategyBase is ConcentratorStrategyBase {
  using SafeERC20 for IERC20;

  function _harvest(
    address _zapper,
    address _intermediate,
    address[] memory _rewards,
    uint256[] memory _amounts
  ) internal returns (uint256 _harvested) {
    // 1. zap all rewards to intermediate token.
    for (uint256 i = 0; i < rewards.length; i++) {
      address _rewardToken = _rewards[i];
      uint256 _amount = _amounts[i];
      if (_rewardToken == _intermediate) {
        _harvested += _amount;
      } else if (_amount > 0) {
        IERC20(_rewardToken).safeTransfer(_zapper, _amount);
        _harvested += IZap(_zapper).zap(_rewardToken, _amount, _intermediate, 0);
      }
    }

    // 2. transfer intermediate token back to operator.
    _transferToken(_intermediate, _msgSender(), _harvested);
  }
}
