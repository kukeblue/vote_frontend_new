import { Button, Col, Row, Radio, InputNumber, Switch, Input, Form, Tabs, Select } from 'antd'
import React from 'react'
import { colLayout_1, colLayout_2, colLayout_pageTemplate } from '../../../config/colLayout'
import SwiperUpload from '../../../component/SwiperUpload'
import ColorHorizontalSelector from '../../../component/ColorHorizontalSelect'
import InputColor from 'react-input-color';
import PreSelectInput from '../../../component/Form/PreSelectInput'
const { TabPane } = Tabs;
const { TextArea } = Input;
/**
 * @type React Component
 * @description  界面模版
 */
function PageTemplate() {
    return <div className='voteEdit-step3-pageTemplate'>
        <div className='pageTemplate-header flex-row-center'>
            <div className='text_title'>界面模板</div>
        </div>
        <div className='pageTemplate-content'>
            <Row>
                {[1,2,3,4,5,6,7].map(key=>{
                    return  <Col key={key} className='flex-center' {...colLayout_pageTemplate}><div className='pageTemplate-item'></div></Col>
                })}
            </Row>
            <div className='flex-center mt-30px'>
                <Button type='primary'>点击加载更多...</Button>
            </div>
        </div>
    </div>
}
/**
 * @type React Component
 * @description  轮播图设置
 */
function SwiperSetting() {
    return <div className='voteEdit-settingBlock mt-30px'>
        <div className='setting-header flex-row-center'>
            <div className='text_title'>轮播图</div>
            <div className='text_dec ml-10px'>轮播图 (最多允许6张, 图片和视频不能同时显示)</div>
        </div>
        <div className='setting-content'>
            <SwiperUpload></SwiperUpload>
            <div className='mt-30px'>
                <div className='step-form-label'>显示小圆点</div>
                <div>
                <Radio.Group>
                    <Radio value='1'>显示</Radio>
                    <Radio value='2'>隐藏</Radio>
                </Radio.Group>
                </div>
            </div>
            <div className='mt-30px'>
                <Row>
                    <Col {...colLayout_1}>
                        <div className='step-form-label'>切换方式</div>
                        <div>
                            <Radio.Group value='1'>
                                <Radio value='1'>自由切换</Radio>
                                <Radio value='2'>手动切换</Radio>
                            </Radio.Group>
                        </div>
                    </Col>
                    <Col {...colLayout_1}>
                        <div className='step-form-label'>自动切换时长</div>
                        <div>
                            <InputNumber min={1} max={10} defaultValue={3} className='mr-10px' /> 秒
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='mt-30px'>
                <div className='step-form-label'>切换效果</div>
                <div>
                <Radio.Group value='1'>
                    <Radio value='1'>默认</Radio>
                    <Radio value='2'>淡入</Radio>
                    <Radio value='2'>卡牌</Radio>
                    <Radio value='2'>翻转</Radio>
                </Radio.Group>
                </div>
            </div>
        </div>
    </div>
}
/**
 * @type React Component
 * @description  广告设置
 */
function AdSetting() {
    return <div className='voteEdit-settingBlock mt-30px'>
        <div className='setting-header flex-row-center'>
            <div className='text_title'>广告及弹窗</div>
        </div>
        <div className='setting-content'>
        <Row>
            <Col {...colLayout_1} className='mb-20px'>
                <div className='flex'> <Switch className='mr-10px' defaultChecked />开场广告图片</div>
                <div className='flex flex-wrap mt-20px'>
                    <div className='step3-introAdvertisementBanner  mr-10px'>
                    </div>
                    <div className='step3-introAdvertisementBanner-upload  flex-center mr-10px'>
                        <div className='text_dec flex-column-all-center'>
                            <span className='iconjia iconfont'></span>
                            <div>750 x 1334</div>       
                        </div>
                    </div>
                </div>
                <div className='mt-10px'>
                    <div className='step-form-label'>开场广告关闭时间</div>
                    <div>
                        <InputNumber min={1} max={10} defaultValue={3} className='mr-10px' /> 秒
                    </div>
                </div>
            </Col>
            <Col {...colLayout_1} className='mb-20px'>
                <div className='flex'> 
                    <Switch className='mr-10px' defaultChecked />
                    投票广告图片
                </div>
                <div className='flex flex-wrap mt-20px'>
                    <div className='step3-voteAdvertisementBanner mr-10px'>
                    </div>
                    <div className='flex-center step3-voteAdvertisementBanner-upload mr-10px'>
                        <div className='text_dec flex-column-all-center'>
                            <span className='iconjia iconfont'></span>
                            <div>622 x 380</div>       
                        </div>
                    </div>
                </div>
                <Input className='mt-20px' placeholder="请输入广告跳转网址" />
                <div className='mt-40px'>
                    <div className='step-form-label'>投票成功自动跳转</div>
                    <div>
                        <Radio.Group value='1'>
                            <Radio value='1'>开启</Radio>
                            <Radio value='2'>关闭</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </Col>
        </Row>
        </div>
    </div>
}
/**
 * @type React Component
 * @description  页面配置
 */
