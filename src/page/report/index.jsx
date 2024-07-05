import React, { useEffect, useState } from 'react'
import './index.less'
import { Button, Input, Radio, TextArea, Dialog} from 'antd-mobile'

export default function Report() {

  const [reportType, setReportType] = useState(1)
  const [reportText, setReportText] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(()=>{
    var pageMain = document.getElementById('page-main');
    pageMain.style.overflow = 'hidden';
    return ()=>{
      pageMain.style.overflow = 'auto';
    }

  }, [])


  return <div className='overflow-auto report-page w-full'>
    <div className='reportPage-content'>
      <div className='reportPage-title'>
        举报/投诉内容
      </div>
      <br />
      <Radio.Group onChange={(v)=>setReportType(v)} defaultValue='1'>
        <div className='pl-30px pr-30px flex flex-row-between'>
        <Radio className='m-0.2rem' value='1'>违法</Radio>
        <Radio className='m-0.2rem' value='2'>诈骗</Radio>
        <Radio className='m-0.2rem' value='3'>抄袭</Radio>
        </div>
        <div className='pl-30px pr-30px flex-row-between'>
        <Radio className='m-0.2rem' value='4'>刷票</Radio>
        <Radio className='m-0.2rem' value='5'>色情</Radio>
        <Radio className='m-0.2rem' value='6'>广告</Radio>
        </div>
        
      </Radio.Group>
      <div className='reportPage-title mt-1rem'>
        举报/投诉描述
      </div>
      <div className='m-10px reportPage-text-area'> 
        <TextArea onChange={(v)=> setReportText(v)} className='p-10px' placeholder='请输入举报/投诉描述' rows={5} />
      </div>
      <div className='reportPage-title mt-1rem'>
        联系电话
      </div>
      <div className='m-10px reportPage-text-area'> 
        <Input onChange={(e)=> {setPhone(e)}} className='p-10px' placeholder='请输入联系电话' />
      </div>
      <div className='m-10px mt-1rem flex justify-center'> 
        <Button onClick={()=>{
          if(reportText != '' && phone != '') {
            Dialog.alert({
              content: '提交成功！请忽重复提交',
              closeOnMaskClick: true,
            })
          }else {
            Dialog.alert({
              content: '请完善上面的内容',
              closeOnMaskClick: true,
            })
          }
        }} color='primary' className='h-50px mt-20px' fill='solid' block>提交</Button>
      </div>
    </div>
  </div>
}