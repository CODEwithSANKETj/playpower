import React, { useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RiDraggable } from "react-icons/ri";
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DraggableItem = ({ item, index }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [selectedTime, setSelectedTime] = useState('12:00 AM');
  const scaleContainerRef = useRef(null);
  const theme = useSelector((store) => store.theme.theme);

  const handleMouseMove = (e) => {
    const scaleRect = scaleContainerRef.current.getBoundingClientRect();
    const newPosition = Math.min(
      Math.max(e.clientX - scaleRect.left, 0),
      scaleRect.width - 20 // Subtract the width of the slider
    );
    setSliderPosition(newPosition);
    updateTime(newPosition, scaleRect.width);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const updateTime = (position, scaleWidth) => {
    const totalMinutes = 24 * 60;
    const minutesPerPixel = totalMinutes / scaleWidth;
    const minutes = Math.round(position * minutesPerPixel);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = mins < 10 ? `0${mins}` : mins;

    setSelectedTime(`${formattedHours}:${formattedMinutes} ${period}`);
  };

  const iconColor = theme === 'light' ? 'black' : 'white';
  const backgroundColor = theme === 'light' ? 'white' : '#333';
  const borderColor = theme === 'light' ? '#ccc' : '#555';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          style={provided.draggableProps.style}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          textColor={textColor}
        >
          <Upper>
            <LEFT>
              <DragHandle {...provided.dragHandleProps} >
                <RiDraggable color={iconColor} />
              </DragHandle>
              <Upperleftinfo>
                <h2 style={{ color: textColor }}>UTC</h2>
                <p style={{ color: textColor }}>Universal Time Coordinated</p>
              </Upperleftinfo>
            </LEFT>
            <RIGHT>
              <input 
                style={{ width: '25%', color: textColor, backgroundColor: backgroundColor, borderColor: borderColor }} 
                type="text" 
                value={selectedTime} 
                readOnly 
              />
            </RIGHT>
          </Upper>
          <Lower>
            <ScaleContainer ref={scaleContainerRef} onMouseDown={handleMouseDown} borderColor={borderColor}>
              {/* Hour lines and labels */}
              {[...Array(24)].map((_, index) => (
                <HourLine key={index} style={{ left: `${index * 4.16}%` }} borderColor={borderColor}>
                  {index % 3 === 0 && (
                    <HourLabel color={textColor}>
                      {index === 0 ? "12 AM" : index > 12 ? `${index - 12} PM` : `${index} AM`}
                    </HourLabel>
                  )}
                </HourLine>
              ))}
              <SliderContainer>
                <Slider
                  style={{ left: `${sliderPosition}px`, backgroundColor: backgroundColor, borderColor: borderColor }}
                  onMouseDown={handleMouseDown}
                />
              </SliderContainer>
            </ScaleContainer>
          </Lower>
        </ItemContainer>
      )}
    </Draggable>
  );
};

export default DraggableItem;

const HourLabel = styled.div`
  position: absolute;
  top: 10px; /* Position the label above the line */
  transform: translateX(-50%);
  font-size: 12px;
  color: ${props => props.color};
`;

const RIGHT = styled.div``;

const LEFT = styled.div`
  display: flex;
  gap: 10px;
`;

const Upperleftinfo = styled.div``;

const Lower = styled.div`
  height: 50px;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemContainer = styled.div`
  user-select: none;
  padding: 5px;
  margin: 0 0 8px 0;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 4px;
`;

const DragHandle = styled.div`
  cursor: grab;
  background: ${props => props.iconColor};
  border: 1px solid ${props => props.iconColor};
  border-radius: 4px;
  padding: 5px;
  font-size: x-large;
`;

const ScaleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  margin-top: 10px;
  border-top: 2px solid ${props => props.borderColor};
`;

const SliderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  z-index: 2; /* Higher z-index to appear on top of the scale */
`;

const Slider = styled.div`
  position: absolute;
  width: 20px; /* Adjust the width to your liking */
  height: 20px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 4px;
  cursor: grab;

  &::before {
    content: '| |';
    color: ${props => props.borderColor};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  
  }
`;

const HourLine = styled.div`
  position: absolute;
  height: 10px; /* Height of the line */
  border-left: 1px solid ${props => props.borderColor}; /* Vertical line */
  top: 5px;
`;
