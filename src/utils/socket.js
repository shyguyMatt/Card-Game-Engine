const { io } = require('socket.io-client')

const URL = 'https://cardgame.shyguymatt.com'
const socket = io(URL)

module.exports = { socket }