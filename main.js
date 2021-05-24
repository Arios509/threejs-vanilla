import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TetrahedronGeometry } from 'three'
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer
    ({
        canvas: document.querySelector('#bg')
    })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.ConeGeometry(2, 8.5, 64, 5, true)

const material = new THREE.MeshStandardMaterial({ color: 0x466ebc, transparent: true, opacity: 0.1, openEnded: true })
const cone = new THREE.Mesh(geometry, material)
cone.position.set(0, -8, 0)
cone.rotation.x = Math.PI
cone.openEnded = true

scene.add(cone)


const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(boxGeometry, material)
cube.position.set(0, -8, 0)
scene.add(cube)

// add lighting support
// This is for angle

const pointLightTopRight = new THREE.PointLight(0x23168)
pointLightTopRight.position.set(6, 5, 1)
pointLightTopRight.intensity = 10
pointLightTopRight.distance = 0
// add on lighthelper to check the direction of light
const lightHelper = new THREE.PointLightHelper(pointLightTopRight)
// scene.add(lightHelper)

// add if the lighting for entire screen 
const ambientLight = new THREE.AmbientLight(0x23168);

scene.add(pointLightTopRight)


const pointLightTopLeft = new THREE.DirectionalLight(0x23168)
pointLightTopLeft.position.set(-6, 5, 1)
pointLightTopLeft.distance = 5
pointLightTopLeft.shadow = true

scene.add(pointLightTopLeft)

const pointLightTop = new THREE.PointLight(0x23168)
pointLightTop.position.set(0, 5, 1)
pointLightTop.intensity = 10
pointLightTop.distance = 0

scene.add(pointLightTop)

const pointLightBottom = new THREE.PointLight(0x23168)
pointLightBottom.position.set(0, -5, 1)
pointLightBottom.intensity = 10
pointLightBottom.distance = 0

scene.add(pointLightBottom)

const pointLightBottomLeft = new THREE.PointLight(0x23168)
pointLightBottomLeft.position.set(-6, -5, 1)
pointLightBottomLeft.intensity = 10
pointLightBottomLeft.distance = 5

scene.add(pointLightBottomLeft)

const pointLightBottomRight = new THREE.PointLight(0x23168)
pointLightBottomRight.position.set(-6, -5, 1)
pointLightBottomRight.intensity = 10
pointLightBottomRight.distance = 5

scene.add(pointLightBottomRight)

const pointLightMiddle = new THREE.PointLight(0x23168)
pointLightMiddle.position.set(0, 0, 6)
pointLightMiddle.intensity = 10
pointLightMiddle.distance = 5

scene.add(pointLightMiddle)


const lightHelperBottom = new THREE.PointLightHelper(pointLightBottom)
// scene.add(lightHelperBottom)

const pointLight2 = new THREE.PointLight(0x23168)
pointLight2.position.set(2, -9, 0)
pointLight2.intensity = 10
pointLight2.distance = 5

scene.add(pointLight2)
// const lightHelper2 = new THREE.PointLightHelper(pointLight2)
// const gridHelper2 = new THREE.GridHelper(200, 50);
// scene.add(lightHelper2)

// lignt 3
const pointLight3 = new THREE.PointLight(0x23168)
pointLight3.position.set(-4, -9, 1)
pointLight3.intensity = 10
pointLight3.distance = 5

scene.add(pointLight3)

// const lightHelper3 = new THREE.PointLightHelper(pointLight3)
// scene.add(lightHelper3)





// add orbit control for more control to the object
// added this could use the mouse to do more control
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })

    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z)
    scene.add(star)
}

// Array(200).fill().forEach(addStar)

// Moon
const moonTexture = new THREE.TextureLoader().load('earth-flat.png')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshPhongMaterial({ map: moonTexture, transparent: true,
         side: THREE.DoubleSide, blending: THREE.AdditiveAlpha, alphaTest: 0.3, opacity: 2 })
);

scene.add(moon)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
// scene.background = spaceTexture

function animate() {
    requestAnimationFrame(animate);
    // torus.rotation.x += 0.01
    // torus.rotation.y += 0.005
    // torus.rotation.z += 0.01
    cone.rotation.y += 0.01
    moon.rotation.y += 0.01
    controls.update()
    renderer.render(scene, camera)
}

animate()