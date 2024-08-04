import React, { useEffect } from 'react'
import { Button, Skeleton } from 'antd-mobile'
import './index.less'

export default function SkeletonPage({ visible }) {

    useEffect(()=>{
        const div = document.getElementById('skeleton-page');
        // 等待过渡效果完成后设置 display: none
        div.addEventListener('transitionend', function() {
            div.style.display = 'none';
        }, { once: true });
    }, [])

    useEffect(()=>{
        const div = document.getElementById('skeleton-page');
        if(!visible) {
            setTimeout(()=>{
                div.classList.add('fade-hidden');
            }, 500)
        }
    }, [visible])

    return <div id="skeleton-page" className={`skeleton-page fade-out`}>
        <Skeleton animated className='w-100% h-200px' />
        <div className='left-0 top-170px absolute flex justify-center w-full'>
            <div className="w-10px h-10px rounded-5px bg-white m-5px"></div>
            <div className="w-10px h-10px bg-white rounded-5px m-5px"></div>
            <div className="w-10px h-10px bg-white rounded-5px m-5px"></div>
        </div>
        <div className='pl-15px pr-15px pt-10px'>
            <Skeleton animated className='rounded-5px w-full h-30px'/>
            <Skeleton animated className='rounded-5px w-4rem mt-10px h-25px'  />
            <div className='flex justify-center w-full'>
                {/* <div className="w-10px h-10px rounded-5px bg-white m-5px"></div> */}
                <Skeleton animated className="w-3rem h-60px  m-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-3rem h-60px  m-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-3rem h-60px  m-5px rounded-5px"></Skeleton>
                {/* <div className="w-10px h-10px bg-white rounded-5px m-5px"></div> */}
            </div>
            <div className='flex justify-center w-full'>
                <Skeleton animated className="w-5rem h-25px  m-10px rounded-5px"></Skeleton>
            </div>
            <div className='flex justify-center w-full'>
                <Skeleton animated className="w-4rem h-25px mr-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-4rem h-25px mr-5px rounded-5px"></Skeleton>
            </div>
            <div className='flex justify-center w-full mt-10px'>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
            </div>
            <div className='flex justify-center w-full'>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
            </div>
            <div className='flex justify-center w-full'>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
            </div>
            <div className='flex justify-center w-full'>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
                <Skeleton animated className="w-50% h-120px m-5px rounded-5px"></Skeleton>
            </div>
        </div>
        


        
        {/* <div class="middle-border"></div> */}
         {/*<div class="_" style="height: 0.6rem; top: 37%; left: 7%; width: 86%"></div>
        <div class="_" style="height: 0.6rem; top: 41.5%; left: 7%; width: 86%"></div>
        <div class="_" style="height: 8%; top: 46%; left: 7%; width: 28.2%"></div>
        <div class="_" style="height: 8%; top: 46%; left: 37%; width: 28%"></div>
        <div class="_" style="height: 8%; top: 46%; left: 66.5%; width: 26%"></div>
        <div class="_" style="height: 0.6rem; top: 55%; left: 15%; width: 68%"></div>
        <div class="_" style="height: 0.6rem; top: 61%; left: 5%; width: 43%"></div>
        <div class="_" style="height: 0.6rem; top: 61%; left: 50%; width: 45%"></div>
        <div class="_" style="height: 23%; top: 65.5%; left: 5%; width: 43%"></div>
        <div class="_" style="height: 23%; top: 65.5%; left: 50%; width: 45%"></div>
        <div class="_" style="height: 23%; top: 89.5%; left: 5%; width: 43%"></div>
        <div class="_" style="height: 23%; top: 89.5%; left: 50%; width: 45%"></div> */}
    </div>
}
