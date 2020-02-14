export function GetSimpleDateString(date) 
{
    var month = String(date.getMonth()+1);
    if (month.length == 1) { month = `0${month}`; }
    var day = String(date.getDate());
    if (day.length == 1) { day = `0${day}`; }

    var hour = String(date.getHours());
    if (hour.length == 1) { hour = `0${hour}`; }
    var minute = String(date.getMinutes());
    if (minute.length == 1) { minute = `0${minute}`; }

    return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`
}