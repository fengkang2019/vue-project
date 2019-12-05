import { commodRequest } from '../commodRequest'
import { kesbURL } from '@/utils/api.js'

/*
功能代码:85404101
功能名称:queryDayParkSerial_EX
功能描述:当日停车收费
*/
function getCutoffReason(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: "",
        data: JSON.stringify(commodRequest("81001004", reqData, custId, session))
    })
        .then(function (res) {

            return res;
        })
        .catch(function (error) {
            return error
        });
}


export { getCutoffReason }