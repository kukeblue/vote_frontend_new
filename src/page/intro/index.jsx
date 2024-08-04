import React, { useState } from 'react'
import './index.less'
import VoteIntroInfoCard from '../../component/VoteIntroInfoCard'
import VoteIntroRuleCard from '../../component/VoteIntroRuleCard'
import VoteIntroPanel from '../../component/VoteIntroPanel'

import useSettingStore from '../../store/settingStore'


export default ()=>{

  
  const introPage = useSettingStore((state) => state.activitySetting.intro_page.values)
  const {
    show_name_in_intro,
    show_news_in_intro,
    show_statistics_in_intro,
    show_timer_in_intro,
    show_vote_num_in_intro,
    show_vote_rules_in_intro,
  } = introPage

  return <div className='overflow-hidden intro-page w-full'>
    <div className='p-intro-wrap'>
    <VoteIntroInfoCard 
      showName={show_name_in_intro} 
      showStatistics={show_statistics_in_intro}
      showVoteNum={show_vote_num_in_intro}
      showVoteTime={show_timer_in_intro}
    />
    <VoteIntroRuleCard showVoteRules={show_vote_rules_in_intro}/>
    </div>
    <VoteIntroPanel showNews={show_news_in_intro}/>
  </div>
}

