import { React } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import './style.scss'

export default function Home() {
  const navigate = useNavigate();

  function CreateGame() {
    navigate('/game', { state: { Host: true}})
  }

  function JoinGame() {
    let HostID = window.prompt('enter the id of the room:')
    let usrName = window.prompt('enter a name for yourself:')
    navigate('/game', { state: { Host: false, HostID: HostID, usrName: usrName}})
  }

  return (
    <div className="home" style={{backgroundColor: 'green', width: '100vw', height: '100dvh'}}>
      <div id='buttons'>
        <button onClick={CreateGame}>Create Game</button>        
        <button onClick={JoinGame}>Join Game</button>        
        <Link to='/create-deck'>
          <button>Create Deck</button>        
        </Link>
        <Link>
          <button>Options</button>          
        </Link>     
      </div>
    </div>
  );
}
