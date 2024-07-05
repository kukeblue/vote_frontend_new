import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'



export default function TechnicalSupport() {

    const bottom_text = useSettingStore((state) => state.activitySetting.bottom_text.values)
    const bottom_text_url = useSettingStore((state) => state.activitySetting.bottom_text_url.values)
    const bottom_text_color = useSettingStore((state) => state.activitySetting.bottom_text_color.values)
    const bottom_text_size = useSettingStore((state) => state.activitySetting.bottom_text_size.values)

    const display_copyright = useSettingStore((state) => state.activitySetting.display_copyright.values)
    const display_copyright_url = useSettingStore((state) => state.activitySetting.display_copyright_url.values)


    let text_size = 'text-base'
    console.log('bottom_text_size', bottom_text_size)
    switch(bottom_text_size){
        case 1:
            text_size = 'text-base'
            break
        case 2:
            text_size = 'text-lg'
            break
        case 3:
            text_size = 'text-title'
            break
    }

    const toLink = () => {
        if (bottom_text_url) {
            window.location.href = bottom_text_url
        }
    }

    return <div className='pt-1rem technical-support pb-4rem flex flex-col items-center'>
        <div className={text_size}><span onClick={() => {
            toLink()
        }} className='text-primary' style={{ color: bottom_text_color }}>{bottom_text || '领航评选'}</span>提供技术支持</div>
        {display_copyright && <div 
        onClick={()=>{
            if(display_copyright_url) location.href = display_copyright_url
                
        }} className='mt-20px p-10px bg-gray rounded-5px text-base text-white p-technical-support-button'>我也要创建活动</div>}
    </div>
}