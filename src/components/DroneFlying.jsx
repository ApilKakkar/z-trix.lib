import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function DroneFlying() {
    const droneRef = useRef()

    const jumpDrone = () => {
        droneRef.current.applyImpulse({x:0,y:10,z:0})
    }

    useFrame((state) => {
        const y_impulse = (Math.sin(state.clock.getElapsedTime()) / 3)
        droneRef.current.applyImpulse({x:0,y:y_impulse,z:0})
    })


    return (
        <>
            <OrbitControls makeDefault />
            <directionalLight castShadow position={[1,2,3]} intensity={1} />
            <ambientLight intensity={0.55} />

            <Physics debug>
                <RigidBody type="fixed" position={[0,0,-5.5]}>
                    <mesh receiveShadow>
                        <boxGeometry args={[10,10,1]} />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" position={[5.5,0,0]}>
                    <mesh receiveShadow>
                        <boxGeometry args={[1,10,10]} />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" position={[0,-5.5,0]}>
                    <mesh receiveShadow>
                        <boxGeometry args={[10,1,10]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                </RigidBody>


                <RigidBody ref={droneRef} type="kinemetic" position={[0,0,0]} gravityScale={0.1}>
                    <group onClick={jumpDrone}>
                        <mesh castShadow>
                            <boxGeometry args={[4,0.5,1.5]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                        <mesh castShadow>
                            <boxGeometry args={[1,0.25,4]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                        <mesh castShadow position={[0,0.5,0]}>
                            <sphereGeometry args={[0.5,32,32]} />
                            <meshStandardMaterial color="yellow" />
                        </mesh>
                    </group>
                </RigidBody>

            </Physics>
        </>
    )
}