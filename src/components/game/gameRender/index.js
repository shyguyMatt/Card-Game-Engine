import './style.scss';
import { React, useEffect } from 'react';
import { closestCorners, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import CardZone from '../../elements/cardZone';
import { Hand } from './../hand';
import { nanoid } from 'nanoid'

export default function GameRender(props) {
  const { gameState, setGameState, Host, peer, sendAction } = props.props

  document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.classList.contains('card__face')) {
      e.target.parentElement.classList.toggle('is-flipped')
    }
  })

  useEffect(() => {
    document.getElementById('deckInput').addEventListener('change', function () {
      const reader = new FileReader()
      reader.onload = function () {
        let newArray = JSON.parse(reader.result)
        newArray.map((card) => {
          card.id = nanoid()
        })
        setGameState([...gameState, {
          id: nanoid(),
          cards: [...newArray]
        }])
      }

      reader.readAsText(this.files[0])      
    })
  })

  function addZone() {
    setGameState([...gameState, {
      id: nanoid(),
      cards: [],
    }])
  }

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 10,
      tolerance: 5,
    },
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor
  );

  let cardID;
  let newID;
  let prevID

  const dragEnd = (e) => {
    cardID = e.active.id
    newID = e.over.id
    sendAction('moveCard', {cardID: cardID, newID: newID, prevID: prevID})
  }

  const dragUpdate = (e) => {
    cardID = e.active.id
    prevID = document.getElementById(cardID).parentElement.getAttribute('id')
  }
  
  return(
    <div id='gameContainer'>

      <DndContext collisionDetection={closestCorners} onDragEnd={dragEnd} onDragMove={dragUpdate} sensors={sensors}>
        {gameState.length > 0 ?
         gameState.map((zone) => {return(<CardZone info={zone} />)}) : null }
        <Hand /> 
      </DndContext>
      {Host?<h1>{peer._id}</h1>:null}
      <input id='deckInput' type='file'></input>
      <button onClick={addZone}>Add Zone</button>
    </div>
  )
}