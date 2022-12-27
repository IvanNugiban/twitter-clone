function formatNumber(number : number) {
    if (number < 1000) return number;
    if (number > 1000 && number < 1000000) return `${(number / 1000).toFixed(1)}K`
    if (number > 1000000) return `${(number / 1000000).toFixed(1)}M`
    return `${(number / 10 ^ 9).toFixed(1)}B`
}

export default formatNumber;