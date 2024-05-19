import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
 

/**
 * @type React Component
 * @description 投票列表头部
 */
function SeriesListHeader() {
    const history = useNavigate()
    return <div className='page-list-header flex-between'>
        <div className='text'>共<span className='mr-5px ml-5px color-primary'>0</span>个投票专题</div> 
        <div className='flex-center'> 
            <div onClick={()=>{
                history.push('/admin/series/seriesEdit')
            }} className='createVote flex-center ripple'>
                <span style={{marginRight:2}} className='iconfont iconjia1'></span>创建专题
            </div>
            <div style={{minWidth: 80}} className='dropDown flex-center ripple-black'>
                筛选 <span  className='iconfont iconxia'></span>
            </div>
        </div>
    </div>
}

/**
 * @type React Component
 * @description 最近活动
 */
function SeriesList() {
    const columns = [
        {
            title: '标题',
            dataIndex: '标题',
            render: (text)=>{<div className='management-table-title'>{text}</div>}
        },
        {
            title: '访问量',
            dataIndex: '访问量',
        },
        {
            title: '投票数量',
            dataIndex: '投票数量',
        },
        {
            title: '操作',
            dataIndex: '操作',
        },
    ] 
    return <div>
        <div className='seriesList-content mt-30px'>
            <Table scroll={{ x: 1100 }} dataSource={[]} columns={columns}/>
        </div>
    </div>
}

/**
 * @type React Page
 * @description 专题表单页面
 */
export default function SeriesListPage() {
    return  <div className='page seriesList-page'>
        <div className='text_page-title'>投票专题</div>
        <SeriesListHeader/>
        <SeriesList/>
    </div>
}