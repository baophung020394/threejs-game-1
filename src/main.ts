import './style.css'
import * as THREE from 'three'
// library for camera control
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// use camera to control the scene
new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('cube position')
cubeFolder.open()
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)

const cameraFolder = gui.addFolder('camera position')
cameraFolder.open()
cameraFolder.add(camera.position, 'z', 0, 10)  

function animate() {
  // requestAnimationFrame is a browser API that calls the animate function whenever the browser is ready to paint a new frame
  requestAnimationFrame(animate)

  stats.begin()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  stats.end()
  
  renderer.render(scene, camera)

  // stats.update()
}

animate()