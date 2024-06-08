export const getDiscount = (discountStr, price) => {
    if (discountStr) {
        if (discountStr.includes("%")) {
            const rate = parseInt(discountStr.replace("%", ""))
            return price * rate / 100;
        } else {
            if (!isNaN(discountStr)) {
                return parseInt(discountStr);
            } else {
                return 0;
            }
        }
    } else {
        return 0;
    }
}

export const getCartSubTotal = (cart) => {
    let sub = 0
    cart.map(it => sub += it.quantity * (it.product.price - getDiscount(it.product.discount, it.product.price)));
    return sub;
}

export function getRamdomString(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function genOrderNumber() {
    const now = new Date().toISOString();
    const date = now.split("T")[0].split("-").join("");
    return `${date.substring(2)}${getRamdomString(6)}`;
}