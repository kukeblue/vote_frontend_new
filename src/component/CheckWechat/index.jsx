import React, { useEffect, useRef } from 'react'
import './index.less'
import { Modal } from 'antd-mobile'
import QRCode from 'qrcode';
import { isWeChatClient } from '../../utils/env';
import useSettingStore from '../../store/settingStore';
import { getObCache, setObCache } from '../../utils/cache';
import { formatDate } from '../../utils/date';

export default function CheckWechat(props) {
    const subscribe = useRef(null);
    const activityId = useSettingStore((state) => state.activityId)
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
    let open_subscription = props.openSubscription
    let date = formatDate(new Date()) 
    useEffect(() => {
        if(open_subscription) {
            const success = (e, d) => {
                setObCache('open_subscription', {isOpen: true, date: date })
                handleClick()
            };
            const error = (e, d) => {
                setObCache('open_subscription', {isOpen: true, date: date})
                handleClick()
            };
            if(!subscribe || !subscribe.current) {
                return 
            }
            subscribe.current.addEventListener('success', success);
            subscribe.current.addEventListener('error', error);
            // audio.current.addEventListener('seeked', seeked);
            return () => {
                subscribe.current.removeEventListener('success', success);
                subscribe.current.removeEventListener('error', error);
            };
        }
    }, []);
    
    const open_subscription_cache = getObCache('open_subscription')
    if(open_subscription_cache && open_subscription_cache.date == date ){
        open_subscription = false
    }
    return (isWeChatClient() && open_subscription)?
    <wx-open-subscribe ref={subscribe} template="yW6yk37RN5sDJZpnDaTZci7fs46wmZGQoaHnudWtjpU,78Z59_0YXFNIBpoFfnnIht_SsDRKkVmSvsqRHGA5Ljw" id="subscribe-btn">
        {/* <script type="text/wxtag-template" slot="style">
            <style>
            .subscribe-btn {
                color: #fff;
                background-color: #07c160;
            }
            </style>
        </script> */}
        <script type="text/wxtag-template">
            <div style={{
                color: '#fff',
                width: '100px', 
                height: '100%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
                }} className='w-full h-full flex justify-center items-center' onClick={handleClick}>
                {props.children}  
            </div>
        </script>
    </wx-open-subscribe>:
    <div className='w-full h-full flex justify-center items-center' onClick={handleClick}>
        {props.children}  
    </div>
}