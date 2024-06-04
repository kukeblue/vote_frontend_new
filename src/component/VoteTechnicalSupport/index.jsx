import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'



export default function TechnicalSupport() {

    const bottom_text = useSettingStore((state) => state.activitySetting.bottom_text.values)
    const bottom_text_url = useSettingStore((state) => state.activitySetting.bottom_text_url.values)
    const bottom_text_color = useSettingStore((state) => state.activitySetting.bottom_text_color.values)
    console.log('bottom_text_color', bottom_text_color)


    const toLink = () => {
        console.log('bottom_text_url', bottom_text_url)
        if (bottom_text_url) {
            window.location.href = bottom_text_url
        }

    }

    return <div className='pt-1rem technical-support pb-4rem flex flex-col items-center'>
        <div className='text-base'><span onClick={() => {
            toLink()
        }} className='text-primary' style={{ color: bottom_text_color }}>{bottom_text || '领航评选'}</span>提供技术支持</div>
        <div className='mt-20px p-10px bg-gray rounded-5px text-base text-white'>我也要创建活动</div>
    </div>
}