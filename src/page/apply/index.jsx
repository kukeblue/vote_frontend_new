import React, { useEffect, useState, useCallback, useRef } from 'react'
import CryptoJS from 'crypto-js'
import './index.less'
import { ImageViewer, Form, Input, ImageUploader, Picker, Button, TextArea, Toast, Dialog, Space, Image, Radio } from 'antd-mobile'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import axios from 'axios';
import { formatTime, getImageByCode } from '../../utils/format'
import { doApply, fetchApplyStatus } from '../../api'
import CheckWechat from '../../component/CheckWechat'
import { LinkOutline } from 'antd-mobile-icons'
import {
	UnorderedListOutline,
	PayCircleOutline,
	SetOutline,
	DownOutline
} from 'antd-mobile-icons'
import { C_ApplyDownloadAttachment, C_ApplyInputPlaceholders } from './custom'
import { RightOutline } from 'antd-mobile-icons'
export default () => {
	const [showGroupPicker, setShowGroupPicker] = useState(false)
	const [showApplyPicker, setShowApplyPicker] = useState(false)

	const groups = usePlayerStore((state) => state.groups)
	const [selectedGroup, setSelectedGroup] = useState()
	const enrollNameInput = useSettingStore((state) => state.activitySetting.enroll_name_input.values)
	const enrollInfoInput = useSettingStore((state) => state.activitySetting.enroll_info_input.values)
	const enrollCustomInput = useSettingStore((state) => state.activitySetting.enroll_custom_input.values)
	const openVideoEnroll = useSettingStore((state) => state.activitySetting.open_video_enroll.values)
	const openImageEnroll = useSettingStore((state) => state.activitySetting.open_image_enroll.values)
	const enrollStartAt = useSettingStore((state) => state.activitySetting.enroll_start_at.values)
	const enrollStartEnd = useSettingStore((state) => state.activitySetting.enroll_start_end.values)
	const enrollPicName = useSettingStore((state) => state.activitySetting.enroll_pic_name.values)
	const enrollPicImageAtLeast = useSettingStore((state) => state.activitySetting.enroll_pic_image_at_least.values)
	const enrollPicImageAtMost = useSettingStore((state) => state.activitySetting.enroll_pic_image_at_most.values)

	const activityId = useSettingStore((state) => state.activityId)
	const openid = useSettingStore((state) => state.openid)
	const [applyResult, setApplyResult] = useState()
	const [applyResults, setApplyResults] = useState([])

	const useDebounce = (callback, delay) => {
		const timer = useRef(null);
	
		const debouncedCallback = useCallback((...args) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				callback(...args);
			}, delay);
		}, [callback, delay]);
	
		return debouncedCallback;
	};

	const [form] = Form.useForm()

	const handleSubmitDebounce = useDebounce(() => {
		console.log('防抖提交')
        handleSubmit()
    }, 300); // 300ms 防抖

	const handleSubmit = async () => {
		try {

			const values = await form.validateFields(); // 触发表单验证
			// 这里可以添加表单提交到服务器的代码

			const covers = values.images ? values.images.map(item => item.url.split('/').pop()) : ''

			if (covers.length < enrollPicImageAtLeast) {
				Toast.show({
					icon: 'fail',
					content: '最少上传' + enrollPicImageAtLeast + '张' + enrollPicName,
				})
				return
			}

			enrollCustomInput.map((item, i) => {
				if (item.type == 'image') {
					values[item.name] = values[item.name] ? (values[item.name].map(t => t.url.split('/').pop())).toString() : ''
				}
			})

			const {
				images, info, name, video, ...others
			} = values



			doApply(activityId, {
				group_id: selectedGroup.id,
				name,
				info,
				covers,
				video,
				openid,
				...others
			}).then(res => {

				if (res.code == 0) {
					Dialog.alert({
						confirmText: "确认",
						content: '提交报名成功',
						onConfirm: () => {
							location.reload()
						},
					})

				} else {
					Toast.show({
						icon: 'fail',
						content: res.msg,
					})
				}
			})


		} catch (error) {
			console.error('Validation Failed:', error);
			Toast.show(error.errorFields[0].errors[0]);



		}
	}

	const handleApplyHistory = (v) => {
		if (v && v[0]) {
			let selectedApply = applyResults.find(item => {
				return item.id == v[0]
			})
			setApplyResult(selectedApply)
		}
		setShowApplyPicker(false)
	}
	const groupMap = {}
	groups.map(item=>{
		groupMap[item.id] = item.name
	})
	const handleSelectGroup = (v) => {

		if (v && v[0]) {
			let selectedGroup = groups.find(item => {
				return item.id == v[0]
			})
			setSelectedGroup(selectedGroup)
		}
		setShowGroupPicker(false)

	}

	const handleUpload = async (data, e) => {
		function calculateSignature(jsonData, appSecret) {
			// 构建签名字符串
			const joinStr = Object.keys(jsonData).sort();
			const buffer = [];
			joinStr.forEach(function (key) {
				buffer.push(key + '=' + jsonData[key]);
			});
			const createLinkString = buffer.join('&') + '&key=' + appSecret;
			// 计算签名
			const encryptedString = CryptoJS.MD5(createLinkString)
				.toString()
				.toLowerCase();
			return encryptedString;
		}
		const appkey = 'yaowhat980yxyznc';
		const appsercet = 'FDXk8_mUDPCPexslldeu4_ttyVFXJ3P1TzHB9I04';
		const timestamp = new Date().getTime();
		const jsonData = {
			appkey,
			timestamp: timestamp.toString(),
		};

		const token = calculateSignature(jsonData, appsercet);

		const form = new FormData();
		form.append('file', data, data.name);
		form.append('params', JSON.stringify(jsonData));

		const config = {
			method: 'post',
			url: 'https://upload.fvwboxx.cn/oss/upload',
			headers: {
				token,
			},
			data: form,
		};

		let res = await axios(config);
		if (res.status == 200) {
			return {
				url: getImageByCode(res.data.data.filename)
			};
		} else {
			return false;
		}
	}

	const handleApplyAgain = () => {
		setApplyResult(null)
	}

	useEffect(() => {
		if (!selectedGroup && groups.length > 0) {
			setSelectedGroup(groups[1])
		}
	}, [groups])

	useEffect(() => {
		if (activityId && openid) {

			fetchApplyStatus(activityId, openid).then(res => {
				if (res.code == 0) {
					if(res.data.length == 0) {
						setApplyResults([])
					}else {
						setApplyResults(res.data)
						setApplyResult(res.data[0])
					}
				}
			})
		}
	}, [activityId, openid])
	const groupsPickerData = groups.filter(item => item && item.id != 'all').map(item => {
		return { label: item.name, value: item.id }
	})

	const applyPickerData = applyResults.filter(item => item && item.id != 'all').map(item => {
		return { label: item.name, value: item.id }
	})

	const beforeUpload = (file) => {
		if (file.size > 1024 * 1024 * 5) {
			Toast.show('请选择小于 5M 的图片')
			return null
		}
		return file
	}
	const isCustomBlock = (() => {
		if(['669f064102199a22bf526f08'].includes(activityId)){
			return true
		}
	})()
	const renderCustomBlock = () => {

		return <div className='h-7.5rem w-full px-20px flex items-start justify-center'>
			<Button onClick={()=>{
					location.href = "https://www.wjx.cn/vm/mTXxJ8o.aspx#"
				}}  color="primary"
				size='large'>
				<div className='flex items-center'>
					<span>科技企业报名</span><RightOutline fontSize={18} />
				</div>
			</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<Button color="primary"
			 onClick={()=>{
				location.href = "https://www.wjx.cn/vm/YDkkYco.aspx#"
			}}
				size='large'>
				<div className='flex items-center'>
					<span>应用项目报名</span><RightOutline fontSize={18} />
				</div>

			</Button>
		</div>
	}


	let replaceMap = C_ApplyInputPlaceholders(activityId)
	return <div className='apply-page w-full'>
		<div className='p-4 text-color_time_count'>
			<div className='flex mb-3px'>
				<div className='flex items-center'><span className='iconfont icontime relative top-[0.02rem]'></span>&nbsp;<span className='text-common'>报名开始</span></div>
				<div className='pl-10px text-common'>{enrollStartAt}</div>
			</div>
			<div className='flex'>
				<div className='flex items-center'><span className='iconfont icontime relative top-[0.02rem]'></span>&nbsp;<span className='text-common'>报名截止</span></div>
				<div className='pl-10px text-common'>{enrollStartEnd}</div>
			</div>
		</div>
		
		{isCustomBlock ? renderCustomBlock() : <div className='w-full px-20px'>
			<Form
				form={form}
				style={{ '--border-bottom': '0px' }}>
				{C_ApplyDownloadAttachment(activityId) && <Form.Item  layout='horizontal' label='报名附件'>
					<div className='flex items-center justify-between '>
						<Input placeholder= ''/>
						<Button
						onClick={()=>{
							location.href  = C_ApplyDownloadAttachment(activityId)
						}}
						color="primary"
						size='small'
						className='w-100px'
						>
							<span className='text-base'>下载</span>
							<LinkOutline />
						</Button>
					</div>
					<div className='mt-5px text-base text-left text-color_time_count'>附件说明：提交下面基本信息报名成功后，请下载附件填写详细信息后发送到邮箱xxxxxxxx</div>
				</Form.Item>}
				{applyResult && <Form.Item layout='horizontal' label='报名历史'>
					<div className='flex items-center justify-between '>
						<Picker onCancel={()=>setShowApplyPicker(false)} onConfirm={handleApplyHistory} visible={showApplyPicker} columns={[applyPickerData]}></Picker>
						<Input disabled placeholder= ''/>
						<Button
							onClick={() => {
								setShowApplyPicker(true)
							}}
							size='small'
							className='w-100px'
						>
								<DownOutline />
								<span className='text-base'>查看</span>
						</Button>
					</div>
				</Form.Item>}
				{applyResult && <Form.Item layout='horizontal' label='报名状态'>
					<div className='flex items-center justify-between '>
						<Input disabled placeholder= ''/>
						<Button
							color={applyResult.state == 1? "success" : (applyResult.state == 0 ? "warning" : "danger")}
							size='small'
							className='w-150px'
						>
							{applyResult.state == 0 ?'审核中': (applyResult.state == 1? '报名成功':'审核失败')}
						</Button>
					</div>
				</Form.Item>}
				<Form.Item layout='horizontal' label='分组'>
				{!applyResult ? <div className='flex items-center justify-between '>
						<Picker onCancel={()=>setShowGroupPicker(false)} onConfirm={handleSelectGroup} visible={showGroupPicker} columns={[groupsPickerData]}></Picker>
						<Input value={selectedGroup && selectedGroup.name} placeholder='请选择分组' />
						<Button
							size='small'
							className='w-100px'
							onClick={() => {
								setShowGroupPicker(true)
							}}
						>
							
								<DownOutline />
								<span className='text-base'>选择</span>
							
						</Button>
					</div>: groupMap[applyResult.group_id]}
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: enrollNameInput.text + '不能为空' }]}
					layout='horizontal' label={enrollNameInput.text} name={enrollNameInput.name}>
					{applyResult ? applyResult[enrollNameInput.name] : <Input placeholder={'请输入' + enrollNameInput.text} />}
				</Form.Item>
				{enrollInfoInput.attribute != 3 &&
					<Form.Item layout='horizontal' rules={[{ required: enrollInfoInput.attribute == 2, message: enrollInfoInput.text + '不能为空' }]} label={enrollInfoInput.text} name={enrollInfoInput.name}>
						{applyResult ? applyResult[enrollInfoInput.name] : 
						<Input placeholder={replaceMap ? replaceMap('请输入' + enrollInfoInput.text): '请输入' + enrollInfoInput.text} />}
					</Form.Item>
				}
				{enrollCustomInput.map((item, i) => {
					if (item.attribute == 3) return
					return <>
						{item.type == "textarea" && <Form.Item
							rules={[{ required: item.attribute == 2, message: item.text + '不能为空' }]}
							layout={item.type == "textarea" ? "vertical" : 'horizontal'} key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <TextArea className='m-t-2 mx-0.5' placeholder={'请输入' + item.text} rows={2} />}
						</Form.Item>}
						{(item.type == "text" || item.type == 'address') && <Form.Item
							rules={[{ required: item.attribute == 2, message: item.text + '不能为空' }]}
							layout={item.type == "textarea" ? "vertical" : 'horizontal'} key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <Input clearable placeholder={'请输入' + item.text} rows={3} />}
						</Form.Item>}
						{item.type == "radio" && <Form.Item
							rules={[{ required: item.attribute == 2, message: item.text + '不能为空' }]}
							layout={item.type == "textarea" ? "vertical" : 'horizontal'} key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] :
								<Radio.Group  >
									<Space direction='horizontal'>
										{item.options && item.options.map(item => {
											return <Radio key={item} value={item}>{item}</Radio>
										})}
									</Space>
								</Radio.Group>
							}
						</Form.Item>}
						{item.type == "number" && <Form.Item
							rules={[{ required: item.attribute == 2, message: item.text + '不能为空' }]}
							layout={item.type == "textarea" ? "vertical" : 'horizontal'} key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <Input type="number" clearable placeholder={'请输入' + item.text} rows={3} />}
						</Form.Item>}
						{item.type == "age" && <Form.Item
							rules={[{ required: item.attribute == 2, message: item.text + '不能为空' }]}
							layout={item.type == "textarea" ? "vertical" : 'horizontal'} key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <Input max={120} min={0} type="number" clearable placeholder={'请输入' + item.text} rows={3} />}
						</Form.Item>}
						{item.type == "phone" && <Form.Item
							validateTrigger="onBlur"
							rules={[
								{ required: item.attribute == 2, message: item.text + '不能为空' },
								{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
							]}
							layout="horizontal" key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <Input type="number" clearable placeholder={'请输入' + item.text} />}
						</Form.Item>}
						{item.type == "link" && <Form.Item
							validateTrigger="onBlur"
							rules={[
								{ required: item.attribute == 2, message: item.text + '不能为空' },
								{
									pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
									message: '请输入有效的网址'
								}
							]}
							layout="horizontal" key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <Input type="number" clearable placeholder={'请输入' + item.text} />}
						</Form.Item>}
						{item.type == "idcard" && <Form.Item
							validateTrigger="onBlur"
							rules={[
								{ required: item.attribute == 2, message: item.text + '不能为空' },
								{ pattern: /^\d{17}[\dXx]$/, message: '请输入有效的身份证号码' }
							]}
							layout="horizontal" key={i} label={item.text} name={item.name}>
							{applyResult ? applyResult[item.name] : <Input type="number" clearable placeholder={'请输入' + item.text} />}
						</Form.Item>}
						{item.type == "image" &&
							<Form.Item
								rules={[
									{ required: item.attribute == 2, message: item.text + '不能为空' },
								]}
								layout="vertical" key={i} label={item.text} name={item.name}>
								{!applyResult ? <ImageUploader
									beforeUpload={beforeUpload}
									className='m-t-2 mx-0.5'
									upload={handleUpload}
									multiple
									maxCount={3}
								/> : <div className='m-t-1 flex' style={{flexWrap: 'wrap'}}>
									{
										applyResult[item.name] && applyResult[item.name].split(",").map(item => {
											return <Image className='m-l-5px' onClick={()=>{
												ImageViewer.show({
													image: getImageByCode(item),
												})
											}} width={100} key={item} src={getImageByCode(item)} />
										})
									}

								</div>}
							</Form.Item>}





					</>
				})
				}

				{openImageEnroll && <Form.Item
					rules={[{ required: true, message: '请上传' + enrollPicName }]}
					name='images' label={<div>{enrollPicName + '上传'} 
					<span style={{marginLeft: '10px'}} className='text-color_dec text-small'>最少上传{enrollPicImageAtLeast}张, 最多上传{enrollPicImageAtMost}张{enrollPicName}</span></div>}>
					{!applyResult ? <ImageUploader
						className='m-t-2 mx-0.5'
						upload={handleUpload}
						multiple
						maxCount={enrollPicImageAtMost}
						beforeUpload={beforeUpload}
					/> : <div className='m-t-1 flex'  style={{flexWrap: 'wrap'}}>
						{
							applyResult && applyResult.covers && applyResult.covers.map(item => {
								return <Image className='m-l-5px' onClick={()=>{
									ImageViewer.show({
										image: getImageByCode(item),
									})
								}}  width={100} key={item} src={getImageByCode(item)} />
							})
						}

					</div>
					}
				</Form.Item>}
				{openVideoEnroll && <Form.Item
					rules={[{ required: true, message: '请填写视频代码' }]}
					name='video' label='视频报名'>
					{!applyResult ? <Input placeholder='请插入视频通用代码，仅支持腾讯视频和哔哩哔哩视频' />
						: <div>{applyResult.video}</div>}
				</Form.Item>}
			</Form>
			<br />
			<br />
			{applyResult && <div className='flex justify-center w-full px-20px'>
				<CheckWechat
					onClick={()=>{handleApplyAgain()}} parameters={[]}
				><Button block color='primary' size='middle'>
						<span className='text-common'>再次报名</span>
					</Button></CheckWechat>
			</div>}
			{!applyResult && <div className='flex justify-center w-full px-20px'>
				<CheckWechat
					onClick={handleSubmitDebounce} parameters={[]}
				><Button block color='primary' size='middle'>
						<span className='text-common'>提交报名</span>
					</Button></CheckWechat>
			</div>}
		</div>}
	</div>
}

