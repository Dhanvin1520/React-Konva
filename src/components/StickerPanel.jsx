import '../styles/StickerPanel.css';

const StickerPanel = ({ stickers, onAddSticker }) => {
  return (
    <div className="sticker-panel">
      <h2>Stickers</h2>
      <div className="sticker-buttons">
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            className="sticker-button"
            onClick={() => onAddSticker(sticker.id)}
            title={`Add ${sticker.name}`}
          >
            <span className="sticker-emoji">{sticker.emoji}</span>
            <span className="sticker-name">{sticker.name}</span>
          </button>
        ))}
      </div>
      <div className="instructions">
        <p><strong>Tip:</strong> Double-click a sticker to delete it</p>
      </div>
    </div>
  );
};

export default StickerPanel;