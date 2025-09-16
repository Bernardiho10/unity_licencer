"use client"

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

// Step Card Visualization
function StepCard({ position, step, color = "#3b82f6" }: { 
  position: [number, number, number], 
  step: number,
  color?: string 
}) {
  const cardRef = useRef<THREE.Group>(null)
  const cardMeshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + step) * 0.1
      cardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + step) * 0.2
    }
    if (cardMeshRef.current) {
      cardMeshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + step) * 0.05
    }
  })

  return (
    <group ref={cardRef} position={position}>
      {/* Card Base */}
      <mesh ref={cardMeshRef}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Card Border */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[3.1, 2.1, 0.02]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Step Number */}
      <mesh position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Energy Rings */}
      {[1.5, 2, 2.5].map((radius, index) => (
        <mesh key={radius} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 8, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2 - index * 0.05}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating Step Cards
function FloatingStepCards() {
  const cardsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (cardsRef.current) {
      cardsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group) {
          const time = state.clock.elapsedTime
          child.position.y = Math.sin(time * 0.3 + index) * 0.3
          child.rotation.y = time * 0.1 + index
        }
      })
    }
  })

  const cardPositions = useMemo(() => [
    { pos: [-8, 0, -3] as [number, number, number], step: 1, color: "#3b82f6" },
    { pos: [-4, 0, -3] as [number, number, number], step: 2, color: "#8b5cf6" },
    { pos: [0, 0, -3] as [number, number, number], step: 3, color: "#06b6d4" },
    { pos: [4, 0, -3] as [number, number, number], step: 4, color: "#10b981" },
    { pos: [8, 0, -3] as [number, number, number], step: 5, color: "#f59e0b" }
  ], [])

  return (
    <group ref={cardsRef}>
      {cardPositions.map((card) => (
        <StepCard
          key={card.step}
          position={card.pos}
          step={card.step}
          color={card.color}
        />
      ))}
    </group>
  )
}

// Connection Lines Between Steps
function StepConnections() {
  const linesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial
          material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.3
        }
      })
    }
  })

  const connections = useMemo(() => [
    { start: [-8, 0, -3], end: [-4, 0, -3] },
    { start: [-4, 0, -3], end: [0, 0, -3] },
    { start: [0, 0, -3], end: [4, 0, -3] },
    { start: [4, 0, -3], end: [8, 0, -3] }
  ], [])

  return (
    <group ref={linesRef}>
      {connections.map((conn, index) => {
        const points = [
          new THREE.Vector3(...conn.start),
          new THREE.Vector3(...conn.end)
        ]
        
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
                args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color={index % 2 === 0 ? "#06b6d4" : "#8b5cf6"} 
              transparent 
              opacity={0.6} 
            />
          </line>
        )
      })}
    </group>
  )
}

// Progress Flow Particles
function ProgressFlowParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 100
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      positions[i * 3] = -8 + t * 16 // From first card to last card
      positions[i * 3 + 1] = Math.sin(t * Math.PI) * 0.5
      positions[i * 3 + 2] = -3 + Math.sin(t * Math.PI * 2) * 0.2
    }
    return positions
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount + state.clock.elapsedTime * 0.3) % 1
        positions[i * 3] = -8 + t * 16
        positions[i * 3 + 1] = Math.sin(t * Math.PI) * 0.5
        positions[i * 3 + 2] = -3 + Math.sin(t * Math.PI * 2) * 0.2
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
        color="#8b5cf6"
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Central Progress Hub
function ProgressHub() {
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
    <group ref={hubRef} position={[0, 2, 0]}>
      {/* Core Hub */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Progress Rings */}
      {[1.2, 1.6, 2].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.03, 8, 32]} />
          <meshBasicMaterial
            color={index === 0 ? "#06b6d4" : index === 1 ? "#8b5cf6" : "#3b82f6"}
            transparent
            opacity={0.6 - index * 0.2}
          />
        </mesh>
      ))}
      
      {/* Connection Points to Cards */}
      {[-8, -4, 0, 4, 8].map((x, index) => (
        <mesh key={index} position={[x * 0.2, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Background Particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 1500
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
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
        color="#3b82f6"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function GetStartedWebGLBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, 5, -10]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, 10, 0]} intensity={0.4} color="#06b6d4" />
        
        <Stars radius={120} depth={60} count={5000} factor={4} saturation={0} fade speed={1.5} />
        
        {/* Background Particles */}
        <BackgroundParticles />
        
        {/* Central Progress Hub */}
        <ProgressHub />
        
        {/* Floating Step Cards */}
        <FloatingStepCards />
        
        {/* Step Connections */}
        <StepConnections />
        
        {/* Progress Flow Particles */}
        <ProgressFlowParticles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 4}
          maxDistance={20}
          minDistance={8}
        />
      </Canvas>
    </div>
  )
}
