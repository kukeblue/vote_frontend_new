

export const C_ApplyDownloadAttachment = (activityId) => {
    switch(activityId){
        case '669f064102199a22bf526f08':
            return "https://wwk.lanzouo.com/iRmOf265locb"
        default:
            return ""
    }
}

export const C_ApplyInputPlaceholders = (activityId) => {
    switch(activityId){
        case '669f064102199a22bf526f08':
            return (item)=> {
                if(item =='请输入项目名称') {
                    return '(项目名称科技企业可不填写)'
                }
                return item
            }
        default:
            return null
    }
}