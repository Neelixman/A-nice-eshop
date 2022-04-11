export const formatPrice = (price) => {
    const formattedPrice = Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: "EUR"
    }).format(price / 100)
    return formattedPrice;
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if(type === "colors") {
        unique = unique.flat();
    }
    return ['all', ...new Set(unique)]
}
