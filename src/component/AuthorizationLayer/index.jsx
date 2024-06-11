import React from 'react'
import './index.less'
import { fetchAuthUrl } from '../../api/index'
import useSettingStore from '../../store/settingStore'
import { ExclamationCircleOutline } from 'antd-mobile-icons'

function AuthorizationLayer(props) {

    const activityId = useSettingStore((state) => state.activityId)
    
    const handleClickAuth = async () => {

        const res = await fetchAuthUrl(activityId)

        if (import.meta.env.MODE === 'development') {
            res.data = res.data.replace('middle', 'middle2')
        }
        location.href = res.data
        // https://m.kukechen.top/activity/middle?domain=O3NYGq&code=031UYZkl2R3O0c4t70ml2Ydvj71UYZkf&state=
    }

    return (
        <div className='authorization-layer bg-black bg-opacity-70 w-full h-full absolute left-0 top-0'>
            <div className='flex-col rounded-tl-md rounded-tr-md justify-center items-center flex absolute left-0 bottom-0 w-full h-180px bg-white'>
                <div className='m-b-20px text-lg flex items-center'><ExclamationCircleOutline color='rgb(255, 143, 31)' fontSize={24}/>&nbsp;&nbsp;需微信登录后使用完整服务</div>
                <div className='w-7rem text-center flex items-center justify-center bg-wechat text-white text-title px-1rem py-0.2rem rounded-10px bg-black' onClick={handleClickAuth}>
                    <span className='iconweixin iconfont text-icon_tab'></span>&nbsp;
                    一键登录
                </div>
            </div>
        </div>
    );
}

export default AuthorizationLayer;
