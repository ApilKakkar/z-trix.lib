import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'

export default function App() {
  const [count, setCount] = useState(0)

  return (
      <Canvas>
        <Experience />
      </Canvas>
  )
}

