import { WebSocketServer } from 'ws';

const port = 3002;
const wss = new WebSocketServer({ port });

const initReactions = () => ({ love: 0, like: 0, angry: 0, byUser: {} });

const history = [
  {
    id: 'seed-1',
    sender: 'Anon-84X',
    text: 'Welcome to the hidden group 👋',
    sentAt: '10:14',
    kind: 'text',
    reactions: initReactions(),
  },
  {
    id: 'seed-2',
    sender: 'Anon-Q7B',
    text: 'Drop your mood sticker below 🎉',
    sentAt: '10:15',
    kind: 'text',
    reactions: initReactions(),
  },
];

const broadcast = (payload) => {
  const encoded = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(encoded);
  }
};

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'history', messages: history }));

  socket.on('message', (raw) => {
    try {
      const incoming = JSON.parse(String(raw));

      if (incoming.type === 'message' && incoming.message) {
        const withReactions = {
          ...incoming.message,
          reactions: incoming.message.reactions ?? initReactions(),
        };
        history.push(withReactions);
        if (history.length > 250) history.shift();
        broadcast({ type: 'message', message: withReactions });
        return;
      }

      if (incoming.type === 'reaction') {
        const { messageId, reaction, userAlias } = incoming;
        const target = history.find((msg) => msg.id === messageId);
        if (!target) return;

        target.reactions = target.reactions ?? initReactions();
        const prev = target.reactions.byUser[userAlias];
        if (prev) target.reactions[prev] = Math.max(0, target.reactions[prev] - 1);

        if (prev === reaction) {
          delete target.reactions.byUser[userAlias];
        } else {
          target.reactions[reaction] = (target.reactions[reaction] ?? 0) + 1;
          target.reactions.byUser[userAlias] = reaction;
        }

        broadcast({ type: 'reaction', message: target });
      }
    } catch {
      // ignore malformed payload
    }
  });
});

console.log(`VZN chat websocket running on ws://localhost:${port}`);
