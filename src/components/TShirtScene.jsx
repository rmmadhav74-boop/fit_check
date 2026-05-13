import { useState, useEffect, useRef, Suspense } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function SceneSetup() {
  const { scene, gl } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color('#000000');
    gl.setClearColor('#000000', 1);
  }, [scene, gl]);
  return null;
}

function getShirtColor(colorName, bgHex) {
  const map = {
    'Cream': '#FAF7F0',
    'Black': '#151515',
    'Charcoal': '#2D2D2D',
    'Royal Blue': '#1E3A8A',
    'Red': '#B91C1C',
    'Lime': '#84CC16',
    'Mint': '#6EE7B7',
    'Pink': '#F472B6',
    'Yellow': '#F59E0B',
    'Purple': '#7C3AED',
    'Blue': '#2563EB'
  };
  return map[colorName] || bgHex || '#ffffff';
}

function ScannerRings() {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.6;
      ringRef.current.position.y = Math.sin(t * 2) * 1.1;
    }
  });
  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 1.95, 64]} />
        <meshBasicMaterial color="#8B5CF6" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
      <mesh position={[1.92, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#A78BFA" />
      </mesh>
      <mesh position={[-1.92, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#A78BFA" />
      </mesh>
    </group>
  );
}

function createTeeShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-1.1, -1.5);
  shape.lineTo(-1.1, 0.2);
  shape.lineTo(-1.85, -0.1);
  shape.lineTo(-2.05, 0.75);
  shape.lineTo(-0.55, 1.45);
  shape.bezierCurveTo(-0.25, 1.1, 0.25, 1.1, 0.55, 1.45);
  shape.lineTo(2.05, 0.75);
  shape.lineTo(1.85, -0.1);
  shape.lineTo(1.1, 0.2);
  shape.lineTo(1.1, -1.5);
  shape.lineTo(-1.1, -1.5);
  return shape;
}

const teeExtrudeSettings = {
  steps: 1,
  depth: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.12,
  bevelSize: 0.15,
  bevelOffset: 0,
  bevelSegments: 10
};

function LiveLaserScanner() {
  const laserRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (laserRef.current) {
      laserRef.current.position.y = Math.sin(t * 1.5) * 1.4;
    }
  });

  return (
    <group ref={laserRef}>
      <mesh position={[0, 0, 0.15]}>
        <boxGeometry args={[4.5, 0.015, 0.8]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[2.25, 0, 0.15]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#34D399" />
      </mesh>
      <mesh position={[-2.25, 0, 0.15]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#34D399" />
      </mesh>
    </group>
  );
}

function ShirtGraphic({ imgUrl }) {
  const texture = useLoader(THREE.TextureLoader, imgUrl || '/images/no-smoking.png');
  return (
    <mesh position={[0, 0.2, 0.21]}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function TShirtScene({ sel, presetAngle, renderMode }) {
  const groupRef = useRef();
  const targetY = useRef(0);
  const [teeShape] = useState(() => createTeeShape());

  useEffect(() => {
    targetY.current = (presetAngle * Math.PI) / 180;
  }, [presetAngle]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (targetY.current - groupRef.current.rotation.y) * 0.1;
    }
  });

  const shirtColor = getShirtColor(sel.color, sel.bg);

  return (
    <>
      <SceneSetup />
      <OrbitControls enableZoom={true} maxDistance={9} minDistance={3} makeDefault />
      
      <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.5}>
        <group ref={groupRef} position={[0, 0, -0.1]}>
          {renderMode !== 'wireframe' && (
            <mesh castShadow receiveShadow>
              <extrudeGeometry args={[teeShape, teeExtrudeSettings]} />
              <meshStandardMaterial 
                roughness={0.9}
                metalness={0}
                color="#ffffff"
                wireframe={false}
              />
            </mesh>
          )}

          {(renderMode === 'wireframe' || renderMode === 'hybrid') && (
            <mesh position={[0, 0, -0.005]} scale={[1.002, 1.002, 1.005]}>
              <extrudeGeometry args={[teeShape, teeExtrudeSettings]} />
              <meshBasicMaterial 
                color={renderMode === 'wireframe' ? '#A78BFA' : '#8B5CF6'} 
                wireframe={true} 
                transparent 
                opacity={renderMode === 'wireframe' ? 0.9 : 0.25} 
              />
            </mesh>
          )}

          {renderMode === 'wireframe' && (
            <mesh>
              <extrudeGeometry args={[teeShape, teeExtrudeSettings]} />
              <meshBasicMaterial color="#05000A" transparent opacity={0.85} />
            </mesh>
          )}

          <Suspense fallback={null}>
            <ShirtGraphic imgUrl={sel.img} />
          </Suspense>
        </group>
      </Float>

      {renderMode === 'laser' && <LiveLaserScanner />}
      <ScannerRings />

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.5, 32]} />
        <meshBasicMaterial color="#333333" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -2.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#0D0020" transparent opacity={0.6} />
      </mesh>

      <ContactShadows position={[0, -2.19, 0]} opacity={0.7} scale={6} blur={2} far={4} />
    </>
  );
}
