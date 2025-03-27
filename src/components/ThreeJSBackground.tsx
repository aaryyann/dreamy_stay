
import { useEffect, useRef } from 'react';

interface ThreeJS {
  Scene: any;
  PerspectiveCamera: any;
  WebGLRenderer: any;
  AmbientLight: any;
  DirectionalLight: any;
  SphereGeometry: any;
  MeshPhysicalMaterial: any;
  Mesh: any;
  FrontSide: any;
}

const ThreeJSBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create dynamic script element
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = () => {
      initThreeJS();
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Initialization function for Three.js
  const initThreeJS = () => {
    const canvas = canvasRef.current;
    if (!canvas || !(window as any).THREE) return;
    
    const THREE = (window as any).THREE as ThreeJS;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add floating spheres
    const spheres: any[] = [];
    const sphereCount = 12;
    
    for (let i = 0; i < sphereCount; i++) {
      const radius = Math.random() * 0.5 + 0.5;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      
      // Create material with glass-like appearance
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9,
        opacity: 0.5,
        metalness: 0.1,
        roughness: 0.1,
        ior: 1.5,
        thickness: 0.5,
        specularIntensity: 1,
        envMapIntensity: 1,
        transparent: true,
        side: THREE.FrontSide,
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      
      // Randomize positions
      sphere.position.x = (Math.random() - 0.5) * 20;
      sphere.position.y = (Math.random() - 0.5) * 20;
      sphere.position.z = (Math.random() - 0.5) * 10 - 10;
      
      // Add some random rotation
      sphere.rotation.x = Math.random() * Math.PI;
      sphere.rotation.y = Math.random() * Math.PI;
      sphere.rotation.z = Math.random() * Math.PI;
      
      // Store initial position for animation
      (sphere as any).initialY = sphere.position.y;
      (sphere as any).floatSpeed = Math.random() * 0.005 + 0.002;
      (sphere as any).rotateSpeed = Math.random() * 0.005 + 0.001;
      
      scene.add(sphere);
      spheres.push(sphere);
    }
    
    // Position camera
    camera.position.z = 10;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update sphere positions with floating motion
      spheres.forEach((sphere) => {
        // Gentle floating movement
        sphere.position.y = (sphere as any).initialY + Math.sin(Date.now() * (sphere as any).floatSpeed) * 1.5;
        
        // Slow rotation
        sphere.rotation.x += (sphere as any).rotateSpeed;
        sphere.rotation.y += (sphere as any).rotateSpeed * 0.8;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default ThreeJSBackground;
