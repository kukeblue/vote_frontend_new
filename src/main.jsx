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
import ActivityList from './page/activityList';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AliveScope, KeepAlive } from 'react-activation';

import MiddlePage from './page/middle';


import './assets/less/index.less'
import 'virtual:windi.css'

// const router = createBrowserRouter([
//     {
//         element: <DefaultLayout />,
//         children: [
//             { path: "/vote", element: (<Vote/>)},
//             { path: "/intro", element: (<Intro/>)},
//             { path: "/rank", element: (<Rank/>)},
//             { path: "/player", element: (<Player/>)},
//             { path: "/middle", element: (<MiddlePage/>)},
//         ],
//     },
//     // {
//     //     element: <AdminLayout />,
//     //     path: "/admin/:path?/:path?",
//     //     children: [
//     //         { path: "", element: (<Index/>) },
//     //         { path: "setting", element: (<Index/>) },
//     //         { path: "management", element: (<Management/>)},
//     //         { path: "voteManage/result", element: (<VoteResult/>)},
//     //         { path: "voteManage/edit", element: (<VoteManageEdit/>)},
//     //         { path: "voteManage/statistics", element: (<VoteStatistics/>)},
//     //         { path: "voteManage", element: (<VoteManageList/>)},
//     //         { path: "series/seriesList", element: (<SeriesList/>)},
//     //         { path: "series/seriesEdit", element: (<SeriesEdit/>)},
//     //         { path: "accountUpgrade", element: (<AccountUpgrade/>)},
//     //     ],
//     // },
//     {
//         path: "/",
//         element: <Navigate to="/vote"/>,
//     },
// ]);

const App = () => (
  <Router>
    <AliveScope>
      <Routes>
        {/* 单独的路由不使用 DefaultLayout */}
        <Route path="/activityList" element={<ActivityList />} />

        {/* 使用 DefaultLayout 的路由 */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/vote" />} />
          <Route path="vote" element={<KeepAlive id="Vote"><Vote /></KeepAlive>} />
          <Route path="intro" element={<Intro />} />
          <Route path="rank" element={<Rank />} />
          <Route path="player" element={<Player />} />
          <Route path="apply" element={<Apply />} />
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
