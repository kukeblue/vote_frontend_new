import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import {formatTime} from '../../utils/format'
import { useEffect, useState } from 'react'
import './index.less'


export default function VoteIntroRuleCard({
    showVoteRules = true 
}) {

    const activityStartTime = useSettingStore((state) => state.activityStartTime)
    const activityEndTime = useSettingStore((state) => state.activityEndTime)
    const activitySetting = useSettingStore((state) => state.activitySetting)

    // 获取规则拼接
    const [voteRuleMatching, setVoteRuleMatching] = useState()

    useEffect(()=>{
        // console.log('【获取vote_type】', activitySetting.vote_type.values)
        if(activitySetting.vote_type.values != 0) {
            let canVoteSameItemNum = activitySetting.can_vote_same_item_num.values
            const voteType = activitySetting.vote_type.values
            if(voteType == 1) {
                let unit = activitySetting.vote_type.values == 1? '票' : '次'
                let cycle = activitySetting.vote_times_limit_type.values == 1 ? '整个活动期间' : '每天'
                let ruleText = `每个微信号${cycle}可以投${canVoteSameItemNum}${unit}`
                // console.log('获取规则拼接：', ruleText)
                setVoteRuleMatching(ruleText)
            }else {
                let unit = activitySetting.vote_type.values == 1? '票' : '次'
                let cycle = activitySetting.vote_times_limit_type.values == 1 ? '整个活动期间' : '每天'
                
                let times = (activitySetting.vote_times_limit_type.values == 1) ?  activitySetting.can_vote_same_item_num.values :
                activitySetting.per_wx_vote_num.values

                let ruleText = `每个微信号${cycle}可以投${times}${unit}，`

                let minChooseNum  = activitySetting.min_choose_num.values
                let maxChooseNum  = activitySetting.max_choose_num.values
                
                let text1 = `最少选择${minChooseNum}位选手`
                let text2 = `，最多选择${maxChooseNum}位选手`
                setVoteRuleMatching(ruleText + text1 + text2)
            }
        }

    }, [activitySetting])


    return showVoteRules && <div className='w-full pl-15px pr-15px pt-10px'>
        <div className=' bg-white w-full rounded-10px p-10px'>
            <div className='text-primary text-center font-medium'>
                活动规则
            </div>
            <div className='flex item-center justify-start pl-20px text-base mt-10px'>
                <span className='text-primary iconfont icontime relative '></span>
                &nbsp;
                <div className='text-color_time_count text-base rule-label'>投票开始：</div>&nbsp;
                <div className='text-color_time_count text-base'>{formatTime(new Date(activityStartTime * 1000))}</div>
            </div>
            <div className='flex item-center justify-start pl-20px text-base'>
                <span className='text-primary iconfont icontime relative'></span>
                &nbsp;
                <div className='text-color_time_count text-base rule-label'>投票结束：</div>&nbsp;
                <div className='text-color_time_count text-base'>{formatTime(new Date(activityEndTime * 1000))}</div>
            </div>
            <div className='flex item-center justify-start pl-20px text-base'>
                <span className='text-primary iconfont icontishi relative'></span>
                &nbsp;
                <div className='text-color_time_count text-base rule-label'>投票规则：</div>&nbsp;
                <div className='text-color_time_count text-base '>{voteRuleMatching}</div>
            </div>
        </div>
    </div>
}