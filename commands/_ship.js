const { commands, Meta } = require('../lib/');
const fetch = require('node-fetch');
const canvafy = require('canvafy');

Meta({
  command: 'ship',
  category: 'fun',
  filename: 'funn.js',
  handler: async (sock, args, message, mentionedJid) => {
    const { from } = message;
    const mentioned = mentionedJid || [];
        if (mentioned.length !== 2) {
      await sock.sendMessage(from, { text: "Please mention_two users" });
      return;
    } try {
      const pro_ur = await Promise.all(mentioned.map(jid => sock.profilePictureUrl(jid)));
      const avatars = await Promise.all(pro_ur.map(url => fetch(url).then(res => res.buffer())));
      const percentage = Math.floor(Math.random() * 101);
      const ratings = [
        'Awful', 'Very Bad', 'Poor', 'Average', 'Good',
        'Great', 'Amazing', 'XAstral', 'Virgin', 'Loser'
      ];
      const rating = ratings[Math.floor(percentage / 10)];
      const ship_Card = await canvafy.createImage(500, 250)  
        .setBackgroundColor('#000000')  
        .drawCircleImage(avatars[0], { x: 80, y: 125, radius: 75 })  
        .drawCircleImage(avatars[1], { x: 420, y: 125, radius: 75 }) 
        .setText(`${percentage}%`, {
          x: 250, y: 50, fontSize: 40, color: 'white',
          align: 'center', stroke: 'black', strokeWidth: 3
        }) 
        .setText(rating, {
          x: 250, y: 200, fontSize: 30, color: 'white',
          align: 'center', stroke: 'black', strokeWidth: 2
        })  
        .toBuffer();
      const mention_Tags = mentioned.map(jid => `@${jid.split('@')[0]}`).join(' and ');
      const caption = `*Ship Result*\n${percentage}% Compatibility\n${mention_Tags}\n*Rating*: *${rating}*`;
      await sock.sendMessage(from, {
        image: ship_Card,
        caption,
        mentions: mentioned
      });
    } catch (error) {
      console.error(error);
        }
    }
});
                                               
