
import { useEffect, useRef } from 'react';

interface ThreeJS {
  Scene: any;
  PerspectiveCamera: any;
  WebGLRenderer: any;
  AmbientLight: any;
  DirectionalLight: any;
  SphereGeometry: any;
  BoxGeometry: any;
  TorusGeometry: any;
  MeshPhysicalMaterial: any;
  Mesh: any;
  Color: any;
  FrontSide: any;
  Clock: any;
  Vector2: any;
  Raycaster: any;
  Group: any;
  MathUtils: any;
}

const HeroScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  
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
    
    const handleMouseMove = (event: MouseEvent) => {
      // Normalized device coordinates
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(script);
    };
  }, []);
  
  const initThreeJS = () => {
    const canvas = canvasRef.current;
    if (!canvas || !(window as any).THREE) return;
    
    const THREE = (window as any).THREE as ThreeJS;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a clock for animation timing
    const clock = new THREE.Clock();
    
    // Create a group to hold all the objects
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);
    
    // Add floating shapes with Apple-like aesthetic
    const shapesCount = 15;
    const shapes: any[] = [];
    
    // Color palette
    const colors = [
      new THREE.Color(0x2563eb), // blue
      new THREE.Color(0x7c3aed), // purple
      new THREE.Color(0x3b82f6), // lighter blue
      new THREE.Color(0x8b5cf6), // lighter purple
      new THREE.Color(0xec4899)  // pink
    ];
    
    const createShape = (index: number) => {
      let geometry;
      const shapeType = Math.floor(Math.random() * 3);
      
      // Create different geometry types
      if (shapeType === 0) {
        // Sphere
        geometry = new THREE.SphereGeometry(
          Math.random() * 0.3 + 0.2, // radius
          32, // width segments
          32  // height segments
        );
      } else if (shapeType === 1) {
        // Box
        const size = Math.random() * 0.4 + 0.2;
        geometry = new THREE.BoxGeometry(size, size, size);
      } else {
        // Torus
        geometry = new THREE.TorusGeometry(
          Math.random() * 0.2 + 0.2, // radius
          Math.random() * 0.04 + 0.02, // tube
          16, // radialSegments
          32  // tubularSegments
        );
      }
      
      // Create material with glass-like appearance
      const material = new THREE.MeshPhysicalMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transmission: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        metalness: Math.random() * 0.1,
        roughness: Math.random() * 0.1,
        ior: 1.5,
        thickness: 0.5,
        specularIntensity: 1,
        envMapIntensity: 1,
        transparent: true,
        side: THREE.FrontSide,
      });
      
      const shape = new THREE.Mesh(geometry, material);
      
      // Position in a dome-like arrangement
      const radius = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI / 2; // Half sphere (above horizon)
      
      shape.position.x = radius * Math.sin(phi) * Math.cos(theta);
      shape.position.y = radius * Math.sin(phi) * Math.sin(theta) - 1; // Slightly lower
      shape.position.z = radius * Math.cos(phi) - 6; // Push back
      
      // Random rotation
      shape.rotation.x = Math.random() * Math.PI;
      shape.rotation.y = Math.random() * Math.PI;
      shape.rotation.z = Math.random() * Math.PI;
      
      // Store animation parameters
      (shape as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.001,
        y: (Math.random() - 0.5) * 0.001,
        z: (Math.random() - 0.5) * 0.001
      };
      
      (shape as any).floatAmplitude = Math.random() * 0.1 + 0.05;
      (shape as any).floatOffset = Math.random() * Math.PI * 2;
      (shape as any).floatSpeed = Math.random() * 0.001 + 0.0005;
      
      // Scale shape based on distance for depth effect
      const distance = Math.abs(shape.position.z);
      const scale = THREE.MathUtils.mapLinear(distance, 0, 10, 1.5, 0.6);
      shape.scale.set(scale, scale, scale);
      
      heroGroup.add(shape);
      shapes.push(shape);
    };
    
    // Create all shapes
    for (let i = 0; i < shapesCount; i++) {
      createShape(i);
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the entire group slightly based on mouse position
      heroGroup.rotation.y = THREE.MathUtils.lerp(
        heroGroup.rotation.y,
        mousePosition.current.x * 0.3,
        0.05
      );
      
      heroGroup.rotation.x = THREE.MathUtils.lerp(
        heroGroup.rotation.x,
        mousePosition.current.y * 0.2,
        0.05
      );
      
      // Update each shape
      shapes.forEach((shape: any) => {
        // Gentle rotation
        shape.rotation.x += shape.rotationSpeed.x;
        shape.rotation.y += shape.rotationSpeed.y;
        shape.rotation.z += shape.rotationSpeed.z;
        
        // Floating animation
        shape.position.y += Math.sin(elapsedTime * shape.floatSpeed + shape.floatOffset) 
          * shape.floatAmplitude 
          * 0.01;
      });
      
      renderer.render(scene, camera);
      rafId.current = requestAnimationFrame(animate);
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
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-cover"
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}
    />
  );
};

export default HeroScene;
