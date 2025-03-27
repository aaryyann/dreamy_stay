
import { useEffect, useRef } from 'react';

interface ThreeJS {
  Scene: any;
  PerspectiveCamera: any;
  WebGLRenderer: any;
  SphereGeometry: any;
  MeshPhysicalMaterial: any;
  MeshStandardMaterial: any;
  Mesh: any;
  TextureLoader: any;
  AmbientLight: any;
  DirectionalLight: any;
  BackSide: any;
  Vector2: any;
  Raycaster: any;
  MathUtils: any;
  Group: any;
}

const Globe = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Create dynamic script element
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = () => {
      initGlobe();
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const initGlobe = () => {
    const container = globeRef.current;
    if (!container || !(window as any).THREE) return;
    
    const THREE = (window as any).THREE as ThreeJS;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Create a responsive setup
    const sizes = {
      width: container.clientWidth,
      height: container.clientHeight
    };
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 2.5;
    scene.add(camera);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create globe group to hold all globe elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    
    // Earth globe - using Earth-like colors
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b5e20, // Green for land
      roughness: 0.8,
      metalness: 0.1,
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);
    
    // Create oceans - water layer
    const oceanGeometry = new THREE.SphereGeometry(0.99, 64, 64);
    const oceanMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d47a1, // Deep blue for oceans
      roughness: 0.3,
      metalness: 0.5,
    });
    
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    globeGroup.add(ocean);
    
    // Create atmosphere - thin blue haze
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64);
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x90caf9, // Light blue for atmosphere
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    // Add dot markers for popular locations
    const addLocationMarker = (lat: number, lng: number, size = 0.02, color = 0xffffff) => {
      // Convert lat/long to 3D coordinates
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
      const markerMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      // Convert lat/long to coordinates on sphere
      const x = -(Math.sin(phi) * Math.cos(theta)) * 1.01; // Slightly above surface
      const y = Math.cos(phi) * 1.01;
      const z = Math.sin(phi) * Math.sin(theta) * 1.01;
      
      marker.position.set(x, y, z);
      globeGroup.add(marker);
      
      return marker;
    };
    
    // Add major cities with yellow markers
    addLocationMarker(40.7128, -74.006, 0.02, 0xffcc00); // New York
    addLocationMarker(51.5074, -0.1278, 0.02, 0xffcc00); // London
    addLocationMarker(35.6762, 139.6503, 0.02, 0xffcc00); // Tokyo
    addLocationMarker(48.8566, 2.3522, 0.02, 0xffcc00); // Paris
    addLocationMarker(-33.8688, 151.2093, 0.02, 0xffcc00); // Sydney
    addLocationMarker(37.7749, -122.4194, 0.02, 0xffcc00); // San Francisco
    
    // Animation variables
    let targetRotationX = 0;
    let targetRotationY = 0.2;
    let currentRotationX = 0;
    let currentRotationY = 0;
    const rotationSpeed = 0.01;
    const dampingFactor = 0.05;
    
    // Track mouse position
    const mouse = new THREE.Vector2();
    let isMouseDown = false;
    
    // Handle mouse events
    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
    };
    
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / sizes.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / sizes.height) * 2 + 1;
      
      if (isMouseDown) {
        targetRotationX += event.movementY * 0.005;
        targetRotationY += event.movementX * 0.005;
        
        // Limit rotation on x-axis
        targetRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI / 4, Math.PI / 4);
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Apply smooth damping to rotation
      currentRotationX += (targetRotationX - currentRotationX) * dampingFactor;
      currentRotationY += (targetRotationY - currentRotationY) * dampingFactor;
      
      // When not being interacted with, slowly rotate
      if (!isMouseDown) {
        targetRotationY += rotationSpeed;
      }
      
      // Apply rotation to globe group
      globeGroup.rotation.x = currentRotationX;
      globeGroup.rotation.y = currentRotationY;
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      globeGeometry.dispose();
      globeMaterial.dispose();
      oceanGeometry.dispose();
      oceanMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  };
  
  return (
    <div 
      ref={globeRef} 
      className="w-full h-full min-h-[500px] md:min-h-[600px] overflow-hidden rounded-xl"
    />
  );
};

export default Globe;
