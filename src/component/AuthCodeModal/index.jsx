import React, { useEffect, useState } from 'react'
import './index.less'
import { Input } from 'antd-mobile'
import { fetchMatchCaptcha } from '../../api'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'


export default function AuthCodeModal({
}) {
    const [captchaId, setCaptchaId] = useState()
    const [code, setCode] = useState()

    const [captchaCode, setCaptchaCode] = useState()
    const setAuthCodeModal = usePlayerStore((state) => state.setAuthCodeModal)
    const doVoteConfirm = usePlayerStore((state) => state.doVoteConfirm)
    const setShowVoteResult = usePlayerStore((state) => state.setShowVoteResult)
    const activityId = useSettingStore((state) => state.activityId)

    const handleOk = () => {
        doVoteConfirm({ activityId, captchaId, code })
        setAuthCodeModal(false);
        // setShowVoteResult(true)
    }

    useEffect(() => {
        handleChangeCode()
    }, [])

    const handleChangeCode = () => {
        fetchMatchCaptcha().then(res => {
            const { captchaId, data } = res.data
            setCaptchaCode(data)
            setCaptchaId(captchaId)
        })
    }


    return <div className='auth-code-modal'>
        <div className='cloud'></div>
        <div className='authCodeModal-content-area'>
            <div className="flex-cekiknter authCodeModal-title">验证码</div>
            <div className="flex-center authCodeModal-verification">
                <Input
                    onChange={(v) => setCode(v)}
                    value={code}
                    className='auth-input'
                    placeholder='请输入验证码'
                />
                <div onClick={() => handleChangeCode()} className='authCodeModal-code'>
                    {captchaCode && <img src={captchaCode}></img>}
                </div>
            </div>
            <div onClick={() => setAuthCodeModal(false)} className="authCodeModal-options flex-between"><div className="authCodeModal-options_cancel flex-center">
                取消
            </div> <div onClick={() => { handleOk() }} className="authCodeModal-options_ok flex-center">
                    确定
                </div></div>
        </div>
    </div>
}