import { createContext, useState } from 'react';
import { Peer } from 'peerjs';
import { nanoid } from 'nanoid';

const peerContext = createContext();

const PeerProvider = ({ children }) => {
  const [ peer ] = useState(new Peer(nanoid(5)))
  // var peer = new Peer(nanoid(5))
  console.log(`Peer Context Rerender\nNew Peer ID: ${peer.id}`)
  peer.on('error', function(err) {
    console.log(err)
  })

  // Reset Variables
  const [ connectionsToPeers, setConnectionsToPeers ] = useState([]);
  const [ connectionToHost, setConnectionToHost ] = useState('disconnected');

  // Establish Connection to Host
  function connectToHost (HostID, usrName) {
    try {
      console.log(HostID, usrName)
      let connection = peer.connect(HostID, {metadata: {usrName: usrName}})
      setConnectionToHost(connection)
    } catch (err) {
      console.log(err)
    }
  }

  // Host Listener
  peer.on('connection', function(connection) {
    console.log(connection.peer)
    setConnectionsToPeers([...connectionsToPeers, connection])
  })    

  // peer.on('data', function(data) {
  //   if(data.action === 'test') {
  //     console.log(data.data)
  //   }
  // })

  // // DEVELOPMENT ONLY //
  // function sendData (action, data) {
  //   try {
  //     if (Host) {
  //       connections.forEach(connection => {
  //         connection.send({
  //           action: action,
  //           data: data
  //         })
  //       });
  //     } else {
  //       connections.send({
  //         action: action,
  //         data: data
  //       })
  //     }      
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // if (Host && connections !== 'disconnected') {
  //   peer.on('connection', function(newConnection) {
  //     setConnections([...connections, newConnection])
  //     connections.forEach(connection => {
  //       connection.disconnect()
  //       connection.reconnect()
  //     })
  //   })
  // }

  // // Game Actions //
  // // Host/Recieve //
  // if (Host && connections !== 'disconnected') {
  //   connections.forEach(connection => {
  //     connection.on('open', function() {
  //       connection.on('data', function(data) {
  //         if (data.action !== undefined) {
  //           let result = doAction(data.action, data.vars)
  //           setGameState([...result])
  //           connections.forEach(connection => {
  //             connection.send({
  //               action: 'update',
  //               data: gameState
  //             })
  //           })                   
  //         }
  //       })              
  //     })
  //   })
  // }

  return(
    <peerContext.Provider value={{ peer, connectToHost, connectionToHost, connectionsToPeers }}>
      {children}
    </peerContext.Provider>
  )
}

export { PeerProvider, peerContext }