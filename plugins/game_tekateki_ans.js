// @srart24

import similarity from 'similarity'
import db from '../lib/database.js'

const threshold = 0.72
let handler = m => m
handler.before = async function (m, {fromMe}) {
    let id = m.chat
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return 
  if (id in this.tekateki) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
            if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            db.data.users[m.sender].exp += this.tekateki[id][2]
            db.data.users[m.sender].money += this.tekateki[id][3]
            this.sendButton(m.chat, `🥳🥳🥳 \n\Selamat Jawaban Kamu Benar\n\nHadiah:\n+ ${this.tekateki[id][2]} XP 🧬\n+ Rp.${this.tekateki[id][3]} 💰`, wm, ['tekateki', '/tekateki'], m)
            clearTimeout(this.tekateki[id][4])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply('*Jawaban Kamu Hampir Benar*')
    }
    return !0
}
handler.exp = 0

export default handler