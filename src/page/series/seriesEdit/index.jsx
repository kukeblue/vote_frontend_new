import React, { useState } from 'react'
import { Col, Row, Form, Input, Switch, Button } from 'antd'
import './index.less'
import {
    colLayout_1, 
} from '../../../config/colLayout';
import { createContainer, useContainer } from 'unstated-next';
import { ReactIf } from '../../../component/ReactIf'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const steps = [
    {
        index: 1,
        name: '基本信息',
        dec: '专题标题、描述',
    },
    {
        index: 2,
        name: '专题管理',
        dec: '设置专题中的投票',
    }
]
/**
 * @type React Component
 * @description 专题编辑步骤条
 */
function EditStepButton() {
    const { currectStep, setCurrectStep } = useContainer(SeriesListPageStore)
    return <Row className='page-step flex-between'>
    {
        steps.map(item=>{
            return <Col key={item.index} {...colLayout_1}>
            <div 
                onClick={()=>setCurrectStep(item.index)}
                key={item.name} 
                className={currectStep == item.index ? 'step-item_selected flex-row-center' : 'step-item flex-row-center'}
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
const colLayout_step1_perview = {
    lg: {span: 8},
    md: {span: 0},
    sm: {span: 0},
    xs: {span: 0}
}
const colLayout_step1_form = {
    lg: {span: 16},
    md: {span: 24},
    sm: {span: 24},
    xs: {span: 24}
}
/**
 * @type React Component
 * @description 专题步骤一
 */
const formlayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
function Step1() {
    return <div className='series-step1'>
        <Row > 
            <Col {...colLayout_step1_perview}>
                <div className='seriesPreview'>

                </div>
            </Col>
            <Col {...colLayout_step1_form}>
                <div className='seriesForm'>
                    <Form {...formlayout}>
                        <Form.Item name="投票标题" label="投票标题">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="专题插图" label="专题插图">
                            <div className='flex'>
                                <div className='seriesBanner mr-10px'></div>
                                <div className='seriesBanner-upload flex-center'>
                                    <div className='text_dec flex-column-all-center'>
                                        <span className='iconjia iconfont'></span>
                                        <div>750 x 1334</div>       
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item name="专题配色" label="专题配色">
                            {/* <Input/> */}
                            颜色编辑器等待封装
                        </Form.Item>
                        <Form.Item name="仅显示活动名称"  label="仅显示活动名称">
                            <Switch defaultChecked></Switch>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    </div>
}
/**
 * @type React Component
 * @description 专题步骤二
 */
function Step2() {
    return <div className='series-step2'>
        <Row > 
            <Col {...colLayout_1}>
                <div className='series-step2-block'>
                    <div className='series-step2-title'>未在专题中的投票</div>
                    <div className='series-step2-content'>
                        <div className='flex-between'>
                            <div className='flex-center'>
                                <div>网红评选</div>
                                <div className='flex-center ml-20px'><div className='dot-yellow'></div>进行中</div>
                            </div>
                            <div className='ripple-black into-button'>
                                <span className='iconjia iconfont '></span>
                                放入专题
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col {...colLayout_1}>
                <div className='series-step2-block'>
                    <div className='series-step2-title'>专题中的投票</div>
                    <div className='series-step2-content'>
                        <div className='flex-between'> 
                            <div className='flex-center'>
                                <div>网红评选</div>
                                <div className='flex-center ml-20px'><div className='dot-green'></div>进行中</div>
                            </div>
                            <div>
                            <div className='ripple-black flex-center out-button'>
                                <span className='iconclose iconfont'></span>
                                移出专题
                            </div>
                            <div className='ripple-black flex-center default-button mt-10px'>
                                <ArrowUpOutlined />
                                上移
                            </div>
                            <div className='ripple-black flex-center default-button mt-10px'>
                                <ArrowDownOutlined />
                                下移
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}
/**
 * @type React Page
 * @description 专题表单页面
 */
function SeriesListPage() {
    const {currectStep, setCurrectStep} = useContainer(SeriesListPageStore)
    return  <div className='page seriesEdit-page mb-30px'>
        <div className='text_page-title'>投票专题</div>
        <EditStepButton />
        <ReactIf show={currectStep == 1}><Step1/></ReactIf>
        <ReactIf show={currectStep == 2}><Step2/></ReactIf>
        <div className='flex-center mt-20px'>
            <Button className='mr-10px'>上一步</Button>
            <Button className='mr-10px' type="primary">返回列表</Button>
            <Button className='mr-10px' type="primary">分享发布</Button>
        </div>
    </div>
}
// SeriesListPage Store 数据商店
function useSeriesListPageStore() {
    let [currectStep, setCurrectStep] = useState(2)
    return { currectStep, setCurrectStep }
}
  let SeriesListPageStore = createContainer(useSeriesListPageStore)
  export default ()=>{
    return <SeriesListPageStore.Provider>
      <SeriesListPage></SeriesListPage>
    </SeriesListPageStore.Provider>
}