import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Plane } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls })

export default function Experience(){

    const cubeRef = useRef() 
    const shapesRef = useRef()
    const { camera, gl } = useThree()
    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta
        // shapesRef.current.rotation.y += delta
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />
            <directionalLight position={[10,10,5]} intensity={1} />
            <ambientLight intensity={0.25} />
            <group ref={shapesRef}>
                <mesh position-x={-2}>
                    <sphereGeometry args={ [1,32,32] }/>
                    <meshStandardMaterial color="orange" />
                </mesh>

                <mesh ref={cubeRef} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
                    <boxGeometry scale={1.5}/>
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </group>

            <mesh rotation-x={ - Math.PI * 0.5 } position-y={-1} scale={10}>
                <planeGeometry/>
                <meshStandardMaterial color="lightblue" />
            </mesh>
        </>

    )
}