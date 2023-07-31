import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import PhysicsWorld1 from './components/PhysicsWorld1'
import DroneFlying from './components/DroneFlying'

export default function App() {
  const [count, setCount] = useState(0)

  const cameraSettings = {
    fov : 45,
    near : 0.1,
    far: 200,
    position: [-16,10,18]
  }
  return (
      <Canvas shadows camera={cameraSettings}>
        {/* <Experience /> */}
        {/* <PhysicsWorld1 /> */}
        <DroneFlying />
      </Canvas>
  )
}