function PageSetting() {
    return <div className='voteEdit-settingBlock mt-30px'>
        <div className='setting-header flex-row-center'>
            <div className='text_title'>界面</div>
        </div>
        <div className='setting-content' style={{paddingTop: '0px'}}>
            <div>
                <div className='step-form-label'>颜色风格</div>
                <ColorHorizontalSelector/>
            </div>
            <Row>
                <Col className='flex-wrap'>
                    <div className='step3-colorSelect'>
                        <div className='step-form-label'>自定义主题色</div>
                        <div className='singleColorSelector'>
                        <InputColor
                            initialValue="#5e72e4"
                            onChange={()=>{}}
                            placement="right"
                        />
                        </div>
                    </div>
                    <div className='step3-colorSelect'>
                        <div className='step-form-label'>标题颜色</div>
                        <div className='singleColorSelector'>
                            <InputColor
                                initialValue="#5e72e4"
                                onChange={()=>{}}
                                placement="right"
                            />
                        </div>
                    </div>
                    <div className='step3-colorSelect'>
                        <div className='step-form-label'>底部自定义文字</div>
                        <div className='singleColorSelector'>
                            <InputColor
                                initialValue="#5e72e4"
                                onChange={()=>{}}
                                placement="right"
                            />
                        </div>
                    </div>
                </Col>
                <Col>
                <div className='mr-20px'>
                    <div className='step-form-label'>标题大小</div>
                    <div>
                        <Radio.Group value='1'>
                            <Radio value='1'>小</Radio>
                            <Radio value='2'>中</Radio>
                            <Radio value='3'>大</Radio>
                        </Radio.Group>
                    </div>
                </div>
            
                </Col>
                <Col>
                    <div>
                        <div className='step-form-label'>平台技术支持信息</div>
                        <div>
                            <Radio.Group value='1'>
                                <Radio value='1'>显示</Radio>
                                <Radio value='2'>隐藏</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </Col>
            </Row>
            <div  className='mt-30px mb-10px setting-split-line'/>
            <div className='step-form-label'>页面背景</div>
            <div className='flex flex-wrap mt-20px'>
                <div className='step3-introAdvertisementBanner  mr-10px'>
                </div>
                <div className='step3-introAdvertisementBanner-upload  flex-center mr-10px'>
                    <div className='text_dec flex-column-all-center'>
                        <span className='iconjia iconfont'></span>
                        <div>750 x 1334</div>       
                    </div>
                </div>
            </div>
            <div  className='mt-30px mb-10px setting-split-line'/>
            <div className='step-form-label'>边框样式</div>
            <div className='flex flex-wrap'>
                <div className='step3-borderStyle'></div>
                <div className='step3-borderStyle-upload  flex-center'>
                <div className='text_dec flex-column-all-center'>
                        <span className='iconjia iconfont'></span>
                        <div>486 x 486</div>       
                    </div>
                </div>
            </div>
            <div  className='mt-30px mb-10px setting-split-line'/>
            <div className='step-form-label'>漂浮物</div>
            <div className='flex flex-wrap'>
                <div className='step3-flotage-upload  flex-center'>
                <div className='text_dec flex-column-all-center'>
                        <span className='iconjia iconfont'></span>
                        <div>120 x 120</div>       
                    </div>
                </div>
            </div>
            <div  className='mt-30px mb-10px setting-split-line'/>
            <div className='step-form-label'>背景音频</div>
            <div className='flex flex-wrap'>
            </div>
        </div>
    </div>
}

/**
 * @type React Component
 * @description  页面元素
 */
function PageElementSetting() {
    return <div className='voteEdit-settingBlock mt-30px'>
        <div className='setting-header flex-row-center'>
            <div className='text_title'>页面元素</div>
        </div>
        <div className='setting-content' style={{paddingTop: '20px'}}>
            <Form 
            labelCol= {{ span: 24 }}
            wrapperCol= {{ span: 24 }}>
            <Row>
                <Col {...colLayout_1}>
                    <Form.Item
                    className='mr-20px'
                        label="顶部滚动文字"
                        name="顶部滚动文字"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col {...colLayout_1}>
                    <Form.Item
                        className='mr-20px'
                        label="底部自定义文字"
                        name="底部自定义文字"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col {...colLayout_1}>
                    <Form.Item
                        className='mr-20px'
                        label="底部自定义文字链接"
                        name="底部自定义文字链接"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col {...colLayout_1}>
                    <Form.Item
                        className='mr-20px'
                        label="活动规则文字"
                        name="活动规则文字"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col {...colLayout_1}>
                    <Form.Item
                        className='mr-20px'
                        label="规则区块自定义栏文字"
                        name="规则区块自定义栏文字"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col {...colLayout_2}>
                    <Form.Item
                        tooltip="选手称谓"
                        className='mr-20px'
                        label="选手称谓"
                        name="选手称谓"
                    >
                        <PreSelectInput />
                    </Form.Item>
                </Col>
                <Col {...colLayout_2}>
                    <Form.Item
                        className='mr-20px'
                        label="按钮投票名称"
                        name="按钮投票名称"
                    >
                        <PreSelectInput />
                    </Form.Item>
                </Col>
                <Col {...colLayout_2}>
                    <Form.Item
                        className='mr-20px'
                        label="选手单位"
                        name="选手单位"
                    >
                        <PreSelectInput />
                    </Form.Item>
                </Col>
                <Col {...colLayout_2}>
                    <Form.Item
                        className='mr-20px'
                        label="票数单位"
                        name="票数单位"
                    >
                        <PreSelectInput />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <div className='mt-10px'>
                    <div className='step-form-label'>选手分类每行显示</div>
                    <div>
                        <Radio.Group value='1'>
                            <Radio value='1'>1个</Radio>
                            <Radio value='2'>2个</Radio>
                            <Radio value='3'>3个</Radio>
                            <Radio value='4'>4个</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </Row>
            </Form>
            
        </div>
    </div>
}

