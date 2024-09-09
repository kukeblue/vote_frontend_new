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
import { CustomTexts } from '../config/appConfig';
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

const tabIconImageMap = {
    introduce: "activity",
    poll: "vote",
    rank: "ranking",
    enroll: "apply",
}

export default function TabBar() {
    const searchTxt = usePlayerStore((state) => state.searchTxt)
    const setSearchTxt = usePlayerStore((state) => state.setSearchTxt)
    const getPlayers = usePlayerStore((state) => state.getPlayers)
    const activityId = useSettingStore((state) => state.activityId)
    const topicMenu = useSettingStore((state) => state.activitySetting.topic_menu.values)
    const voteItemSortType = useSettingStore((state) => state.activitySetting.vote_item_sort_type.values)
    const voteItemShowName = useSettingStore((state) => state.activitySetting.vote_item_show_name.values)
    const tempId = useSettingStore((state) => state.tempId)
    const tabs = topicMenu.filter(item => item.checked)
    const navigate = useNavigate();
    const href = location.href
    let pageType = ''
    let pathType = ''
    // 
    // let tempId = 'kejijinrong'
    console.log('tempId', tempId)
    const showTabImage = (tempId == 'default')? false : true
    const CustomTextMap= CustomTexts.VoteSearchCard[activityId] || CustomTexts.VoteSearchCard.default

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
        getPlayers(activityId, 1, undefined, voteItemSortType)
        Modal.clear()

    }

    const handleClickCustom = (item) => {
        if (item.link) {
            location.href = item.link
        }
    }

    const handleClickSearch = () => {
        Modal.show({
            closeOnMaskClick: true,
            content: (
                <div className='flex flex-col items-center'>
                    <div className='text-center text-title text-primary p-search-button_v1'>搜索</div>
                    <div className='mt-0.5rem px-15px  rounded-10px w-6.2rem h-48px bg-input flex items-center'>
                        <span className='text-icon text-color_input_placeholder iconfont iconsearch relative text-xs'></span>&nbsp;
                        <Input defaultValue={searchTxt} onChange={(v) => { handleChangeSearch(v) }} placeholder={`请输入${voteItemShowName}名称或${CustomTextMap["编号"]}`}></Input>
                        {/* {searchTxt && <CloseCircleOutlined
                            onClick={() => {
                                setSearchTxt()
                            }}
                            className="text-color_input_placeholder" />} */}
                    </div>
                    <div onClick={() => handleDoSearch()} className='mt-0.7rem rounded-5px text-white text-base bg-primary w-3/5 h-0.9rem flex items-center justify-center text-center p-search-modal-button'>搜索</div>
                </div>
            ),
        })
    }
    const sortedArray = [...tabs].sort((a, b) => a.sort - b.sort);
    console.log(sortedArray)
    return <div className='pt-10px w-full h-1.8rem bg-white tab-bar absolute bottom-0 left-0 px-0.2rem p-tabBar'>
        <Grid columns={tabs.length} gap={8}>
            {
                sortedArray.map(item => {

                    if (item.code == 'search') {
                        return <Grid.Item key={item.code} onClick={()=>handleClickSearch()} className='tab-item flex flex-col items-center'>
                            {showTabImage &&<img  className='w-0.7rem' src={`/images/tabIcon/${tempId}/search.png`}/>}
                            {!showTabImage && <div className='text-primary text-icon_tab leading-icon_tab iconfont iconsearch'></div>}
                            
                            <div className='text-base text-primary'>搜索</div>
                        </Grid.Item>
                    }
                    if (item.code == 'custom') {
                        return <Grid.Item key={item.code} className='flex flex-col items-center'>
                            <div onClick={() => handleClickCustom(item)} className='text-primary text-icon_tab leading-icon_tab iconfont iconweixin'></div>
                            <div onClick={() => handleClickCustom(item)} className='text-base text-primary'>{item.name}</div>
                        </Grid.Item>
                    }

                    return <Grid.Item key={item.code} className={`tab-item${pageType == item.code ? '_fill' : ''} flex flex-col items-center`}>
                        {showTabImage && <img 
                        onClick={() => handleChangeTab(tabIconNameMap[item.code])}
                        className='w-0.7rem' src={pageType == item.code ? `/images/tabIcon/${tempId}/${tabIconImageMap[item.code]}_fill.png`: `/images/tabIcon/${tempId}/${tabIconImageMap[item.code]}.png`}/>}
                        {!showTabImage && <div
                            onClick={() => handleChangeTab(tabIconNameMap[item.code])}
                            className={`text-primary text-icon_tab leading-icon_tab iconfont ${tabIconMap[item.code]}${pageType == item.code ? '_fill' : ''}`}
                        ></div>}
                        <div onClick={() => handleChangeTab(tabIconNameMap[item.code])} className={`text-center text-base text-primary ${pageType == item.code ? 'tab-text_fill' : ''}`}>{item.name}</div>
                    </Grid.Item>
                })
            }
        </Grid>
    </div>
}