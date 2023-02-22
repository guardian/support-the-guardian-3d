import * as THREE from 'three'
import { useRef, useState } from 'react'
import {  useFrame, ThreeElements, extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import guardianFont from '../assets/fonts/guardian.json' 

extend({ TextGeometry })

interface GuardianTextProps {
  size: number
}

function GuardianText(props: ThreeElements['mesh'] & GuardianTextProps) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((_state, delta) => (mesh.current.rotation.y += delta))

  const font = new FontLoader().parse(guardianFont);

  const { position, size }= props

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <sphereGeometry />
      <textGeometry attach='geometry'args={['G', {font, size: size, height: 0.1}]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default GuardianText