/**
 * @type React Component
 * @description  页面元素是否可见
 */
function PageElementVisible() {
    return <div className='voteEdit-settingBlock mt-30px'>
        <div className='setting-header flex-row-center'>
            <div className='text_title'>页面显示设置</div>
        </div>
        <div className='setting-content' style={{paddingTop: '20px'}}>
            <Tabs type="card">
                <TabPane tab="首页" key="1">
                    <div className='step-form-label_small mb-5px'>显示的元素</div>
                    <Row>
                        <Col>    
                        <div className='mt-10px mr-20px mb-20px'>
                            <div className='flex-center'>
                                <Switch size="small" defaultChecked /> 
                                <div className='ml-5px'>顶部轮播图</div>
                            </div>
                        </div>
                        </Col>
                        <Col>    
                        <div className='mt-10px mr-20px mb-20px'>
                            <div className='flex-center'>
                                <Switch size="small"/> 
                                <div className='ml-5px'>投票标题</div>
                            </div>
                        </div>
                        </Col>
                        <Col>    
                        <div className='mt-10px mr-20px mb-20px'>
                            <div className='flex-center'>
                                <Switch size="small"/> 
                                <div className='ml-5px'>数据区块</div>
                            </div>
                        </div>
                        </Col>
                        <Col>    
                        <div className='mt-10px mr-20px mb-20px'>
                            <div className='flex-center'>
                                <Switch size="small"/> 
                                <div className='ml-5px'>报名时间</div>
                            </div>
                        </div>
                        </Col>
                        <Col>    
                        <div className='mt-10px mr-20px mb-10px'>
                            <div className='flex-center'>
                                <Switch size="small"/> 
                                <div className='ml-5px'>规则区块</div>
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <Row className='mt-20px mb-40px'>
                        <Col>
                            <div className='mr-20px'>
                                <div className='step-form-label_small mb-10px'>选手排列方式</div>
                                <Select  style={{width: 120}}/>
                            </div>
                        </Col>
                        <Col>
                            <div className='mr-20px'>
                            <div className='step-form-label_small mb-10px'>选手显示列数</div>
                            <Select  style={{width: 120}}/>
                            </div>
                        </Col>
                        <Col>
                        <div className='mr-20px'>
                            <div className='step-form-label_small mb-10px'>选手排列方式</div>
                            <Select  style={{width: 120}}/>
                            </div>
                        </Col>
                        <Col>
                            <div className='mr-20px'>
                            <div className='step-form-label_small mb-10px'>全部分类按钮</div>
                            <Select  style={{width: 120}}/>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="说明页" key="2">
                </TabPane>
                <TabPane tab="选手页" key="3">
                </TabPane>
                <TabPane tab="排名页" key="4">
                </TabPane>
                <TabPane tab="导航条" key="5">
                </TabPane>
            </Tabs>
        </div>
    </div>
}

/**
 * @type React Component
 * @description  页面关闭设置
 */
function PageCloseSetting() {
    return <div className='voteEdit-settingBlock mt-30px'>
        <div className='setting-header flex-row-center'>
            <div className='text_title'>关闭活动</div>
            <div className='text_dec ml-10px'>关闭活动后该活动将不能访问、不能投票。</div>
        </div>
        <div className='setting-content' style={{paddingTop: '20px'}}>
            <div>
                <Switch size="small" defaultChecked /> 
                <TextArea placeholder="请输入关闭活动提示" className='mt-20px'/>
            </div>
        </div>
    </div>
}

/**
 * @type React Component
 * @description  投票步骤三
 */
function VoteEditStep3() {
    return  <div className='voteEdit-step3'>
        {/* 界面模版 */}
        <PageTemplate />
        {/* 轮播图设置 */}
        <SwiperSetting />
        {/* 广告设置 */}
        <AdSetting/>
        {/* 页面设置 */}
        <PageSetting/>
        {/* 页面元素 */}
        <PageElementSetting/>
        {/* 页面元素显示 */}
        <PageElementVisible/>
        {/* 关闭活动 */}
        <PageCloseSetting/>
        <div className='flex-center mt-20px'>
            <Button className='mr-10px'>上一步</Button>
            <Button className='mr-10px' type="primary">高级设置</Button>
            <Button className='mr-10px' type="primary">发布活动</Button>
        </div>
    </div>
}

export default VoteEditStep3