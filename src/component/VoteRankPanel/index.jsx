import React, { useState } from 'react'
import './index.less'
// import image_logo from '../../assets/images/logo.png'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { useEffect } from 'react'
import {getImageByCode} from '../../utils/format'
import { useNavigate } from 'react-router'
import { Grid, InfiniteScroll } from 'antd-mobile'


export default function VoteIntroPanel({
    showPlayerCover = true,
    showPlayerDec = true
}) {
    const navigate = useNavigate();


    const activityId = useSettingStore((state) => state.activityId)
    const getRanks = usePlayerStore((state) => state.getRanks)
    const ranks = usePlayerStore((state) => state.ranks)
    const selectedGroupInRank = usePlayerStore((state) => state.selectedGroupInRank)
    const [ page,  setPage] = useState(1)
    const [ viewRanks,  setViewRanks] = useState([])
    const defaultPlayerCover = useSettingStore((state) => state.activitySetting.default_player_cover.values)


    useEffect(()=>{
        let newRanks
        if(selectedGroupInRank && selectedGroupInRank.id != 'all') {
            newRanks = ranks.filter(item=>item.player.group_id == selectedGroupInRank.id)
            
        }else {
            newRanks = ranks
        }
        setViewRanks(newRanks.slice(0, 10 * page))
    }, [ranks, page, selectedGroupInRank])


    useEffect(()=>{
        if(activityId) {
            getRanks(activityId)
        }
    }, [activityId])

    const hasMore = ranks.length > viewRanks.length

    const handleLoadMore = ()=>{
        if(hasMore) (
            setPage(page + 1)
        )
    }

    const handleClickPlayer = (id) => {
        navigate("/player?id=" + id)
    }


    return <div className='w-full pl-15px pr-15px pt-10px'>
        <div className=' bg-white w-full rounded-10px py-0.5rem px-0.4rem'>
            <div className='text-title text-primary text-center'>排行页面</div>
            <div className='mt-1rem rank-list relative'>
                {viewRanks.map((item, index)=> {
                    const player = item.player
                 return <div
                 onClick={()=>{handleClickPlayer(player.id)}}
                 key={item.player.id} className='mb-10px rank-list-item flex bg-rank_item py-10px px-10px rounded-10px items-center'>
                    <div className='w-0.5rem pl-5px'>
                        <div className='text-center rank-list-item-icon'>
                            {index > 2 ? index + 1 : ''}
                        </div>
                    </div>
                    { showPlayerCover &&
                        <img src={getImageByCode(player.cover || defaultPlayerCover)} className=' object-cover object-center ml-0.5rem rounded-0.6rem w-1.2rem h-1.2rem bg-gray-300'></img>
                    }
                    <div className='flex-1 h-1.2rem ml-0.3rem'>
                        <div className='flex'>
                            <div className='text-base text-color_dec'>{player.number}号</div>
                            <div className='text-common ml-5px relative bottom-1px'>{player.name}</div>
                        </div>
                        { showPlayerDec && <div className='flex'>
                            <div className='text-ellipsis-2 text-small text-color_dec'>{player.introduction}</div>
                        </div>}
                    </div>
                    <div className='text_color_type2'>{player.total_votes}票</div>
                </div>})}
                <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
                {/* {hasMore && <div onClick={handleLoadMore} className='text-center w-full mt-1rem text-base '>加载更多</div> } */}
            </div>
        </div>
    </div>
}