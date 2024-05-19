import { Col, Input, Row, Form, Button, Switch } from 'antd';
import React from 'react'
import {
  colLayout_3,
  colLayout_2,
  colLayout_1,
  colLayout_template,
  colLayout_editor
} from '../../../config/colLayout';
import Ueitor from '../../../component/Ueitor'
import './index.less'


/**
 * @type React Component
 * @description 文章模版
 */
function ArticleTemplate() {
  return <div className='voteEdit-article-template'>
    <div className='flex-center article-template-header'>文章模版</div>
    <div className='flex-column-center pt-20px'>
      <div className='article-template-item'></div>
    </div>
  </div>
}

/**
 * @type React Component
 * @description 投票编辑器
 */
const formlayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
function VoteEditor() {

  return <div className='editor-form'>
    <div className='editor-form-title mb-20px'>投票基本信息</div>
    <div className='ml-5px'>
      <Form {...formlayout}>
        <Form.Item name="投票标题" label="投票标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Row>
          <Col {...colLayout_3}>
            <Form.Item style={{ marginRight: 5 }} name="投票开始时间" label="投票开始时间" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col {...colLayout_3}>
            <Form.Item name="投票结束时间" label="投票结束时间" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item labelCol={12} name="活动公告" label="活动公告">
            <Switch defaultChecked onChange={()=>{}} />
        </Form.Item>
        <Form.Item labelCol={12} name="" label="">
          <Input />
        </Form.Item>
        <Form.Item labelCol={12} name="关闭活动" label="关闭活动">
            <Switch defaultChecked={false} onChange={()=>{}} />
        </Form.Item>
        <Row>
          <Col {...colLayout_editor}>
            <Ueitor />
            <div className='flex-center mt-20px'>
              <Button className='mr-20px ml-80px'>返回</Button>
              <Button type="primary">下一步</Button>
            </div>
          </Col>
          <Col  {...colLayout_template}>
            <ArticleTemplate></ArticleTemplate>
          </Col>
        </Row>
      </Form>
    </div>
  </div>

}


export default VoteEditor