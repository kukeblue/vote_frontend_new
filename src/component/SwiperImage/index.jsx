import React from 'react'
import './index.less'
import { Button, Space, Swiper, Image } from 'antd-mobile'
import useSettingStore from '../../store/settingStore'

const colors = ['#ace0ff']

export default function SwiperImage() {

    const banners = useSettingStore((state) => state.activitySetting.banners.values)
    const activitySetting = useSettingStore((state) => state.activitySetting)

    // console.log('【SwiperImage】', activitySetting.banners.values)
    const swiperConfig = {
        indicator: () => null
    }

    const items = banners.map((item, index) => (
        <Swiper.Item key={index}>
            <Image src={item.url + "/" + item.banner} width={"100%"} height={'5.6rem'} />
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