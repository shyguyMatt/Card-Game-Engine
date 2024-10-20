import './cardPreview.scss'
import { React } from 'react';

export default function CardPreview(props) {
  const info = props.info

  return (
    <div className='cardPreviewContainer'>
      <div className='card'>
        <div className="card__face card__face--front">
          <img alt='front of card' src={info.cardFace} />
        </div>
        <div className="card__face card__face--back">
          <img alt='back of card' src={info.cardFace} />
        </div>
      </div>
    </div>
  )
}