import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { useRef, useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin  } from 'react-icons/fa';
import { Vector3 } from 'three';

const App = () => {

    const cameraRef = useRef();
    const controlsRef = useRef();
    const [isAnimating, setIsAnimating] = useState(false);  // Track whether camera is animating
    const [targetPosition, setTargetPosition] = useState(new Vector3(-16.25, 5, 10));  // Initial camera position
    const [targetRotation, setTargetRotation] = useState(new Vector3(Math.PI * 3, Math.PI / 2, Math.PI / -1.4));  // Initial camera position
    const [expanded, setExpanded] = useState(false); // State to track if the dropdown is expanded
    const navRef = useRef(null); // Reference to the navigation menu
    
  // Function to handle camera movement
  const flyToPosition = (newPosition, newRotation) => {
    setIsAnimating(true);
    setTargetPosition(new Vector3(...newPosition));  // Update target position
    setTargetRotation(new Vector3(...newRotation));  // Update target rotation
  };

  // Function to close the dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setExpanded(false); // Close the dropdown menu if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
        <>
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [- 4, 3, 6]
                }}
            >
                <Experience cameraRef={cameraRef} controlsRef={controlsRef} targetPosition={targetPosition} targetRotation={targetRotation} isAnimating={isAnimating}/>
            </Canvas>
            <div
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    margin: '10px',
                    width: 'calc(100% - 20px)',
                    background: 'rgba(255, 255, 255, 0.5)',
                    padding: '10px',
                    borderRadius: '10px',
                    zIndex: 10, // Ensure it stays on top of the 3D canvas
                }}
            >

                <div>
                    <Navbar bg="light" expand="lg" ref={navRef} expanded={expanded}>
                        <Container className="justify-content-start w-100 m-0">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" onClick={() => setExpanded(!expanded)}/> {/* Hamburger icon */}
                            <Navbar.Brand href="#home" className='m-0'>Parker Rowland's Portfolio</Navbar.Brand>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto w-auto">
                                    <Nav.Link href="#home" onClick={() => flyToPosition([-16.25, 5, 10], [Math.PI * 3, Math.PI / 2, Math.PI / -1.4])}>Welcome</Nav.Link>
                                    <Nav.Link href="#technologies" onClick={() => flyToPosition([-6.0, 3, 3.4], [-17, 0, -1])}>Technologies</Nav.Link>
                                    <Nav.Link href="#education" onClick={() => flyToPosition([-5.5, 1, 3.5], [Math.PI * 3, 0, -12])}>Education</Nav.Link>
                                    <NavDropdown title="Work History" id="nav-dropdown" className="w-auto">
                                        <NavDropdown.Item href="#NSWC_Dahlgren" onClick={() => flyToPosition([-1.1,3.5,6.5], [4, -128, 9])}>NSWC Dahlgren</NavDropdown.Item>
                                        <NavDropdown.Item href="#Intelichart" onClick={() => flyToPosition([4.5,3.5,4.5], [10.75, -128, -8])}>Intelichart</NavDropdown.Item>
                                        <NavDropdown.Item href="#USGS" onClick={() => flyToPosition([6.75,3.75,.0],[10.75, -128, -8])}>USGS</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Contact" id="nav-dropdown" className="w-auto">
                                        <NavDropdown.Item href="#email" onClick={() => flyToPosition([-1.5, 1, 5.15 ], [Math.PI * 3, 0, -12])}>Email</NavDropdown.Item>
                                        <NavDropdown.Item href="#LinkedIn" onClick={() => flyToPosition([3.2, 1, -2.5 ], [0, 0, 2])}>LinkedIn</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#GitHub" onClick={() => flyToPosition([-0.25, 1, -4.25], [-4, 0, 2])}>GitHub</Nav.Link>
                                    <div className='d-flex '>
                                        <Nav.Link href="https://github.com/ptr-cs" target="_blank" className="d-flex align-items-center me-2">
                                            <FaGithub size={30} style={{ color: 'black' }} />
                                        </Nav.Link>
                                        <Nav.Link href="https://linkedin.com/in/parker-rowland-cs" target="_blank" className="d-flex align-items-center">
                                            <FaLinkedin size={30} style={{ color: '#0e76a8' }} />
                                        </Nav.Link>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </>
    )
}

// Render the App component
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);