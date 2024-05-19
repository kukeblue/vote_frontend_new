import React, { useEffect, useState } from 'react'
import './index.less'
import utils from '../../utils/common'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'


export default function Initad() {
    const [showAd, setShowAd] = useState(true)
    const [itime, setITime] = useState(4)
    const musicCode = useSettingStore((state) => state.activitySetting.music.values)
    const adImage = useSettingStore((state) => state.activitySetting.ad_image.values)
    const isShowAd = useSettingStore((state) => state.activitySetting.show_ad.values)

    
    useEffect(()=>{
        init()
    }, [])


    const init = async ()=>{
        if(!isShowAd) return
        document.body.style.overflow = 'hidden'
        let time = itime
        while(time > 0 && showAd){
            await utils.sleep(1000)
            let newTime = time - 1
            setITime(newTime)
            time = newTime
            if(newTime == 0) {
                setShowAd(false)
                break
                // this.$router.ch_replace('/intro')
            }
        }
        document.body.style.overflow = 'unset'
    }

    console.log('isShowAd', isShowAd)

    return  isShowAd && showAd && <div className="initad-page">
        <img src={adImage && getImageByCode(adImage)} className="p-initad-img"/>
        <div className="p-initad-time">
            {itime}秒后进入 <span onClick={()=>setShowAd(false)}>跳过</span>
        </div>
  </div>
}