import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";


export default function PhysicsWorld1(){

    useFrame((state, delta) => {
    })

    return (
        <>
            <Perf position="top-left" openByDefault trackGPU={true} />
            
            <OrbitControls makeDefault />
            <directionalLight castShadow position={[1,2,3]} intensity={1} />
            <ambientLight intensity={0.55} />

            <Physics debug>
                <RigidBody colliders="ball">
                    <mesh castShadow position={[0,10,0]}>
                        <sphereGeometry args={ [1,32,32] }/>
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>

                {/* <mesh castShadow position={[2,2,0]} rotation-y={Math.PI * 0.25} scale={1.5}>
                    <boxGeometry scale={1.5}/>
                    <meshStandardMaterial color="mediumpurple" />
                </mesh> */}

                <RigidBody colliders="trimesh">
                    <mesh castShadow position={[0,4,0]} rotation-x={Math.PI * 0.5} scale={1.5}>
                        <torusGeometry args={[1,0.5,16,32]}/>
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                </RigidBody>

                <RigidBody type="fixed">
                    <mesh receiveShadow position-y={-1.25}>
                        <boxGeometry args={[10,0.5,10]}/>
                        <meshStandardMaterial color="greenyellow"/>
                    </mesh>
                </RigidBody>

            </Physics>
        </>

    )
}