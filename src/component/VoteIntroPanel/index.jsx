import React, { useState } from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import { Empty, Image } from 'antd'
import { useNavigate, useLocation } from "react-router-dom";


export default function VoteIntroPanel({
    showNews = true
}) {
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState(1)

    const introText = useSettingStore((state) => state.activitySetting.intro.values)
    let news = useSettingStore((state) => state.activitySetting.news.values)

    const handleClickArticle = (item) => {
        const str = JSON.stringify(item)
        navigate('/article?content=' + str)
    }
    news = news.filter(item=>item.show == 0)

    return showNews && introText && <div className='w-full pl-15px pr-15px pt-10px p-VoteIntroPanel-wrap'>
        <div className='bg-white w-full rounded-10px py-0.5rem px-0.7rem VoteIntroPanel'>
            {news.length > 0 && <div className='voteIntroPanel-header flex flex-row-between'>
                <div onClick={() => setSelectedType(1)} className={`pr-20px voteIntroPanel-header-item ${selectedType == 1 ? 'active' : ''}`}> 活动介绍</div>
                <div onClick={() => setSelectedType(2)} className={`pl-20px voteIntroPanel-header-item left-line ${selectedType == 2 ? 'active' : ''}`}> 活动动态</div>
            </div>}

            {selectedType == 1 ? <div dangerouslySetInnerHTML={{ __html: introText }}>
            </div> : <div className='intro-news'>
                {
                    news.map(item => {
                        return <div key={item.ordid} className='intro-news-item'>
                           { item.cover && <img onClick={()=>{
                                handleClickArticle(item)
                           }} src={item.cover} className='intro-news-item-pic' />}
                            <div onClick={()=>{
                                handleClickArticle(item)
                            }} className='intro-news-item-title'>{item.title}</div>
                        </div>
                    })
                }
                {/* <Empty
                className='flex flex-col items-center'
                style={{ padding: '64px 0'}}
                imageStyle={{ width: 128 }}
                description='暂无数据'
            />     */}
            </div>}
        </div>
    </div>
}