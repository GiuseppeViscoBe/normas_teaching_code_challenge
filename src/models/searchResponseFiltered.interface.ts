export interface searchResponseFiltered {
    imageid : string,
    width : number,
    height : number,
    urls : urlList,
    description : string
}

interface urlList {
    raw : string,
    full : string,
    regular : string,
    small : string,
    thumb : string,
    small_s3 : string
}