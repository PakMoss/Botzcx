import db from '../lib/database.js'

const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = db.data.chats[m.chat]
    let bot = db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        if (isBotAdmin) {
        await conn.sendButton(m.chat, `Link Grup terdeteksi*\n\n_Kamu Akan Di Kick Secara Otomatis_\n\n`, author, ['Maaf', 'v'], m)
          setTimeout(() => {
           conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }, 5000) 
       } else if (!bot.restrict) return m.reply('Owner disable auto kick!')
    }
    return !0
}