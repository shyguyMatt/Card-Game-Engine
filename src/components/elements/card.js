import './card.scss'
import { React } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export default function Card(props) {
  const info = props.info

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: info.id
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} id={info.id} className='cardContainer'>
      <div className='card'>
        <div className="card__face card__face--front">
          <img alt='front of card' src={info.cardFace} />
        </div>
        <div className="card__face card__face--back">
          <img alt='back of card' src={info.cardBack} />
        </div>
      </div>
    </div>
  )
}