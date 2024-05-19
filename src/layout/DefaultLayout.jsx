import React from 'react'
import './defaultLayout.less'
import { Outlet } from 'react-router';
import AuthorizationLayer from '../component/AuthorizationLayer';
import useSettingStore from '../store/settingStore'
import usePlayerStore from '../store/playerStore'
import SkeletonPage from '../component/SkeletonPage'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isWeChatClient } from "../utils/env"
import TabBar from "./TabBar"
import SwiperImage from '../component/SwiperImage';
import TechnicalSupport from '../component/VoteTechnicalSupport'
import Notice from './Notice'
import { getImageByCode } from '../utils/format';
import Flotage from '../component/Flotage'
import MusicPlayer from '../component/MusicPlayer'
import Initad from '../component/Initad'
import { useLocation } from 'react-router-dom';
import AuthCodeModal from '../component/AuthCodeModal'
import VoteResultModal from '../component/VoteResultModal'
import utils from '../utils/common';
import { fetchUserLogin } from '../api';

function UserLayout(props) {
  const getActivitySetting = useSettingStore((state) => state.getActivitySetting)
  const activitySetting = useSettingStore((state) => state.activitySetting)

  const showAuthCodeModal = usePlayerStore((state) => state.showAuthCodeModal)
  const setAuthCodeModal = usePlayerStore((state) => state.setAuthCodeModal)



  const topicBgPic = activitySetting.topic_bg_pic.values
  const activityId = useSettingStore((state) => state.activityId)
  const setDomain = useSettingStore((state) => state.setDomain)
  const openid = useSettingStore((state) => state.openid)
  const setWechatUser = useSettingStore((state) => state.setWechatUser)
  const setOpenid = useSettingStore((state) => state.setOpenid)
  const location = useLocation();

  let { domain } = useParams();
  if (!domain) {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
   
    if (parts.length >= 2) {
        const secondLevelDomain = parts[0];
        console.log('获取最后两个部分作为二级域名', secondLevelDomain)
        domain = secondLevelDomain;
    } else {
      console.log('如果域名部分不足两段，则直接返回原始域名')
        domain = 'o3nygq'
    }
  }

 

  const isMiddlePage = location.pathname.includes('middle')  // 是否是中转页
  const isWeChat = isWeChatClient()  // 是否是微信客户端

  useEffect(() => {
    setDomain(domain)
    getActivitySetting(domain)
  }, [domain])

  useEffect(() => {
    if (location.pathname != '/vote') {
      document.getElementById('page-main').scrollTop = 0
    }
  }, [location]);

  useEffect(() => {
    // 判断是否登录过期
    if (!isMiddlePage && isWeChat && openid) {
      setTimeout(()=> {
        fetchUserLogin(openid).then((res) => {
          console.log('判断是否登录过期', res)
          if (res.code == -1 && res.msg == '未授权登陆') {
            setWechatUser(null)
            setOpenid('')
            utils.setObCache('wechatUser', {})
          }
        })
      }, 1000)
    }
  }, [openid]);

  const showSkeletonPage = isWeChat ? (!openid || !activityId) : !activityId
  const showAuthorizationLayer = isWeChat && !isMiddlePage && !openid

  return (

    <div style={{ backgroundImage: `url(${getImageByCode(topicBgPic)})` }} className=' overflow-hidden bg-page defaultLayout w-full h-full relative'>
      {showAuthCodeModal && <AuthCodeModal></AuthCodeModal>}
      <VoteResultModal></VoteResultModal>
      <Notice></Notice>
      <Flotage></Flotage>
      <MusicPlayer></MusicPlayer>
      <Initad></Initad>
      <div id="page-main" className={`page w-full h-full flex flex-col ${showAuthorizationLayer ? 'overflow-hidden' : 'overflow-y-auto'} `}>
        <SwiperImage></SwiperImage>
        <div className='page-main flex-1'>
          {props.children}
          {location.pathname != '/apply' && <TechnicalSupport />}
        </div>
      </div>
      {showSkeletonPage && <SkeletonPage></SkeletonPage>}
      {showAuthorizationLayer && <AuthorizationLayer></AuthorizationLayer>}
      <TabBar></TabBar>
    </div>
  );
}

export default UserLayout;
