import { Row, Col, Menu, Tag, Dropdown } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isMobile } from '../../../utils/env';
import { CBreadcrumb } from '../../../component/CBreadcrumb'
import { 
    CaretDownOutlined, 
    FormOutlined, 
    BarChartOutlined, 
    ShareAltOutlined, 
    ClearOutlined 
} from '@ant-design/icons';
import './index.less'

const col_layout_pic = {
    lg: {span: 8},
    md: {span: 12},
    sm: {span: 24},
    xs: {span: 24}
}
const col_layout_info = {
    lg: {span: 12},
    md: {span: 12},
    sm: {span: 24},
    xs: {span: 24}
}
const col_layout_option = {
    lg: {span: 4},
    md: {span: 0},
    sm: {span: 0},
    xs: {span: 0}
}

/**
 * @type React Component
 * @description 投票列表头部
 */
function VoteListHeader() {
    const history = useNavigate()
    return <div className='page-voteManageList-header flex-between'>
        <div className='text'>共<span className='mr-5px ml-10px color-primary'>0</span>个投票</div> 
        <div className='flex-center'> 
            <div onClick={()=>{
                history.push('/admin/voteManage/edit')
            }} className='createVote flex-center ripple'>
                <span style={{marginRight:2}} className='iconfont iconjia1'></span>创建投票
            </div>
            <div className='dropDown flex-center ripple-black'>
                筛选 <span  className='iconfont iconxia'></span>
            </div>
        </div>
    </div>
}


/**
 * @type React Component
 * @description 投票具体内容
 */
function VoteListContent() {

    const navigate = useNavigate()

    // 跳转投票结果
    const toVoteResultPage = () => {
        navigate('/admin/voteManage/result')
    }
    // 跳转投票统计
    const toVoteStatisticsPage = () => {
        navigate('/admin/voteManage/statistics')
    }
    // 活动编辑
    const toVoteEditPage = () => {
        navigate('/admin/voteManage/edit')
    }
    // 手机端跳转
    const clickItemInPhone = () => {
        if(isMobile()) {
            navigate('/admin/voteManage/edit')
        }
    }

    return <div onClick={clickItemInPhone}>
        <Row className='page-voteManageList-item flex-between'>
            <Col {...col_layout_pic}><div className='voteManageList-item-banner'></div></Col>
            <Col {...col_layout_info}><div className='voteManageList-item-info'>
                <div className='flex-row-center'>
                    <Tag color="#87d068">进行中</Tag>
                    <span className='ml-10px voteManageList-item-info-title'>横市县中小学优秀教师评选</span>
                </div>
                <div className='mt-20px voteManageList-item-info-time'>创建时间：2020-12-31</div>
                <div className='voteManageList-item-info-time'>开始时间：2020-12-31 —— 结束时间：2021-3-31</div>
                <div className='mt-20px flex'>
                    <div className='icon-button'> <span className='iconfont iconshezhi'></span> 选项：0</div>
                    <div className='icon-button'> <span className='iconfont iconaixin'></span> 票数: 0</div>
                    <div className='icon-button'> <span className='iconfont iconfangwen2'></span> 访问: 0</div>
                    <div className='icon-border-button ripple-black'> <span className='iconfont iconshuaxin'></span> 刷新</div>
                </div>
            </div></Col>
            <Col {...col_layout_option}><div className='voteManageList-item-option'>
                <div onClick={toVoteEditPage} className='voteManageList-item-option-item ripple-black'>
                   <FormOutlined/> 活动编辑
                </div>
                    <Dropdown overlay={
                    <Menu>
                        <Menu.Item className onClick={toVoteStatisticsPage}>投票统计</Menu.Item>
                        <Menu.Item className onClick={toVoteResultPage}>结果排名</Menu.Item>
                    </Menu>
                    }>
                    <div className='voteManageList-item-option-item ripple-black'>
                        <BarChartOutlined/>
                            统计 
                        <CaretDownOutlined className='ml-5px' />
                    </div>
                    </Dropdown>
                    <div className='voteManageList-item-option-item ripple-black'>
                        <ShareAltOutlined/>
                            分享 
                        <CaretDownOutlined className='ml-5px'/>
                    </div>
                    <div className='voteManageList-item-option-item ripple-black'>
                    <ClearOutlined />
                        清理
                    <CaretDownOutlined  className='ml-5px'/> </div>
                </div>
            </Col>
        </Row>
    </div>
}

/**
 * @type React Page
 * @description 投票管理页面
 */
function VoteList() {
    return  <div className='page page-voteManageList'>
        <CBreadcrumb/>
        <VoteListHeader/>
        <VoteListContent/>
    </div>
}

export default VoteList;