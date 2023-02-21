import React from 'react';
import './App.css';
import Box from './components/Box';
import { Canvas } from '@react-three/fiber';
import GuardianText from './components/GuardianText';

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <GuardianText position={[2, -2, 0]} />
    </Canvas>
  );
}

export default App;
