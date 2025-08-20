/**
 * Verification script to check 3D system setup
 * Run with: node verify-3d-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying 3D Portfolio Setup...\n');

// Check required files
const requiredFiles = [
  'package.json',
  'assets/js/3d/SceneManager.js',
  'assets/js/3d/HeroScene.js',
  'assets/js/3d/PerformanceMonitor.js',
  'assets/js/3d/AssetLoader.js',
  'assets/js/3d/3DCore.js',
  'assets/js/3d-integration.js',
  'assets/css/3d-enhancements.css',
  'assets/3d/textures/particle.svg',
  'test-3d.html'
];

let allFilesExist = true;

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check package.json dependencies
console.log('\n📦 Checking dependencies:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['three', 'gsap', 'lenis'];
  
  requiredDeps.forEach(dep => {
    const exists = packageJson.dependencies && packageJson.dependencies[dep];
    console.log(`  ${exists ? '✅' : '❌'} ${dep}${exists ? ` (${packageJson.dependencies[dep]})` : ''}`);
  });
} catch (error) {
  console.log('  ❌ Could not read package.json');
  allFilesExist = false;
}

// Check HTML integration
console.log('\n🌐 Checking HTML integration:');
try {
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  
  const checks = [
    { name: 'Import map for 3D libraries', test: indexHtml.includes('type="importmap"') },
    { name: '3D CSS included', test: indexHtml.includes('3d-enhancements.css') },
    { name: '3D integration script', test: indexHtml.includes('3d-integration.js') },
    { name: 'Loading indicator', test: indexHtml.includes('loading-indicator') }
  ];
  
  checks.forEach(check => {
    console.log(`  ${check.test ? '✅' : '❌'} ${check.name}`);
    if (!check.test) allFilesExist = false;
  });
} catch (error) {
  console.log('  ❌ Could not read index.html');
  allFilesExist = false;
}

// Check file sizes (basic validation)
console.log('\n📊 File size validation:');
const fileSizeChecks = [
  { file: 'assets/js/3d/SceneManager.js', minSize: 5000 },
  { file: 'assets/js/3d/PerformanceMonitor.js', minSize: 3000 },
  { file: 'assets/js/3d/AssetLoader.js', minSize: 4000 },
  { file: 'assets/js/3d/3DCore.js', minSize: 3000 }
];

fileSizeChecks.forEach(check => {
  try {
    const stats = fs.statSync(check.file);
    const sizeOk = stats.size >= check.minSize;
    console.log(`  ${sizeOk ? '✅' : '❌'} ${check.file} (${stats.size} bytes)`);
    if (!sizeOk) allFilesExist = false;
  } catch (error) {
    console.log(`  ❌ ${check.file} (not found)`);
    allFilesExist = false;
  }
});

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 3D Portfolio Setup Complete!');
  console.log('\nNext steps:');
  console.log('1. Start a local server (e.g., python -m http.server 8000)');
  console.log('2. Open http://localhost:8000/test-3d.html to test the 3D system');
  console.log('3. Open http://localhost:8000/ to see the enhanced portfolio');
  console.log('\nThe 3D foundation is ready for implementing the remaining tasks!');
} else {
  console.log('❌ Setup incomplete - please check the missing files above');
}
console.log('='.repeat(50));