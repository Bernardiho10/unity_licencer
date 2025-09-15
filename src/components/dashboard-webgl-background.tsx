"use client"

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

// Dashboard Network Node Component
function DashboardNetworkNode({ position, color = "#3b82f6", size = 1 }: { 
  position: [number, number, number], 
  color?: string, 
  size?: number 
}) {
  const nodeRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.y = state.clock.elapsedTime * 0.2
      nodeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={nodeRef} position={position}>
      {/* Core Node */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[size, 0]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Energy Rings */}
      {[1.5, 2, 2.5].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 8, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3 - index * 0.1}
          />
        </mesh>
      ))}
      
      {/* Data Streams */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Data Flow Visualization
function DataFlowVisualization() {
  const flowRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (flowRef.current) {
      flowRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime
          child.position.y = Math.sin(time * 2 + index) * 0.5
          child.rotation.y = time * 0.5 + index
        }
      })
    }
  })

  const flowPositions = useMemo(() => [
    [-5, 0, -5], [5, 0, -5], [-5, 0, 5], [5, 0, 5],
    [0, 0, -7], [0, 0, 7], [-7, 0, 0], [7, 0, 0]
  ], [])

  return (
    <group ref={flowRef}>
      {flowPositions.map((pos, index) => (
        <DashboardNetworkNode
          key={index}
          position={pos as [number, number, number]}
          color={index % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
          size={0.8 + Math.random() * 0.4}
        />
      ))}
    </group>
  )
}

// Central Hub for Dashboard
function DashboardCentralHub() {
  const hubRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.2
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={hubRef} position={[0, 0, 0]}>
      {/* Core Hub */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Energy Rings */}
      {[1.5, 2, 2.5, 3].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.03, 8, 32]} />
          <meshBasicMaterial
            color={index === 0 ? "#06b6d4" : index === 1 ? "#8b5cf6" : index === 2 ? "#3b82f6" : "#10b981"}
            transparent
            opacity={0.5 - index * 0.1}
          />
        </mesh>
      ))}
      
      {/* Connection Points */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3.5
        const z = Math.sin(angle) * 3.5
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial
              color="#06b6d4"
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Floating Data Particles
function FloatingDataParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 2000
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return positions
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
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
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8b5cf6"
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Network Grid for Dashboard
function DashboardNetworkGrid() {
  const gridRef = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
  })

  const gridSize = 30
  const gridDivisions = 30
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
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.05} />
    </lineSegments>
  )
}

// Performance Metrics Visualization
function PerformanceMetrics() {
  const metricsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (metricsRef.current) {
      metricsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime
          child.scale.y = 1 + Math.sin(time * 2 + index) * 0.3
        }
      })
    }
  })

  const metricPositions = useMemo(() => [
    [-10, 0, -10], [-8, 0, -8], [-6, 0, -6],
    [10, 0, -10], [8, 0, -8], [6, 0, -6],
    [-10, 0, 10], [-8, 0, 8], [-6, 0, 6],
    [10, 0, 10], [8, 0, 8], [6, 0, 6]
  ], [])

  return (
    <group ref={metricsRef}>
      {metricPositions.map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#10b981" : index % 3 === 1 ? "#3b82f6" : "#8b5cf6"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

export function DashboardWebGLBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 8, 20], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, 5, -10]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, 15, 0]} intensity={0.4} color="#06b6d4" />
        
        <Stars radius={150} depth={80} count={6000} factor={4} saturation={0} fade speed={1.5} />
        
        {/* Network Grid */}
        <DashboardNetworkGrid />
        
        {/* Central Hub */}
        <DashboardCentralHub />
        
        {/* Data Flow Visualization */}
        <DataFlowVisualization />
        
        {/* Performance Metrics */}
        <PerformanceMetrics />
        
        {/* Floating Data Particles */}
        <FloatingDataParticles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
          maxDistance={25}
          minDistance={15}
        />
      </Canvas>
    </div>
  )
}
