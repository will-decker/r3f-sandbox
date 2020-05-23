import React, { useState, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

// Dependencies for enabling game loop
// useRef from react
// useFrame from react-three-fiber

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls autoRotate args={[camera, gl.domElement]} ref={orbitRef} />
  );
};

const Box = () => {
  // Loop animation ref
  // const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? 'purple' : 'gray',
  });

  //Game Loop animation - rotating cube
  // useFrame(() => {
  //   meshRef.current.rotation.y += 0.01;
  // });

  return (
    <a.mesh
      // ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

export default () => {
  return (
    <Canvas>
      <Controls />
      <Box />
    </Canvas>
  );
};
