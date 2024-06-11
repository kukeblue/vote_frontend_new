import React, { useEffect, useState, useRef } from 'react'
import './index.less'
import { Input } from 'antd-mobile'
import { fetchMatchCaptcha, fetchCalculateCaptcha, fetchBlockPuzzleCaptcha, fetchCnCaptcha } from '../../api'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { Captcha } from 'aj-captcha-react';
import GoCaptcha from 'go-captcha-react';
export default function AuthCodeModal({
}) {
    const ref = useRef();
    const [captchaId, setCaptchaId] = useState()
    const [reflash, setReflash] = useState(false)
    const [code, setCode] = useState()
    const [captchaCode, setCaptchaCode] = useState()
    const setAuthCodeModal = usePlayerStore((state) => state.setAuthCodeModal)
    const doVoteCancel = usePlayerStore((state) => state.doVoteCancel)
    const [slideData, setSlideData] = useState({})
    const [cnCaptcha, setCnCaptcha] = useState()
    const doVoteConfirm = usePlayerStore((state) => state.doVoteConfirm)
    const vote_type = useSettingStore((state) => state.activitySetting.vote_type.values)
    const captchaType = useSettingStore((state) => state.activitySetting.captcha_type.values)
    const activityId = useSettingStore((state) => state.activityId)
    let isSingleVote;
    if (vote_type == 1) {
        isSingleVote = true
    } else {
        isSingleVote = false
    }
    const handleOk = (e) => {
        console.log('e', e, captchaType)
        if (captchaType == 1) {
            doVoteConfirm({ activityId, captchaId, code, isSingleVote })
            setAuthCodeModal(false);
        }
        if (captchaType == 2) {
            doVoteConfirm({ activityId, captchaId, code, isSingleVote })
            setAuthCodeModal(false);
        }
        if (captchaType == 4) {
            console.log('captchaId??', captchaId)
            doVoteConfirm({ activityId, captchaId, code, isSingleVote })
            setAuthCodeModal(false);
        }if (captchaType == 3) {
            console.log(e)
            const dots = []
            e.forEach(element => {
                dots.push(element.x)
                dots.push(element.y)
            });
            doVoteConfirm({ activityId, captchaId, code, isSingleVote, dots: dots.toString() })
        }
        // setShowVoteResult(true)
    }
    useEffect(() => {
        handleChangeCode()
        // handleRequestCaptCode()

    }, [])
    const handleChangeCode = () => {
        if (captchaType == 1) {
            fetchMatchCaptcha().then(res => {
                const { captchaId, data } = res.data
                setCaptchaCode(data)
                setCaptchaId(captchaId)
            })
        } else if (captchaType == 2) {
            fetchCalculateCaptcha().then(res => {
                const { captchaId, data } = res.data
                setCaptchaCode(data)
                setCaptchaId(captchaId)
            })
        } else if (captchaType == 3) {
            fetchCnCaptcha().then(res => {
                const {
                    captcha_key,
                    code,
                    image_base64,
                    thumb_base64

                } = res
                setCaptchaId(captcha_key)
                setCnCaptcha({
                    image: image_base64,
                    thumb: thumb_base64
                })
            })
        } else if (captchaType == 4) {
            ref.current?.verify();
            setTimeout(()=>{
                setReflash(true)
            }, 1000)
        }
    }
    const handleConfirmCnCaptcha = (e) => {
        console.log(e)
    }
    const handleClose = () => doVoteCancel({ isSingleVote })
    return <div className='auth-code-modal'>
        <div className='cloud'></div>
        {captchaType < 0 && <div className='authCodeModal-content-area'>


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
            <div onClick={() => doVoteCancel({ isSingleVote })} className="authCodeModal-options flex-between"><div className="authCodeModal-options_cancel flex-center">
                取消
            </div>
                <div onClick={() => { handleOk() }} className="authCodeModal-options_ok flex-center">
                    确定
                </div>
            </div>
        </div>}
        {captchaType == 3 && cnCaptcha && <div className='authCodeModal-content-area'><GoCaptcha.Click
            data={cnCaptcha}
            events={{
                confirm: handleOk,
                refresh: handleChangeCode,
                close: handleClose
            }}
        /></div>}
        {captchaType == 4 && <div className='authCodeModal-content-area2'>
            {reflash && <div onClick={()=>{
               handleChangeCode()
            }} className='authCodeModal-reflash-icon'>
                <span className='iconshuaxin iconfont'></span>
            </div>}
            <Captcha
            onSuccess={(e) => {
                handleOk(e)
            }}
            onCancel={() => {
                doVoteCancel({ isSingleVote })
            }}
            path='/api/captcha/get_block_puzzle_captcha'
            type='slide'
            ref={ref}
        >
        </Captcha></div>}
        {captchaType == 4 && <div onClick={()=>{
            doVoteCancel({ isSingleVote })
        }} className='authCodeModal-close-icon'>
            <span className='iconclose iconfont'></span>
        </div>}
    </div>
}