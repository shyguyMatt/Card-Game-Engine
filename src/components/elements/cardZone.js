import './cardZone.scss'
import { React } from 'react';
import { useDroppable } from '@dnd-kit/core';
import Card from './card';

export default function CardZone(props) {
  let info = props.info
  const {isOver, setNodeRef} = useDroppable({
    id: info.id,
  });
  const style = {
    color: isOver ? 'grey' : 'white',
  };

  return (
    <div id={info.id} className='cardZone' ref={setNodeRef} style={style}>
      <p style={{position: 'absolute', bottom: '-100px'}}>{info.id}</p>
      {info.cards.length > 0 ?
        info.cards.map((card) => {return(<Card info={card} />)}) : null }
    </div>
  )
}