
import axios from "@/utils/axios";
import { COMMON_CONSTANT, isProduct_ENV } from '../../static/Constant'

let kesbapi = '';

//设置kesb路径in
let kesbURL = '';
let kesbJavaURL = '';
let baseJavaUrl = '';
const BASE_URL = COMMON_CONSTANT.BASE_URL

if (isProduct_ENV) {
    kesbapi = BASE_URL + '/kesb/api/';
    //设置kesb路劲in
    kesbURL = axios.create({
        baseURL: BASE_URL + '/kesb_req'
    });
    kesbJavaURL = axios.create({
        baseURL: COMMON_CONSTANT.baseJavaUrl
    });
    baseJavaUrl = BASE_URL + '/fly-park'
} else {
    //设置kesb路径in
    kesbURL = axios.create({
        baseURL: BASE_URL + '/kesb_req'
    });
    kesbJavaURL = axios.create({
        baseURL: BASE_URL
    });
    baseJavaUrl = BASE_URL;
}
export {
    kesbapi,
    kesbURL,
    baseJavaUrl,
    kesbJavaURL,
}