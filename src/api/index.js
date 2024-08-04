import { post, postFormDataWidthJson } from '@/utils/request'
import utils from '../utils/common'
import { JSEncrypt } from "js-encrypt"




// 获取选手排名
export function fetchPlayerData(activity_id, player_id) {
    return post({
        url: `/api/activity/get_player_details/${activity_id}/${player_id}`,
        data: {
        }
    })
}


// 获取主题参数
export function fetchTopicData(topicId) {
    return post({
        url: '/api/theme/topic/' + topicId,
        data: {
        }
    })
}

// 添加活动访问数
export function addActivityVisits(activity_id) {
    return post({
        url: '/api/activity/add_activity_visits/' + activity_id,
        data: {
        }
    })
}

// 添加选手访问数
export function addActivityPlayerVisits(activity_id, id) {
    return post({
        url: '/api/activity/add_activity_player_visits',
        data: {
            activity_id,
            id
        }
    })
}


// 获取jsdk参数
export function fetchWeChatSahreData() {
    return post({
        url: '/api/wechat/share',
        data: {
            url: decodeURIComponent(location.href)
        }
    })
}


// 查看授权是否过期
export function fetchUserLogin(openid) {
    return post({
        url: '/api/wechat/user_login/' + openid,
        data: {
        }
    })
}



// 查询报名状态
export function fetchApplyStatus(activity_id, openid) {
    return post({
        url: '/api/activity/get_enroll',
        data: {
            activity_id,
            openid
        }
    })
}


// 报名接口
export function doApply(activity_id, data) {
    return postFormDataWidthJson({
        url: '/api/activity/add_enroll',
        data: {
            activity_id,
            ...data
        }
    })
}



// 获取活动授权地址
export function doVote({
    token,
    activityId,
    playerIds,
    avatar,
    openid,
    nickname,
    code,
    captchaId,
    dots,
    captcha_key
}) {

    let timestamp = new Date().getTime() + utils.getRandomNumber(6)
    const KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzz7EpgWspHMizcW2JReQ1lmKWKFH9/LjMkBPf1TTlNji+RzovBCEXhP+jSNy6JDMIZ8FSfaY7qBprEgGrGsTBXin5R54MrAU6Fq3Ul3M3DdZ0FPh28wkdShtf4mwGsb0HUICLGUKa3c4JYlNrziBkP5rtsSOws39j36FOLuIfQwIDAQAB`
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(KEY)
    const encryptData = encrypt.encrypt(openid)
    console.log('token', token)
    let data = {
        token,
        avatar,
        activity_id: activityId,
        player_ids: playerIds.toString(),
        nickname,
        openid: encryptData,
        code,
        captchaId,
        timestamp,
        captcha_key,
        dots

    }



    return post({
        url: '/api/pull/vote',
        data
    })
}



// 获取滑动证码
export function fetchCnCaptcha() {
    return post({
        url: '/api/captcha/get_cn_captcha',
        data: {
        }
    })
}

// 获取滑动证码
export function fetchBlockPuzzleCaptcha() {
    return post({
        url: '/api/captcha/get_block_puzzle_captcha',
        data: {
        }
    })
}

// 获取计算证码
export function fetchCalculateCaptcha() {
    return post({
        url: '/api/captcha/get_calculate_captcha',
        data: {
        }
    })
}


// 获取数字验证码
export function fetchMatchCaptcha() {
    return post({
        url: '/api/captcha/get_match_captcha',
        data: {
        }
    })
}

// 获取活动授权地址
export function fetchAuthUrl(activityId, state) {
    return post({
        url: '/api/wechat/get_jump_url',
        data: {
            "activity_id": activityId,
            "state": state
        }
    })
}

// 获取活动配置
export function fetchActivityBaseSettings(domain) {
    return post({
        url: '/api/activity/get_activity_base_settings/' + domain,
        data: {}
    })
}

// 获取活动配置
export function fetchWechatUser(code, activityId) {
    return post({
        url: '/api/wechat/authorization',
        data: {
            code,
            activity_id: activityId,
        }
    })
}


// 获取活动数据
export function fetchActivityData(activityId) {
    return post({
        url: '/api/activity/get_activity_data/' + activityId,
        data: {}
    })
}

// 获取活动分组
export function fetchActivityGroups(activityId) {
    return post({
        url: '/api/activity/get_activity_groups/' + activityId,
        data: {}
    })
}

// 获取活动分组
export function getActivityPlayerInfo(activity_id, id) {
    return post({
        url: '/api/activity/get_activity_player_info',
        data: {
            activity_id,
            id
        }
    })
}

// 获取活动分组
export function fetchActivityPlayers(data) {
    return post({
        url: '/api/activity/get_activity_player_list',
        data
        // {
        //     "page":1,
        //     "page_size":100,
        //     "search_text":"",
        //     "search_type":1,
        //     "activity_id":"64f4314a64b6525a399af0c8",
        //     "group_id":""
        // }
    })
}

// 获取活动分组
export function fetchActivityRanks(data) {
    return post({
        url: '/api/activity/get_rank',
        data
        // {
        //     "activity_id":"64f4314a64b6525a399af0c8",
        //     "group_id":""
        // }
    })
}

