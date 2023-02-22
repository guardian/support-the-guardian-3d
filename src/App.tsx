import './App.css';
import { Canvas } from '@react-three/fiber';
import GuardianText from './components/GuardianText';

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas flat linear>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GuardianText position={[0, 0, 0]} size={2} />
      </Canvas>
    </div>
  );
}

export default App;
