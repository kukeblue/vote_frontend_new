import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import DefaultLayout from './layout/DefaultLayout'
import Vote from './page/vote';
import Intro from './page/intro';
import Rank from './page/rank';
import Player from './page/player';
import Apply from './page/apply';
import Voting from './page/voting';
import Report from './page/report';
import Article from './page/article'


import ActivityList from './page/activityList';
import ActivityList_20240803 from './page/activitylist/activitylist_20240803'

import H5_0830 from './page/h5/0830'




import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AliveScope, KeepAlive } from 'react-activation';
import MiddlePage from './page/middle';
import './assets/less/index.less'
import 'virtual:windi.css'

// 保存原生的 XMLHttpRequest 对象
const originalXHR = window.XMLHttpRequest;
// 重写 XMLHttpRequest 构造函数
window.XMLHttpRequest = function () {
  const xhr = new originalXHR();
  // 拦截 open 方法
  const originalOpen = xhr.open;
  xhr.open = function (method, url, async, user, password) {
    // 检查 URL 是否匹配
    if (url === '/api/captcha/get_block_puzzle_captcha/captcha/get') {
      // 修改 URL
      url = '/api/captcha/get_block_puzzle_captcha';
    }
    if (url === '/api/captcha/get_block_puzzle_captcha/captcha/check') {
      // 修改 URL
      url = '/api/captcha/check_block_puzzle_captcha';
    }
    // 调用原生的 open 方法
    originalOpen.call(this, method, url, async, user, password);
  };

  // 拦截 send 方法
  const originalSend = xhr.send;
  xhr.send = function (data) {
    // 在这里对请求进行修改
    try {
      const d = JSON.parse(data)
      if(d && d.clientUid && d.token) {
        console.log('captchaToken', d.token)
        window.captchaToken = d.token
      }
    }
    catch(e) {
        console.error(e)
    }

    // 调用原生的 send 方法
    originalSend.call(this, data);
  };

  return xhr;
};

const App = () => (
  <Router>
    <AliveScope>
      <Routes>
        {/* 单独的路由不使用 DefaultLayout */}
        <Route path="/h5_0830" element={<H5_0830 />} />
        <Route path="/activityList" element={<ActivityList />} />
        <Route path="/activityList_20240803" element={<ActivityList_20240803 />} />
        

        {/* 使用 DefaultLayout 的路由 */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/vote" />} />
          <Route path="vote" element={<KeepAlive id="Vote"><Vote /></KeepAlive>} />
          <Route path="intro" element={<KeepAlive id="Intro"><Intro /></KeepAlive>} />
          <Route path="rank" element={<Rank />} />
          <Route path="player" element={<Player />} />
          <Route path="apply" element={<Apply />} />
          <Route path="voting" element={<Voting />} />
          <Route path="report" element={<Report />} />
          <Route path="article" element={<Article />} />



          <Route path="middle" element={<MiddlePage />} />
        </Route>
      </Routes>
    </AliveScope>
  </Router>
);

export default App;


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)
