const zimeuzika = "sold";
let total = "total";
exports.bidhaaReplacer = (card, el) => {
    let replaced = card.replace(/{%NAME%}/g, el.name)
    replaced = replaced.replace(/{%PRICE%}/g, el.price)
    replaced = replaced.replace(/{%SOLD%}/g, zimeuzika)
    replaced = replaced.replace(/{%IDADI%}/g, el.numOfCommoditySoldNow)
    replaced = replaced.replace(/{%TOTAL%}/g, total)
    replaced = replaced.replace(/{%TOTAL_PRICE%}/g, el.totalPrice)
    return replaced;
}

exports.mdaiwaReplacer = (card, el) => {
    let replaced = card.replace(/{%NAME%}/g, el.name)
    replaced = replaced.replace(/{%PRICE%}/g, el.price)
    replaced = replaced.replace(/{%SOLD%}/g, el.product)
    replaced = replaced.replace(/{%IDADI%}/g, el.quantity)
    replaced = replaced.replace(/{%TOTAL%}/g, total)
    replaced = replaced.replace(/{%TOTAL_PRICE%}/g, el.totalPrice)
    return replaced;
}
exports.paymentReplacer = (card, el) => {
    let total = "remain";
    let replaced = card.replace(/{%NAME%}/g, el.name)
    replaced = replaced.replace(/{%PRICE%}/g, el.price)
    replaced = replaced.replace(/{%SOLD%}/g, el.product)
    replaced = replaced.replace(/{%IDADI%}/g, el.quantity)
    replaced = replaced.replace(/{%TOTAL%}/g, total)
    replaced = replaced.replace(/{%TOTAL_PRICE%}/g, el.totalPrice)
    return replaced;
}