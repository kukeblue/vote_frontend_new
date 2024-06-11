import React, { useEffect, useState } from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'
import { useLocation } from 'react-router-dom';

export default function HomeButton() {
    const location = useLocation();

    const [isExpand, setIsExpand] = useState()
    const [isInit, setIsInit] = useState(false)

    const showThemeQuick = useSettingStore((state) => state.activitySetting.show_theme_quick.values)
    const theme_history_url = useSettingStore((state) => state.activitySetting.theme_history_url.values)
    useEffect(()=>{
        setTimeout(()=>{
            // ? 'box-expand': 'box-folder'
            setIsExpand('box-expand')
            setIsInit(true)
            setTimeout(()=>{
                setIsExpand('box-folder')
            }, 3000)
        }, 2000)
    }, [])

    const showBackHome = !location.pathname.includes('player')

    const handleClickExpand = () => {
        if(isExpand == 'box-folder') {
            setIsExpand('box-expand')
        }else {
            setIsExpand('box-folder')
        }
    }
    const handleClickJumpTheme = (e) => {

        if(theme_history_url) {
            location.href = theme_history_url
        }
        e.stopPropagation();
    }

    



    return showBackHome && isExpand && <div className={`home-button flex items-center justify-center ${isExpand}`}>
        <div onClick={handleClickJumpTheme} className='home-button-text'>返回专题</div>
        <div onClick={handleClickExpand} className="home-button-jiantou">
            <span className={`iconfont ${(isExpand  == 'box-folder')?'iconjinru' : 'iconjinru-copy'}`}></span>
        </div>
    </div>
}