import { useState } from 'react';
import StickerCanvas from './components/StickerCanvas';
import StickerPanel from './components/StickerPanel';
import './styles/App.css';

const STICKERS = [
  {
    id: 'sticker1',
    emoji: '🚀',
    name: 'Rocket'
  },
  {
    id: 'sticker2',
    emoji: '🌈',
    name: 'Rainbow'
  },
  {
    id: 'sticker3',
    emoji: '⭐',
    name: 'Star'
  }
];

function App() {
  const [stickers, setStickers] = useState([]);
  const [gridSnap, setGridSnap] = useState(true);

  const handleAddSticker = (stickerId) => {
    const stickerType = STICKERS.find(s => s.id === stickerId);
    
    if (!stickerType) return;
    

    let x = Math.random() * 500;
    let y = Math.random() * 300;
    

    if (gridSnap) {
      x = Math.round(x / 40) * 40;
      y = Math.round(y / 40) * 40;
    }
    
    const newSticker = {
      id: `${stickerId}-${Date.now()}`,
      type: stickerId,
      emoji: stickerType.emoji,
      x,
      y,
      isDragging: false
    };
    
    setStickers((prevStickers) => [...prevStickers, newSticker]);
  };

  const handleUpdateSticker = (updatedSticker) => {
    setStickers(prevStickers => 
      prevStickers.map(sticker => 
        sticker.id === updatedSticker.id ? updatedSticker : sticker
      )
    );
  };

  const handleDeleteSticker = (stickerId) => {
    setStickers(prevStickers => 
      prevStickers.filter(sticker => sticker.id !== stickerId)
    );
  };

  const toggleGridSnap = () => {
    setGridSnap(prev => !prev);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Sticker Canvas</h1>
        <p>Add stickers to the canvas, drag them around, and download your creation!</p>
      </header>
      
      <main>
        <div className="canvas-container">
          <StickerCanvas 
            stickers={stickers} 
            onUpdateSticker={handleUpdateSticker}
            onDeleteSticker={handleDeleteSticker}
            gridSnap={gridSnap}
          />
        </div>
        
        <div className="controls-container">
          <StickerPanel 
            stickers={STICKERS}
            onAddSticker={handleAddSticker}
          />
          
          <div className="options-panel">
            <button 
              className={`grid-toggle ${gridSnap ? 'active' : ''}`}
              onClick={toggleGridSnap}
            >
              {gridSnap ? 'Grid Snap: ON' : 'Grid Snap: OFF'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;