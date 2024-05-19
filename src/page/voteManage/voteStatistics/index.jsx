import React from 'react'
import { CBreadcrumb } from '../../../component/CBreadcrumb'
import { UserOutlined, BarChartOutlined, FundViewOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Row, Col, Button, Table} from 'antd';
import { colLayout_2 } from '../../../config/colLayout';
import './index.less'
/**
 * @type React Component
 * @description 投票状态块
 */
function VoteStatisticsState() {
    return <div className='page-state'>
        <Row>
            <Col {...colLayout_2}>
                <div className='stateCard flex-row-center'>
                    <div className='stateCard-icon flex-center'>
                        <UserOutlined className='fz-20 color-fff'/>
                    </div>
                    <div>
                        <div className='text_title2'>2个</div>
                        <div className='text_dec color-666'>总选手数</div>
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
                        <div className='text_dec color-666'>分享好友</div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}


/**
 * @type React Page
 * @description 投票统计
 */
function VoteStatistics() {
    return <div className='page voteStatistics-page'>
        <CBreadcrumb/>
        <VoteStatisticsState/>
        <div className='voteStatistics-chart mt-40px'>
            <div className='voteStatistics-chart-header flex-between'>
                <div className='text_title2'>活动每小时统计</div>
                <div><Button>2020-12-01</Button></div>
            </div>
            <div className='flex-column-all-center'>
                <div className='text_title'>活动每小时统计</div>
                <div className='text_dec'>统计日期：2020-12-01</div>
                <div className='voteStatistics-chart-body mt-50px p-b-50'>
                    统计图
                </div>
            </div>
        </div>
    </div>
}

export default VoteStatistics