import React from 'react'
import './index.less'
import { Input } from 'antd-mobile'
import usePlayerStore from "../../store/playerStore"
import useSettingStore from "../../store/settingStore"
import { useNavigate, useLocation } from "react-router-dom";


import {
    CloseCircleOutlined,
  } from '@ant-design/icons';

export default function VoteSearchCard({
    showRankingButton = true
}) {

    const searchTxt = usePlayerStore((state) => state.searchTxt)
    const setSearchTxt = usePlayerStore((state) => state.setSearchTxt)
    const getPlayers = usePlayerStore((state) => state.getPlayers)
    const activityId = useSettingStore((state) => state.activityId)
    const navigate = useNavigate();

    const handleChangeSearch = (v) => {
        setSearchTxt(v)
    }

    const handleDoSearch = () => {
        getPlayers(activityId, 1)
    }

    return <div className='w-full pl-15px pr-15px pt-10px'>
        <div className=' bg-white w-full rounded-10px px-15px py-15px'>
            <div className='flex'>
                <div className='px-15px py-20px rounded-10px w-6.2rem h-45px bg-input flex items-center'>
                   <span className='text-icon text-color_input_placeholder iconfont iconsearch relative text-xs'></span>&nbsp;
                   <Input allowClear onChange={(v)=>{handleChangeSearch(v)}} value={searchTxt} placeholder="请输入选手名称"></Input>
                   
                   {searchTxt && <CloseCircleOutlined 
                   onClick={()=>{
                     setSearchTxt('')
                   }}
                   className="text-color_input_placeholder"/>}
                </div>
                <div onClick={()=>{
                    handleDoSearch()
                }} className='text-white flex items-center justify-center rounded-10px w-2rem h-45px bg-primary ml-0.3rem'>
                    搜索
                </div>
            </div>
            { showRankingButton && <div onClick={()=>{
                navigate('/rank')
            }} className=' text-white text-center mt-10px bg-primary py-10px px-15px rounded-10px'>查看排行榜</div> }
        </div>
    </div>
}