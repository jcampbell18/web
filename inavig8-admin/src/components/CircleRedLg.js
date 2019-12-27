import React from 'react';
import { Circle } from 'react-konva';


const CIRC_RADIUS = 7;
const OBJECT_TYPE_ID = 28;

const CircleRedLg = (props) => {
    const handleCircleRedLgClick = (e) => {
      console.log('large red circle clicked');
    }
    return <Circle 
            x={props.x} 
            y={props.y} 
            radius={CIRC_RADIUS} 
            name={props.name}
            fill="red" 
            short_name={"red circle lg"}
            object_type_id={OBJECT_TYPE_ID}
            draggable              
            onDragStart={props.handleDragCircStart}
            onDragEnd={props.handleDragCircEnd}
            onClick={handleCircleRedLgClick}
            onMouseMove={props.handleMouseMove}
            onMouseOut={props.handleMouseOut}
            shadowBlur={1} />;
  };


  export default CircleRedLg;