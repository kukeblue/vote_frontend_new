import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Modal } from 'antd';
import './index.less'
import Logo from '../../component/Logo/index'
import { request } from '../../utils/request'
import { verifyPhoneNumber } from '../../utils/verify'
import { usePhoneVerifyCode } from '../../utils/reactHook'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createContainer, useContainer } from 'unstated-next';
import { verifyStrEmpty } from '../../utils/verify'
import qs from 'qs'

// @Type Compontent | 注册验证码接收器
function VerificationCodeInput({value, onChange, form}) {

  const { registerType } = useContainer(RegisterStore)

  const getPhoneCode = (mobile) => {
    request({
      url: registerType  === 1 ? '/api/user/get_register_code' : '/api/user/forget_get_code',
      data: { mobile }
    }).then(data=>{
      if(data.code === 1) {
        message.success(data.msg)
      }else {
        message.error(data.msg)
      }
    })
  }
  const {
    countDown, 
    onClickGetPhoneCode
  } = usePhoneVerifyCode()
  
  return  <div className='flex-between'>
    <Input autoComplete="off" value={value} onChange={(e)=>{onChange(e.target.value)}} placeholder='请输入验证码' style={{width: 120}} className='p-loginFormCard-input'/>
    <Button style={{width: 160}}  onClick={()=>{
      if(countDown === 60) {
        let mobile = form.getFieldValue('mobile')
        if(mobile && verifyPhoneNumber(mobile)) {
          getPhoneCode(mobile)
          onClickGetPhoneCode();
        }else{
          message.error('验证码发送失败，请输入正确的手机号')
        }
      }else {
        message.warn('验证码已发送')
      }
    }}>
      {countDown === 60 ? '获取验证码' : <div className='color-primary'><div style={{width: 20, display: 'inline-block'}}> { countDown } </div> 秒后再次发送 </div> }
    </Button>
  </div>
}
let registerFormTimer = null;
// @Type Compontent | 注册表单
function RegisterForm() {

  const  { registerType } =  useContainer(RegisterStore)

  const history = useNavigate()
  const doRegister = (data) => {
    request({
      url: registerType === 1 ? '/api/user/register' : '/api/user/forget',
      data,
    }).then(res=>{
      if(res.code === 0) {
        message.error(res.msg)
      }else {
        // message.success('注册成功')
        Modal.confirm({
          title: registerType === 1 ? '注册成功' : '重置密码成功',
          content: (<div> 重置密码成功，3秒后自动跳转登录... </div>),
          okText: '跳转登录',
          onOk: ()=>{
            clearTimeout(registerFormTimer);
            history.replace('/user/login')
          }
        });
        registerFormTimer = setTimeout(() => {
          history.replace('/user/login')
        }, 3000)
      }
    })
  }
  let [form] = Form.useForm()
  return <div>
      <div className='p-loginFormCard-title flex-center'>
        {registerType === 1?'用户注册': '重置密码'}
      </div>
      <Form
        form={form}
        labelCol={{ span: 24  }}
        wrapperCol={{ span: 24 }}
        hideRequiredMark={true}
      >
        <Form.Item 
            label='手机号'
            name='mobile'
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1(3|4|5|7|8|6|9)\d{9}$/, message: '请输入11位电话号码' }
          ]}
        >
          <Input type='number' autoComplete="off" placeholder='请输入手机号' className='p-loginFormCard-input'/>
        </Form.Item>
        <input type="password" style={{position: 'absolute', top: '-999px'}}/>
        <Form.Item 
            label='密码'
            name='password'
            rules={[{ 
              required: true, 
              validator: (rule, value, callback) => {
                if(!value) {
                  callback('请输入密码');
                }else if(value.length < 6){
                  callback('密码长度要大于6位');
                }
                callback()
              }
           }]}
        >
          <Input autoComplete="off" type='password' placeholder='请输入密码' className='p-loginFormCard-input'/>
        </Form.Item>
        <Form.Item 
            label='密码确认'
            name='towpassword'
            rules={[{ 
              required: true, 
              validator: (rule, value, callback) => {
                if(form.getFieldValue('password') !== value) {
                  callback('两次输入密码不一致');
                }
                callback()
              }
            },
          ]}
        >
          <Input autoComplete="off" type='password' placeholder='请输入密码' className='p-loginFormCard-input'/>
        </Form.Item>
        <Form.Item 
            label='手机验证码'
            name='code'
            rules={[
              { required: true, message: '请输入手机验证码' },
          ]}
        >
          <VerificationCodeInput form={form}/>
        </Form.Item>
        <Button 
          onClick={()=>{
            // console.log('点击注册')
            form.validateFields().then(values=>{
              // console.log('注册提交表单:', values)
              doRegister(values)
            })
          }}
        className='p-loginFormCard-button mt-10px' type="primary"> 注册 </Button>
        <Link to="/user/login">
          <Button className='p-loginFormCard-button mt-20px' style={{color: '#333'}} > 已有账号，去登录 </Button>
        </Link>
      </Form>
    </div>
}
// @Type Compontent | 注册框底部导航
function BottomLink() {  const { registerType } = useContainer(RegisterStore)
  const onClickForgetPassword = () => {
    if(registerType === 1) {
      window.location.replace("/user/register?type=2")
    }else {
      window.location.replace("/user/register?type=1")
    }
  }
  return <div>
    <div className='flex-center mt-30px'>
      <a href='/' className='p-loginLink'>返回首页</a>
      <a onClick={onClickForgetPassword} className='p-loginLink'>
        {registerType === 1 ? '忘记密码' : '注册账号'} 
      </a>
    </div>
    <div className='flex-center band'>
    © CopyRight 2013-2020,All Rights Reserved.
    </div>
  </div>
}
// @Type Page | 注册和重置密码通用组件
function Register(props) {
  return (
    <div className='page flex-column-all-center'>
        <Logo></Logo>
        {/* 登录卡片 */}
        <div className='p-loginFormCard'>
            {RegisterForm()}
        </div>
        {BottomLink()}
    </div>
  );
}
// @Type PageStore | 注册和重置密数据商店
function useRegisterStore() {
  const [registerType, setRegisterType] = useState(1) // 1 注册模式，2忘记密码模式
  const location = useLocation()
  useEffect(()=>{
    if(verifyStrEmpty(location.search)) {
      const query = qs.parse(location.search.split('?')[1])
      // console.log(query)
      if(query.type &&  query.type < 3) {
        setRegisterType(query.type)
      }
    }
  }, [])
  return {
    registerType,
    setRegisterType,
  }
}
let RegisterStore = createContainer(useRegisterStore)

export default ()=>{
  return <RegisterStore.Provider>
    <Register></Register>
    </RegisterStore.Provider>
}

