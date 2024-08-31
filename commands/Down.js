const { commands, Meta } = require('../lib');
const { IMAGE_DOWN } = require('./FUNCS_DATA/img_down.js');

Meta({
  command: 'img',
  category: 'downloads',
  filename: __filename,
  handler: async (sock, message, args) => {
    const { from } = message;
    if (!args.length) {
      await sock.sendMessage(from, { text: '*_Please provide a query_*' });
      return;
    }
    const query = args.join(' ');
    try {
      const imagees = await IMAGE_DOWN(query);
      if (imagees.length > 0) {
        for (let i = 0; i < imagees.length && i < 5; i++) {
          const image_down = imagees[i];
        await sock.sendMessage(from, { image: { url: image_down } }, { quoted: message });
        }
      } else {}
    } catch (error) {
      console.error(error);
    }
  },
});
        
