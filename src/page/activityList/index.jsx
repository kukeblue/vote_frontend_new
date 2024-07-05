import React, { useEffect, useState } from 'react'
import './index.less'
import { fetchTopicData } from '../../api'
import { getImageByCode } from '../../utils/format'

export default function ActivityList() {

    const [data, setData] = useState({
        activity: [],
        attribute: {}
    })

    useEffect(() => {
        const url = new URL(window.location.href); // 获取当前页面的 URL
        const params = new URLSearchParams(url.search); // 获取查询参数
        const topicId = params.get('topic_id'); // 获取 topicId 参数的值
        if (topicId) {
            fetchTopicData(topicId).then(res => {
                setData(res.data)
            })
        }
    }, [])

    const { activity, attribute } = data

    return <div className='page activity-list-page' style={{ backgroundColor: attribute.background_color }} >
        {attribute.background_image && <div className='w-full bg-page mb-10px'>
            <img width="100%" height="100%" src={getImageByCode(attribute.background_image)}></img>
        </div>}
        {
            activity.map(item => {
                return attribute.show_activity_title == 2 ? <div
                    onClick={() => {
                        location.href = item.domain + '/vote'
                    }}
                    key={item.activity_id} className='p-15px activity-item'>
                    <div className='text-lg'>{item.title}</div>
                    <div className='text-line'></div>
                    <img className='w-full' src={getImageByCode(item.banner)} ></img>
                </div> : <div
                    onClick={() => {
                        location.href = item.domain + '/vote'
                    }}
                    key={item.activity_id} className='p-0.8rem'>
                    <div className='text-lg'>{item.title}</div>
                    <div className='text-line text-line_2'></div>
                </div>
            })

        }

        <div className='p-1rem pt-0'>
            {/* <div className='text-lg'>默认活动标题(创建后请修改)</div> */}
            {/* <div className='text-line'></div> */}
        </div>
    </div>
}