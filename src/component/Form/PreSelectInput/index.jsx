import React from 'react'
import './index.less'
import { Input, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';

/**
 * @description 预设选择输入框
 */
function PreSelectInput({value, options = [{id: 1, name: 1}], onChange}) {

    const menu = (
        <Menu>
          {options.map(item=>{
                return <Menu.Item onClick={()=>onValueChange(item.name)} key={item.id}>
                    {item.name}       
                </Menu.Item>
          })}
        </Menu>
    );

    const onValueChange = (value) => {
        if(onChange) {
            onChange(value)
        }
    }

    return <div className='flex-center'>
        <Input onChange={(e)=>onValueChange(e.target.value)} value={value} className='preSelectInput-input'/>
        <Dropdown overlay={menu}>
            <div className='preSelectInput-select flex-center'>
                预设<DownOutlined />
            </div>
        </Dropdown>
    </div>
}

export default PreSelectInput