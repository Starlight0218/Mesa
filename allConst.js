const commandHandeler = require('./commands/commandHandeler.js')
const { token } = require('./config.json');
const PREFIX = '-';
const NONE = '';
const WEIRD = '-';
const WEIRD2 = '+';
const VERSION = '1.0.8';
const BOT_NAME = 'Mesa';

module.exports = {
    PREFIX,
    NONE,
    WEIRD,
    WEIRD2,
    VERSION,
    BOT_NAME,
    commandHandeler,
    token
}