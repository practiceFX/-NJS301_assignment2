export const formatDate = (date) => {
    const dateStart = new Date(date);
    const dateFormat = dateStart.getDate() < 10 ? '0' + dateStart.getDate() : dateStart.getDate();
    const monthFormat = dateStart.getMonth() + 1 < 10 ? '0' + (dateStart.getMonth() + 1) : dateStart.getMonth() + 1;
    const yearFormat = dateStart.getFullYear();
    return dateFormat + ' - ' + monthFormat + ' - ' + yearFormat;
}


export const convertArray = (stringList) => {
    let arrayList = stringList.split(',');
    return arrayList
}
