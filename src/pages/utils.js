export const getDiscount = (discountStr, price) => {
    if(discountStr){
        if(discountStr.includes("%")){
            const rate = parseInt(discountStr.replace("%", ""))
            return price * rate / 100;
        }else{
            if(!isNaN(discountStr)){
                return parseInt(discountStr);
            }else{
                return 0;
            }
        }
    }else{
        return 0;
    }
}

export const getDate = (s) => {
    return s.split('T')[0];
}
export const getTime = (s) => {
    return s.split('T')[1];
}
export const getDisplayTime = (s1) => {
    const s = new Date(s1).toISOString();
    const t = getTime(s);
    return getDate(s) + " " + t.split('.')[0];
}
export function getUnixTime(date){
    const unixTimestamp = date.getTime();
    return unixTimestamp;
}