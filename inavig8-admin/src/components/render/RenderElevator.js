import React from 'react';
import Elevator from '../toolbar/Elevator';


function RenderElevator(props) {
             
  return (
  
    props.objects.map((key) => (
        
      key.object_type && key.object_type.short_name === "elevator" &&
        <Elevator
          key={key.object_id}
          x={key.image_x}
          y={key.image_y}
          object_id={key.object_id}
          onMouseMove={props.onMouseMove}
          onMouseOut={props.onMouseOut}
          handleClick={props.handleClick}
        />

    )))


}

export default RenderElevator;
