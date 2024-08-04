import React from 'react'
import './index.less'
import { Button, Space, Swiper, Image } from 'antd-mobile'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'

const colors = ['#ace0ff']

export default function SwiperImage() {

    const banners = useSettingStore((state) => state.activitySetting.banners.values) || []
    
    const activitySetting = useSettingStore((state) => state.activitySetting)


    const swiperConfig = {
        indicator: () => null
    }
    const items = banners.map((item, index) => (
      
        <Swiper.Item key={index}>
            <Image onClick={()=>{
                if(item.href) {
                    location.href = item.href
                }
            }} src={getImageByCode(item.banner)} width={"100%"}/>
        </Swiper.Item>
    ))

    return <div className='swiper-image'>
        <Swiper
            {...swiperConfig}
            loop
            autoplay
            autoplayInterval={10000}
            onIndexChange={i => {

            }}
        >
            {items}
        </Swiper>
    </div>
}