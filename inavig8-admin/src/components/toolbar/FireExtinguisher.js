import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

// const FIRE_EXTINGUISHER_SRC = '/img/icons/fire-extinguisher.png';
const BASE_URL = 'https://inav-icons-e64a0b92-4062-44d4-8660-a911f2743bd5.s3-us-west-2.amazonaws.com';
const NAME = '/fire-extinguisher.png';
const FIRE_EXTINGUISHER_SRC = BASE_URL.concat(NAME);
const OBJECT_TYPE_ID = 15;


const FireExtinguisher = (props) => {
    const [image] = useImage(FIRE_EXTINGUISHER_SRC);

    return <Image 
            x={props.x} 
            y={props.y} 
            object_id={props.object_id}
            scaleX={0.04} 
            scaleY={0.04} 
            short_name={"fire extinguisher"}
            object_type_id={OBJECT_TYPE_ID}
            draggable              
            onDragStart={props.handleDragImageStart}
            onDragEnd={props.handleDragImageEnd}
            onMouseMove={props.onMouseMove}
            onMouseOut={props.onMouseOut}
            onClick={props.handleClick}
          image={image} />;
  };


  export default FireExtinguisher;