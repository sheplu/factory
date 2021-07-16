/**
 * Return a random number between min and max (included)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    random
}