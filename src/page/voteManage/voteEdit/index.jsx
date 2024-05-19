import { Col, Input, Row, Form, Button } from 'antd';
import React, { useState } from 'react'
import { createContainer, useContainer } from 'unstated-next';
import { ReactIf } from '../../../component/ReactIf';
import {
    colLayout_2, 
    colLayout_voteEditor_form, 
    colLayout_voteEditor_preview,
} from '../../../config/colLayout';
import './index.less'
import image_phone from '../../../assets/images/phone.png'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'



// 投票管理步骤条数据
const steps = [
    {
        index: 1,
        name: '基本信息',
        dec: '标题、时间、描述',
    },
    {
        index: 2,
        name: '选手管理',
        dec: '添加管理投票选手',
    },{
        index: 3,
        name: '自定义模版',
        dec: '广告、样式、页面排版',
    },{
        index: 4,
        name: '高级设置',
        dec: '设规则、防刷票、送礼物、强关注',
    }
]
/**
 * @type React Component
 * @description 投票管理步骤条
 */
function VoteManageStep() {

    const { currectStep, setCurrectStep } = useContainer(VoteManageStore)

    let stepSelectedIndex = 1;
    return <Row className='voteManage-step flex-between'>
            {
                steps.map(item=>{
                    return <Col key={item.index} {...colLayout_2}>
                    <div 
                        onClick={()=>setCurrectStep(item.index)}
                        key={item.name} 
                        className={currectStep == item.index ? 'voteManage-step-item_selected flex-row-center' : 'voteManage-step-item flex-row-center'}
                    >
                        <div className='step-index mr-20px'>{item.index}</div>
                        <div>
                            <div className='step-name'>{item.name}</div>
                            <div className='step-dec'>{item.dec}</div>
                        </div>
                    </div> </Col>
                }) 
            }
    </Row>
}

/**
 * @type React Component
 * @description 手机文章预览
 */
function ArticlePreview() {
    return <div className='h-[600px] ml-60px pt-50px pb-10px px-18px relative'>
        <img className='h-[600px] inset-0 absolute w-full' src={image_phone}/>
        <div className='h-full w-full bg-light-50'></div>
    </div>
}

/**
 * @type React Page
 * @description 投票编辑页面
 */
function VoteManage() {
    const { currectStep } = useContainer(VoteManageStore)
    return <div className='page voteManage-page'>
        <VoteManageStep></VoteManageStep>
        <div className='voteManage-vote-editor'>
        <Row>
        <Col {...colLayout_voteEditor_form} >
            <ReactIf show={currectStep == 1}><Step1></Step1></ReactIf>
            <ReactIf show={currectStep == 2}><Step2></Step2></ReactIf>
            <ReactIf show={currectStep == 3}><Step3></Step3></ReactIf>
            <ReactIf show={currectStep == 4}><Step4></Step4></ReactIf>
        </Col>
        <Col {...colLayout_voteEditor_preview}>
            <div className='voteEdit-article-preview'>
                <ArticlePreview></ArticlePreview>
                <div className='flex-center mt-20px '>
                    <Button className='mr-20px ml-80px'>刷新</Button>
                    <Button type="primary">发布活动</Button>
                </div>
            </div>
        </Col>
    </Row>
    </div>
    </div>
}

// VoteManage Store 数据商店
function useVoteManageStore() {
    let [currectStep, setCurrectStep] = useState(1) //  passwordLogin wechatLogin
    return { currectStep, setCurrectStep }
  }
  let VoteManageStore = createContainer(useVoteManageStore)
  export default ()=>{
    return <VoteManageStore.Provider>
      <VoteManage></VoteManage>
    </VoteManageStore.Provider>
  }
  