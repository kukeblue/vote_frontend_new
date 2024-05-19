import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'


export default function VoteIntroPanel({
    showNews= true
}) {

    const introText = useSettingStore((state) => state.activitySetting.intro.values)

    return showNews && <div className='w-full pl-15px pr-15px pt-10px'>
        <div className=' bg-white w-full rounded-10px py-0.5rem px-0.7rem' dangerouslySetInnerHTML={{ __html: introText }}>
        </div>
    </div>
}