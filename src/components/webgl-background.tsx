"use client"

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

// Network Tower Component
function NetworkTower({ position, color = "#3b82f6", height = 2 }: { position: [number, number, number], color?: string, height?: number }) {
  const towerRef = useRef<THREE.Group>(null)
  const antennaRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (towerRef.current) {
      towerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group ref={towerRef} position={position}>
      {/* Tower Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.2, height, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      
      {/* Tower Middle */}
      <mesh position={[0, height * 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.15, height * 0.6, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      
      {/* Antenna */}
      <mesh ref={antennaRef} position={[0, height * 0.8, 0]}>
        <coneGeometry args={[0.05, height * 0.4, 6]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={1} />
      </mesh>
      
      {/* Signal Rings */}
      {[1, 2, 3].map((ring, index) => (
        <mesh key={ring} position={[0, height * 0.3, 0]}>
          <torusGeometry args={[ring * 0.5, 0.02, 8, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3 - index * 0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Connection Line Component
function ConnectionLine({ start, end, color = "#06b6d4" }: { start: [number, number, number], end: [number, number, number], color?: string }) {
  const lineRef = useRef<THREE.Line>(null)
  
  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, Math.max(start[1], end[1]) + 2, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    )
    return curve.getPoints(50)
  }, [start, end])

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
      <lineBasicMaterial color={color} transparent opacity={0.6} />
    </line>
  )
}

// Data Flow Particles
function DataFlow({ start, end, color = "#8b5cf6" }: { start: [number, number, number], end: [number, number, number], color?: string }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 20
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      positions[i * 3] = start[0] + (end[0] - start[0]) * t
      positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 2
      positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
    }
    return positions
  }, [start, end])
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount + state.clock.elapsedTime * 0.5) % 1
        positions[i * 3] = start[0] + (end[0] - start[0]) * t
        positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 2
        positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
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
        color={color}
        size={0.1}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Central Hub
function CentralHub() {
  const hubRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.5
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={hubRef} position={[0, 0, 0]}>
      {/* Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Energy Rings */}
      {[2, 3, 4].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.05, 8, 32]} />
          <meshBasicMaterial
            color={index === 0 ? "#06b6d4" : index === 1 ? "#8b5cf6" : "#3b82f6"}
            transparent
            opacity={0.6 - index * 0.2}
          />
        </mesh>
      ))}
      
      {/* Connection Points */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 2.5
        const z = Math.sin(angle) * 2.5
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

// Floating Data Nodes
function FloatingDataNodes() {
  const nodesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, index) => {
        const time = state.clock.elapsedTime
        node.position.y = Math.sin(time * 0.5 + index) * 0.5
        node.rotation.y = time * 0.3 + index
      })
    }
  })

  const nodePositions = useMemo(() => [
    [-8, 2, -5], [6, -1, -8], [-4, 3, 7], [9, 1, 4], [-7, -2, 6],
    [5, 2, -3], [-3, -1, -7], [8, 3, -2], [-6, 1, 8], [4, -3, 5]
  ], [])

  return (
    <group ref={nodesRef}>
      {nodePositions.map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Network Grid
function NetworkGrid() {
  const gridRef = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  const gridSize = 20
  const gridDivisions = 20
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
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.1} />
    </lineSegments>
  )
}

// Enhanced Particle Field
function EnhancedParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particleCount = 3000
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
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8b5cf6"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function WebGLBackground() {
  // Define network topology
  const towers = [
    { pos: [-8, 0, -6] as [number, number, number], color: "#3b82f6" },
    { pos: [8, 0, -6] as [number, number, number], color: "#8b5cf6" },
    { pos: [-8, 0, 6] as [number, number, number], color: "#06b6d4" },
    { pos: [8, 0, 6] as [number, number, number], color: "#10b981" },
    { pos: [0, 0, -8] as [number, number, number], color: "#f59e0b" },
    { pos: [0, 0, 8] as [number, number, number], color: "#ef4444" },
  ]

  const connections = [
    { start: [-8, 0, -6] as [number, number, number], end: [0, 0, 0] as [number, number, number] },
    { start: [8, 0, -6] as [number, number, number], end: [0, 0, 0] as [number, number, number] },
    { start: [-8, 0, 6] as [number, number, number], end: [0, 0, 0] as [number, number, number] },
    { start: [8, 0, 6] as [number, number, number], end: [0, 0, 0] as [number, number, number] },
    { start: [0, 0, -8] as [number, number, number], end: [0, 0, 0] as [number, number, number] },
    { start: [0, 0, 8] as [number, number, number], end: [0, 0, 0] as [number, number, number] },
  ]

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, 5, -10]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#06b6d4" />
        
        <Stars radius={200} depth={100} count={8000} factor={6} saturation={0} fade speed={2} />
        
        {/* Network Grid */}
        <NetworkGrid />
        
        {/* Central Hub */}
        <CentralHub />
        
        {/* Network Towers */}
        {towers.map((tower, index) => (
          <NetworkTower
            key={index}
            position={tower.pos}
            color={tower.color}
            height={2 + Math.random() * 2}
          />
        ))}
        
        {/* Connection Lines */}
        {connections.map((conn, index) => (
          <ConnectionLine
            key={index}
            start={conn.start}
            end={conn.end}
            color={index % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
          />
        ))}
        
        {/* Data Flow */}
        {connections.map((conn, index) => (
          <DataFlow
            key={index}
            start={conn.start}
            end={conn.end}
            color={index % 3 === 0 ? "#3b82f6" : index % 3 === 1 ? "#8b5cf6" : "#06b6d4"}
          />
        ))}
        
        {/* Floating Data Nodes */}
        <FloatingDataNodes />
        
        {/* Enhanced Particle Field */}
        <EnhancedParticleField />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
          maxDistance={30}
          minDistance={8}
        />
      </Canvas>
    </div>
  )
}
