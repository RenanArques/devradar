module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(iten => iten.trim());
}