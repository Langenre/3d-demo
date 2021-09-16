import './App.css';
import ThreeComponent from './threeComponent';
import ThreeControls from './threeControls';
import { ThreeProvider } from './threeHooks';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <ThreeProvider>
        <div style={{ height: '70px', padding: '20px' }}>
          <ThreeControls />
        </div>
        <ThreeComponent />
      </ThreeProvider>
    </div>
  );
}

export default App;
