import React from 'react'
import './index.less'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { useNavigate, useLocation } from "react-router-dom";

import {Toast} from 'antd-mobile'

export default function MultiVoteFloatPanel() {
    const navigate = useNavigate();

    const selectedPlayers = usePlayerStore((state) => state.selectedPlayers)
    const doVoteHandle = usePlayerStore((state) => state.doVoteHandle)
    const vote_type = useSettingStore((state) => state.activitySetting.vote_type.values)

    const activitySetting = useSettingStore((state) => state.activitySetting)
    let minChooseNum = activitySetting.min_choose_num.values
    let maxChooseNum = activitySetting.max_choose_num.values

    const handleClickVote = () => {

        if(selectedPlayers.length > maxChooseNum) {
            Toast.show({
                icon: 'fail',
                content: "最多选择" + maxChooseNum + "项",
            })
            return 
        }

        if(selectedPlayers.length < minChooseNum) {
            Toast.show({
                icon: 'fail',
                content: "最少选择" + minChooseNum + "项",
            })
            return 
        }

        let isSingleVote;
        if(vote_type == 1) {
            isSingleVote = true
        }else {
            isSingleVote = false
        }
        navigate("/voting")
        // doVoteHandle({isMultiVoteFloatPanelClick: true, isSingleVote})
    }

    return selectedPlayers.length > 0 && <div className='multi-vote-float-panel flex items-center text-base text-color_dec justify-between'>
        <span>已选择<span className='text-primary'>{` ${selectedPlayers.length} `}</span>
            项，最少选择<span className='text-primary'>{` ${minChooseNum} `}</span>项，
            最多选择<span className='text-primary'>{` ${maxChooseNum} `}</span>项</span>
        <span 
        onClick={()=>handleClickVote()}
        className='multi-vote-button w-1rem h-0.5rem bg-primary text-white text-center text-base'>投票</span>
    </div>
}