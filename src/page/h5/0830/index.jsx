import React, { useEffect, useState } from 'react'
import './index.less'
import { fetchWeChatSahreData } from '../../../api/index'
import utils from '../../../utils/common'
import {data} from './config'
import { useSearchParams } from 'react-router-dom'

export default function H5_0830() {

  
	const [params] = useSearchParams()
  const index = params.get("index") || 0

  const item = data[index]

  useEffect(()=>{
    fetchWeChatSahreData().then(res => {
        const body = {
            title: item.title,
            desc: "欢迎大家观临",
            link: window.location.href,
            imgUrl: item.img,
        }
        utils.register(window.wx, res.data, body)
      })
  }, [])


  return <div className='xinjiang h5-page'>
    <div className='xj-logo'></div>
    <div className='xj-title'>
      {item.title}
    </div>
    <div dangerouslySetInnerHTML={{__html: item.video}} className='xj-shiping'>

    </div>
    <div className='flex justify-center'>
      <div className='xj-content-title'>
          {item.title}介绍
      </div>
    </div>
    
    <div className='xj-text'>
      {item.text}
    </div>
    <div className='xj-adress'>
        <div>餐饮地址: {item.adress}</div>
        <div>订餐热线: {item.phone}</div>
    </div>
    <div className='xj-caipin'>
      <div className='xj-caipin-title'></div>
      <div className='xj-caipin-pics'>
        {
          item.pics && item.pics.map((i, index)=>{
            return <div key={index} className='xj-pic-item'> <img  src={i}/></div>
          })
        }
      </div>
      <div className='xj-caipin-list'>
          {item.productList.map((str, index)=>{
            return <div key={index} className='xj-caipin-item'>
            <div className='xj-dot'></div>
            <div className='xj-caipin-item-label'>{str}</div>
          </div>
          })}
      </div>
    </div>

    <div className='xj-shipinfa'>\
      <div className='xj-shipinfa-text'>
        <div className='xj-shipinfa-text_1'>中华人民共和国食品安全法</div>
        <div  className='xj-shipinfa-text_1'>（主席令第二十一号）</div>
      </div>
      <div className='xj-shipinfa-button' onClick={()=>{
        location.href = "https://www.gov.cn/zhengce/2015-04/25/content_2853643.htm"
      }}>
            点击查看原文
      </div>
    </div>
  </div>
}