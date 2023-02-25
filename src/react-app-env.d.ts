import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'


/// <reference types="react-scripts" />

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
    interface ThreeElements {
      textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>
    }
  }