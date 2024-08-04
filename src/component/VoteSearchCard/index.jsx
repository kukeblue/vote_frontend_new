import React from 'react'
import './index.less'
import { Input } from 'antd-mobile'
import usePlayerStore from "../../store/playerStore"
import useSettingStore from "../../store/settingStore"
import { useNavigate, useLocation } from "react-router-dom";


import {
    CloseCircleOutlined,
  } from '@ant-design/icons';
import { CustomTexts } from '../../config/appConfig'

export default function VoteSearchCard({
    showRankingButton = true
}) {

    const searchTxt = usePlayerStore((state) => state.searchTxt)
    const setSearchTxt = usePlayerStore((state) => state.setSearchTxt)
    const getPlayers = usePlayerStore((state) => state.getPlayers)
    const activityId = useSettingStore((state) => state.activityId)
    const voteItemSortType = useSettingStore((state) => state.activitySetting.vote_item_sort_type.values)
    const voteItemShowName = useSettingStore((state) => state.activitySetting.vote_item_show_name.values)
    const CustomTextMap= CustomTexts.VoteSearchCard[activityId] || CustomTexts.VoteSearchCard.default
    const navigate = useNavigate();

    const handleChangeSearch = (v) => {
        setSearchTxt(v)
    }


    const handleDoSearch = () => {
        getPlayers(activityId, 1, undefined, voteItemSortType)
    }

    return <div className='w-full pl-15px pr-15px pt-10px p-VoteSearchCard'>
        <div className=' bg-white w-full rounded-10px px-15px py-15px'>
            <div className='flex p-VoteSearchCard-search-block'>
                <div className='px-15px py-20px rounded-10px flex-1 h-45px bg-input flex items-center'>
                   <span className='text-icon text-color_input_placeholder iconfont iconsearch relative text-xs'></span>&nbsp;
                   <Input value={searchTxt} clearable={true} onClear={()=>{handleChangeSearch('')}} onChange={(v)=>{handleChangeSearch(v)}}  placeholder={`请输入${voteItemShowName}名称或${CustomTextMap["编号"]}`}></Input>
                   {/* {searchTxt && <CloseCircleOutlined 
                   onClick={()=>{
                     setSearchTxt()
                   }}
                   className="text-color_input_placeholder"/>} */}
                </div>
                <div onClick={()=>{
                    handleDoSearch()
                }} className=' text-white flex items-center justify-center rounded-10px w-2rem h-45px bg-primary ml-0.3rem p-search-button'>
                    搜索
                </div>
            </div>
            { showRankingButton && <div onClick={()=>{
                navigate('/rank')
            }} className='text-white text-center mt-10px bg-primary py-10px px-15px rounded-10px p-rank-button'>查看排行榜</div> }
        </div>
    </div>
}