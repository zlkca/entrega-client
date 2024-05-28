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