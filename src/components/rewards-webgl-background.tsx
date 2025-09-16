"use client"

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

// Reward Coin Component
function RewardCoin({ position, value, color = "#f59e0b" }: { 
  position: [number, number, number], 
  value: number,
  color?: string 
}) {
  const coinRef = useRef<THREE.Group>(null)
  const coinMeshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.y = state.clock.elapsedTime * 0.5
      coinRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + value) * 0.3
    }
    if (coinMeshRef.current) {
      coinMeshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + value) * 0.1
    }
  })

  const size = 0.5 + (value / 1000) * 0.3

  return (
    <group ref={coinRef} position={position}>
      {/* Main Coin */}
      <mesh ref={coinMeshRef}>
        <cylinderGeometry args={[size, size, 0.1, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Coin Edge */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[size, 0.05, 8, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Value Text Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.2, 0.02, 8, 16]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Glow Effect */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.5, 0.1, 8, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

// Floating Reward Coins
function FloatingRewardCoins() {
  const coinsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (coinsRef.current) {
      coinsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group) {
          const time = state.clock.elapsedTime
          child.position.y = Math.sin(time * 0.4 + index) * 0.5
          child.rotation.z = time * 0.2 + index
        }
      })
    }
  })

  const coinData = useMemo(() => [
    { pos: [-8, 2, -5] as [number, number, number], value: 100, color: "#f59e0b" },
    { pos: [6, -1, -8] as [number, number, number], value: 250, color: "#10b981" },
    { pos: [-4, 3, 7] as [number, number, number], value: 500, color: "#3b82f6" },
    { pos: [9, 1, 4] as [number, number, number], value: 1000, color: "#8b5cf6" },
    { pos: [-7, -2, 6] as [number, number, number], value: 1500, color: "#ef4444" },
    { pos: [5, 2, -3] as [number, number, number], value: 2000, color: "#06b6d4" },
    { pos: [-3, -1, -7] as [number, number, number], value: 5000, color: "#f97316" },
    { pos: [8, 3, -2] as [number, number, number], value: 10000, color: "#84cc16" }
  ], [])

  return (
    <group ref={coinsRef}>
      {coinData.map((coin, index) => (
        <RewardCoin
          key={index}
          position={coin.pos}
          value={coin.value}
          color={coin.color}
        />
      ))}
    </group>
  )
}

// Reward Flow Particles
function RewardFlowParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 500
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return positions
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.002
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
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f59e0b"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Central Reward Hub
function CentralRewardHub() {
  const hubRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={hubRef} position={[0, 0, 0]}>
      {/* Core Hub */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Reward Rings */}
      {[1.8, 2.4, 3].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.04, 8, 32]} />
          <meshBasicMaterial
            color={index === 0 ? "#f59e0b" : index === 1 ? "#10b981" : "#3b82f6"}
            transparent
            opacity={0.6 - index * 0.2}
          />
        </mesh>
      ))}
      
      {/* Reward Connection Points */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3.5
        const z = Math.sin(angle) * 3.5
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial
              color="#f59e0b"
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Reward Statistics Bars
function RewardStatisticsBars() {
  const barsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (barsRef.current) {
      barsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime
          child.scale.y = 1 + Math.sin(time * 2 + index) * 0.3
        }
      })
    }
  })

  const barData = useMemo(() => [
    { pos: [-12, 0, -8], height: 2, color: "#f59e0b" },
    { pos: [-8, 0, -8], height: 3, color: "#10b981" },
    { pos: [-4, 0, -8], height: 1.5, color: "#3b82f6" },
    { pos: [0, 0, -8], height: 4, color: "#8b5cf6" },
    { pos: [4, 0, -8], height: 2.5, color: "#ef4444" },
    { pos: [8, 0, -8], height: 3.5, color: "#06b6d4" },
    { pos: [12, 0, -8], height: 2, color: "#f97316" }
  ], [])

  return (
    <group ref={barsRef}>
      {barData.map((bar, index) => (
        <mesh key={index} position={bar.pos as [number, number, number]}>
          <boxGeometry args={[0.8, bar.height, 0.8]} />
          <meshBasicMaterial
            color={bar.color}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Reward Network Grid
function RewardNetworkGrid() {
  const gridRef = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
  })

  const gridSize = 25
  const gridDivisions = 25
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const points = []
    
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i / gridDivisions - 0.5) * gridSize
      points.push(x, 0, -gridSize / 2)
      points.push(x, 0, gridSize / 2)
      
      const z = (i / gridDivisions - 0.5) * gridSize
      points.push(-gridSize / 2, 0, z)
      points.push(gridSize / 2, 0, z)
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geometry
  }, [])

  return (
    <lineSegments ref={gridRef} geometry={gridGeometry}>
      <lineBasicMaterial color="#f59e0b" transparent opacity={0.05} />
    </lineSegments>
  )
}

// Background Reward Particles
function BackgroundRewardParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 2000
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001
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
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f59e0b"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function RewardsWebGLBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 6, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#f59e0b" />
        <pointLight position={[-10, 5, -10]} intensity={0.6} color="#10b981" />
        <pointLight position={[0, 10, 0]} intensity={0.4} color="#3b82f6" />
        
        <Stars radius={150} depth={80} count={6000} factor={4} saturation={0} fade speed={1.5} />
        
        {/* Background Particles */}
        <BackgroundRewardParticles />
        
        {/* Network Grid */}
        <RewardNetworkGrid />
        
        {/* Central Reward Hub */}
        <CentralRewardHub />
        
        {/* Floating Reward Coins */}
        <FloatingRewardCoins />
        
        {/* Reward Statistics Bars */}
        <RewardStatisticsBars />
        
        {/* Reward Flow Particles */}
        <RewardFlowParticles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          maxDistance={25}
          minDistance={12}
        />
      </Canvas>
    </div>
  )
}
