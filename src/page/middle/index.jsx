import React, { useState } from 'react'
import './index.less'
import { fetchWeChatSahreData, fetchWechatUser } from '../../api/index'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSettingStore from '../../store/settingStore'
import utils from '../../utils/common';
import { Toast } from 'antd-mobile'
import { setObCache } from '../../utils/cache';

let loadingToast = null
export default ()=>{

  const navigate = useNavigate();
  const activityId = useSettingStore((state) => state.activityId)
  const setWechatUser = useSettingStore((state) => state.setWechatUser)
  const setOpenid = useSettingStore((state) => state.setOpenid)
  const shareActivityTitle = useSettingStore((state) => state.activitySetting.share_activity_title.values)
  const shareContents = useSettingStore((state) => state.activitySetting.share_contents.values)
  const shareImage = useSettingStore((state) => state.activitySetting.share_image.values)
  const activityTitle = useSettingStore((state) => state.activityTitle)

  let [searchParams] = useSearchParams();
  let code = searchParams.get('code')
  let state = searchParams.get('state')
  if(!state) {
    state = '/vote'
  }

  const checkFirstRegister = () => {
    setTimeout(()=>{
      if(utils.firstRegister == true) {
        utils.register(window.wx, undefined, {
          title:shareActivityTitle || activityTitle,
          desc: shareContents || "",
          link: "https://"+location.host + decodeURIComponent(state),
          imgUrl: shareImage || "https://upload.cyuandao.com/2024070710214743703.png",
        })
        loadingToast.close()
        navigate(decodeURIComponent(state), {replace: true})
      }else{
        checkFirstRegister()
      }
    }, 500)
  }

  useEffect(()=>{
    if(code && activityId) {
      fetchWechatUser(code, activityId).then(res=>{
        if(res.code == 0) {
          setObCache('wechatUser', res.data)
          setWechatUser(res.data)
          setOpenid(res.data.openid)
          fetchWeChatSahreData().then(res => {
            const body = {
              title:shareActivityTitle || activityTitle,
              desc: shareContents || "",
              link: window.location.href,
              imgUrl: shareImage || "https://upload.cyuandao.com/2024070710214743703.png",
            }
            utils.register(window.wx, res.data, body)
            loadingToast = Toast.show({
              icon: 'loading',
              content: '加载中…',
              duration: 3000
            })
            checkFirstRegister()
          })
        }
      })
    }
  }, [code, activityId, activityTitle])

  return <div className='middle-page'>
  </div>
}

