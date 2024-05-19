import React, { useState } from 'react'
import './index.less'
import { fetchWechatUser } from '../../api/index'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSettingStore from '../../store/settingStore'
import {setObCache} from '../../utils/cache'



export default ()=>{

  const navigate = useNavigate();
  const activityId = useSettingStore((state) => state.activityId)
  const setWechatUser = useSettingStore((state) => state.setWechatUser)
  const setOpenid = useSettingStore((state) => state.setOpenid)


  let [searchParams] = useSearchParams();
  let code = searchParams.get('code')

  useEffect(()=>{
    // console.log('useEffect', code, activityId)
    if(code && activityId) {
      // console.log('获取微信用户信息')
      fetchWechatUser(code, activityId).then(res=>{
        if(res.code == 0) {
          setObCache('wechatUser', res.data)
          setWechatUser(res.data)
          setOpenid(res.data.openid)
          navigate("/vote", {replace: true})
        }
        // console.log(res)
      })
    }
  }, [code, activityId])

  return <div className='middle-page'>
  </div>
}

