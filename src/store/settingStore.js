import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fetchActivityBaseSettings, fetchAuthUrl } from '../api/index'
import playerStore from './playerStore'
import { extraCssIds } from '../config/appConfig'
import { getObCache } from '../utils/cache'

let wechatUser = getObCache('wechatUser')

const useSettingStore = create((set) => (
  {
    tempId: '',
    activityId: '',
    activityStartTime: '',
    activityEndTime: '',
    activityTitle: '',
    activitySetting: {
      per_wx_vote_num: { values: 1 },
      player_name_show_type: { values: 1 },
      player_intro_show_type: { values: 1 },
      vote_item_sort_type: { values: 1 },
      button_name: { values: "点赞" },
      vote_item_unit_name: { values: "点赞" },
      vote_item_unit_name: { values: "位" },
      vote_num_unit_name: { values: "票" },
      vote_item_show_name: { values: "选手" },
      vote_popup_image: { values: "2020082010520010820.jpg" },
      default_ad_image: { values: "" },
      vote_popup_image_url: { values: "" },
      show_vote_popup_image: { values: true },
      display_copyright: { values: true },
      display_copyright_url: { values: "" },
      bottom_text_size: { values: 1 },
      news: { values: [] },
      share_activity_title: { values: "" },
      share_contents: { values: "" },
      share_image: { values: "" },
      share_item_title: { values: "我是{number}号项目{name}，请帮我投一票" },
      default_ani_image: { values: "12f5924b-7888-4bdc-aa4f-66c7013f5e7a1717907156402.jpg" },
      ani_image: { values: "" },
      default_btn_image: { values: "8df7ffc8-05a4-49f4-9bbf-5b116fe165f81717907882626.jpg" },
      btn_image: { values: "" },
      ad_type: { values: 1 },
      captcha_type: { values: 1 },
      every_time_vote: { values: 1 },
      theme_history_url: { values: "" },
      show_theme_quick: { values: false },
      rule_text_plugin: { values: "活动说明" },
      rule_text_plugin_color: { values: "#000000" },
      rule_text_plugin_size: { values: 1 },
      rule_text_color: { values: "#000000" },
      rule_text_size: { values: 1 },
      rule_text: { values: '' },
      display_rule_text: { values: true },
      bottom_text_color: { values: "" },
      bottom_text_url: { values: "" },
      bottom_text: { values: "领航评选" },
      topic_menu: { values: [] },
      open_text_notice: { values: false },
      show_ad: { values: false },
      topic_bg_pic: { values: '' },
      banners: { values: [] },
      text_notice: { values: '' },
      vote_type: { values: 1 },   // 单选 多选
      vote_times_limit_type: { values: 1 }, // 投票周期 1:固定次数  2:周期次数
      can_vote_same_item_num: { values: 1 }, // 周期内可以投几次
      min_choose_num: { values: 1 }, // 最少选择选手
      max_choose_num: { values: 1 }, // 最多选择选手
      intro: { values: '' }, // 介绍文本
      default_player_cover: { values: "2020101115550646836.jpg" },
      page_float: { values: '' },
      music: { values: '' },
      vote_item_group_column: { values: 4 },
      vote_item_column_type: { values: 2 },
      vote_item_array_type: { values: 1 },
      ad_image: { values: "" },
      canvass_title: { values: "" },
      vote_item_pic_array_type: { values: 1 },
      intro_page: {
        values: {
          show_name_in_intro: true,
          show_news_in_intro: true,
          show_statistics_in_intro: true,
          show_timer_in_intro: false,
          show_vote_num_in_intro: true,
          show_vote_rules_in_intro: true
        }
      },
      rank_page: {
        values: {
          show_all_ranking: true,
          show_group_in_rank: true,
          show_name_in_rank: true,
          show_number_in_rank: true,
          show_statistics_in_rank: true,
          show_timer_in_rank: true,
          show_vote_item_cover_in_rank: true,
          show_vote_item_intro_in_rank: true,
          show_vote_num_in_rank: true,
          show_vote_rules_in_rank: true
        }
      },
      vote_item_detail_page: {
        values: {
          show_canvass: true,
          show_number_in_detail: true,
          show_statistics_in_detail: true,
          show_vote_button_in_detail: true,
          show_vote_item_cover_in_detail: true,
          show_vote_item_intro_in_detail: true,
          show_vote_item_name_in_detail: true,
          show_vote_num_in_detail: true,
        }
      },
      vote_page: {
        values: {
          show_group_in_vote: true,
          show_all_group: true,
          show_enroll_button: true,
          show_name: true,
          show_ranking_button: true,
          show_search: true,
          show_statistics: true,
          show_timer: true,
          show_topic_data: true,
          show_vote_button: true,
          show_vote_item_cover: true,
          show_vote_item_detail: true,
          show_vote_item_intro: true,
          show_vote_item_name: true,
          show_vote_item_no: true,
          show_vote_num: true,
          show_vote_rules: true,
        }
      },
      open_video_enroll: {
        values: false
      },
      open_image_enroll: {
        values: true
      },
      enroll_custom_input: {
        "values": [
          {
            "attribute": 1,
            "name": "42fb37e1-4381-4936-9908-7045eb81b60f",
            "options": null,
            "public": false,
            "text": "自定义1",
            "type": "text"
          }
        ]
      },
      enroll_info_input: {
        "values": {
          "attribute": 1,
          "name": "info",
          "options": null,
          "public": false,
          "text": "简介",
          "type": "text"
        }
      },
      enroll_name_input: {
        "values": {
          "attribute": 1,
          "name": "name",
          "options": null,
          "public": false,
          "text": "姓名",
          "type": "text"
        }
      },
      enroll_start_at: { values: "2024-05-01 10:02" },
      enroll_start_end: { values: "2024-05-31 10:02" },
      enroll_pic_name: { values: "图片" },
      enroll_pic_image_at_least: { values: 1 },
      enroll_pic_image_at_most: { values: 3 }
    },

    sourceHost: 'https://upload.cyuandao.com/',
    style: 1,
    domain: '',
    openid: wechatUser ? wechatUser.openid : '',
    wechatUser: wechatUser,
    activityData: {
      total_players: 0,
      total_visits: 0,
      total_votes: 0,
    },
    timeData: {
      day: '0',
      hour: '00',
      min: '00',
      second: '00',
      status: '开始'
    },

    setDomain: (v) => set(() => ({ domain: v })),
    setActivityId: (v) => set(() => ({ activityId: v })),
    setWechatUser: (v) => set(() => ({ wechatUser: v })),
    setOpenid: (v) => set(() => ({ openid: v })),
    setActivityData: (v) => set(() => ({ activityData: v })),
    setTimeData: (v) => set(() => ({ timeData: v })),

    setActivitySetting: (v) => set(() => ({ activitySetting: v })),
    getActivitySetting: async (domain) => {

      const response = await fetchActivityBaseSettings(domain)

      // 动态设置主题色
      const primaryColor = response.data.parameters.color.values
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--background-color', primaryColor);

      // 设置模版
      const tempId = response.data.view_nid
      const link = document.createElement('link');
      link.href = `/public/themes_011/${tempId}.css`;
      link.type = 'text/css';
      link.rel = 'stylesheet';

      const extraLink = document.createElement('link');




      document.title = response.data.title;


      document.head.appendChild(link);
      if (extraCssIds.includes(response.data.id)) {
        extraLink.href = `/public/activity/${response.data.id}.css`;
        extraLink.type = 'text/css';
        extraLink.rel = 'stylesheet';
        document.head.appendChild(extraLink);
      }

      // const authUrlRes = await fetchAuthUrl(response.data.id)
      playerStore.getState().getGroups(response.data.id)

      set({
        tempId: tempId,
        activityId: response.data.id,
        activityTitle: response.data.title,
        activitySetting: response.data.parameters,
        activityStartTime: response.data.start_at,
        activityEndTime: response.data.end_at,
        style: response.data.style,
      })
    },
  }))


export default useSettingStore