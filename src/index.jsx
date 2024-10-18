import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { useRef, useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Container, Button, Modal } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaArrowLeft, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import { Vector3 } from 'three';

const App = () => {

    const navigationItems = [
        'Welcome',
        'Technologies',
        'Education',
        'Experience',
        'Work History 1',
        'Work History 2',
        'Work History 3',
        'Email',
        'LinkedIn',
        'GitHub',
    ];

    const cameraRef = useRef();
    const controlsRef = useRef();
    const [isAnimating, setIsAnimating] = useState(false);  // Track whether camera is animating
    const [targetPosition, setTargetPosition] = useState(new Vector3(-16.25, 5, 10));  // Initial camera position
    const [targetRotation, setTargetRotation] = useState(new Vector3(Math.PI * 3, Math.PI / 2, Math.PI / -1.4));  // Initial camera position
    const [expanded, setExpanded] = useState(false); // State to track if the dropdown is expanded
    const navRef = useRef(null); // Reference to the navigation menu
    const [show, setShow] = useState(false); // State to control the modal visibility

    // Function to toggle the modal
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    // State to keep track of the current navigation index
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const navigate = (index) => {
        setCurrentIndex(index)
        switch (index) {
            case 0:
                flyToPosition([-16, -2, 10.6], [0.5,Math.PI + 1.15,0]);
                break;
            case 1:
                flyToPosition([-6.0, 3, 3.4], [-17, 0, -1]);
                break;
            case 2:
                flyToPosition([-4.4, 1, 3.6], [Math.PI * 1, 0, -12]);
                break;
            case 3:
                flyToPosition([0.35,0.6,-0.08], [2, .3, 1]);
                break;
            case 4:
                flyToPosition([-1.1, 3.5, 6.5], [4, -128, 9]);
                break;
            case 5:
                flyToPosition([4.5, 3.5, 4.5], [10.75, -128, -8]);
                break;
            case 6:
                flyToPosition([6.75, 3.75, .0], [10.75, -128, -8]);
                break;
            case 7:
                flyToPosition([-1.5, 1, 5.15], [Math.PI * 3, 0, -12]);
                break;
            case 8:
                flyToPosition([3.2, 1, -2.5], [0, 0, 2]);
                break;
            case 9:
                flyToPosition([-0.25, 1, -4.25], [-4, 0, 2]);
                break;
        }
    }
    
    const handlePrevious = () => {
        navigate(currentIndex === 0 ? navigationItems.length - 1 : currentIndex - 1
        );
      };
    
      // Function to go to the next item, wrapping around if at the end
      const handleNext = () => {
        navigate(currentIndex === navigationItems.length - 1 ? 0 : currentIndex + 1
        );
      };

    // Function to handle camera movement
    const flyToPosition = (newPosition, newRotation) => {
        setIsAnimating(true);
        setTargetPosition(new Vector3(...newPosition));  // Update target position
        setTargetRotation(new Vector3(...newRotation));  // Update target rotation
    };

    // Function to close the dropdown when clicking outside of it
    const handleClickOutside = (event) => {
        // cancel navigation transition if the user clicks somewhere
        setIsAnimating(false);
        if (navRef.current && !navRef.current.contains(event.target)) {
            setExpanded(false); // Close the dropdown menu if clicked outside
        }
    };
    
    // cancel navigation transition if the user scrolls the mouse
    const handleWheel = () => {
        setIsAnimating(false);
    };
    
    const handleTouch = () => { 
        setIsAnimating(false);
    };

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('ontouchstart', handleTouch);
        window.addEventListener('ontouchmove', handleTouch);
        window.addEventListener('ontouchend', handleTouch);
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('ontouchstart', handleTouch);
            window.removeEventListener('ontouchmove', handleTouch);
            window.removeEventListener('ontouchend', handleTouch);
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
                <Experience cameraRef={cameraRef} controlsRef={controlsRef} targetPosition={targetPosition} targetRotation={targetRotation} isAnimating={isAnimating} />
            </Canvas>
            <div className='nav-container'>

                <div>
                    <Navbar bg="light" expand="lg" ref={navRef} expanded={expanded}>
                        <Container className="justify-content-start w-100 m-0">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2 user-select-none" onClick={() => { setIsAnimating(false); setExpanded(!expanded) }} />
                            <Navbar.Brand href="#home" className='m-0 nav-brand-text'>Parker Rowland's Portfolio</Navbar.Brand>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto w-auto">
                                    <Nav.Link href="#home" onClick={() => navigate(0)}>Welcome</Nav.Link>
                                    <Nav.Link href="#technologies" onClick={() => navigate(1)}>Technologies</Nav.Link>
                                    <Nav.Link href="#education" onClick={() => navigate(2)}>Education</Nav.Link>
                                    <Nav.Link href="#experience" onClick={() => navigate(3)}>Experience</Nav.Link>
                                    <NavDropdown title="Work History" id="nav-dropdown" className="w-auto">
                                        <NavDropdown.Item href="#NSWC_Dahlgren" onClick={() => navigate(4)}>NSWC Dahlgren</NavDropdown.Item>
                                        <NavDropdown.Item href="#Intelichart" onClick={() => navigate(5)}>Intelichart</NavDropdown.Item>
                                        <NavDropdown.Item href="#USGS" onClick={() => navigate(6)}>USGS</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Contact" id="nav-dropdown" className="w-auto">
                                        <NavDropdown.Item href="#email" onClick={() => navigate(7)}>Email</NavDropdown.Item>
                                        <NavDropdown.Item href="#LinkedIn" onClick={() => navigate(8)}>LinkedIn</NavDropdown.Item>
                                        <NavDropdown.Item href="#GitHub" onClick={() => navigate(9)}>GitHub</NavDropdown.Item>
                                    </NavDropdown>
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

                    <Navbar
                        bg="light"
                        fixed="bottom" // Fix the footer to the bottom
                        className="justify-content-between p-2 footer">
                        <Container fluid className="d-flex justify-content-between align-items-center">
                            {/* Left Arrow Button */}
                            <Button onClick={handlePrevious} variant="outline-primary" className="d-flex align-items-center user-select-none">
                                <FaArrowLeft className="me-2" /> Previous
                            </Button>

                            {/* Right Arrow Button */}
                            <Button onClick={handleNext} variant="outline-primary" className="d-flex align-items-center user-select-none">
                                Next <FaArrowRight className="me-2" />
                            </Button>

                            <Button variant="outline-secondary" onClick={() => {setIsAnimating(false); handleShow();}} className="d-flex align-items-center user-select-none">
                                <FaQuestionCircle className="me-2" /> Help
                            </Button>
                        </Container>
                    </Navbar>

                    <Modal show={show} onHide={() => {setIsAnimating(false); handleClose(); }} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>3D Scene Controls Help</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Here are the controls to interact with the 3D scene:</p>
                            <ul>
                                <li>Left-click and drag to rotate the scene.</li>
                                <li>Scroll to zoom in and out.</li>
                                <li>Right-click and drag to pan the scene.</li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    )
}

// Render the App component
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);