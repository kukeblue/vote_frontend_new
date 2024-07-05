import React, { useState } from 'react'
import './index.less'
import { Grid, InfiniteScroll } from 'antd-mobile'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'
import CheckWechat from '../../component/CheckWechat'
import Masonry from 'react-masonry-css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

let globalLoadding = false

export default function VotePlayerList({
    showVoteItemCover = true,
    showVoteItemIntro = true,
    showVoteItemName = true,
    showVoteButton = true,
    showVoteItemNo = true,
    showVoteNum = true
}) {
    const navigate = useNavigate();
    const isleftRightStruct = false
    const getPlayers = usePlayerStore((state) => state.getPlayers)
    const doVoteHandle = usePlayerStore((state) => state.doVoteHandle)
    const selectedPlayers = usePlayerStore((state) => state.selectedPlayers)




    const players = usePlayerStore((state) => state.players)
    const activityId = useSettingStore((state) => state.activityId)
    const vote_type = useSettingStore((state) => state.activitySetting.vote_type.values)

    const style = useSettingStore((state) => state.style)
    const loading = usePlayerStore((state) => state.loading)
    const total = usePlayerStore((state) => state.total)
    const page = usePlayerStore((state) => state.page)


    const defaultPlayerCover = useSettingStore((state) => state.activitySetting.default_player_cover.values)
    const colCount = useSettingStore((state) => state.activitySetting.vote_item_column_type.values)
    const voteItemArrayType = useSettingStore((state) => state.activitySetting.vote_item_array_type.values)
    const voteNumUnitName = useSettingStore((state) => state.activitySetting.vote_num_unit_name.values)
    const buttonName = useSettingStore((state) => state.activitySetting.button_name.values)

    
    const [styleLoading, setStyleLoading] = useState(true)

    useEffect(() => {
        if (activityId) {
            getPlayers(activityId, 1)
        }
    }, [activityId])

    useEffect(() => {

        if (players.length == 0) return
    }, [players])

    const loadMore = async () => {
        if (!globalLoadding && (!loading || (total > players.length))) {

            globalLoadding = true
            await getPlayers(activityId, page + 1)
            globalLoadding = false
        }
    }

    const handleClickVote = (item) => {
        let isSingleVote;
        if (vote_type == 1) {
            isSingleVote = true
        } else {
            isSingleVote = false
        }
        doVoteHandle({ activityId, player: item, isSingleVote })
    }

    const handleClickPlayer = (id) => {
        navigate("/player?id=" + id)
    }

    const checkIsSelectedPlayer = (id) => {
        const index = selectedPlayers.findIndex(item => item.id === id);
        if (index === -1) {
            return false
        }
        return true
    }

    const renderItem = (item) => {
        const isSelectedPlayer = checkIsSelectedPlayer(item.id)
        item.video = item.video.replace(/(height=\d+\s+|width=\d+\s+)/g, );
        return <div className={`${isleftRightStruct ? "flex" : ""} w-full h-full bg-white rounded-10px  relative p-votePlayerList-item-block`}>
            {showVoteItemNo && <div className=' text-white rounded-tl-8px rounded-br-8px bg-masking px-5px min-w-1rem text-center py-2px text-base absolute left-0 top-0 p-number-block'>{item.number}号</div>}
            {showVoteItemCover && style == 3 && item.video &&
                <div
                    style={{ height: `${(voteItemArrayType == 1) ? `${7 / colCount}rem` : "auto"}` }}
                    className={`player-list-video ${isleftRightStruct ? 'w-1/2 rounded-tl-10px rounded-bl-10px' : 'w-full rounded-t-10px'} `}
                    dangerouslySetInnerHTML={{ __html: item.video }}>

                </div>
            }
            {showVoteItemCover && style == 2 &&
                <img
                    style={{ height: `${voteItemArrayType == 1 ? `${10 / colCount}rem` : "auto"}` }}
                    onClick={() => handleClickPlayer(item.id)}
                    className={`${isleftRightStruct ? 'w-1/2 rounded-tl-10px rounded-bl-10px' : 'w-full rounded-t-10px'} `}
                    src={getImageByCode(item.cover || defaultPlayerCover)}>
                </img>}
            <div className={`${isleftRightStruct ? 'w-1/2' : 'w-full'} mt-0.3rem pt-0.2rem pb-0.5rem flex flex-col items-center justify-center`}>
                {showVoteNum && <div className='text-center p-votePlayerList-poll-block'>{item.total_votes}&nbsp;{voteNumUnitName}</div>}
                {showVoteItemName && <div onClick={() => handleClickPlayer(item.id)} className='text-common mt-0.3rem text-center p-votePlayerList-name'>{item.name}</div>}
                {showVoteItemIntro && <div onClick={() => handleClickPlayer(item.id)} className='text-color_dec text-base mt-0.2rem text-center'>{item.introduction}</div>}
                {showVoteButton && <div className='mt-0.25rem flex justify-center w-full'>
                    <div className={`${isSelectedPlayer ? 'bg-gray text-white' : 'text-white bg-primary'} rounded-5px  text-base  w-3/5 h-0.9rem flex items-center justify-center text-center p-votePlayerList-button`}>
                        <CheckWechat onClick={handleClickVote} parameters={[item]}> {isSelectedPlayer ? '已选择' : buttonName} </CheckWechat>
                    </div>
                </div>}
            </div>
        </div >
    }


    return <div className='w-full pl-10px pr-10px pt-12px'>
        <div className='w-full rounded-10px px-5px'>
            {voteItemArrayType == 1 ? <Grid columns={colCount} gap={8}>
                {players.map(item => <Grid.Item key={item.id}>
                    {renderItem(item)}
                </Grid.Item>)}</Grid> :
                <Masonry
                breakpointCols={colCount}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                    {
                        players.map(item => <div key={item.id}>
                            {renderItem(item)}
                        </div>)
                    }
                </Masonry>
            }
            <InfiniteScroll loadMore={loadMore} hasMore={total > players.length} />
        </div>
    </div>
}