import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function DroneFlying() {
    const droneRef = useRef()

    const [ subscribeKeys, getKeys ] = useKeyboardControls() 

    useFrame((state, delta) => {
        const { forward, backward, left, right, up, down } = getKeys()

        const impulse = { x : 0, y : 0, z : 0 }
        const torque = { x : 0, y : 0, z : 0 }

        const impulseStrength = 10 * delta
        const torqueStrength = 1     * delta

        if ( up ) {
            impulse.y += impulseStrength
            torque.z -= torqueStrength
        }
        if ( down ) {
            impulse.y -= impulseStrength
            torque.z += torqueStrength
        }
        if ( right ) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if ( left ) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if ( forward ) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }
        if ( backward ) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        droneRef.current.applyImpulse(impulse)
        droneRef.current.applyTorqueImpulse(torque)
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


                <RigidBody ref={droneRef} canSleep={false} type="kinemetic" position={[0,0,0]} gravityScale={0}>
                    <group>
                        <mesh castShadow>
                            <boxGeometry args={[4,0.5,1.5]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                        <mesh castShadow>
                            <boxGeometry args={[1,0.25,4]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                        <mesh castShadow position={[2,0.5,0.5]} rotation-z={- Math.PI * 0.25}>
                            <boxGeometry args={[1,3,0.2]} />
                            <meshStandardMaterial color="blue" />
                        </mesh>
                        <mesh castShadow position={[2.5,1.5,0]}>
                            <boxGeometry args={[1,0.2,3]} />
                            <meshStandardMaterial color="blue" />
                        </mesh>
                        <mesh castShadow position={[2,0.5,-0.5]} rotation-z={- Math.PI * 0.25}>
                            <boxGeometry args={[1,3,0.2]} />
                            <meshStandardMaterial color="blue" />
                        </mesh>
                        <mesh castShadow position={[0,0.5,0]}>
                            <sphereGeometry args={[0.5,32,32]} />
                            <meshStandardMaterial color="yellow" />
                        </mesh>
                        <mesh castShadow position={[-2,0,-1]}>
                            <sphereGeometry args={[0.5,32,32]} />
                            <meshStandardMaterial color="yellow" />
                        </mesh>
                        <mesh castShadow position={[-2,0,1]}>
                            <sphereGeometry args={[0.5,32,32]} />
                            <meshStandardMaterial color="yellow" />
                        </mesh>
                    </group>
                </RigidBody>

            </Physics>
        </>
    )
}