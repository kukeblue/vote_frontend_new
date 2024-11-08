import React from 'react'
import './index.less'
import useSettingStore from '../../store/settingStore'
import { formatTime } from '../../utils/format'
import { useEffect, useState } from 'react'
import './index.less'
import { CustomTexts } from '../../config/appConfig'

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
    const activityId = useSettingStore((state) => state.activityId)
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
    const voteItemUnitName = useSettingStore((state) => state.activitySetting.vote_item_unit_name.values)
    const voteItemShowName = useSettingStore((state) => state.activitySetting.vote_item_show_name.values)
    const voteNumUnitName = useSettingStore((state) => state.activitySetting.vote_num_unit_name.values)
    const CustomTextMap= CustomTexts.VoteIntroRuleCard[activityId] || CustomTexts.VoteIntroRuleCard.default
	const buttonName = useSettingStore((state) => state.activitySetting.button_name.values)
    let ruleTextSizeName = generateFontSize(ruleTextSize)
    let ruleTextPluginSizeName = generateFontSize(ruleTextPluginSize)

    const playerText = voteItemUnitName + voteItemShowName
    

    // 获取规则拼接
    const [voteRuleMatching, setVoteRuleMatching] = useState()

    useEffect(() => {

        if (activitySetting.vote_type.values != 0) {
            let per_wx_vote_num = activitySetting.per_wx_vote_num.values
            const voteType = activitySetting.vote_type.values
            if (voteType == 1) {
                let unit = activitySetting.vote_type.values == 1 ? '票' : '次'
                let cycle = activitySetting.vote_times_limit_type.values == 1 ? '整个活动期间' : '每天'
                let ruleText = `每个微信号${cycle}可以投${per_wx_vote_num}${unit}`

                setVoteRuleMatching(ruleText)
            } else {
                let unit = activitySetting.vote_type.values == 1 ? '票' : '次'
                let cycle = activitySetting.vote_times_limit_type.values == 1 ? '整个活动期间' : '每天'

                let times = (activitySetting.vote_times_limit_type.values == 1) ? activitySetting.can_vote_same_item_num.values :
                    activitySetting.per_wx_vote_num.values

                let ruleText = `每个微信号${cycle}可以投${times}${unit}，`

                let minChooseNum = activitySetting.min_choose_num.values
                let maxChooseNum = activitySetting.max_choose_num.values

                let text1 = `最少选择${minChooseNum}${playerText}`
                let text2 = `，最多选择${maxChooseNum}${playerText}`
                setVoteRuleMatching(ruleText + text1 + text2)
            }
        }

    }, [activitySetting])


    return showVoteRules && <div className='w-full pl-15px pr-15px pt-10px p-voteIntroRuleCard'>
        <div className=' bg-white w-full rounded-10px p-10px p-voteIntroRuleCard-block'>
            <div className='text-primary text-center font-medium'>
                {CustomTextMap['活动规则']}
            </div>
            <div className='p-voteIntroRuleCard-block-text'>
                
                <div className='flex justify-start pl-20px text-base mt-10px'>
                    <span style={{lineHeight: '0.5rem'}} className='text-primary iconfont icontime relative'></span>
                    &nbsp;
                    <div className='text-color_time_count text-base rule-label'>{buttonName}开始：</div>&nbsp;
                    <div className='text-color_time_count text-base'>{formatTime(new Date(activityStartTime * 1000))}</div>
                </div>
                <div className='flex  justify-start pl-20px text-base'>
                    <span style={{lineHeight: '0.5rem'}} className='text-primary iconfont icontime relative'></span>
                    &nbsp;
                    <div className='text-color_time_count text-base rule-label'>{buttonName}结束：</div>&nbsp;
                    <div className='text-color_time_count text-base'>{formatTime(new Date(activityEndTime * 1000))}</div>
                </div>
                <div className='flex  justify-start pl-20px text-base'>
                    <span  style={{lineHeight: '0.5rem', position: 'relative', 'top': '-0.01rem'}} className='text-primary iconfont icontishi relative'></span>
                    &nbsp;
                    <div className='text-color_time_count text-base rule-label'>{buttonName}规则：</div>&nbsp;
                    {!displayRuleText && <div className='text-color_time_count text-base '>{voteRuleMatching}</div>}
                    {displayRuleText &&
                        <div style={{
                            color:  ruleTextColor == '#0076ff' ? '': ruleTextColor,
                            whiteSpace: 'pre-line'
                        }} className={`text-color_time_count text-base ${ruleTextSizeName}`}>
                            {ruleText}
                        </div>}
                </div>
                {ruleTextPlugin && <div className='flex items-center justify-start pl-20px text-base'>
                    <span className='text-primary iconfont icontishi relative'></span>
                    &nbsp;
                    <div className='text-color_time_count text-base rule-label'>活动说明：</div>&nbsp;
                    <div style={{
                        whiteSpace: 'pre-line',
                        color: ruleTextPluginColor == '#0076ff' ? '': ruleTextPluginColor
                    }}
                        className={`text-color_time_count ${ruleTextPluginSizeName}`}>{ruleTextPlugin}</div>
                </div>}
                <div style={{'display': 'none'}} className='c-customize-time'>
                    <div className='c-customize-time_item'>
                        <div>{formatTime(new Date(activityStartTime * 1000))}</div>
                        <div className='c-customize-time_label'>活动开始</div>
                    </div>
                    <div className='c-customize-time_item'>
                        <div>{formatTime(new Date(activityEndTime * 1000))}</div>
                        <div className='c-customize-time_label'>活动结束</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}