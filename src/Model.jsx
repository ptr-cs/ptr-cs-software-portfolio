import { useGLTF, Plane , Text, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber';



export default function Model()
{
    const group = useRef(); // Reference for the 3D model
  const { scene, animations } = useGLTF('./model.glb'); // Load the model and animations
  const { actions, mixer } = useAnimations(animations, group); // Get the animation actions and mixer

  // Automatically play the animation when the component is mounted
  useEffect(() => {
    if (actions && actions.Animation) { // Ensure the 'Animation' clip exists
      const action = actions.Animation; // Access the animation action by name
      action.reset().play(); // Reset and play the animation
    }
  }, [actions]);

  // Update the animation mixer every frame
  useFrame((state, delta) => {
    if (mixer) mixer.update(delta); // Advance the animation
  });
    
    return <>
        <primitive ref={group} object={scene} scale={ .9 } position-x={ 0 } rotation-y={4.25}/>
        <Text position={[-12,2.8,8]} scale={0.45} rotation={[0,-1.0,0]} font={'./fonts/Orbitron-VariableFont_wght.ttf'}>WELCOME!</Text>
        <Text position={[-12,2.1,8]} scale={0.2} rotation={[0,-1,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'}>This is Parker Rowland's&#10;software portfolio/blog.&#10;Take a look around and&#10; feel free to get in touch!</Text>
        
        <Text position={[0,.62,3]} scale={0.16} rotation={[0,-.45,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>CONTACT:</Text>
        <Text position={[-.05,.48,2.98]} scale={0.09} rotation={[0,-.453,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>PARKERTROWLAND@GMAIL.COM</Text>
        
        <Text position={[-3.25,.64,1.4]} scale={0.1} rotation={[0,-.45,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>EDUCATION:</Text>
        <Text position={[-3.3,.5,1.35]} scale={0.06} rotation={[0,-.458,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>MASTER OF SCIENCE IN COMPUTER SCIENCE&#10;ARIZONA STATE UNIVERSITY (EXPECTED 2026)</Text>
        
        <Text position={[1.5,.62,-.3]} scale={0.16} rotation={[0,-3.6,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>LINKEDIN:</Text>
        <Text position={[1.55,.46,-.28]} scale={0.115} rotation={[0,-3.6,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>PARKER-ROWLAND-CS</Text>

        <Text position={[-1.69,.55,-1.89]} scale={0.18} rotation={[0,-3.6,0]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>GITHUB: PTR-CS</Text>
        
        <Text position={[-.82,.92,6.7]} scale={0.1} rotation={[-Math.PI / 2,0,(-Math.PI / 2) + -.46]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>WORK HISTORY #1:&#10;&#10;- Computer Scientist&#10;- NSWC Dahlgren&#10;- 2017 - 2022&#10;&#10;- Weapons systems&#10;development &#10;&#10;- UAV Command &#10;& Control software&#10;&#10;- User interface&#10;programming&#10;&#10;- Java FX NASA&#10;Worldwind UI</Text>
        
        <Text position={[4.7,.91,4.1]} scale={0.1} rotation={[-Math.PI / 2,0,(-Math.PI / 2) + 1.1]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>WORK HISTORY #2:&#10;&#10;- Software Developer&#10;- InteliChart&#10;- 2022 - 2023&#10;&#10;- Full stack&#10;development&#10;&#10;- UI development&#10;&#10;- Figma design&#10;implementation</Text>
        
        <Text position={[6.9,1.35,-0.3]} scale={0.1} rotation={[-Math.PI / 2,0,(-Math.PI / 2) + 1.1]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>WORK HISTORY #3:&#10;&#10;- Computer Scientist&#10;- USGS&#10;- 2023 - PRESENT&#10;&#10;- Full stack&#10;development&#10;&#10;- UI development&#10;&#10;- Figma design&#10;implementation&#10;&#10;- Web development</Text>
        
        <Text position={[-9.5,2,2]} scale={0.15} rotation={[0,1.11,(-Math.PI / 2) + 1.56]} lineHeight={1} font={'./fonts/Orbitron-VariableFont_wght.ttf'} color={'#000000'}textAlign='left'>TECHNOLOGIES I ♡:&#10;&#10;JavaScript, TypeScript, Python,&#10;C#, CSS, Sass, Angular, React,&#10;Vue, ASP.NET, Postgresql,&#10; MongoDB and WPF</Text>
        <Plane args={[.335, .213]} rotation={[0.25,4.237,0.225]} position={[.797,0.545,0.225]}>
          {/* args = [width, height] */}
          <meshStandardMaterial color="black" />
        </Plane>
        <Text position={[.793,0.545,0.225]}  scale={0.013} rotation={[0.25,4.25,0.22]} lineHeight={1.1} font={'./fonts/RobotoMono-VariableFont_wght.ttf'}  maxWidth={25} color={'#00ff00'} textAlign='left'>Software Developer with 7 years of experience in both public and private sectors. Agile/Scrum experienced. Specializing in UI/UX and full-stack development using a variety of technologies including Python, JavaScript, TypeScript, CSS, Sass, Angular, React, Vue, ASP.NET, Postgresql, MongoDB and WPF. Python scripting and responsive web design experience. Version control experience with Git, GitLab, Team Foundation Server, and JIRA. Proficient with Figma, Visual Studio Code, Visual Studio, and GitLab.</Text>
    </>
}

useGLTF.preload('./model.glb')