import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import { fetchActivityData } from '../../api/index'
import { useEffect } from 'react'
import { useState } from 'react'


export default function VoteIntroInfoCard({ 
    showName=true, 
    showStatistics=true,
    showVoteNum=true,
    showVoteTime=true
}) {
    const activityId = useSettingStore((state) => state.activityId)
    const activityStartTime = useSettingStore((state) => state.activityStartTime)
    const activityEndTime = useSettingStore((state) => state.activityEndTime)
    const activityData = useSettingStore((state) => state.activityData)
    const setActivityData = useSettingStore((state) => state.setActivityData)
    const timeData = useSettingStore((state) => state.timeData)
    const setTimeData = useSettingStore((state) => state.setTimeData)
    const activityTitle = useSettingStore((state) => state.activityTitle)
    const voteItemShowName = useSettingStore((state) => state.activitySetting.vote_item_show_name.values)
    const voteItemUnitName = useSettingStore((state) => state.activitySetting.vote_item_unit_name.values)
    const voteNumUnitName = useSettingStore((state) => state.activitySetting.vote_num_unit_name.values)

    // vote_item_unit_name: {values: "位"},
    // vote_num_unit_name: {values: "票"},

    useEffect(() => {
        if(activityStartTime && activityEndTime) {
        const interval = setInterval(() => {
            const ret = countTime()
            if(JSON.stringify(ret) != JSON.stringify(timeData)) {

                setTimeData(ret)
            }
          }, 1000);
      
          return () => {
            clearInterval(interval);
          };}

    }, [activityStartTime, activityEndTime])

    useEffect(() => {
        if (activityId) {
            fetchActivityData(activityId).then(res => {
                setActivityData(res)
            })
        }
    }, [activityId])

    const countTime = () => {
        let ret = {
            day: '0',
            hour: '00',
            min: '00',
            second: '00',
            status: '开始'
        }
        if (activityStartTime && activityEndTime) {
            if(Date.now() < activityStartTime * 1000) {
                ret.status ='开始'
            }else {
                ret.status ='结束'
            }
            // 获取当前时间戳
            let nowTemp = Date.now();
            let endTemp;
            //判断未到活动开始时间
            if (activityStartTime * 1000 - Date.now() >= 0) {
                endTemp = activityStartTime * 1000;
            } else {
                //设置活动截止时间
                endTemp = activityEndTime * 1000;
            }

            // 时间差
            let leftTime = endTemp - nowTemp;
            // 定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                // 天
                ret.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
                // 时
                let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
                ret.hour = h < 10 ? '0' + h : h
                // 分
                let m = Math.floor(leftTime / 1000 / 60 % 60)
                ret.min = m < 10 ? '0' + m : m
                // 秒
                let s = Math.floor(leftTime / 1000 % 60)
                ret.second = s < 10 ? '0' + s : s
            } else {
                ret.day = '0'
                ret.hour = '00'
                ret.min = '00'
                ret.second = '00'
            }
            return ret
        }
    }
    return <div className='w-full pl-15px pr-15px pt-10px '>
        <div className=' bg-white w-full rounded-10px p-10px p-voteIntroInfoCard-block'>
            {showName && <div className='text-color_title text-center font-medium text-lg voteIntroInfoCard-title'>
                {activityTitle}
            </div>}
            {showStatistics && <div  className='flex py-18px bg-primary rounded-10px mt-10px  w-full h-2.2rem p-voteIntroInfoCard-statistics-block'>
                {showVoteNum && <div className='text-white flex-1 flex items-center flex-col border-r border-secondary border-dashed h-full'>
                    <div className='text-lg mt-5px'>{activityData.total_votes}</div>
                    <div className='text-base'>总{voteNumUnitName}数</div>
                </div>}
                <div className='text-white flex items-center flex-col border-r border-secondary border-dashed flex-1 h-full'>
                    <div className='text-lg mt-5px'>{activityData.total_players}</div>
                    <div className='text-base'>{voteItemShowName}数</div>
                </div>
                <div className='text-white flex items-center flex-col flex-1 h-full'>
                    <div className='text-lg mt-5px'>{activityData.total_visits}</div>
                    <div className='text-base'>访问量</div>
                </div>
            </div>}
            {showVoteTime && <div className='text-center mt-10px text-base text-color_time_count p-voteIntroInfoCard-timer-block'>
                <span className='iconfont icontime relative top-[0.02rem] text-lg'></span>
                &nbsp;
                <span className='p-voteIntroInfoCard-timer-text'>投票 <span className='text-primary'>{timeData.status}</span> 倒计时
                    <span className='text-primary'>{timeData.day}</span>天
                    <span className='text-primary'>{timeData.hour}</span>时
                    <span className='text-primary'>{timeData.min}</span>分
                    <span className='text-primary'>{timeData.second}</span>秒</span>
            </div>}
        </div>
    </div>
}