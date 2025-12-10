import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Overlay } from './components/UI/Overlay';
import { TreeState, PolaroidData, HandGesture } from './types';
import { CONFIG } from './constants';
import * as THREE from 'three';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.FORMED);
  const [handGesture, setHandGesture] = useState<HandGesture>({ gesture: "None", x: 0.5, y: 0.5 });
  const [selectedPolaroidId, setSelectedPolaroidId] = useState<string | null>(null);
  
  // Initialize polaroids with a generator function to create 10 items
  const [polaroids, setPolaroids] = useState<PolaroidData[]>(() => {
    const items: PolaroidData[] = [];
    const count = CONFIG.POLAROID_COUNT;
    const height = CONFIG.TREE_HEIGHT;
    const maxRadius = CONFIG.TREE_RADIUS;

    for (let i = 0; i < count; i++) {
        // Distribute mainly in the middle band of the tree for visibility
        // yRatio from 0.1 (bottom) to 0.8 (near top)
        const yRatio = 0.15 + Math.random() * 0.65; 
        const y = (yRatio * height) - (height / 2);
        
        // Calculate radius at this height (Linear cone)
        // relativeH 0 at bottom, 1 at top
        const relativeH = (y + height/2) / height;
        const rAtH = maxRadius * (1 - relativeH);
        
        // Place on surface, slightly randomized depth
        const r = rAtH + 0.2 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);

        // Rotation: Look outwards (approximate) + random tilt
        const rotY = -theta + Math.PI / 2;
        const rotX = (Math.random() - 0.5) * 0.3;
        const rotZ = (Math.random() - 0.5) * 0.3;

        items.push({
            id: THREE.MathUtils.generateUUID(),
            // Random distinct images
            textureUrl: `https://picsum.photos/500/500?random=${i + 100}`,
            position: [x, y, z],
            rotation: [rotX, rotY, rotZ],
            chaosPosition: [
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            ]
        });
    }
    return items;
  });

  const updatePolaroidImage = (id: string, url: string) => {
    setPolaroids(prev => prev.map(p => {
        if (p.id === id) {
            return { ...p, textureUrl: url };
        }
        return p;
    }));
  };

  // Hack: We need to inject the polaroids list into the Overlay which is a child.
  // We can do this by adding a ref to the overlay to access the list, or cleaner:
  // Since I can't easily change Overlay props interface in the XML change block without overwriting the whole file 
  // (which I did above), I will add a ref here to pass down.
  // Actually, I updated Overlay.tsx above but I need to make sure I update App.tsx to pass the ref or prop.
  // I DID NOT add `polaroids` to the Overlay props destructuring in the `Overlay.tsx` change block above? 
  // Let me double check... 
  // I added `polaroidsRef` inside Overlay but I didn't update the props to accept `polaroids`.
  // Wait, I can just pass it via a `useEffect` inside Overlay if I add it to props.
  // Correct pattern: Update Overlay props to accept `polaroids` list.
  
  // To fix the issue where I need `polaroids` inside Overlay:
  // I will assume `Overlay` receives `polaroids` in props now. 
  // I will re-emit Overlay with the correct props interface in a separate block if I missed it, 
  // but let's assume I'll fix it in the next step if I can't edit the previous block.
  // Actually, I can just pass it to the Overlay component here and update Overlay to accept it.

  // Let's create a wrapper/hack ref to pass the list if I don't want to change the Overlay signature drastically?
  // No, clean code: Add `polaroids` to Overlay props.
  
  // I will update Overlay.tsx to accept `polaroids` in props and sync the ref.
  // AND update App.tsx to pass it.
  
  return (
    <div className="relative w-full h-screen bg-[#051a12]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: CONFIG.CAMERA_POS, fov: 45 }}
        gl={{ antialias: false, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
      >
        <Experience 
            treeState={treeState} 
            polaroids={polaroids} 
            handGesture={handGesture}
            onPolaroidClick={setSelectedPolaroidId}
        />
      </Canvas>
      
      <Overlay 
        treeState={treeState} 
        setTreeState={setTreeState}
        polaroids={polaroids} // Passing the list
        setPolaroids={setPolaroids}
        setHandGesture={setHandGesture}
        selectedPolaroidId={selectedPolaroidId}
        setSelectedPolaroidId={setSelectedPolaroidId}
        updatePolaroidImage={updatePolaroidImage}
      />
    </div>
  );
};

export default App;
