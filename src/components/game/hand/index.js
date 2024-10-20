import './style.scss'
import { React } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { nanoid } from 'nanoid';

export function Hand() {
  let id = nanoid()
  const {isOver, setNodeRef} = useDroppable({
    id: id
  })

  return(
    <div id={id} className='hand' ref={setNodeRef}>

    </div>
  )
}