import React from 'react' 
import './index.less'

// 颜色选择器


const selectColors = [
    'rgb(247, 87, 87)', 
    'rgb(19, 132, 237)', 
    'rgb(228, 103, 149)', 
    'rgb(25, 214, 170)',
    'rgb(255, 128, 64)', 
    'rgb(235, 196, 20)', 
    'rgb(144, 215, 18)', 
    'rgb(140, 55, 166)', 
    'rgb(167, 43, 116)', 
    'rgb(142, 93, 241)', 
    'rgb(0, 133, 190)', 
    'rgb(6, 215, 215)', 
    'rgb(1, 163, 152)', 
    'rgb(227, 0, 0)', 
    'rgb(222, 100, 0)',
    'rgb(197, 193, 0)',
    'rgb(100, 174, 2)',
    'rgb(4, 174, 123)',
    'rgb(77, 56, 179)',
    'rgb(227, 88, 225)',
]       

export default function ColorHorizontalSelector() {
    return <div className='color-horizontal-selector flex flex-wrap'>
        {
           selectColors.map((item, index)=>{
                return <div style={{backgroundColor: item}} key={'selectColors' + index} className='color-item'></div>
           }) 
        }
    </div>
}