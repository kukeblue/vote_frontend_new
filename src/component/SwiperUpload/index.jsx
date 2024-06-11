import React from './index.less?inline'
import banner from '../../assets/images/banner_1.png'
import banner2 from '../../assets/images/banner2.png'
import { useEffect } from 'react'

function SwiperUpload() {
    useEffect(()=>{
    }, [])

    return <div className='swiperUpload flex flex-wrap'>
         <div
            onDragStart={()=>{

            }}
            onDragEnd={()=>{

            }}
            draggable className='mr-10px'>
            <div className='picture-upload-success flex-column-all-center'>
                <img alt="" className='picture-upload-image' src={banner}/>
                <div className='picture-upload-filter'>
                    <div className='upload-filter-size'>750 × 450</div>
                    <span className='picture-upload-delete iconfont iconshanchu'></span>
                </div>
            </div>
        </div>
        <div 
        onDragOver={(event)=>{event.preventDefault();}}
        onDrop={()=>{

        }} id="target" className='mr-10px'>
            <div onDragStart={()=>{

            }} draggable className='picture-upload-success flex-column-all-center'>
                <img alt="" className='picture-upload-image' src={banner2}/>
                <div className='picture-upload-filter'>
                    <div className='upload-filter-size'>750 × 450</div>
                    <span className='picture-upload-delete iconfont iconshanchu'></span>
                </div>
            </div>
        </div>
        {/* 图片上传组件 */}
        <div className='mr-10px'>
            <div className='picture-upload flex-column-all-center'>
                <span style={{position: 'relative', top: '3px'}} className='iconzhaoxiangji iconfont picture-upload-camera'></span>
                <span style={{position: 'relative', top: '-8px'}} className='text_dec'>轮播图</span>
            </div>
        </div>
        {/* <div className='split-line'></div> */}
        {/* 视频上传组件 */}
        <div className='mr-10px'>
            <div className='picture-upload flex-column-all-center'>
                <span style={{position: 'relative', top: '3px'}} className='iconshipin iconfont picture-upload-video'></span>
                <span style={{position: 'relative', top: '-5px'}} className='text_dec'>视频</span>
            </div>
        </div>
    </div>
}

export default SwiperUpload