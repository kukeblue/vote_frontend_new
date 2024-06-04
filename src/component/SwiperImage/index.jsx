import React from 'react'
import './index.less'
import { Button, Space, Swiper, Image } from 'antd-mobile'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'

const colors = ['#ace0ff']

export default function SwiperImage() {

    const banners = useSettingStore((state) => state.activitySetting.banners.values) || []

    
    const activitySetting = useSettingStore((state) => state.activitySetting)

    // console.log('【SwiperImage】', activitySetting.banners.values)
    const swiperConfig = {
        indicator: () => null
    }
    
    const items = banners.map((item, index) => (
        <Swiper.Item key={index}>
            <Image onClick={()=>{
                if(item.url ) {
                    location.href = item.url
                }
            }} src={getImageByCode(item.banner)} width={"100%"} height={'5.6rem'} />
        </Swiper.Item>
    ))

    return <div className='swiper-image'>
        <Swiper
            {...swiperConfig}
            loop
            autoplay
            autoplayInterval={10000}
            onIndexChange={i => {
                // // console.log(i, 'onIndexChange1')
            }}
        >
            {items}
        </Swiper>
    </div>
}