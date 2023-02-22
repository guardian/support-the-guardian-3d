import './App.css';
import { Canvas } from '@react-three/fiber';
import GuardianText from './components/GuardianText';

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <GuardianText position={[-2, -2, 0]} />
    </Canvas>
  );
}

export default App;
