import React, { useEffect, useState } from 'react'
import './index.less'
import utils from '../../utils/common'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'


export default function Initad() {
    const [showAd, setShowAd] = useState(true)
    const [isClickJump, setIsClickJump] = useState(false)

    const [itime, setITime] = useState(4)
    const musicCode = useSettingStore((state) => state.activitySetting.music.values)

    const adImage = useSettingStore((state) => state.activitySetting.ad_image.values)
    const default_ad_image = useSettingStore((state) => state.activitySetting.default_ad_image.values)


    const isShowAd = useSettingStore((state) => state.activitySetting.show_ad.values)
    const adType = useSettingStore((state) => state.activitySetting.ad_type.values)
    const defaultAniImage = useSettingStore((state) => state.activitySetting.default_ani_image.values)
    const defaultBtnImage = useSettingStore((state) => state.activitySetting.default_btn_image.values)
    const activitySetting = useSettingStore((state) => state.activitySetting)
    let aniImage = useSettingStore((state) => state.activitySetting.ani_image.values) || defaultAniImage
    let btnImage = useSettingStore((state) => state.activitySetting.btn_image.values) || defaultBtnImage






    useEffect(() => {
        setTimeout(() => {
            init()
        }, 100)

    }, [activitySetting])


    const init = async () => {
        if (!isShowAd || adType == 2) return
        document.body.style.overflow = 'hidden'
        let time = itime
        while (time > 0 && showAd) {
            await utils.sleep(1000)
            let newTime = time - 1
            console.log(newTime)
            setITime(newTime)
            time = newTime
            if (newTime == 0) {
                setShowAd(false)
                break
                // this.$router.ch_replace('/intro')
            }
        }
        document.body.style.overflow = 'unset'
    }

    const handleJumpPage = () => {
        setIsClickJump(true)
        setTimeout(()=>{
            setShowAd(false)
            setIsClickJump(false)
        }, 2900)
    }



    return isShowAd && showAd && <div className="initad-page">
        {
            adType == 1 ? <img src={adImage && getImageByCode(adImage || default_ad_image)} className="p-initad-img" /> :
                <div>
                    <img src={aniImage && getImageByCode(aniImage)} className="p-initad-img" />
                    { !isClickJump ? (btnImage && <img onClick={() => {
                        handleJumpPage()
                    }} src={btnImage && getImageByCode(btnImage)} className='ani_button'></img>) : <div onClick={() => {
                        setShowAd(false)
                    }}
                    //  src={defaultBtnImage && getImageByCode(defaultBtnImage)}
                     className='ani_button'>
                        <div id="progressbar">
                            <span id="loading"></span>
                            <div id="load">加载中...</div>
                        </div>
                     </div>}
                </div>
        }

        {adType == 1 && <div className="p-initad-time">
            {itime}秒后进入 <span onClick={() => setShowAd(false)}>跳过</span>
        </div>}
    </div>
}