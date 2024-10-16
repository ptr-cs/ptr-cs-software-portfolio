import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
//import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber';
import Model from './Model.jsx'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { ContactShadows, Sky, Environment, Stars } from '@react-three/drei'

export default function Experience({ cameraRef, controlsRef, targetPosition, targetRotation, isAnimating }) {

    useEffect(() => {
        // Set camera position and ensure the controls target is correct
        if (cameraRef.current && controlsRef.current) {
            setTimeout(() => { // timeout necessary to update the camera right after the model loads
                // Position the camera
                cameraRef.current.position.set(-16.25, 5, 10); // Set the camera position
                cameraRef.current.updateProjectionMatrix(); // Ensure the camera updates its projection

                // Set the target for OrbitControls
                controlsRef.current.target.set(Math.PI * 3, Math.PI / 2, Math.PI / -1.4); // Make sure the camera looks at the origin
                controlsRef.current.update(); // Update the controls
            }, 0)
        }
    }, []);

    useFrame(() => {
        if (cameraRef.current && controlsRef.current && isAnimating) {
            const currentPosition = cameraRef.current.position;
            currentPosition.lerp(targetPosition, 0.1);  // Slowly move to the target position
            
            const currentRotation = controlsRef.current.target;
            currentRotation.lerp(targetRotation, 0.1);  // Slowly move to the target rotation
            controlsRef.current.update();
            
            // Stop animation if the camera is close to the target
            if (currentPosition.distanceTo(targetPosition) < 0.01) {
                console.log("isAnimating set to false")
                isAnimating = false;  // Stop animation
            }
        }
    });

    return <>
        <OrbitControls makeDefault ref={controlsRef} />
        <directionalLight castShadow position={[1, 2, 3]} intensity={3.5} shadow-normalBias={0.04} shadow-mapSize={[4096, 4096]} />
        <ambientLight intensity={.5} />
        <ContactShadows />
        <Sky />
        <PerspectiveCamera
            ref={cameraRef}
            onUpdate={(self) => self.updateProjectionMatrix()}
            makeDefault
            position={[4, 2, -2]}
            fov={75}
        />
        <Suspense fallback={<Text color={"#000000"} scale={1.25} position={[5,0,0]} rotation={[0, -1.4, 0]}>Loading...</Text>}>
            <Model receiveShadow castShadow />
        </Suspense>
    </>
}