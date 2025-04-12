export default function EmojiPicker({ show, onEmojiSelect }) {
  const emojis = ['😀', '😂', '😍', '👍', '🙏', '🎉'];

  if (!show) return null;

  return (
    <div className="emoji-picker">
      <div className="grid grid-cols-6 gap-1">
        {emojis.map((emoji, index) => (
          <span 
            key={index} 
            className="cursor-pointer" 
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}