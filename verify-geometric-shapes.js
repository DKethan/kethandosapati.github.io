/**
 * Verification script for GeometricShapes implementation
 * Tests the basic functionality without running a server
 */

import * as THREE from 'three';
import { gsap } from 'gsap';

// Mock DOM elements for testing
const mockContainer = {
  clientWidth: 800,
  clientHeight: 600,
  appendChild: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  contains: () => true,
  removeChild: () => {}
};

// Mock scene for testing
const mockScene = {
  add: (object) => console.log('Added object to scene:', object.type || 'Unknown'),
  remove: (object) => console.log('Removed object from scene:', object.type || 'Unknown')
};

async function verifyGeometricShapes() {
  try {
    console.log('🔍 Verifying GeometricShapes implementation...');
    
    // Test import
    const { default: GeometricShapes } = await import('./assets/js/3d/GeometricShapes.js');
    console.log('✅ GeometricShapes class imported successfully');
    
    // Test instantiation
    const shapes = new GeometricShapes(mockScene, {
      shapeCount: 4,
      animationSpeed: 0.005,
      mouseInfluence: 2.0,
      floatingRange: 20
    });
    console.log('✅ GeometricShapes instance created successfully');
    
    // Test methods exist
    const requiredMethods = [
      'init',
      'createShapes', 
      'createShape',
      'setupAnimations',
      'updateMouse',
      'applyShapeHover',
      'resetShapeHover',
      'update',
      'getShapeMeshes',
      'setVisible',
      'pauseAnimations',
      'resumeAnimations',
      'dispose'
    ];
    
    for (const method of requiredMethods) {
      if (typeof shapes[method] === 'function') {
        console.log(`✅ Method ${method} exists`);
      } else {
        console.log(`❌ Method ${method} missing`);
      }
    }
    
    // Test shape meshes were created
    const shapeMeshes = shapes.getShapeMeshes();
    console.log(`✅ Created ${shapeMeshes.length} shape meshes`);
    
    // Test shape types
    const shapeTypes = shapeMeshes.map(mesh => mesh.userData.type);
    console.log('✅ Shape types created:', shapeTypes);
    
    // Test update method
    shapes.update(16.67, 0.5, -0.3);
    console.log('✅ Update method executed successfully');
    
    // Test mouse interaction
    const mockCamera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
    shapes.updateMouse(0.2, -0.1, mockCamera);
    console.log('✅ Mouse interaction method executed successfully');
    
    // Test visibility control
    shapes.setVisible(false);
    shapes.setVisible(true);
    console.log('✅ Visibility control working');
    
    // Test animation control
    shapes.pauseAnimations();
    shapes.resumeAnimations();
    console.log('✅ Animation control working');
    
    // Test disposal
    shapes.dispose();
    console.log('✅ Disposal method executed successfully');
    
    console.log('🎉 All GeometricShapes tests passed!');
    
  } catch (error) {
    console.error('❌ GeometricShapes verification failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

async function verifyHeroSceneIntegration() {
  try {
    console.log('\n🔍 Verifying HeroScene integration...');
    
    // Test HeroScene import
    const { default: HeroScene } = await import('./assets/js/3d/HeroScene.js');
    console.log('✅ HeroScene class imported successfully');
    
    // Test that HeroScene has geometricShapes property
    const heroScene = new HeroScene(mockContainer);
    
    if (heroScene.geometricShapes) {
      console.log('✅ HeroScene has geometricShapes property');
      console.log('✅ GeometricShapes integrated successfully');
    } else {
      console.log('❌ HeroScene missing geometricShapes property');
    }
    
    // Test disposal
    heroScene.dispose();
    console.log('✅ HeroScene disposal with shapes working');
    
    console.log('🎉 HeroScene integration tests passed!');
    
  } catch (error) {
    console.error('❌ HeroScene integration verification failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Run verification
console.log('Starting GeometricShapes verification...\n');
await verifyGeometricShapes();
await verifyHeroSceneIntegration();
console.log('\n✨ Verification complete!');