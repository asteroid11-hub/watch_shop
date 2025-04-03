import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function WatchModel() {
  const { scene } = useGLTF('/watch.gltf');
  return <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />;
}

export default function WatchScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={1} />
      <WatchModel />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}
