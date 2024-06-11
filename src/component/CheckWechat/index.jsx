import React from 'react'
import './index.less'
import { Modal } from 'antd-mobile'
import QRCode from 'qrcode';
import { isWeChatClient } from '../../utils/env';

export default function CheckWechat(props) {

    const handleClick = async () => {
        if(isWeChatClient()) {

            props.onClick(...props.parameters)
        }else{
            const url = await QRCode.toDataURL(location.href);
            Modal.alert({
                confirmText: '确认',
                closeOnMaskClick: true,
                image: url,
                title: '请用微信扫码打开',
            })

        }
    }

    return <div className='w-full h-full flex justify-center items-center' onClick={handleClick}>
        {props.children}  
    </div>
}