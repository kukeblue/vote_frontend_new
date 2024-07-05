import React, { useEffect, useState } from 'react'
import './index.less'
import { Button, Input, Radio, TextArea, Dialog} from 'antd-mobile'

export default function Report() {


  const [article, setArticle] = useState({})

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const contentValue = queryParams.get('content');
    const article = JSON.parse(contentValue)
    setArticle(article)
    console.log(article)
  }, []);


  useEffect(()=>{
    var pageMain = document.getElementById('page-main');
    pageMain.style.overflow = 'hidden';
    return ()=>{
      pageMain.style.overflow = 'auto';
    }
  }, [])


  return <div className='overflow-hidden article-page w-full'>
    <div className='mb-0.4rem w-full text-center text-lg'>{article.title}</div>
    <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
  </div>
}