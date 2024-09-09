import React, { useState } from 'react'
import './index.less'
// import image_logo from '../../assets/images/logo.png'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { useEffect } from 'react'
import { getImageByCode } from '../../utils/format'
import { useNavigate } from 'react-router'
import ScrollLoader from '../ScrollLoader'
import { fetchAverageData } from '../../api'


export default function VoteIntroPanel({
    showPlayerCover = true,
    showPlayerDec = true
}) {
    const navigate = useNavigate();


    const activityId = useSettingStore((state) => state.activityId)
    const getRanks = usePlayerStore((state) => state.getRanks)
    const ranks = usePlayerStore((state) => state.ranks)
    const selectedGroupInRank = usePlayerStore((state) => state.selectedGroupInRank)
    const [page, setPage] = useState(1)
    const [averageMap, setAverageMap] = useState({})
    const [viewRanks, setViewRanks] = useState([])
    const defaultPlayerCover = useSettingStore((state) => state.activitySetting.default_player_cover.values)
    const voteNumUnitName = useSettingStore((state) => state.activitySetting.vote_num_unit_name.values)

    // 定制平均分
    useEffect(()=>{

        if(activityId == '6689ec7e752ff48cb2eac17f') {
            fetchAverageData().then(res=>{
                console.log('获取平均值成功', res)
                const list = res.data 
                const averageMap = {}
                list.map(item=> {
                    averageMap[item.player_id] = item.average
                })
                console.log(averageMap)
                setAverageMap(averageMap)
            })
        }

    }, [activityId])


    useEffect(() => {
        let newRanks
        if (selectedGroupInRank && selectedGroupInRank.id != 'all') {
            newRanks = ranks.filter(item => item.player.group_id == selectedGroupInRank.id)

        } else {
            newRanks = ranks
        }
        setViewRanks(newRanks.slice(0, 10 * page))
    }, [ranks, page, selectedGroupInRank])


    useEffect(() => {
        if (activityId) {
            getRanks(activityId)
        }
    }, [activityId])

    const hasMore = ranks.length > viewRanks.length

    const  handleLoadMore = async () => {
        if (hasMore) (
            setPage(page + 1)
        )
    }

    const handleClickPlayer = (id) => {
        navigate("/player?id=" + id)
    }


    return <div className='w-full pl-15px pr-15px pt-10px p-rank-box'>
        <div className=' bg-white w-full rounded-10px py-0.5rem px-0.4rem p-voteIntroPanel-block'>
            <div className='text-title text-primary text-center'>排行榜</div>
            <div className='mt-0.8rem rank-list relative'>
                {/* {viewRanks.length > 0 && <div className='special-rank-box'>
                    {viewRanks.slice(0, 3).map(item=>{
                        return <div className='pecial-rank_item pecial-rank-second'>
                        <div onClick={() => { handleClickPlayer(item.player.id) }} className='pecial-rank-img-wrap'><img src={getImageByCode(viewRanks[0].player.cover || defaultPlayerCover)} /></div>
                        <div className='pecial-rank-shiping shiping-2'></div>
                        <div className='pecial-rank-code'>{item.player.number}号</div>
                        <div className='pecial-rank-name'>{item.player.name}</div>
                        <div className='pecial-rank-poll'>{item.player.total_votes}{voteNumUnitName}</div>
                    </div>
                    })}
                </div>} */}
                {viewRanks && viewRanks.map((item, index) => {
                    const player = item.player
                    return <div
                        onClick={() => { handleClickPlayer(player.id) }}
                        key={item.player.id} className='mb-10px rank-list-item flex bg-rank_item py-10px px-10px rounded-10px items-center'>
                        <div className='w-0.5rem pl-5px'>
                            <div className='text-center rank-list-item-icon'>
                                {index > 2 ? index + 1 : ''}
                            </div>
                        </div>
                        {showPlayerCover &&
                            <img src={getImageByCode(player.cover || defaultPlayerCover, true)} className=' object-cover object-center ml-0.5rem rounded-0.6rem w-1.2rem h-1.2rem bg-gray-300'></img>
                        }
                        <div className='flex-1 h-1.2rem ml-0.3rem'>
                            <div className='flex p-rank-name-wrap'>
                                <div className='text-base text-color_dec p-rank-page-number'>{player.short_number || player.number}号</div>
                                <div className='text-ellipsis-1 text-common ml-5px relative bottom-1px text-left p-rank-page-name'>{player.name}</div>
                            </div>
                            {showPlayerDec && <div>
                                <div style={{textAlign: 'left'}} className='text-ellipsis-1 text-small text-color_dec p-rank-player-intro'>{player.introduction}</div>
                            </div>}
                        </div>
                        {activityId != '6689ec7e752ff48cb2eac17f' && <div className='text_color_type2 p-rank-page-poll'>
                            {player.total_votes}{voteNumUnitName}
                        </div>}
                        {activityId == '6689ec7e752ff48cb2eac17f' && <div className='text_color_type2 p-rank-page-poll_2'>
                            {player.total_votes}总分
                            <div className='avg_scroe'>
                                {averageMap[player.id]}平均分
                            </div>
                        </div>}
                    </div>
                })}
                <ScrollLoader loadMore={handleLoadMore} hasMore={hasMore} />
                {/* {hasMore && <div onClick={handleLoadMore} className='text-center w-full mt-1rem text-base '>加载更多</div> } */}
            </div>
        </div>
    </div>
}