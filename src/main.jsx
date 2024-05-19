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
      <DefaultLayout>
          <Routes>
            <Route exact path="/vote" element={<KeepAlive id="Vote"><Vote></Vote></KeepAlive>} />
            <Route exact path="/intro" element={<Intro></Intro>} />
            <Route exact path="/rank" element={<Rank></Rank>} />
            <Route exact path="/player" element={<Player/>} />
            <Route exact path="/apply" element={<Apply/>} />
            <Route exact path="/middle" element={<MiddlePage></MiddlePage>} />
            <Route exact path="/" element={ <Navigate to="/vote"/>} />
          </Routes>
      </DefaultLayout>
      </AliveScope>
    </Router>
  );
  
  export default App;


ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>,
)
