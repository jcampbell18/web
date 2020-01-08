import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const COFFEE_SRC = '/img/icons/coffee.png';
const OBJECT_TYPE_ID = 8; 

const Coffee = (props) => {
    const [image] = useImage(COFFEE_SRC);

    return <Image 
            x={props.x} 
            y={props.y} 
            object_id={props.object_id}
            object_type_id={OBJECT_TYPE_ID}
            scaleX={0.04} 
            scaleY={0.04} 
            short_name={"coffee"}
            draggable              
            onDragStart={props.handleDragImageStart}
            onDragEnd={props.handleDragImageEnd}
            onMouseMove={props.onMouseMove}
            onMouseOut={props.onMouseOut}
            onClick={props.handleClick}
          image={image} />;
  };


  export default Coffee;