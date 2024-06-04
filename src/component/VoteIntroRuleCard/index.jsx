import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import { formatTime } from '../../utils/format'
import { useEffect, useState } from 'react'
import './index.less'

const generateFontSize = (size) => {
    let sizeName = 'text-base'
    if (size == 2) {
        sizeName = 'text-common'
    } else if (size == 3) {
        sizeName = 'text-lg'
    }
    return sizeName
}

export default function VoteIntroRuleCard({
    showVoteRules = true
}) {

    const activityStartTime = useSettingStore((state) => state.activityStartTime)
    const activityEndTime = useSettingStore((state) => state.activityEndTime)
    const activitySetting = useSettingStore((state) => state.activitySetting)
    const displayRuleText = useSettingStore((state) => state.activitySetting.display_rule_text.values)
    const ruleText = useSettingStore((state) => state.activitySetting.rule_text.values)
    const ruleTextColor = useSettingStore((state) => state.activitySetting.rule_text_color.values)
    const ruleTextSize = useSettingStore((state) => state.activitySetting.rule_text_size.values)
    const ruleTextPluginSize = useSettingStore((state) => state.activitySetting.rule_text_plugin_size.values)
    const ruleTextPlugin = useSettingStore((state) => state.activitySetting.rule_text_plugin.values)
    const ruleTextPluginColor = useSettingStore((state) => state.activitySetting.rule_text_plugin_color.values)

    let ruleTextSizeName = generateFontSize(ruleTextSize)
    let ruleTextPluginSizeName = generateFontSize(ruleTextPluginSize)




    // 获取规则拼接
    const [voteRuleMatching, setVoteRuleMatching] = useState()

    useEffect(() => {
        // console.log('【获取vote_type】', activitySetting.vote_type.values)
        if (activitySetting.vote_type.values != 0) {
            let canVoteSameItemNum = activitySetting.can_vote_same_item_num.values
            const voteType = activitySetting.vote_type.values
            if (voteType == 1) {
                let unit = activitySetting.vote_type.values == 1 ? '票' : '次'
                let cycle = activitySetting.vote_times_limit_type.values == 1 ? '整个活动期间' : '每天'
                let ruleText = `每个微信号${cycle}可以投${canVoteSameItemNum}${unit}`
                // console.log('获取规则拼接：', ruleText)
                setVoteRuleMatching(ruleText)
            } else {
                let unit = activitySetting.vote_type.values == 1 ? '票' : '次'
                let cycle = activitySetting.vote_times_limit_type.values == 1 ? '整个活动期间' : '每天'

                let times = (activitySetting.vote_times_limit_type.values == 1) ? activitySetting.can_vote_same_item_num.values :
                    activitySetting.per_wx_vote_num.values

                let ruleText = `每个微信号${cycle}可以投${times}${unit}，`

                let minChooseNum = activitySetting.min_choose_num.values
                let maxChooseNum = activitySetting.max_choose_num.values

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
                {!displayRuleText && <div className='text-color_time_count text-base '>{voteRuleMatching}</div>}
                {displayRuleText &&
                    <div style={{
                        color: ruleTextColor
                    }} className={`text-color_time_count ${ruleTextSizeName}`}>
                        {ruleText}{ruleTextSize}
                    </div>}
            </div>
            {ruleTextPlugin && <div className='flex item-center justify-start pl-20px text-base'>
                <span className='text-primary iconfont icontishi relative'></span>
                &nbsp;
                <div className='text-color_time_count text-base rule-label'>活动说明：</div>&nbsp;
                <div style={{
                    color: ruleTextPluginColor
                }}
                className={`text-color_time_count ${ruleTextPluginSizeName}`}>{ruleTextPlugin}</div>
            </div>}
        </div>
    </div>
}