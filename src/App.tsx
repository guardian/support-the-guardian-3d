/** @jsxImportSource @emotion/react */

import './App.css';
import { Canvas, Vector3 } from '@react-three/fiber';
import { css, SerializedStyles } from '@emotion/react'
import { Suspense } from 'react';
import { GuardianLogoWithHands } from './components/GuardianLogo';
import { SoftShadows } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const canvasContainer = css`
  width: 100%;
  height: 100%;
`;

function App({cssOverrides}: {cssOverrides?: SerializedStyles}) {
  const { color } = useSpring({ color: 0, from: { color: 1 }, config: { friction: 50 }, loop: true })

  const position: Record<'logo' | 'hands', Vector3> = {
    logo: [0, 0, 0],
    hands: [0, 0, 0]
  }

  const rotation: Record<'logo' | 'hands', Vector3> = {
    logo: [0, 0, 0],
    hands: [0, 0, 0]
  }

  return (
    <div css={[canvasContainer, cssOverrides]}>
      <Canvas>
        <SoftShadows />
        <color attach="background" args={['#005689']} />
        <a.fog 
          attach="fog" 
          args={['#005689', 10, 40]} 
          color={
            color.to(
              [0, 0.2, 0.4, 0.7, 1], 
              ['white', 'red', 'white', 'red', 'white']
            )} 
        />
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[-2.5, 12, -12]} intensity={0.9} />
        <pointLight position={[15, 15, 15]} />
        <pointLight position={[-12, 200, -12]} intensity={3} />

        <Suspense fallback={null}>
          <GuardianLogoWithHands position={position} rotation={rotation} />
      </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
