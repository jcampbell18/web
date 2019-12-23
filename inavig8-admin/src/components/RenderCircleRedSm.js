import React from 'react';
import CircleRedSm from './CircleRedSm';


function RenderCircleRedSm(props) {
             
  return (

    props.objects.map((key) => (
        
        key.object_type.short_name === "red circle sm" && key.active &&
        <CircleRedSm
          key={key}
          x={key.image_x}
          y={key.image_y}
          name={key.name}
          onDragStart={props.handleDragCircStart}
          onDragEnd={props.handleDragCircEnd}
          onMouseMove={props.handleMouseMove}
          onMouseOut={props.handleMouseOut}
          shadowBlur={1}
        />

    )))
}

export default RenderCircleRedSm;
