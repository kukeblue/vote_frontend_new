import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './index.less'
import { addActivityPlayerVisits, getActivityPlayerInfo } from '../../api/index'
import useSettingStore from '../../store/settingStore'
import usePlayerStore from '../../store/playerStore'


import { getImageByCode } from '../../utils/format'
import CanvasSwiperModal from "../../component/CanvasSwiperModal"
import CheckWechat from '../../component/CheckWechat'
import { useNavigate } from 'react-router-dom'
import { Button, Space, Swiper, Image, Toast } from 'antd-mobile'
import { Grid, ImageViewer } from 'antd-mobile'
import utils from '../../utils/common'

export default () => {

  // ！！！使用useSearchParams接收
  const [params] = useSearchParams()
  const [showCanvasSwiperModal, setShowCanvasSwiperModal] = useState(false)
  const [images, setImages] = useState([])
  const [defaultImageIndex, setDefaultImageIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const doVoteHandle = usePlayerStore((state) => state.doVoteHandle)
  const selectedPlayers = usePlayerStore((state) => state.selectedPlayers)



  const activityTitle = useSettingStore((state) => state.activityTitle)
  const activityId = useSettingStore((state) => state.activityId)
  const {
    show_canvass,
    show_number_in_detail,
    show_statistics_in_detail,
    show_vote_button_in_detail,
    show_vote_item_cover_in_detail,
    show_vote_item_intro_in_detail,
    show_vote_item_name_in_detail,
    show_vote_num_in_detail,
  } = useSettingStore((state) => state.activitySetting.vote_item_detail_page.values)
  const [playerInfo, setPlayerInfo] = useState({})


  const navigate = useNavigate()
  const canvass_title = useSettingStore((state) => state.activitySetting.canvass_title.values)
  const vote_item_pic_array_type = useSettingStore((state) => state.activitySetting.vote_item_pic_array_type.values)
  const vote_type = useSettingStore((state) => state.activitySetting.vote_type.values)

  // console.log('选手图片排列放手', vote_item_pic_array_type)

  const columns = vote_item_pic_array_type == 2 ? 2 : 1

  // console.log('detail组件参数：', params.get("id"))
  // console.log('选手图片', playerInfo.thrumbs)

  useEffect(() => {
    if (activityId) {
        addActivityPlayerVisits(activityId, params.get("id"))
        getActivityPlayerInfo(activityId, params.get("id")).then(res => {
        // console.log(res.data.info)
        setPlayerInfo(res.data.info)
      })
    }
  }, [activityId])

  const handlePreviewImage = (i, images) => {
    // console.log('debug 点击预览图片', i, images)
    const res = images.map(code => {
      return getImageByCode(code)
    })
    setDefaultImageIndex(i)
    setImages(res)
    setVisible(true)
  }


  const handleClickVote = (item) => {
    let isSingleVote;
    if (vote_type == 1) {
      isSingleVote = true
    } else {
      isSingleVote = false
    }
    doVoteHandle({ activityId, player: item, isSingleVote })
  }

  const checkIsSelectedPlayer = (id) => {
    const index = selectedPlayers.findIndex(item => item.id === id);
    if (index === -1) {
      return false
    }
    return true
  }

  return <div className='overflow-hidden player-page w-full  p-15px'>
    <div onClick={() => {
      navigate(-1);
    }} className='back-button flex items-center justify-center'>
      <span className="iconfont iconback"></span>
    </div>
    <div className='bg-white p-10px rounded-10px min-h-500px'>

      {show_statistics_in_detail && <div className='flex py-18px bg-primary rounded-10px mt-10px mb-10px voteIntroInfoCard-summary-block w-full h-2.2rem'>
        <div className='text-white flex items-center flex-col border-r border-secondary border-dashed w-1/3 h-full'>
          <div className='text-lg mt-5px'>0</div>
          <div className='text-base'>排名</div>
        </div>
        <div className='text-white flex items-center flex-col border-r border-secondary border-dashed w-1/3 h-full'>
          <div className='text-lg mt-5px'>{playerInfo.total_votes}</div>
          <div className='text-base'>票数</div>
        </div>
        <div className='text-white flex items-center flex-col w-1/3 h-full'>
          <div className='text-title mt-5px'>0票</div>
          <div className='text-base'>距离上一名</div>
        </div>
      </div>}
      {show_number_in_detail && <div className='text-center'>{playerInfo.number}号</div>}
      {show_vote_item_name_in_detail && <div className='text-common text-center mt-0.01rem'>{playerInfo.name}</div>}

      {show_vote_item_cover_in_detail && (!playerInfo.thrumbs || playerInfo.thrumbs.length == 0) && <Image src={playerInfo.cover && getImageByCode(playerInfo.cover)} className='player-pic h-auto bg-gray-200 rounded-10px mt-20px ml-5px mr-5px'></Image>}
      <div>
        {/* 选手照片 */}
        {show_vote_item_cover_in_detail && vote_item_pic_array_type == 1 && <Swiper
          loop
          onIndexChange={i => {
            // // console.log(i, 'onIndexChange1')
          }}
        >   {playerInfo.thrumbs && playerInfo.thrumbs.map(code => {
          return <Swiper.Item key={code}>
            <Image src={getImageByCode(code)} width={"100%"} height="auto" />
          </Swiper.Item>
        })}
        </Swiper>}
      </div>
      {show_vote_item_cover_in_detail && vote_item_pic_array_type != 1 && <Grid columns={columns} gap={0}>
        {playerInfo.thrumbs && playerInfo.thrumbs.map((code, i) =>
          <Grid.Item key={code}>
            <Image onClick={() => handlePreviewImage(i, playerInfo.thrumbs)} src={getImageByCode(code)} width={"100%"} height="auto"></Image>
          </Grid.Item>)
        }
      </Grid>}

      {show_vote_item_cover_in_detail && vote_item_pic_array_type != 1 && visible && <ImageViewer.Multi
        images={images}
        visible={visible}
        defaultIndex={defaultImageIndex}
        onClose={(e) => {
          setTimeout(() => {
            setVisible(false)
          }, 100)

        }}
      />}
      {loading && <div className="loader_wrapper">
        <div className='loader_bg'>
          <div className="loader">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className='loader_text'>海报生成中...</div>
        </div>

      </div>}

      <div className='flex flex-col items-center mt-1rem mb-0.3rem'>
        {show_vote_button_in_detail && <div className='rounded-10px  flex items-center justify-center w-7rem h-1.2rem bg-primary text-white'>
          <CheckWechat onClick={handleClickVote} parameters={[playerInfo]}> {checkIsSelectedPlayer(playerInfo.id) ? '已选择' : '投票'} </CheckWechat>
        </div>}


        <CheckWechat onClick={() => {
          setShowCanvasSwiperModal(true)
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 10000)

        }} parameters={[]}>
          {show_canvass && <div className='rounded-10px flex items-center justify-center w-7rem h-1.2rem bg-primary text-white mt-10px'>{canvass_title}</div>}
        </CheckWechat>
      </div>
      <div className='w-full pl-15px pr-15px pt-10px'>
        <div className=' bg-white w-full rounded-10px' dangerouslySetInnerHTML={{ __html: playerInfo.contents }} />
      </div>
    </div>

    {showCanvasSwiperModal &&
      <CanvasSwiperModal
        onClose={() => setShowCanvasSwiperModal(false)}
        playerName={playerInfo.name}
        playerNo={playerInfo.playerNo}
        playerDec={playerInfo.introduction}
        title={activityTitle}
        playerImage={getImageByCode(playerInfo.cover)}
      />}
  </div>
}

