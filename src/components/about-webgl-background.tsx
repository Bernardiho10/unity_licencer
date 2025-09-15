"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

// Floating Information Nodes
function InfoNode({ position, color, text, scale = 1 }: { 
  position: [number, number, number], 
  color: string, 
  text: string,
  scale?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.5 * scale, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      <group ref={textRef} position={[0, 1.5 * scale, 0]}>
        <Text
          fontSize={0.3 * scale}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          {text}
        </Text>
      </group>
    </group>
  )
}

// Network Connection Lines
function ConnectionLine({ 
  start, 
  end, 
  color = "#3b82f6", 
  animated = true 
}: { 
  start: [number, number, number], 
  end: [number, number, number], 
  color?: string,
  animated?: boolean 
}) {
  const lineRef = useRef<THREE.Line>(null)
  
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end])

  useFrame((state) => {
    if (lineRef.current && animated) {
      const time = state.clock.elapsedTime
      lineRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.2
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color={color} 
        transparent 
        opacity={0.4}
      />
    </line>
  )
}

// Central Unity Hub
function UnityHub() {
  const hubRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y += 0.005
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += 0.01
      coreRef.current.rotation.z += 0.005
    }
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={hubRef} position={[0, 0, 0]}>
      {/* Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          emissive="#8b5cf6" 
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Energy Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.1, 8, 100]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4" 
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Inner Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.05, 8, 100]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#10b981" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

// Data Flow Particles
function DataFlowParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 200
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#06b6d4" 
        size={0.05} 
        transparent 
        opacity={0.6}
      />
    </points>
  )
}

// Floating Tech Icons
function TechIcon({ 
  position, 
  icon, 
  color = "#3b82f6" 
}: { 
  position: [number, number, number], 
  icon: string,
  color?: string 
}) {
  const iconRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (iconRef.current) {
      iconRef.current.rotation.y += 0.01
      iconRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  return (
    <group ref={iconRef} position={position}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {icon}
      </Text>
    </group>
  )
}

// Animated Network Grid
function NetworkGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      const time = state.clock.elapsedTime
      gridRef.current.material.opacity = 0.1 + Math.sin(time * 0.5) * 0.05
      gridRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <gridHelper 
      ref={gridRef} 
      args={[40, 40, "#3b82f6", "#1e40af"]} 
      position={[0, -8, 0]}
    />
  )
}

// Floating Energy Orbs
function FloatingEnergyOrbs() {
  const orbsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (orbsRef.current) {
      const time = state.clock.elapsedTime
      orbsRef.current.children.forEach((orb, index) => {
        orb.position.y = Math.sin(time + index) * 2 + index * 3
        orb.rotation.y += 0.01
        orb.rotation.x += 0.005
      })
    }
  })

  return (
    <group ref={orbsRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20
        ]}>
          <sphereGeometry args={[0.3 + Math.random() * 0.2, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
            emissive={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

// Rotating Data Rings
function RotatingDataRings() {
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ringsRef.current) {
      const time = state.clock.elapsedTime
      ringsRef.current.rotation.y = time * 0.2
      ringsRef.current.children.forEach((ring, index) => {
        ring.rotation.x = time * (0.1 + index * 0.05)
        ring.rotation.z = time * (0.05 + index * 0.02)
      })
    }
  })

  return (
    <group ref={ringsRef} position={[0, 0, 0]}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3 + i * 2, 0.1, 8, 100]} />
          <meshStandardMaterial 
            color={i === 0 ? "#06b6d4" : i === 1 ? "#8b5cf6" : "#10b981"}
            emissive={i === 0 ? "#06b6d4" : i === 1 ? "#8b5cf6" : "#10b981"}
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced Particle Field with Smooth Animations
function EnhancedParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 800
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      // Random colors with more variety
      const colorChoice = Math.random()
      if (colorChoice < 0.25) {
        colors[i * 3] = 0.1     // R
        colors[i * 3 + 1] = 0.6 // G
        colors[i * 3 + 2] = 1   // B - Cyan
      } else if (colorChoice < 0.5) {
        colors[i * 3] = 0.5     // R
        colors[i * 3 + 1] = 0.1 // G
        colors[i * 3 + 2] = 1   // B - Purple
      } else if (colorChoice < 0.75) {
        colors[i * 3] = 0       // R
        colors[i * 3 + 1] = 0.8 // G
        colors[i * 3 + 2] = 0.9 // B - Light Blue
      } else {
        colors[i * 3] = 0.8     // R
        colors[i * 3 + 1] = 0.2 // G
        colors[i * 3 + 2] = 0.9 // B - Pink
      }
      
      sizes[i] = Math.random() * 0.05 + 0.01
    }
    return { positions, colors, sizes }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const speed = 0.5 + (i % 3) * 0.2
        
        // Smooth wave-like movement
        positions[i3] += Math.sin(time * speed + i * 0.1) * 0.003
        positions[i3 + 1] += Math.cos(time * speed * 0.7 + i * 0.1) * 0.003
        positions[i3 + 2] += Math.sin(time * speed * 0.3 + i * 0.1) * 0.002
        
        // Boundary check and reset
        if (Math.abs(positions[i3]) > 25) positions[i3] = (Math.random() - 0.5) * 50
        if (Math.abs(positions[i3 + 1]) > 25) positions[i3 + 1] = (Math.random() - 0.5) * 50
        if (Math.abs(positions[i3 + 2]) > 25) positions[i3 + 2] = (Math.random() - 0.5) * 50
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={positions.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={positions.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        transparent 
        opacity={0.8}
        vertexColors
        sizeAttenuation
      />
    </points>
  )
}

export function AboutWebGLBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ 
          position: [0, 8, 20], 
          fov: 75 
        }}
        style={{ background: 'transparent' }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 15, 0]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[15, 0, 15]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[-15, 0, -15]} intensity={0.8} color="#10b981" />
        <pointLight position={[0, -10, 0]} intensity={0.6} color="#f59e0b" />
        <spotLight 
          position={[0, 20, 0]} 
          angle={0.3} 
          penumbra={0.5} 
          intensity={0.5} 
          color="#ec4899"
        />

        {/* Central Unity Hub */}
        <UnityHub />

        {/* Information Nodes */}
        <InfoNode position={[-8, 3, -5]} color="#3b82f6" text="DePIN" scale={1.2} />
        <InfoNode position={[8, 2, -3]} color="#8b5cf6" text="MNT" scale={1.1} />
        <InfoNode position={[-6, -2, 6]} color="#10b981" text="Nodes" scale={1.0} />
        <InfoNode position={[6, -3, 4]} color="#f59e0b" text="Rewards" scale={1.1} />
        <InfoNode position={[0, 6, -8]} color="#ef4444" text="Unity" scale={1.3} />
        <InfoNode position={[-10, 0, 0]} color="#06b6d4" text="Network" scale={1.0} />
        <InfoNode position={[10, 1, 2]} color="#ec4899" text="Telecom" scale={1.0} />

        {/* Tech Icons */}
        <TechIcon position={[-5, 4, 8]} icon="📱" color="#3b82f6" />
        <TechIcon position={[5, -4, -8]} icon="⚡" color="#f59e0b" />
        <TechIcon position={[-8, -4, -2]} icon="🔗" color="#10b981" />
        <TechIcon position={[8, 4, 6]} icon="🌐" color="#8b5cf6" />
        <TechIcon position={[0, -6, 0]} icon="💰" color="#f59e0b" />

        {/* Connection Lines */}
        <ConnectionLine start={[0, 0, 0]} end={[-8, 3, -5]} color="#3b82f6" />
        <ConnectionLine start={[0, 0, 0]} end={[8, 2, -3]} color="#8b5cf6" />
        <ConnectionLine start={[0, 0, 0]} end={[-6, -2, 6]} color="#10b981" />
        <ConnectionLine start={[0, 0, 0]} end={[6, -3, 4]} color="#f59e0b" />
        <ConnectionLine start={[0, 0, 0]} end={[0, 6, -8]} color="#ef4444" />
        <ConnectionLine start={[0, 0, 0]} end={[-10, 0, 0]} color="#06b6d4" />
        <ConnectionLine start={[0, 0, 0]} end={[10, 1, 2]} color="#ec4899" />

        {/* Data Flow Particles */}
        <DataFlowParticles />

        {/* Enhanced Particle Field */}
        <EnhancedParticleField />

        {/* Floating Energy Orbs */}
        <FloatingEnergyOrbs />

        {/* Rotating Data Rings */}
        <RotatingDataRings />

        {/* Network Grid */}
        <NetworkGrid />

        {/* Orbit Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
