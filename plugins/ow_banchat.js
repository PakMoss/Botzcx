import db from '../lib/database.js'

let handler = async (m, { participants }) => {
    // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    db.data.chats[m.chat].isBanned = true
    m.reply('*Berhasil*')
    // } else m.reply('Ada nomor host disini...')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i

handler.owner = true

export default handler