import React from 'react'
import { NoticeBar } from 'antd-mobile'
import './Notice.less'
import useSettingStore from '../store/settingStore'


export default function Notice() {

    const activitySetting = useSettingStore((state) => state.activitySetting)
    const textNotice = activitySetting.text_notice.values
    const open_text_notice = activitySetting.open_text_notice.values

    
      
    return open_text_notice && textNotice && <NoticeBar className='w-full z-10 absolute top-0 left-0' content={textNotice} color='alert' />
}