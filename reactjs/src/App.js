// import logo from './logo.svg';
import './App.css';
import Picture from './picture';
import Timeline from './timeline';
import Body from './Body';
import Statictics from './statictics';

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
      <Body />
      <Picture />
      <Statictics />
    </div>
  );
}

export default App;
