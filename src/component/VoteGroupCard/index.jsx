import React, { useEffect } from 'react'
import './index.less'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'


import { Grid } from 'antd-mobile'


export default function VoteGroupCard({
    selectedGroup,
    onChangeGroup,
    showGroup = true,
    showAll= true,
}) {
    const groups = usePlayerStore((state) => state.groups)
    // console.log('【VoteGroupCard】', groups)
    const activityId = useSettingStore((state) => state.activityId)
    const voteItemGroupColumn = useSettingStore((state) => state.activitySetting.vote_item_group_column.values)

    const setSelectedGroup = usePlayerStore((state) => state.setSelectedGroup)
    const getPlayers = usePlayerStore((state) => state.getPlayers)

    useEffect(()=>{
        if(!showAll && groups.length > 1) {
            handleChangeGroup(groups[1])
        } 
    }, [showAll, groups ])

    const handleChangeGroup = (item)=>{
        // console.log('change group')
        onChangeGroup && onChangeGroup(item)
        // console.log(item)
        setSelectedGroup(item)
        if(item.id != 'all') {
            getPlayers(activityId, 1, item.id)
        }
    }

    return showGroup && <div className='w-full pl-15px pr-15px pt-10px'>
        <div className=' bg-white w-full rounded-10px px-15px py-15px '>
            <Grid columns={voteItemGroupColumn} gap={8}>
            {
                groups && groups.map(item=>{
                    if(!showAll && item.id == 'all') {
                        return
                    }
                    return item && <Grid.Item onClick={()=>handleChangeGroup(item)} key={item.id}  className='w-full'>
                    <div key={item.id} 
                        className={`${selectedGroup && (item.id == selectedGroup.id) ? 'bg-primary text-white' : 'text-primary'}  border border-primary mx-5px text-center text-base px-15px py-5px rounded-15px `}>
                        {
                        item.name
                    }</div></Grid.Item>
                })
            }
            {/* <div className='mx-5px text-base border border-primary text-primary  px-15px py-5px rounded-15px'>默认分组</div> */}
            </Grid>
        </div>
    </div>
}