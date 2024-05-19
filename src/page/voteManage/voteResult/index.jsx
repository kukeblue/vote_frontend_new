import React from 'react'
import './index.less'
import { CBreadcrumb } from '../../../component/CBreadcrumb'
import { UserOutlined, BarChartOutlined, FundViewOutlined, ShareAltOutlined, ExportOutlined } from '@ant-design/icons';
import { Row, Col, Button, Table} from 'antd';
import { colLayout_2 } from '../../../config/colLayout';

/**
 * @type React Component
 * @description 投票状态块
 */
function VoteState() {
    return <div className='voteResult-state'>
        <Row>
            <Col {...colLayout_2}>
                <div className='stateCard flex-row-center'>
                    <div className='stateCard-icon flex-center'>
                        <UserOutlined className='fz-20 color-fff'/>
                    </div>
                    <div>
                        <div className='text_title2'>2个</div>
                        <div className='text_dec color-666'>总选项数</div>
                    </div>
                </div>
            </Col>
            <Col {...colLayout_2}>
                <div className='stateCard flex-row-center'>
                    <div className='stateCard-icon flex-center'>
                        <BarChartOutlined className='fz-20 color-fff'/>
                    </div>
                    <div>
                        <div className='text_title2'>132票</div>
                        <div className='text_dec color-666'>总票数</div>
                    </div>
                </div>
            </Col>
            <Col {...colLayout_2}>
                <div className='stateCard flex-row-center'>
                    <div className='stateCard-icon flex-center'>
                        <FundViewOutlined className='fz-20 color-fff'/>
                    </div>
                    <div>
                        <div className='text_title2'>0个</div>
                        <div className='text_dec color-666'>总访问</div>
                    </div>
                </div>
            </Col>
            <Col {...colLayout_2}>
                <div className='stateCard flex-row-center'>
                    <div className='stateCard-icon flex-center'>
                        <ShareAltOutlined className='fz-20 color-fff'/>
                    </div>
                    <div>
                        <div className='text_title2'>8/20</div>
                        <div className='text_dec color-666'>分享好友/朋友圈</div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}

const columns = [
    {
        title: '排名',
        dataIndex: '排名',
        render: (text)=>{<div className='management-table-title'>{text}</div>}
    },
    {
        title: '头像',
        dataIndex: '头像',
    },
    {
        title: '票数',
        dataIndex: '票数',
    },
    {
        title: '访问数',
        dataIndex: '访问数',
    },
    {
        title: '分享数',
        dataIndex: '分享数',
    },
] 
/**
 * @type React Component
 * @description 选手排名表格
 */
function ResultTable() {
    
    return <div className='voteResult-content mt-30px'>
        <div className='voteResult-content-header flex-between'>
            <div className='text_title2 blod'>选手排名</div>
            <div><Button type='primary'><ExportOutlined />导出为Excel</Button></div>
        </div>
        <div className='voteResult-table mt-10px'>
            <Table dataSource={[]} columns={columns}/>
        </div>
    </div>
    
}


/**
 * @type React Page
 * @description 投票结果
 */
function VoteResult() {
    
    return <div className='page vote-result-page'>
        <CBreadcrumb/>
        {/* 投票状态块 */}
        <VoteState/>
        <ResultTable/>
    </div>
}

export default VoteResult