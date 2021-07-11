/**
 * 
 * @returns date value
 * 
 * 
 */
export function setMinDate() {
    const date = new Date();
    let tdate = date.getDate();
    let month = date.getMonth() + 1;

    if (tdate < 10) {
        tdate = "0" + tdate;
    }
    if (month < 10) {
        month = "0" + month;
    }

    let year = date.getUTCFullYear();
    let minDate = year + "-" + month + "-" + tdate;
    return minDate;
}