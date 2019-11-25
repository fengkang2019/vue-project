
import moment from "moment"

//选择 今日 昨日 七天 30日
export function chooseDate(date, value) {
    let endTime = moment().format("YYYYMMDD" + "235959");
    let startTime = "";
    if (date == 1) {
        value = [
            (startTime = moment().format("YYYYMMDD" + "000000")),
            endTime
        ];
    } else if (date == 2) {
        value = [
            (startTime = moment()
                .subtract(1, "day")
                .format("YYYYMMDD" + "000000")),
            endTime
        ];
    } else if (date == 3) {
        value = [
            (startTime = moment()
                .subtract(7, "day")
                .format("YYYYMMDD" + "000000")),
            endTime
        ];
    } else {
        value = [
            (startTime = moment()
                .subtract(30, "day")
                .format("YYYYMMDD" + "000000")),
            endTime
        ];
    }
    return value
}
// 时间 格式 化

