import React from 'react'
import { Button, Table, Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
/**
 * @type React Component
 * @description 步骤二分组管理
 */
function Step2GroupTab() {
    const dataSource = [
        {
            key: 'name',
            name: '年度十大公益人物',
            playerNumber: 32,
            rank: '1',
        },
    ];

    const columns = [
        {
            title: '分组名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '选手数',
            dataIndex: 'playerNumber',
            key: 'playerNumber',
            render: (v)=><div className='text-gray-500'>{v}</div>
        },
        {
            title: '优先级',
            dataIndex: 'rank',
            key: 'rank',
        },{
            title: '操作',
            dataIndex: 'option',
            key: 'option',
        },
    ];
    return <div>
        <Button icon={<PlusOutlined />} type='primary'>添加分组</Button>
        <Table dataSource={dataSource} columns={columns} />
    </div>
}


/**
 * @type React Component
 * @description 投票编辑步骤二
 */
function Step2() {

    const items = [
        {
            key: '1',
            label: '分组列表',
            children: <Step2GroupTab></Step2GroupTab>,
        },
        {
            key: '2',
            label: '选手列表',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: '报名选手',
            children: 'Content of Tab Pane 3',
        },
    ];
    return <div className='voteEdit-step2 mt-5px h-600px bg-white'>
        <div className='py-10px px-20px'><Tabs defaultActiveKey="1" items={items} /></div>
        {/* <Step2Header/> */}
        {/* <Step2Table></Step2Table>
        <div className='flex-center mt-20px'>
            <Button className='mr-10px'>上一步</Button>
            <Button className='mr-10px' type="primary">自定义模版</Button>
            <Button className='mr-10px' type="primary">发布活动</Button>
        </div> */}
    </div>
}

export default Step2