
const isProduct_ENV = true
//const isProduct_ENV = process.env.NODE_ENV == 'production' ? true : false
const baseURL = isProduct_ENV ? 'http://www.hmhxcx.com' : 'http://test.hmhxcx.com'
/**
 * 通用常量
 */
const COMMON_CONSTANT = {
    baseJavaUrl: isProduct_ENV ? baseURL + '/fly-park' : baseURL + '/fly-park', //现网Java服务的基本路由
    // baseJavaUrl: 'http://127.0.0.1:8081', //本地开发访问Java服务的基本路由
    BASE_URL: baseURL,  //正式服务器
    baseJavaUrlTest: 'http://106.12.22.65', //106服务器访问Java服务的基本路由
    BASE_URL_TEST: 'http://106.12.22.65',  //测试服务器
    // CHARGE_URL: 'http://27.17.22.71:8092/wh-site-1.0-SNAPSHOT/index.html#/watches/charging', //充电桩外网链接
    CHARGE_URL: 'http://pro.nearcharge.com/', //充电桩外网链接
}

/**
 * 常用的正则
 */
const COMMON_REGEX = {
    phone: /^1[3456789]\d{9}$/
}

/**
 * 大数据中心
 */
const BIG_DATA = {
    bigDataUrl_xy: 'https://datav.aliyun.com/share/76cf42e70dab9aa979b1413746a44a8d',  //大数据中心访问链接
    onlineCarUrl: 'http://36.155.114.171:9002/',//网约车
    governmentCarUrl: 'http://36.155.115.198:81',//公务用车
}


/**
 * 项目总览
 */
const PROJECT_VIEW = {

}

/**
 * 业务总览
 */
// const BUSINESS_VIEW = {
//     cityMap: {
//         tollIconSmall: require('../images/toll_Icon_small.png'),
//         treeReginCode: '420606'  //树形结构 区域区分
//     }
// }

/**
 * 路内停车场管理
 */
const PARK_VIEW_IN = {

}

/**
 * 路外停车场管理
 */
const PARK_VIEW_OUT = {
    routeName: '/outParkingTurnover'
}

/**
 * 运营管理
 */
const OPERATION_MANAGEMENT = {
    videoControl: {
        thirdVedioUrl: 'http://park.tnar.cn/video2.html'
    },
    orderManagment: {
        refundRecord: {
            viewPermissionIds: [4010000120674, 4010000120636, 4010000120637]
        }
    }
}

/**
 * 客户管理
 */
const CUSTOMER_MANAGEMENT = {

}

/**
 * 财务管理
 */
const FINANCIAL_MANAGEMENT = {

}

/**
 * 人员管理
 */
const PEOPLE_MANAGEMENT = {

}

/**
 * 运维管理
 */
const MAINTENANCE_MANAGEMENT = {

}

/**
 * 系统管理
 */
const SYS_MANAGEMENT = {

}

/**
 * 消息提示
 */
const NOTICE_MANAGEMENT = {

}

/**
 * 共享管理
 */
const SHARE_MANAGEMENT = {

}



export {
    COMMON_CONSTANT,
    BIG_DATA,
    PROJECT_VIEW,
    BUSINESS_VIEW,
    PARK_VIEW_IN,
    PARK_VIEW_OUT,
    OPERATION_MANAGEMENT,
    CUSTOMER_MANAGEMENT,
    FINANCIAL_MANAGEMENT,
    PEOPLE_MANAGEMENT,
    MAINTENANCE_MANAGEMENT,
    SYS_MANAGEMENT,
    NOTICE_MANAGEMENT,
    SHARE_MANAGEMENT,
    COMMON_REGEX,
    isProduct_ENV
}