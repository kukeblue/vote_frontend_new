import { create } from 'zustand'
import { fetchActivityGroups, fetchActivityPlayers, fetchActivityRanks, doVote } from '../api/index'
import { Button, Dialog, Space, Toast, Divider } from 'antd-mobile'
import utils from '../utils/common'
import useSettingStore from './settingStore'


const usePlayerStore = create((set, get) => (
	{
		
		searchTxt: '',
		groups: [],
		selectedGroup: { id: 'all', name: '全部' },
		selectedGroupInRank: { id: 'all', name: '全部' },
		page: 1,
		pageSize: 20,
		players: [],
		selectedPlayers: [],
		ranks: [],
		total: 0,
		showAuthCodeModal: false,
		loading: false,
		setSearchTxt: (item) => { set({ searchTxt: item }) },
		setSelectedGroup: (item) => { set({ selectedGroup: item }) },
		setSelectedGroupRank: (item) => { set({ selectedGroupInRank: item }) },
		showVoteResult: false,
		showMultiVoteFloatPanel: false,
		voteResult: {
			status: "success",
			text: ""
		},
		getGroups: async (activityId) => {
			const response = await fetchActivityGroups(activityId)

			set({
				groups: [{ id: 'all', name: '全部' }].concat(response.data),
			})
		},
		getRanks: async (activityId) => {
			const response = await fetchActivityRanks({ activity_id: activityId })

			set({
				ranks: response.data,
			})
		},
		setSelectedPlayers:(selectedPlayers) => {
			set({
				selectedPlayers: selectedPlayers,
			})
		},
		setVoteResult: (v) => {
			set({
				voteResult: v
			})
		},
		setShowVoteResult: (v) => {
			set({
				showVoteResult: v
			})
		},
		setAuthCodeModal: (v) => {
			set({
				showAuthCodeModal: v
			})

		},
		doVoteConfirm: ({
			activityId,
			captchaId,
			code,
			isSingleVote = true,
			dots,
		}) => {
			const state = get()
			const wechatUser = utils.getObCache("wechatUser")
			const { headimgurl, nickname, openid } = wechatUser
			const playerIds = state.selectedPlayers.map(item => item.id)
			console.log('captchaId', captchaId)
			doVote({
				token: captchaId || window.captchaToken,
				activityId,
				playerIds,
				avatar: headimgurl,
				openid: openid,
				nickname: nickname,
				code,
				captchaId,
				dots,
				captcha_key: captchaId,
			}).then(res => {
				const state = get()
				if (res.code == 0) {
					state.setVoteResult({
						status: "success",
						text: res.msg
					})
					state.setShowVoteResult(true)
					state.setSelectedPlayers([])
				} else {
					Dialog.alert({
						title: '提示',
						content: res.msg,
						closeOnMaskClick: true,
					})
				}
				if (isSingleVote) {
					set({
						selectedPlayers: [],
					})
				}
			})
		},
		doVoteCancel: ({
			isSingleVote = true
		}) => {

			if (isSingleVote) {
				set({
					selectedPlayers: [],
					showAuthCodeModal: false,
					showVoteResult: false,
				})
			} else {
				set({
					showAuthCodeModal: false,
					showVoteResult: false,
				})
			}
		},
		
		doVoteHandle: async ({
			player,
			isSingleVote = true,
			isMultiVoteFloatPanelClick = false
		}) => {
			const state = get()
			if(state.selectedPlayers.length == 0) {
				// return
			}

			if(!isMultiVoteFloatPanelClick) {
				
				const wechatUser = utils.getObCache("wechatUser")
				if (!wechatUser) {
					// todo 
					Dialog.alert({
						content: '微信登录过期',
						onConfirm: () => {
							location.reload()
						},
					})
				}
				
				if (isSingleVote) {
					state.selectedPlayers = [player]
				} else {
					const index = state.selectedPlayers.findIndex(item => item.id === player.id);
					if (index === -1) {
						// 

						state.selectedPlayers.push(player);
					} else {

						state.selectedPlayers.splice(index, 1);
					}
				}
				set({
					selectedPlayers: state.selectedPlayers.slice(),
					// showAuthCodeModal: true
				})
			}
			if (isSingleVote) {
				set({
					showAuthCodeModal: true
				})
			}else {
				if(isMultiVoteFloatPanelClick) {
					set({
						showAuthCodeModal: true
					})
				}else {
					set({
						showMultiVoteFloatPanel: true
					})
				}
			}
		},
		getPlayers: async (activityId, page, groupId) => {
			const state = get()
			if (page != 1) {
				if (state.total > 0 && state.total == state.players.length) {
					return
				}
			}
			set({ loading: true })
			let group_id = groupId || (state.selectedGroup.id == 'all' ? '' : state.selectedGroup.id)
			let search_text = state.searchTxt
			const response = await fetchActivityPlayers({
				page: page || state.page,
				page_size: state.pageSize,
				activity_id: activityId,
				group_id,
				search_text
			})
			response.data.list.map(item=>{
				if(item.short_name) {
					item.number = item.short_name
				}
			})

			set({
				page: page,
				total: response.data.count,
				loading: false,
				players: page == 1 ? (response.data.list || []) : state.players.concat(response.data.list),
			})
		},
	}))


export default usePlayerStore