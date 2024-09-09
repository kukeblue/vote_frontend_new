import React, { useEffect, useState } from 'react'
import './index.less'
import { Swiper, Image } from 'antd-mobile'
import QRCode from 'qrcode';

import utils from '../../utils/common'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'
import html2canvas from 'html2canvas';

export default function CanvasSwiperModal({
    playerName = "选手名称",
    playerNo = "1",
    playerDec = "选手简介",
    title = "活动名称",
    onClose=()=>{},
    playerImage = "https://upload.cyuandao.com/2020091907450415640.jpg",
    buttonName="投票"
}) {

    const banners = useSettingStore((state) => state.activitySetting.banners.values)
    useEffect(() => {
        async function init() {
            const url = await QRCode.toDataURL(location.href);
            setQrCode(url)
            setTimeout(() => {
                captureScreenshot()
            }, 2000)
        }
        init();
      }, [])
    
  
    const [qrCode, setQrCode] = useState(null);
    const [dataUrl, setDataUrl] = useState(null);
    const captureScreenshot = async () => {
        const elements = document.querySelectorAll('.demo-item');
        const promises = Array.from(elements).map(async (element) => {
            const canvas = await html2canvas(element, {
                scale: 1.5,
                allowTaint: true,  
                useCORS: true     
            });
            return canvas.toDataURL();
        });
        const dataUrls = await Promise.all(promises);
        setDataUrl(dataUrls);
    };

    const handleClose = () => {
        onClose()
    }
    return <div className="canvas-swiper-modal">
        {dataUrl &&  <div className='cloud'></div>}
        {/* <button onClick={captureScreenshot}>生成图片</button> */}
        <div style={{ zIndex: 1001 }} className="flex-col fixed flex justify-center items-center  mt-12">
            <div style={{ width: "100vw", maxWidth: '800px'}}>
                {dataUrl && <Swiper
                    loop
                    autoplay
                    autoplayInterval={10000}
                    onIndexChange={i => {

                    }}
                >       {dataUrl.map((url, i)=><Swiper.Item key={i} className='w-full flex justify-center items-center'>
                            <div className='w-3/5'>
                                <Image src={url} width={"100%"} height={'auto'} />
                          
                            </div>
                        </Swiper.Item>)}
                </Swiper>}
            </div>
            {dataUrl && <span onClick={handleClose} className='iconclose iconfont text-white text-large mt-1'></span>}
        </div>
        <div id="demo-list">
            <div className="demo-item demo1">
                <div className="canvas-header"></div>
                <div className="content">
                    <div className="content-header" v-if="$store.state.pageInfoSetting.ShowVoteItemNo">
                        <div className="player-no" >
                            <p className='offset-font'>{playerNo}号</p>
                        </div>
                        <div className="player-img">
                        <img
                            src={playerImage}
                            crossOrigin="anonymous"
                        /></div>
                    </div>
                    <div className="content-ctn">
                        <div className="player-name">
                            {playerName}
                        </div>
                        <div
                            v-if="
                                playInfo.player_info &&
                                playInfo.player_info != 
                            "
                            className="player-info"
                        >
                            {playerDec}
                        </div>
                        <div className="ctn-banner">
                            <img
                                className="banner"
                                v-if="banners.length"
                                src={playerImage}
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div className="activity-name">
                            {title}
                        </div>
                    </div>
                    <div className="content-footer">
                        <div className="cf-left">
                            <p className="des">长按识别二维码</p>
                            <div className="footer-vote-btn">
                                <p className='offset-font'>帮我{buttonName}</p>
                            </div>
                        </div>
                        <div className="qrDom-box">
                            <img src={qrCode} className="qrDom"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div  className="demo-item demo2">
                <div className="header">
                    <p className="activity-name">
                        {title}
                    </p>
                </div>
                <div className="content">
                    <div className="ctn-cover">
                        <img
                            className="player-img"
                            src={playerImage}
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div className="player-no" v-if="$store.state.pageInfoSetting.ShowVoteItemNo">
                        <span>{playerNo}号</span>
                    </div>
                    <div className="player-name">{playerName}</div>
                    <div>
                        { playerDec }
                    </div>
                </div>
                <div className="footer">
                    <div className="cf-left">
                        <p className="des">长按识别二维码</p>
                        <div className="footer-vote-btn">
                            <p className='offset-font'>帮我{buttonName}</p>
                        </div>
                    </div>
                    <div className="qrDom-box">
                        <img src={qrCode} className="qrDom"></img>
                    </div>
                </div>
                <div className="footer-logo"></div>
            </div>
            <div className="demo-item demo3">
                <div className="canvas-content">
                    <p className="activity-name">
                       {title}
                    </p>
                    <div className="img-container">
                        <div className="cover">
                            <img
                                className="player-img"
                                src={playerImage}
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div className="right">
                            <div className="qrDom-box">
                                <div className="qrDom">
                                    <img src={qrCode} className="qrDom"></img>
                                </div>
                            </div>
                            <div className="r-text">
                                长按识别二维码进入{buttonName}页面为我{buttonName}，谢谢
                            </div>
                        </div>
                    </div>
                </div>
                <div className="canvas-footer">
                    <div className="footer-name">
                        <div className="label">名称：</div>
                        <div className="player-name">
                            {playerName}
                        </div>
                    </div>
                    <div className="footer-number">
                        <div className="label">编号：</div>
                        <div className="player-no">
                           {playerNo}号
                        </div>
                    </div>
                </div>
            </div>
            <div className="demo-item demo4">
                <img
                    className="title"
                    src="https://upload.cyuandao.com/_nuxt/tpt4-header.png"
                    crossOrigin="anonymous"
                />
                <div className="content">
                    <img
                        className="head"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABPgAAABmCAMAAABhut+IAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAL0UExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAP////////////////////////39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////1VVVf7+/vj4+PDw8P7+/vz8/OTk5P///////6CgoPj4+Pb29v39/f///////97e3u/v7+rq6v////j4+Pv7+/T09Obm5t7e3iQkJP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/v/f39/////////Pz8+7u7v////n5+aqqqunp6YWFhff395eXl+fn5/7+/vX19f////X19f////z8/Nzc3OXl5d3d3YeHh/v7+/j4+ODg4ICAgPz8/JWVlfT09Ht7e9/f37KysvX19f////////////z8/P///////9ra2vv7+////+7u7rW1tdra2v7+/vr6+vT09P////X19f////f39/////r6+v////Pz8////8/Pz+bm5v39/f39/f39/fT09P////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/v39/fz8/Pv7+/r6+vj4+Pb29vT09PHx8ezs7O/v7zlDTUAAAADwdFJOUwAJEAsEBQcBAgMOEwYIDQoMDxIRFRcUGBYZGufzGxz59NHYNBDqxt7v7cbmDq2+hwb8IuqzVWX2CEoTKh7h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"
                    />
                    <div className="player-flex">
                        <div className="player-no" v-if="$store.state.pageInfoSetting.ShowVoteItemNo">
                            {playerNo}号
                        </div>
                        <div className="player-name">
                            {playerName}
                        </div>
                    </div>
                    <div>
                        { playerDec }
                    </div>
                    <br/>
                    <div className="cover">
                        <img
                            className="player-img"
                            src={playerImage}
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div className="act-box">
                        <div className="activity-name">
                            {title}
                        </div>
                        <img
                            className="banner"
                            src={getImageByCode(banners[0]['banner'])}
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div className="footer">
                        <div className="qrDom-box">
                            <div className="qrDom">
                                <img src={qrCode} className="qrDom"></img>
                            </div>
                        </div>
                        <div className="cf-left">
                            <p className="des">长按识别二维码</p>
                            <div className="footer-vote-btn">
                            <p className='offset-font'>请为TA{buttonName}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demo-item demo5">
                <div className="content">
                    <img
                        className="banner"
                        src={getImageByCode(banners[0]['banner'])}
                        crossOrigin="anonymous"
                    />
                    <p className="activity-name">
                        { title }
                    </p>
                    <div className="player-flex">
                        <div className="cover">
                            <img
                                className="player-img"
                                src={playerImage}
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div>
                            <div className="player-no" >
                                <span
                                    className='offset-font'
                                    >编号：{playerNo}号</span
                                >
                                <div className="arr"></div>
                            </div>
                            <div className="player-name">
                                {playerName}
                            </div>
                            <div
                                style={{position: 'relative', left: '-0.21rem'}}
                                className="player-info"
                            >
                                { playerDec }
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="qrDom-box">
                        <img src={qrCode} className="qrDom"></img>
                        </div>
                        <div className="cf-left">
                            <p className="des">长按识别二维码</p>
                            <div className="footer-vote-btn">
                                <p className='offset-font'>请为TA{buttonName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demo-item demo6">
                <div className="content">
                    <p className="activity-name">
                        {title} 
                    </p>
                    <div className="player-flex">
                        <div className="player-no" v-if="$store.state.pageInfoSetting.ShowVoteItemNo">
                            { playerNo }号
                        </div>
                        <div className="player-name">
                            { playerName }
                        </div>
                    </div>
                    <div className="qr-wrapper">
                        <img
                            crossOrigin="anonymous"
                            className="qr-font"
                            src="https://upload.cyuandao.com/_nuxt/share-font.png"
                        />
                        <p className="text">
                            <span>请</span><span>帮</span><span>T</span
                            ><span>A</span><span>投</span><span>票</span>
                        </p>
                        <img
                            crossOrigin="anonymous"
                            className="arr"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAmCAMAAACxpjgOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAHXUExURQAAAANM/wBJ/wBA/wNM/wNM/wRM/wAA/wNM/wNM/wNM/wAz/wBQ/wJM/wBM/wBN/wBV/wVK/wNM/wBV/wNM/wBJ/wNM/wBP/wJN/wRL/wBK/wNM/wNM/wBM/wRL/wBJ/wBM/wRM/wBN/wZN/wNN/wRM/wNM/wNM/wNM/wJN/wNM/wNN/wRO/wNN/wVK/wNM/wBL/wJL/wNM/wNM/wNN/wNN/wRK/wJM/wBH/wNN/wRL/wNM/wNM/wBO/wJN/wNM/wNM/wRM/wNM/wNM/wJM/wNL/wNM/wNL/wRM/wVM/wNM/wNN/wNM/wNL/wNM/wNM/wNL/wBL/wNL/wNM/wJM/wNL/wJL/wRO/wNM/wNL/wBH/wJM/wJL/wNL/wRM/wBO/wNN/wNN/wNN/wRM/wJN/wNL/wJM/wNL/wNM/wNM/wNM/wNN/wRN/wJM/wNN/wRL/wNL/wNM/wNN/wRM/wZL/wNM/wRN/wRM/wRL/wNM/wJN/wNM/wNM/wNN/wRM/wVN/wNL/wNM/wRN/wNM/wRL/wBE/wJM/wNM/wRM/wNL/wBJ/wBO/wBR/wNM/wZK/wBO/wNM/wNN/wBA/wBN/wNM/wRK/wJN/wJM/wRM/wNN/wNM/wNN/wNM/zxa44AAAACcdFJOUwD8BwT+59cB8/vCBRByHgoDMKsM7xXsKnSOGPX4JT0OG4MoK/raourhaldWRVA35Cl3yt6+tD58GapBofcNcV7ykPCXb5j2qdYv40zFxLPDThFLu3i6fTtUWBLRaVyNF5KjWYbSptBf6casy4hs3ISwr8iJLOuPRjrdbqinYEA4Vb2FYdUPz/GRlSMaFpotJ5tPCBRNSH7UgEnb5sUMydAAAAJDSURBVDjLlVVnQ9tADFVCSJyQvQgjQAg07FF2GC0UKLMLuvfei00LpYOWLkbpBv/YJicZX2I7uPfFp6d7J/lJdwfD49bgryzQNXL+BA1jUfgtJoYtXw+jZDy5dgdGkh8xu2h/xqtstnQXRgU2sTosmQmWkJUtFP4CRM1sKnqLMzGKH+CqoVJmedEyR7UZubTvUR/FdFDMG1qMKsq+R4aK8M/Eazmq2vaKKhrl2xC9X6JkfDmOvvRKZF0xMTwWT2e0UgZ5ynqfO8w8hskUtff+s1ot5dJV3O6ZXca6O0jNBnVdfEvoLx+WkAbStsOnKf+LMrai4BCa1Xo6Y6Eetz1iTCiSR9q2Zm6lr8247qCznXS3tSva7Uek/ztnux+h2kHSdo6vbqAn8tMCycr6T/Gb1PaJe0Oo4j3fkp4BYNUwRdycJ3xRYphz+fg3WfxBoDY+HeCcrgN0Hrr5pN5QM8P2Fs4q6vgUHidqbgjx2q6MyFrCuy42L6zkOZuhxhnerixMqZinCTe47tKSXsr0iUdC7C2I3AqrM8J30H+M6z5Lm4Fha7VqjBN+7PG21L6piTHYNK04Fe63WNvZmnSPcwqDN19NxQMTUgcpwxs/oa/+LI/WVSA6YFT9y8sFzFvWL0OXUNvBu1pabpTjli/pRLk60V70aLf+++f8nfj5A1ot9ow3byOqLbwGGCVtz+xzW0P8Ht1BT+nczOt4RcZEbjx06nqrPsqMdaO+9w3O480idi2D7oFvQ5MH/mOc7PQLty+o+/4BJBk2IQgvqlMAAAAASUVORK5CYII="
                        />
                        <div className="qrDom-box">
                        <img src={qrCode} className="qrDom"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}