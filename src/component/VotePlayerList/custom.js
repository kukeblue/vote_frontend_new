

export const C_PlayerListInfoCustom = (activityId, item) => {
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
export const C_PlayerListInfoCustomMid = (activityId, item) => {
    switch(activityId) {
        case '6689f9f1752ff48cb2eac211':
            return item.short_name
        default:
            return null
    }
}