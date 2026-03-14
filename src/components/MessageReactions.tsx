import { ReactionType, reactionButtons } from '../types/chat';

type MessageReactionsProps = {
  currentReaction?: ReactionType;
  counts: { love: number; like: number; angry: number };
  onReact: (reaction: ReactionType) => void;
};

export default function MessageReactions({ currentReaction, counts, onReact }: MessageReactionsProps) {
  return (
    <div className="reaction-row">
      {reactionButtons.map((item) => (
        <button
          key={item.type}
          type="button"
          className={`reaction-btn ${currentReaction === item.type ? 'active' : ''}`}
          onClick={() => onReact(item.type)}
          aria-label={`React ${item.label}`}
        >
          <span>{item.icon}</span>
          <small>{counts[item.type] || 0}</small>
        </button>
      ))}
    </div>
  );
}
