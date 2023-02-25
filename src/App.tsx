/** @jsxImportSource @emotion/react */

import './App.css';
import { Canvas } from '@react-three/fiber';
import GuardianText from './components/GuardianText';
import { css } from '@emotion/react'

const canvasContainer = css`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <div css={canvasContainer}>
      <Canvas flat linear>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GuardianText position={[0, 0, 0]} size={2} />
      </Canvas>
    </div>
  );
}

export default App;
