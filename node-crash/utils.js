function generateRandNumb () {
    return Math.floor(Math.random() * 29)
}

function celciustofahren(celcius) {
    return (celcius*9) / 5 + 32
}

module.exports = {
    generateRandNumb,
    celciustofahren,
}