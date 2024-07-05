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

export default function Player() {

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

	const shareActivityTitle = useSettingStore((state) => state.activitySetting.share_activity_title.values)
	const shareContents = useSettingStore((state) => state.activitySetting.share_contents.values)
	const shareImage = useSettingStore((state) => state.activitySetting.share_image.values)
	const shareItemTitle = useSettingStore((state) => state.activitySetting.share_item_title.values)
    const voteNumUnitName = useSettingStore((state) => state.activitySetting.vote_num_unit_name.values)
    const buttonName = useSettingStore((state) => state.activitySetting.button_name.values)


	const columns = vote_item_pic_array_type == 2 ? 2 : 1

	useEffect(() => {
		let shareTitle = shareItemTitle.replace('{number}', playerInfo.number)
		shareTitle = shareTitle.replace('{name}', playerInfo.name)
		console.log(shareTitle)
		setShareConfig(shareTitle, getImageByCode(playerInfo.cover))
	}, [playerInfo, shareItemTitle]);

	useEffect(() => {
		return () => {
			setShareConfig(shareActivityTitle, shareImage)
			console.log('Timer cleared');
		};
	}, [])

	const setShareConfig = (shareTitle, shareImage) => {
		setTimeout(() => {
			if (utils.hasRegister) {
				utils.register(window.wx, null, {
					title: shareTitle,
					desc: shareContents || "",
					link: window.location.href,
					imgUrl: shareImage || ""
				})
			} else {
				setShareConfig(shareTitle, shareImage)
			}
		}, 3000)
	}


	useEffect(() => {
		if (activityId) {
			addActivityPlayerVisits(activityId, params.get("id"))
			getActivityPlayerInfo(activityId, params.get("id")).then(res => {

				setPlayerInfo(res.data.info)
			})
		}
	}, [activityId])

	const handlePreviewImage = (i, images) => {

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
		<div className='bg-white p-10px rounded-10px min-h-500px playerPage-player-content'>

			{
				show_statistics_in_detail &&
				<div className='flex py-18px bg-primary rounded-10px mt-10px mb-10px  w-full h-2.2rem p-voteIntroInfoCard-statistics-block'>
					<div className='text-white flex items-center flex-col border-r border-secondary border-dashed w-1/3 h-full'>
						<div className='text-lg mt-5px'>0</div>
						<div className='text-base'>排名</div>
					</div>
					<div className='text-white flex items-center flex-col border-r border-secondary border-dashed w-1/3 h-full'>
						<div className='text-lg mt-5px'>{playerInfo.total_votes}</div>
						<div className='text-base'>{voteNumUnitName}数</div>
					</div>
					<div className='text-white flex items-center flex-col w-1/3 h-full'>
						<div className='text-title mt-5px'>0票</div>
						<div className='text-base'>距离上一名</div>
					</div>
				</div>
			}
			<div className='p-PlayerPage-name-block'>
				{show_number_in_detail && <div className='text-center p-PlayerPage-number'>{playerInfo.number}号</div>}
				{show_vote_item_name_in_detail && <div className='text-common text-center mt-0.01rem p-PlayerPage-name'>{playerInfo.name}</div>}
			</div>
			{show_vote_item_cover_in_detail && (!playerInfo.thrumbs || playerInfo.thrumbs.length == 0) &&
				playerInfo.cover &&
				<Image src={playerInfo.cover && getImageByCode(playerInfo.cover)}
					className='player-pic h-auto bg-gray-200 rounded-10px mt-20px ml-5px mr-5px'>
				</Image>}
			<div>
			{show_vote_item_cover_in_detail && vote_item_pic_array_type == 1 && <Swiper
				loop
				onIndexChange={i => {
				}}
			>
				{playerInfo.thrumbs && playerInfo.thrumbs.map(code => {
					return <Swiper.Item key={code}>
						<Image src={getImageByCode(code)} width={"100%"} height="auto" />
					</Swiper.Item>
				})}
			</Swiper>}
			</div>
			{show_vote_item_cover_in_detail && vote_item_pic_array_type != 1 && <Grid columns={columns} gap={5}>
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

			<div className='flex flex-col items-center mt-1rem mb-0.3rem p-playerPage-vote-block'>
				{show_vote_button_in_detail && <div className='
				rounded-10px
				 flex 
				 items-center 
				 justify-center 
				 w-7rem 
				 h-1.2rem
				  bg-primary 
				  text-white
				  p-playerPage-vote-block_vote'>
					<CheckWechat onClick={handleClickVote} parameters={[playerInfo]}> {checkIsSelectedPlayer(playerInfo.id) ? '已选择' : buttonName} </CheckWechat>
				</div>}


				<CheckWechat onClick={() => {
					setShowCanvasSwiperModal(true)
					setLoading(true)
					setTimeout(() => {
						setLoading(false)
					}, 10000)

				}} parameters={[]}>
					{show_canvass && <div className='
					rounded-10px 
					flex items-center justify-center w-7rem h-1.2rem bg-primary text-white mt-10px
					p-playerPage-lapiao'>{canvass_title}</div>}
				</CheckWechat>
			</div>
			{playerInfo.contents && <div className='w-full pl-15px pr-15px pt-10px p-player-content-block'>
				<div className=' bg-white w-full rounded-10px' dangerouslySetInnerHTML={{ __html: playerInfo.contents }} />
			</div>}
			<div className='playerPage-report flex'>
				<span className='iconfont iconbaojing'></span>
				<span onClick={()=>{navigate('/report')}}>举报/投诉</span>
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

