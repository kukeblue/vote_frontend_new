import React, { useState, useEffect } from 'react'
import './index.less'
import VoteIntroInfoCard from '../../component/VoteIntroInfoCard'
import VoteIntroRuleCard from '../../component/VoteIntroRuleCard'
import VoteGroupCard from '../../component/VoteGroupCard'
import VoteSearchCard from '../../component/VoteSearchCard'
import VotePlayerList from '../../component/VotePlayerList'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import utils from '../../utils/common'
import KeepAlive, { useActivate, useUnactivate, withActivation } from 'react-activation'


export default () => {

  useActivate(() => {
    const pageMain = document.getElementById('page-main');
    const cache = utils.getObCache('scrollTop_' + location.pathname)
    if (cache) {
      const top = cache.scrollTop
      setTimeout(() => {
        pageMain.scrollTop = top
      }, 100)
    }
  })

  useUnactivate(() => {

  })

  const selectedGroup = usePlayerStore((state) => state.selectedGroup)
  const activityId = useSettingStore((state) => state.activityId)
  const setSelectedGroup = usePlayerStore((state) => state.setSelectedGroup)
  const getPlayers = usePlayerStore((state) => state.getPlayers)
  const {
    show_all_group,
    show_enroll_button,
    show_name,
    show_ranking_button,
    show_search,
    show_statistics,
    show_timer,
    show_topic_data,
    show_vote_button,
    show_vote_item_cover,
    show_vote_item_detail,
    show_vote_item_intro,
    show_vote_item_name,
    show_vote_item_no,
    show_vote_num,
    show_vote_rules,
  } = useSettingStore((state) => state.activitySetting.vote_page.values)

  const handleChangeGroup = (item) => {
    if (!item) return

    setSelectedGroup(item)
    if (item.id != 'all') {
      getPlayers(activityId, 1, item.id)
    } else {
      getPlayers(activityId, 1)
    }
  }

  useEffect(() => {
    const pageMain = document.getElementById('page-main');
    const handleScroll = () => {
      if (location.pathname == '/vote') {
        if (pageMain) {
          const top = Number.parseInt(pageMain.scrollTop)
          if (top % 2 === 0) {
            utils.setObCache('scrollTop_' + location.pathname, { 'scrollTop': top })
          }
        }
      }
    };
    // 添加滚动事件监听器
    pageMain.addEventListener('scroll', handleScroll);
    // 组件卸载时移除事件监听器
    return () => {
      pageMain.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className='overflow-hidden vote-page w-full'>
    <VoteIntroInfoCard
      showVoteNum={true}
      showName={show_name}
      showStatistics={show_statistics}
      showVoteTime={show_timer} />
    <VoteIntroRuleCard
      showVoteRules={show_vote_rules} />
    <VoteGroupCard
      showGroup={true}
      showAll={show_all_group}
      selectedGroup={selectedGroup}
      onChangeGroup={handleChangeGroup} />
    {show_search && <VoteSearchCard showRankingButton={show_ranking_button} />}
    <VotePlayerList
      showVoteButton={show_vote_button}
      showVoteItemName={show_vote_item_name}
      showVoteItemCover={show_vote_item_cover}
      showVoteItemIntro={show_vote_item_intro}
      showVoteItemNo={show_vote_item_no}
      showVoteNum={show_vote_num}
    />
  </div>
}

