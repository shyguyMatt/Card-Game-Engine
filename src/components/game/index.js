import { React, useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { peerContext } from '../contexts/peerContext'
import GameRender from './gameRender'
import { Menu } from './../../components/menu';

export default function Game() {
  const { peer, connectToHost, connectionToHost, connectionsToPeers } = useContext(peerContext)
  const [ Host ] = useState(useLocation().state.Host);
  const HostID = useLocation().state.HostID;
  const usrName = useLocation().state.usrName;
  const [gameState, setGameState] = useState([]);

  useEffect (() => {
    if (!Host && connectionToHost === 'disconnected') {
      peer.on('open', function() {
        try{
          connectToHost(HostID, usrName)
        } catch (err) {
          console.log(err)
        }        
      })
    }    
  })


  if (connectionToHost !== 'disconnected') {
    connectionToHost.on('open', function() {
      connectionToHost.on('data', function(data) {
        if(data.action === 'test') {
          // setGameState([...data.data])   
          console.log(data.data)       
        }
      })
    })
  }

  if (connectionsToPeers.length > 0) {
    connectionsToPeers.forEach(connection => {
      connection.on('open', function() {
        connection.on('data', function(data) {
          console.log(data.data)
          connectionsToPeers.forEach(connection => {
            connection.send(data)
          })
        })
      })      
    });
  }

  function sendAction(action, vars) {
    if (Host) {
      let result = doAction(action, vars)
      setGameState([...result])
      connectionsToPeers.forEach(connection => {
        connection.send({
          action: 'update',
          data: gameState
        })
      })
    } else {
      connectionToHost.send({
        action: action,
        vars: vars
      })
    }
  }

  function doAction(action, vars) {
    switch (action) {
      case 'moveCard':
        let tempZones = gameState
        let tempPrevIndex = tempZones.indexOf(tempZones.find((zone) => zone.id === vars.prevID));
        let tempNewIndex = tempZones.indexOf(tempZones.find((zone) => zone.id === vars.newID));
        let tempCardIndex = tempZones[tempPrevIndex].cards.indexOf(tempZones[tempPrevIndex].cards.find((card) => card.id === vars.cardID))

        tempZones[tempNewIndex].cards.push(tempZones[tempPrevIndex].cards[tempCardIndex])
        tempZones[tempPrevIndex].cards.splice(tempCardIndex,1)
        console.log(gameState)
        return(tempZones)
    
      case undefined:
        console.log('No Action Defined');
        break;
      
      default:
        console.log('Unrecognized Action');
        break;
    }
  }

  function sendTest() {
    if(!Host) {
      connectionToHost.send({
        action: 'test',
        data: 'this is a test'
      })      
    } else {
      connectionsToPeers.forEach(connection => {
        connection.send({
          action: 'test',
          data: 'this is a test'
        })
      })
    }
  }



  return(
    <>
      <Menu />
      <button onClick={() => Host?console.log(connectionsToPeers):console.log(connectionToHost)}>log!</button>
      <button onClick={sendTest}>Test!</button>
      <GameRender props={{gameState, setGameState, Host, sendAction, peer}} />    
    </>
  )
}