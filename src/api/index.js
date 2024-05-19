import { post, postFormDataWidthJson } from '@/utils/request'
import utils from '../utils/common'
import { JSEncrypt } from "js-encrypt"




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
    activityId,
    playerIds,
    avatar,
    openid,
    nickname,
    code,
    captchaId
}) {
    console.log('请求投票接口')
    let timestamp = new Date().getTime() + utils.getRandomNumber(6)
    const KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzz7EpgWspHMizcW2JReQ1lmKWKFH9/LjMkBPf1TTlNji+RzovBCEXhP+jSNy6JDMIZ8FSfaY7qBprEgGrGsTBXin5R54MrAU6Fq3Ul3M3DdZ0FPh28wkdShtf4mwGsb0HUICLGUKa3c4JYlNrziBkP5rtsSOws39j36FOLuIfQwIDAQAB`
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(KEY)
    const encryptData = encrypt.encrypt(openid)
    let data = {
        avatar,
        activity_id: activityId,
        player_ids: playerIds.toString(),
        nickname,
        openid: encryptData,
        code,
        captchaId,
        timestamp
    }

    console.log('data', data)

    return post({
        url: '/api/pull/vote',
        data
    })
}



// 获取活动授权地址
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
            state
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
