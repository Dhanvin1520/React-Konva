import { useRef } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import Sticker from './Sticker';

const StickerCanvas = ({ stickers, onUpdateSticker, onDeleteSticker, gridSnap }) => {
  const stageRef = useRef(null);

  const handleDownload = () => {
    if (!stageRef.current) return;
    
 
    const stage = stageRef.current;
    
    
    const dataURL = stage.toDataURL({ pixelRatio: 2 });
    

    const link = document.createElement('a');
    link.download = `sticker-canvas-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataURL;
    

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    onUpdateSticker({
      ...stickers.find(s => s.id === id),
      isDragging: true
    });
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const sticker = stickers.find(s => s.id === id);
    
    let { x, y } = e.target.position();
    

    if (gridSnap) {
      x = Math.round(x / 40) * 40;
      y = Math.round(y / 40) * 40;
    }
    
    onUpdateSticker({
      ...sticker,
      x,
      y,
      isDragging: false
    });
  };

  const handleDoubleClick = (e) => {
    const id = e.target.id();
    onDeleteSticker(id);
  };

  return (
    <div className="canvas-wrapper">
      <Stage 
        width={600} 
        height={400} 
        ref={stageRef}
        className="konva-stage"
      >
        <Layer>

          {gridSnap && Array.from({ length: 15 }).map((_, i) => (
            <Text
              key={`grid-x-${i}`}
              x={i * 40}
              y={0}
              width={1}
              height={400}
              text=""
              fill="rgba(200, 200, 200, 0.5)"
              strokeWidth={1}
              stroke="rgba(200, 200, 200, 0.5)"
              dash={[2, 2]}
            />
          ))}
          {gridSnap && Array.from({ length: 10 }).map((_, i) => (
            <Text
              key={`grid-y-${i}`}
              x={0}
              y={i * 40}
              width={600}
              height={1}
              text=""
              fill="rgba(200, 200, 200, 0.5)"
              strokeWidth={1}
              stroke="rgba(200, 200, 200, 0.5)"
              dash={[2, 2]}
            />
          ))}
          
          {stickers.map((sticker) => (
            <Sticker
              key={sticker.id}
              sticker={sticker}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </Layer>
      </Stage>
      
      <button className="download-btn" onClick={handleDownload}>
        Download Canvas
      </button>
    </div>
  );
};

export default StickerCanvas;