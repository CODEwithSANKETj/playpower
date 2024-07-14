// src/components/Draggable.js
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';
import moment from 'moment/moment';

const initialItems = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' }
];

function Draggable() {
  const [items, setItems] = useState(initialItems);


  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <DraggableItem key={JSON.stringify(item)} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
    </DragDropContext>



  );
}

export default Draggable;
