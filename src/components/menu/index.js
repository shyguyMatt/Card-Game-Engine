import { React, useContext } from 'react'
import { peerContext } from '../contexts/peerContext'

export function Menu() {
  const peer = useContext(peerContext);
  return(
    <div>
      <button>Button 1</button>
      <button onClick={() => peer.sendData()}>Button 2</button>
      <button>Button 3</button>
    </div>
  )
}
