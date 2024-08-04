import React, { useEffect, useState } from 'react'
import './index.less'
import { Input } from 'antd-mobile'
import { fetchMatchCaptcha } from '../../api'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'


export default function VoteResultModal({
}) {

    const showVoteResult = usePlayerStore((state) => state.showVoteResult)
    const voteResult = usePlayerStore((state) => state.voteResult)
    const setShowVoteResult = usePlayerStore((state) => state.setShowVoteResult)
    const doVoteCancel = usePlayerStore((state) => state.doVoteCancel)
    const vote_type = useSettingStore((state) => state.activitySetting.vote_type.values)
    const showVotePopupImage = useSettingStore((state) => state.activitySetting.show_vote_popup_image.values)
    const votePopupImage = useSettingStore((state) => state.activitySetting.vote_popup_image.values)
    const votePopupImageUrl = useSettingStore((state) => state.activitySetting.vote_popup_image_url.values)


    const activityId = useSettingStore((state) => state.activityId)
    let isSingleVote;
    if (vote_type == 1) {
        isSingleVote = true
    } else {
        isSingleVote = false
    }


    return showVoteResult && <div className='vote-result-modal'>
        <div className='cloud'></div>
        <div className='modal-content'>
            <div className='text-primary w-full flex items-center justify-center h-6 text-title_large'>
                <span style={{ color: voteResult.status == 'success' ? '' : 'red' }}>{voteResult.text}</span>
            </div>
            <div className='border border-solid border-gray-400 flex-1 border border-solid border-gray-400'>
                {showVotePopupImage ? <img onClick={()=>{
                    if(votePopupImageUrl) {
                        location.href = votePopupImageUrl
                    }
                }} className="w-full h-auto min-h-12" src={getImageByCode(votePopupImage || '2020082010520010820.jpg')}></img> : <img className="w-full h-auto min-h-12" src="https://upload.cyuandao.com/2020082010520010820.jpg"></img>
                } </div>
            <div onClick={() => {
                doVoteCancel({ isSingleVote })
            }} className='text-primary w-full flex items-center justify-center h-6 text-title_large'>关闭</div>
        </div>
    </div>
}