
export const C_PlayerPageExtraName = {
    '6688d9e62313fe8de2a532d7': {
        '1': '广州市吾乡石屋民宿客栈有限公司',
        '2': '信宜市窦州里商业管理有限公司',
        '3': '深圳市东部通用航空有限公司',
        '4': '佛山市高明旺林旅游开发有限公司',
        '5': '濠江区文化广电旅游体育局',
        '6': '河源市绿乡生鲜供应链有限公司',
        '7': '珠海市日新化妆品有限公司',
        '8': '重庆市鹰飞飞航空体育俱乐部有限公司罗定分公司',
        '9': '珠海市华藤商业运营有限公司',
        '10': '惠州市龙门县永汉镇人民政府'
    }
}

export const C_PlayerInfoCustomMid = (activityId, item) => {
    switch(activityId) {
        case '6689f9f1752ff48cb2eac211':
            return item.short_name
        default:
            return null
    }
}

export const C_PlayInfoCustom = (activityId, item) => {
    switch(activityId){
        case '6688d9e62313fe8de2a532d7':
            return item.short_name
        case '66aa358274ce4b7fdc0830ca':
            return item.short_name
        case '66aa365f74ce4b7fdc0831c7':
            return item.short_name
        case '66aa36d174ce4b7fdc0832c3':
            return item.short_name
        default:
            return item.introduction
    }
}