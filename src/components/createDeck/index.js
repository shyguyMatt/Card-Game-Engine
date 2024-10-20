import { React, useState } from 'react'
import CardPreview from '../elements/cardPreview'
import { nanoid } from 'nanoid'
import { buildCardList, scryfallfetch } from '../../utils/helperFunctions'

import './style.scss'
import Modal from './modal'

export default function CreateDeck() {

  const [ open, setOpen ] = useState(false)

  const [ deck, setDeck ] = useState([
    {
      cardFace: "https://cards.scryfall.io/png/front/f/d/fd50d92d-0ac7-46ce-a2e1-68dacc5b7742.png?1702429896",
      cardBack: "https://cdn.discordapp.com/attachments/1270080245646622810/1272921932185997352/ComfyUI_00045_.png?ex=66f41b6e&is=66f2c9ee&hm=be6e1596122adf47990c45b1a89ac1c677d928f4c398d69f0518d96f45294178&"
    }
  ])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function mtgImport(e) {
    e.preventDefault()
    let newArray = []
    let result = await scryfallfetch(buildCardList(document.getElementById('cardImporterValue').value))
    console.log(result)
    result.map((card) => {
      if (card.image_uris !== undefined) {
        newArray.push({
          cardFace: card.image_uris.png,
          cardBack: "https://cdn.discordapp.com/attachments/1270080245646622810/1272921932185997352/ComfyUI_00045_.png?ex=66f41b6e&is=66f2c9ee&hm=be6e1596122adf47990c45b1a89ac1c677d928f4c398d69f0518d96f45294178&"        
        })
      }
    })
    setDeck([...deck, ...newArray])
  }

  function addCard(cardFace, cardBack) {
    if (cardFace === undefined) cardFace = null;
    if (cardBack === undefined) cardBack = null;
    let card = {
      cardFace: null,
      cardBack: null,
    }

    setDeck([...deck, card])
    console.log(deck)
  }

  function exportDeck() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(deck, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
  }

  return(
    <div id='createDeckContainer'>
      <button onClick={addCard}>add a card</button>
      <button onClick={handleOpen}>MTG Importer</button>
      <button onClick={exportDeck}>Export Deck</button>
      <div id='cardWheel'>
        {deck.map((card) => {
          return(<CardPreview info={card}/>)
        })}
      </div>
      <Modal isOpen={open}>
        <button onClick={handleClose}>x</button>
        <form>
          <h1>Paste Deck list here</h1>
          <textarea id='cardImporterValue' rows='20'></textarea>
          <button onClick={mtgImport}>Import!</button>
        </form>
      </Modal>
    </div>
  )
}