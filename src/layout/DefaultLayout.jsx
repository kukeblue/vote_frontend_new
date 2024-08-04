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
import { addActivityVisits, fetchUserLogin, fetchWeChatSahreData } from '../api';
import MultiVoteFloatPanel from '../component/MultiVoteFloatPanel';
import HomeButton from '../component/Home';
import ScrollToTopButton from '../component/ScrollToTopButton';
import { setObCache } from '../utils/cache';

function UserLayout(props) {
  const getActivitySetting = useSettingStore((state) => state.getActivitySetting)
  const activitySetting = useSettingStore((state) => state.activitySetting)
  const showAuthCodeModal = usePlayerStore((state) => state.showAuthCodeModal)
  const showMultiVoteFloatPanel = usePlayerStore((state) => state.showMultiVoteFloatPanel)

  const topicBgPic = activitySetting.topic_bg_pic.values
  const activityId = useSettingStore((state) => state.activityId)
  const activityTitle = useSettingStore((state) => state.activityTitle)
  const setDomain = useSettingStore((state) => state.setDomain)
  const openid = useSettingStore((state) => state.openid)
  const setWechatUser = useSettingStore((state) => state.setWechatUser)
  const setOpenid = useSettingStore((state) => state.setOpenid)
  const location = useLocation();

  const shareActivityTitle = useSettingStore((state) => state.activitySetting.share_activity_title.values)
  const shareContents = useSettingStore((state) => state.activitySetting.share_contents.values)
  const shareImage = useSettingStore((state) => state.activitySetting.share_image.values)
  // const shareItemTitle = useSettingStore((state) => state.activitySetting.share_item_title.values)


  let { domain } = useParams();
  if (!domain) {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length >= 2) {
      const secondLevelDomain = parts[0];

      domain = secondLevelDomain
    } else {
      // domain = 'brkexq'https://newnvp.fvwboxx.cn/vote
      // foaa1t.fvwboxx.cnhttps://.fvwboxx.cn/vote
      //https://newnvp.fvwboxx.cn/vote
      domain = 'bhlep4'
    }
  }



  const isMiddlePage = location.pathname.includes('middle')  // 是否是中转页
  const isWeChat = isWeChatClient()  // 是否是微信客户端

  useEffect(() => {
    getActivitySetting(domain)
  }, [domain])


  useEffect(() => {
    if (activityId) {
      addActivityVisits(activityId)
    }
  }, [activityId])



  useEffect(() => {
    if (location.pathname != '/vote') {
      document.getElementById('page-main').scrollTop = 0
    }
  }, [location]);

  useEffect(() => {
    // 判断是否登录过期
    if (!isMiddlePage && isWeChat && openid && shareActivityTitle) {
        fetchUserLogin(openid).then((res) => {
          if (res.code == -1 && res.msg == '未授权登陆') {
            setWechatUser(null)
            setOpenid()
            setObCache('wechatUser', {})
          }
          if (res.code == 0) {
              fetchWeChatSahreData().then(res => {
                const body = {
                  title:shareActivityTitle || activityTitle,
                  desc: shareContents || "",
                  link: window.location.href,
                  imgUrl: shareImage || "https://upload.cyuandao.com/2024070710214743703.png",
                }
                utils.register(window.wx, res.data, body)
              })
          }
        })
    }
  }, [openid, shareActivityTitle]);


  const showSkeletonPage =  !activityId
  const showAuthorizationLayer = isWeChat && !isMiddlePage && !openid

  return (

    <div style={{ backgroundImage: `url(${getImageByCode(topicBgPic)})` }} className='bg-size-[100%_100%] overflow-hidden bg-page defaultLayout w-full h-full relative'>
      {showAuthCodeModal && <AuthCodeModal></AuthCodeModal>}
      <VoteResultModal></VoteResultModal>
      {location.pathname != '/voting' && <HomeButton></HomeButton>}
      <Notice></Notice>
      <Flotage></Flotage>
      <MusicPlayer></MusicPlayer>
      <Initad></Initad>
      {location.pathname != '/voting' && showMultiVoteFloatPanel && <MultiVoteFloatPanel></MultiVoteFloatPanel>}
      <div id="page-main" className={`page w-full h-full flex flex-col ${showAuthorizationLayer ? 'overflow-hidden' : 'overflow-y-auto'} `}>
        {location.pathname != '/voting' && location.pathname != '/report' &&  location.pathname != '/article'
        && <SwiperImage></SwiperImage>}
        <div className='page-main flex-1'>
          <Outlet />

          {location.pathname != '/apply' && <TechnicalSupport />}
        </div>
        <ScrollToTopButton></ScrollToTopButton>
      </div>
      <SkeletonPage visible={showSkeletonPage}></SkeletonPage>
      {showAuthorizationLayer && <AuthorizationLayer></AuthorizationLayer>}
      <TabBar></TabBar>

    </div>
  );
}

export default UserLayout;
