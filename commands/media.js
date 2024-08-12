const { commands, Meta } = require('../lib/');
const config = require('../config.js');
const sharp = require('sharp');
const { writeFileSync } = require('fs');

Meta({
  command: 'sticker',
  category: 'media',
  handler: async (sock, message, matched) => {
    const { from, message: msg } = message[0];
    const media = msg.imageMessage || msg.videoMessage || msg.stickerMessage;
    if (!media) {
      return await sock.sendMessage(from, { 
        text: 'Please reply to an image or video to create a sticker' }, { quoted: message[0] });
    }

    const buffer = await sock.downloadMediaMessage(media);
    const packName = config.PACKNAME;
    const cropp = await sharp(buffer)
      .resize(512, 512, {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .webp({ quality: 70 })
      .toBuffer();

    const st_Data = {
      mimetype: 'image/webp',
      data: cropp,
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: '🤓 X-Astral',
          body: packName,
          sourceUrl: '',
        }
      }
    };
    await sock.sendMessage(from, { sticker: st_Data }, { quoted: message[0] });
  }
});
      
