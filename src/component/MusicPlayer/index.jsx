import React, { useState } from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'

export default function MusicPlayer() {

    const [isAudioPaly, setIsAudioPaly] = useState(true)
    const musicCode = useSettingStore((state) => state.activitySetting.music.values)


    const autoSwitch = () => {
        if(isAudioPaly) {
            document.getElementById('audio').pause();
        }else{
            document.getElementById('audio').play();
        }
        setIsAudioPaly(!isAudioPaly)
    }

    return musicCode && <div onClick={autoSwitch} className='music-player flex items-center justify-center'>
        <span className={`iconfont iconyinle ${isAudioPaly ? 'rotate_bg' : ''}`}></span>
        <audio
            className='display-audio'
            id="audio"
            loop
            controls
            src={getImageByCode(musicCode)}
            autoPlay={true}
        ></audio>
    </div>
}