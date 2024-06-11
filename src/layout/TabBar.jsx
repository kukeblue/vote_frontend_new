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

const tabIconMap = {
    introduce: "iconactivity",
    poll: "iconaddressbook",
    rank: "iconranking",
    enroll: "iconvote"
}

const tabIconNameMap = {
    introduce: "intro",
    poll: "vote",
    rank: "rank",
    enroll: "apply",
}

export default function TabBar() {
    const searchTxt = usePlayerStore((state) => state.searchTxt)
    const setSearchTxt = usePlayerStore((state) => state.setSearchTxt)
    const getPlayers = usePlayerStore((state) => state.getPlayers)
    const activityId = useSettingStore((state) => state.activityId)
    const topicMenu = useSettingStore((state) => state.activitySetting.topic_menu.values)

    const tabs = topicMenu.filter(item => item.checked)
    const navigate = useNavigate();
    const href = location.href
    let pageType = ''
    let pathType = ''

    pageData.forEach(item => {
        const path = href.includes(item)
        if (path) {
            pathType = item
        }
        if (path && item == 'intro') {
            pageType = 'introduce'
        } else if (path && item == 'vote') {
            pageType = 'poll'
        } else if (path && item == 'rank') {
            pageType = 'rank'
        } else if (path && item == 'apply') {
            pageType = 'enroll'
        }
    })


    const handleChangeTab = (v) => {

        navigate("/" + v)
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
    
    const handleClickCustom = (item) => {
        if(item.link) {
            location.href = item.link
        }
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
                                setSearchTxt()
                            }}
                            className="text-color_input_placeholder" />} */}
                    </div>
                    <div onClick={() => handleDoSearch()} className='mt-0.7rem rounded-5px text-white text-base bg-primary w-3/5 h-0.9rem flex items-center justify-center text-center'>搜索</div>
                </div>
            ),
        })
    }

    return <div className='pt-10px w-full h-1.8rem bg-white tab-bar absolute bottom-0 left-0 px-0.2rem'>
        <Grid columns={tabs.length} gap={8}>
            {
                tabs.map(item => {

                    if (item.code == 'search') {
                        return <Grid.Item key={item.code} className='flex flex-col items-center'>
                            <div onClick={handleClickSearch} className='text-primary text-icon_tab leading-icon_tab iconfont iconsearch'></div>
                            <div onClick={handleClickSearch} className='text-base text-primary'>搜索</div>
                        </Grid.Item>
                    }
                    if (item.code == 'custom') {
                        return <Grid.Item className='flex flex-col items-center'>
                            <div onClick={()=>handleClickCustom(item)} className='text-primary text-icon_tab leading-icon_tab iconfont iconweixin'></div>
                            <div onClick={()=>handleClickCustom(item)} className='text-base text-primary'>{item.name}</div>
                        </Grid.Item>
                    }

                    return <Grid.Item key={item.code} className='flex flex-col items-center'>
                        <div
                            onClick={() => handleChangeTab(tabIconNameMap[item.code])}
                            className={`text-primary text-icon_tab leading-icon_tab iconfont ${tabIconMap[item.code]}${pageType == item.code ? '_fill' : ''}`}></div>
                        <div onClick={() => handleChangeTab(tabIconNameMap[item.code])} className='text-base text-primary'>{item.name}</div>
                    </Grid.Item>
                })
            }


        </Grid>
    </div>
}