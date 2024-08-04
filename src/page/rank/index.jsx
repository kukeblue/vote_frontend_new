import React, { useState } from 'react'
import './index.less'
import VoteIntroInfoCard from '../../component/VoteIntroInfoCard'
import VoteIntroRuleCard from '../../component/VoteIntroRuleCard'
import VoteGroupCard from '../../component/VoteGroupCard'
import VoteRankPanel from '../../component/VoteRankPanel'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'



export default ()=>{

  const selectedGroupInRank = usePlayerStore((state) => state.selectedGroupInRank)
  const setSelectedGroupRank = usePlayerStore((state) => state.setSelectedGroupRank)
  const { 
          show_all_ranking,
          show_group_in_rank,
          show_name_in_rank,
          show_number_in_rank,
          show_statistics_in_rank,
          show_timer_in_rank,
          show_vote_item_cover_in_rank,
          show_vote_item_intro_in_rank,
          show_vote_num_in_rank,
          show_vote_rules_in_rank } = useSettingStore((state) => state.activitySetting.rank_page.values)

          
          
  const handleChangeGroup = (item) => {
    setSelectedGroupRank(item)
    // if(item.id != 'all') {
    //     // getPlayers(activityId, 1, item.id)
    // }
  }

  return <div className='overflow-hidden rank-page w-full'>
    <div className='p-intro-wrap'>
    <VoteIntroInfoCard showName={show_name_in_rank} showStatistics={show_statistics_in_rank} showVoteNum={show_vote_num_in_rank}/>
    <VoteIntroRuleCard showVoteRules={show_vote_rules_in_rank}/>
    </div>
    <VoteGroupCard 
    onChangeGroup={handleChangeGroup} selectedGroup={selectedGroupInRank} showGroup={show_group_in_rank} showAll={show_all_ranking}/>
    <VoteRankPanel showPlayerCover={show_vote_item_cover_in_rank} showPlayerDec={show_vote_item_intro_in_rank}/>
  </div>
}

