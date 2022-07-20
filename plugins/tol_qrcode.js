
import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text }) => conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '', m)

handler.help = [''].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^(qr)$/i


export default handler