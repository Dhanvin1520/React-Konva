import { Text } from 'react-konva';

const Sticker = ({ sticker, onDragStart, onDragEnd, onDoubleClick }) => {
  return (
    <Text
      id={sticker.id}
      x={sticker.x}
      y={sticker.y}
      text={sticker.emoji}
      fontSize={40}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDblClick={onDoubleClick}
      shadowColor="rgba(0,0,0,0.2)"
      shadowBlur={sticker.isDragging ? 10 : 5}
      shadowOffset={{ x: 2, y: 2 }}
      shadowOpacity={0.5}
      perfectDrawEnabled={false}
      opacity={sticker.isDragging ? 0.8 : 1}
    />
  );
};

export default Sticker;