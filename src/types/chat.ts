export type MessageType = 'text' | 'image' | 'voice';
export type ReactionType = 'love' | 'like' | 'angry';

export type Reactions = {
  love: number;
  like: number;
  angry: number;
  byUser: Record<string, ReactionType>;
};

export type ChatMessage = {
  id: string;
  sender: string;
  text: string;
  image?: string;
  sentAt: string;
  kind: MessageType;
  voiceSeconds?: number;
  reactions: Reactions;
};

export type ServerPayload =
  | { type: 'history'; messages: ChatMessage[] }
  | { type: 'message'; message: ChatMessage }
  | { type: 'reaction'; message: ChatMessage };

export const initReactions = (): Reactions => ({
  love: 0,
  like: 0,
  angry: 0,
  byUser: {},
});

export const reactionButtons: Array<{ type: ReactionType; icon: string; label: string }> = [
  { type: 'love', icon: '❤️', label: 'Love' },
  { type: 'like', icon: '👍', label: 'Like' },
  { type: 'angry', icon: '😡', label: 'Angry' },
];
