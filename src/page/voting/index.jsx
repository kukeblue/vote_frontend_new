import React from 'react'
import './index.less'
import { Button } from 'antd-mobile'
import usePlayerStore from '../../store/playerStore'
import useSettingStore from '../../store/settingStore'
import { getImageByCode } from '../../utils/format'
import { Toast, Stepper, Dialog } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';


export default function Voting() {

  const selectedPlayers = usePlayerStore((state) => state.selectedPlayers)
  const doVoteHandle = usePlayerStore((state) => state.doVoteHandle)
  const vote_type = useSettingStore((state) => state.activitySetting.vote_type.values)
  const setSelectedPlayers = usePlayerStore((state) => state.setSelectedPlayers)
  const activitySetting = useSettingStore((state) => state.activitySetting)
  const everyTimeVote = useSettingStore((state) => state.activitySetting.every_time_vote.values)
  const navigate = useNavigate();


  let minChooseNum = activitySetting.min_choose_num.values
  let maxChooseNum = activitySetting.max_choose_num.values

  const handleClickVote = () => {

    if (selectedPlayers.length > maxChooseNum) {
      Dialog.alert({
        title: '提示',
        content: "最多选择" + maxChooseNum + "项",
        closeOnMaskClick: true,
      })
      return
    }

    if (selectedPlayers.length < minChooseNum) {
      Dialog.alert({
        title: '提示',
        content: "最少选择" + minChooseNum + "项",
        closeOnMaskClick: true,
      })
      return
    }

    let isSingleVote;
    if (vote_type == 1) {
      isSingleVote = true
    } else {
      isSingleVote = false
    }
    doVoteHandle({ isMultiVoteFloatPanelClick: true, isSingleVote })

  }

  const handleClikcRemove = (item) => {
    const ret = selectedPlayers.filter(p => {
      return p.id != item.id
    })
    setSelectedPlayers(ret)
  }

  if (selectedPlayers.length == 0) {
    navigate('/vote', { replace: true })
  }



  return <div className='overflow-hidden voting-page w-full'>
    <div className='flex items-center p-voting-info'>
      <div onClick={() => setSelectedPlayers([])} className='p-voting-clear flex items-center justify-center'>清空</div>
      <div className='p-voting-dec'>
        <span className='m-l-5px'>已选择<span className='p-3px text-primary'>{` ${selectedPlayers.length} `}</span> 项 </span>
        <span>最少选择<span className='p-3px text-primary'>{` ${minChooseNum} `}</span> 项 </span>
        <span>最多选择<span className='p-3px text-primary'>{` ${maxChooseNum} `}</span> 项 </span>
        {/* <span>必须选择<span>1</span>项</span> */}
      </div>

    </div>
    <div className='voting-page-content'>
      {selectedPlayers.map(item =>
        <div key={item.id} className='p-voting-item'>
          <div className='flex justify-between'>
            {item.cover && <img src={getImageByCode(item.cover)} className='p-voting-avatar'></img>}
            <div>
              <div className='flex items-center'>
                <div className='p-voting-item-order'>{item.number}</div>
                <div className='ml-5px'>{item.name}</div>
              </div>
              <div>
                {item.introduction}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            {everyTimeVote == 1 ? <span onClick={() => handleClikcRemove(item)} className=' iconfont iconclose p-voting-item-close'></span>
              : <Stepper
                min={1}
                defaultValue={1}
                onChange={value => {

                }}
              />}
          </div>
        </div>)
      }
    </div>
    <div className='flex justify-center mt-0.1rem p-1rem'>
      <Button onClick={() => { handleClickVote() }} block color='primary'>投票</Button>
    </div>
  </div>
}