
const { clientId, token, aiKey, unlimited, owner } = require('./config.json');
const PREFIX = '/';
const NONE = '';
const VERSION = '2.4.10';
const BOT_NAME = 'Mesa';
const Discord_link = 'https://discord.gg/sZJwk7zcYd';
const Github_link = 'https://github.com/Starlight0218/Mesa';
const Invite_link = 'https://discord.com/oauth2/authorize?client_id=520789204658028555'
const commands = 'context, version, help, clear, invite, github, discord'
const BOT_ID = '<@520789204658028555>'

module.exports = {
    PREFIX,
    NONE,
    VERSION,
    BOT_NAME,
    BOT_ID,
    token,
    Discord_link,
    Github_link,
    Invite_link,
    clientId,
    aiKey,
    unlimited,
    owner,
    commands
}