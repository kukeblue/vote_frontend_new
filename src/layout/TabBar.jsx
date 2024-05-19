import React from 'react'
import './TabBar.less'
import { Grid, Modal } from 'antd-mobile'
import { Input } from 'antd-mobile'
import { useNavigate, useLocation } from "react-router-dom";
import usePlayerStore from "../store/playerStore"
import useSettingStore from "../store/settingStore"

import {
    CloseCircleOutlined,
} from '@ant-design/icons';
const pageData = ["intro", "vote", "rank", "apply"]


export default function TabBar() {
    const searchTxt = usePlayerStore((state) => state.searchTxt)
    const setSearchTxt = usePlayerStore((state) => state.setSearchTxt)
    const getPlayers = usePlayerStore((state) => state.getPlayers)
    const activityId = useSettingStore((state) => state.activityId)


    const navigate = useNavigate();
    const href = location.href
    const pageType = pageData.find(item => {
        return href.includes(item)
    })

    const handleChangeTab = (v) => {
        navigate(v)
        // var divElement = document.getElementsByClassName("page")[0];
        // divElement.scrollTop = 0
    }

    const handleChangeSearch = (v) => {
        setSearchTxt(v)
    }

    const handleDoSearch = (v) => {
        navigate('/vote')
        getPlayers(activityId, 1)
        Modal.clear()

    }

    const handleClickSearch = () => {
        Modal.show({
            closeOnMaskClick: true,
            content: (
                <div className='flex flex-col items-center'>
                    <div className='text-center text-title text-primary'>搜索</div>
                    <div className='mt-0.5rem px-15px  rounded-10px w-6.2rem h-48px bg-input flex items-center'>
                        <span className='text-icon text-color_input_placeholder iconfont iconsearch relative text-xs'></span>&nbsp;
                        <Input defaultValue={searchTxt} onChange={(v) => { handleChangeSearch(v) }} placeholder="请输入选手名称"></Input>
                        {/* {searchTxt && <CloseCircleOutlined
                            onClick={() => {
                                setSearchTxt('')
                            }}
                            className="text-color_input_placeholder" />} */}
                    </div>
                    <div onClick={() => handleDoSearch()} className='mt-0.7rem rounded-5px text-white text-base bg-primary w-3/5 h-0.9rem flex items-center justify-center text-center'>搜索</div>
                </div>
            ),
        })
    }

    return <div className='pt-10px w-full h-1.8rem bg-white tab-bar absolute bottom-0 left-0 px-0.2rem'>
        <Grid columns={5} gap={8}>
            <Grid.Item className='flex flex-col items-center'>
                <div onClick={() => handleChangeTab('/intro')} className={`text-primary text-icon_tab leading-icon_tab iconfont iconactivity${pageType == 'intro' ? '_fill' : ''}`}></div>
                <div onClick={() => handleChangeTab('/intro')} className='text-base text-primary'>介绍</div>
            </Grid.Item>
            <Grid.Item className='flex flex-col items-center'>
                <div onClick={() => handleChangeTab('/vote')}
                    className={`text-primary text-icon_tab leading-icon_tab iconfont iconaddressbook${pageType == 'vote' ? '_fill' : ''}`}></div>
                <div onClick={() => handleChangeTab('/vote')} className='text-base text-primary'>投票</div>
            </Grid.Item>
            <Grid.Item className='flex flex-col items-center'>
                <div onClick={() => handleChangeTab('/rank')} className={`text-primary text-icon_tab leading-icon_tab iconfont iconranking${pageType == 'rank' ? '_fill' : ''}`}></div>
                <div onClick={() => handleChangeTab('/rank')} className='text-base text-primary'>排行</div>
            </Grid.Item>
            <Grid.Item className='flex flex-col items-center'>
                <div onClick={() => handleChangeTab('/apply')} className={`text-primary text-icon_tab leading-icon_tab iconfont iconvote${pageType == 'apply' ? '_fill' : ''}`}></div>
                <div onClick={() => handleChangeTab('/apply')} className='text-base text-primary'>报名</div>
            </Grid.Item>
            <Grid.Item className='flex flex-col items-center'>
                <div onClick={handleClickSearch} className='text-primary text-icon_tab leading-icon_tab iconfont iconsearch'></div>
                <div onClick={handleClickSearch} className='text-base text-primary'>搜索</div>
            </Grid.Item>
        </Grid>
    </div>
}