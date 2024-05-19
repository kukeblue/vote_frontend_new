import React, { useState } from 'react'
import './index.less'
import { Row, Col, Card, Button } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons';
import { colLayout_2 } from '../../config/colLayout';
import { ReactIf } from '../../component/ReactIf'

/**
 * @type React Component
 * @description 账户类型
 */
function AccountTypes() {
    const  [ spread, setSpread ] = useState(false)
    return <div className='accountUpgrade-accountType'>
        <Row style={{alignItems: 'flex-start'}}>
            <Col
                {...colLayout_2}
                className='flex-center'
            >
                <Card 
                    bordered={false}
                    hoverable
                    className='accountType-card'>
                    <div className='accountType-card-header flex-column-center'>
                        <div class="top-left-triangle"><p>当前</p></div>
                        <div className='accountType-card-title'>免费版</div>
                        <div className='accountType-card-price'>原价: ¥258/月</div>
                        <div className='accountType-card-discountPrice'>永久免费</div>
                    </div>
                    <div  style={{borderColor: '#0BBA97'}} className='accountType-card-body flex-column-center'>
                        <div className='open-title-1'>点击查看功能对比</div>
                        <div onClick={()=>setSpread(!spread)} className='flex-center'>
                           {spread ? 
                           <DoubleRightOutlined style={{color: '#0BBA97'}} className='spread-icon_rotate'/> :
                            <DoubleRightOutlined style={{color: '#0BBA97'}} className='spread-icon'/>}
                        </div>
                        <ReactIf show={spread}>
                        <div className='function-list'>
                            <div>
                                <div className='flex-center mb-20px text_title_small'>基本功能</div>
                                <div className='flex-between'>
                                    <div className='text color-666'>免费创建活动</div>
                                    <div className='support-text'>支持</div>
                                </div>
                                <div className='flex-between'>
                                    <div className='text color-666'>复制活动</div>
                                    <div className='support-text'>支持</div>
                                </div>
                                <div className='flex-between'>
                                    <div className='text color-666'>不限制活动个数</div>
                                    <div className='support-text'>支持</div>
                                </div>
                            </div>
                        </div>
                        </ReactIf>
                            <div className='open-button flex-center'> 点击开通 </div>
                        </div>
                    
                </Card>
            </Col>
            <Col
                {...colLayout_2}
                className='flex-center'
            >
            <Card 
                hoverable
                bordered={false}
                className='accountType-card '>
                    <div style={{backgroundColor: '#A038D1'}} className='accountType-card-header flex-column-center'>
                        <div className='accountType-card-title'>专业版</div>
                        <div className='accountType-card-price'>原价: ¥258/月</div>
                        <div className='accountType-card-discountPrice'>优惠价: ¥258/月</div>
                    </div>
                    <div 
                        style={{borderColor: '#A038D1'}}
                        className='accountType-card-body flex-column-center'>
                        <div style={{color: '#A038D1'}} className='open-title-1'>点击查看功能对比</div>
                        <div className='flex-center'>
                            <DoubleRightOutlined style={{color: '#A038D1'}} className='spread-icon'/>
                        </div>
                        <div className='open-button flex-center'> 点击开通 </div>
                    </div>
                </Card>
            </Col>
            <Col
            {...colLayout_2}
            className='flex-center'
            >
            <Card 
                hoverable
                bordered={false}
                className='accountType-card '>
                    <div style={{backgroundColor: '#FF6B01'}} className='accountType-card-header flex-column-center'>
                        <div className='accountType-card-title'>专业版</div>
                        <div className='accountType-card-price'>原价: ¥258/月</div>
                        <div className='accountType-card-discountPrice'>优惠价: ¥258/月</div>
                    </div>
                    <div 
                    style={{borderColor: '#FF6B01'}}
                    className='accountType-card-body flex-column-center'>
                        <div style={{color: '#FF6B01'}} className='open-title-1'>点击查看功能对比</div>
                        <div className='flex-center'>
                            <DoubleRightOutlined style={{color: '#FF6B01'}} className='spread-icon'/>
                        </div>
                        <div className='open-button-selected-1 flex-center'> 点击开通 </div>
                    </div>
                </Card>
            </Col>
            <Col
            {...colLayout_2}
            className='flex-center'
            >
            <Card 
                bordered={false}
                hoverable
                className='accountType-card'>
                    <div style={{backgroundColor: '#ED424E'}} className='accountType-card-header flex-column-center'>
                        <div className='accountType-card-title'>功能定制</div>
                        <div className='accountType-card-price'>
                            提供所需定制功能
                        </div>
                        <div className='accountType-card-discountPrice'>联系客服</div>
                    </div>
                    <div  
                    style={{backgroundColor: '#ED424E'}}
                    className='accountType-card-body flex-column-center'>
                        <div style={{color: '#ED424E'}} className='open-title-1'></div>
                        <div className='flex-center  mb-70px'>
                        </div>
                        <div style={{border: '0px'}} className='open-button flex-center'> 联系客服 </div>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
}
/**
 * @type React Component
 * @description 付款类型
 */
function PayType({selected}) {
    
    return <div className={ selected ? 'pay-type-selected flex-between' : 'pay-type flex-between'}>
        <div className='pay-type-price flex-column-all-center'>
            <div className='price'>¥168.00</div>
            <div className='discount-price'>原价: ¥198</div>
        </div>
        <div className='pay-type-time flex-center'>
            一个月
        </div>
    </div>
}

/**
 * @type React Component
 * @description 支付表单
 */
function PayForm() {
    return <div className='account-payform mt-50px'>
        <div className='flex'>
            <div className='account-payform-label text'>当前用户</div>
            <div className='account-payform-text text'>18370893382(免费用户)</div>
        </div>
        <div className='flex mt-40px'>
            <Row>
                <Col><div className='account-payform-label text mb-10px'>开通时长</div></Col>
                <Col><div className='account-payform-text text'>
                    <div className='flex flex-wrap'>
                        <PayType selected/>
                        <PayType/>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
        <div className='flex mt-30px'>
            <div className='account-payform-label text'>账户余额</div>
            <div className='account-payform-text text'>
                ¥ 0.00 余额不足 <span className='ml-10px color-primary'>去充值</span>
            </div>
        </div>
    </div>
} 

/**
 * @type React Page
 * @description 账户类型
 */
function  AccountUpgradePage() {
    return <div className='page accountUpgrade-page mb-30px'>
        <div className='text_page-title'>投票专题</div>
        <AccountTypes></AccountTypes>
        <PayForm/>
        <Button className='pay-button' type='primary'>立即升级</Button>
    </div>
}

export default AccountUpgradePage;