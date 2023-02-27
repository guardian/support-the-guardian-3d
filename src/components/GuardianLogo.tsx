import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMemo, useRef, useState } from "react";
import { a } from '@react-spring/three';
import { useFrame, Vector3 } from "@react-three/fiber";

 
type GLTFResult = GLTF & {
  nodes: {
    Curve: THREE.Mesh;
    Curve176: THREE.Mesh;
  };
  materials: {
    ["SVGMat.002"]: THREE.MeshStandardMaterial;
    SVGMat: THREE.MeshStandardMaterial;

  };
};

export function Hands({ 
    state, 
    position,
    setState,
  } : { 
    state: GuardianLogoWithHandsState, 
    setState: React.Dispatch<React.SetStateAction<GuardianLogoWithHandsState>>,
    position: Vector3,
  }) {
  const handsRef = useRef<THREE.Mesh>(null!)   

  const { nodes, materials } = useGLTF("/hands.gltf") as GLTFResult;

  useMemo(() => {
    materials.SVGMat.transparent = true;
    materials.SVGMat.opacity = 0
  }, [materials]);

  const showHands = state.logoTransitionCompleted

  useFrame(() => {
    if(!showHands) return

    if(materials.SVGMat.opacity >= 1) {
        setState((state: GuardianLogoWithHandsState) => ({...state, handsTransitionCompleted: true}))
        return
    }

    materials.SVGMat.opacity += 0.01
  })

  return (
    <group position={position} dispose={null}>
      <a.mesh
        ref={handsRef}
        castShadow
        receiveShadow
        geometry={nodes.Curve176.geometry}
        material={materials.SVGMat}
        scale={32}
        rotation={[14, 0, 0]}
        position={[0, -0.9, 1]}
      />
    </group>
  );
}

export function Logo({ 
      setState,
      position, 
    } : { 
      setState: React.Dispatch<React.SetStateAction<GuardianLogoWithHandsState>>,
      position: Vector3,
    }) {
  const logoRef = useRef<THREE.Mesh>(null!)   

  const { nodes, materials } = useGLTF("/glogo.gltf") as GLTFResult;

  useFrame(() => {
    if(logoRef.current.rotation.x >= 1.7) {
        setState((state: GuardianLogoWithHandsState) => ({...state, logoTransitionCompleted: true}))
        return
    }

      logoRef.current.rotation.x += 0.02
  })

  return (
    <group position={position} dispose={null}>
      <a.mesh
        ref={logoRef}
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials["SVGMat.002"]}
        scale={60}
        position={[0.15, 0.41, 0]}
      />
    </group>
  );
}

interface Position {
    logo: Vector3
    hands: Vector3
}

interface Rotation {
    logo: Vector3
    hands: Vector3
}

interface GuardianLogoWithHandsProps {
    position: Position
    rotation: Rotation
}

interface GuardianLogoWithHandsState {
    logoTransitionCompleted: boolean,
    handsTransitionCompleted: boolean
}

export function GuardianLogoWithHands({position, rotation}: GuardianLogoWithHandsProps) {
    const [state, setState] = useState<GuardianLogoWithHandsState>({
        logoTransitionCompleted: false,
        handsTransitionCompleted: false
    })

    const containerRef = useRef<THREE.Group>(null!)   

    const [currentPosY, setCurrentPosY] = useState(0)

    useFrame(() => {
        if(!currentPosY) {
            setCurrentPosY(containerRef.current.position.y)
        }

        if(containerRef.current.position.y <= currentPosY + 0.4) {
            if(state.handsTransitionCompleted && state.logoTransitionCompleted) {
                containerRef.current.translateY(0.009)
            }
        }
      })

    return (
        <group ref={containerRef} position={[0,0,0]}>
        <Logo position={position.logo} setState={setState} />
        <Hands position={position.hands} state={state} setState={setState}  />
        </group>
    )
}

useGLTF.preload("/glogo.gltf");
useGLTF.preload("/hands.gltf");
