// import logo from './logo.svg';
import './App.css';
import Timeline from './Head';
import Body from './Body';
import Picture from './picture';
import Statictics from './Foot';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Learn React
                </a> */}
                <Timeline />
            </header>
            <div class="typewriter-effect">
              <span class="cursor"></span>
              Time flys like arrow, sand flows like water.
            </div>
            <Body />
            <Picture />
            <Statictics />
        </div>
    );
}

export default App;
