import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GodRaysEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";


let composer;
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

// Earth
const earthTexture = new THREE.TextureLoader().load('earth-flat.png')
const normalTexture = new THREE.TextureLoader().load('normal.png')
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshPhongMaterial({
        map: earthTexture, normalMap: normalTexture, transparent: true,
        side: THREE.DoubleSide, blending: THREE.AdditiveAlpha, alphaTest: 0.3, opacity: 1
    })
);
scene.add(earth)

const geometry = new THREE.ConeGeometry(2, 8.5, 64, 5, true)
const material = new THREE.MeshStandardMaterial({
    color: 0x466ebc, transparent: true, opacity: 0.1,
    openEnded: true
})
const cone = new THREE.Mesh(geometry, material)
cone.position.set(0, -8, 0)
cone.rotation.x = Math.PI
cone.openEnded = true

scene.add(cone)

// add if the lighting for entire screen 
const ambientLight = new THREE.AmbientLight(0x23168);
scene.add(ambientLight)

// add lighting support
const pointLightTopRight = new THREE.PointLight(0x23168)
pointLightTopRight.position.set(6, 3, 1)
pointLightTopRight.intensity = 10
pointLightTopRight.distance = 0

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.castShadow = true;
scene.add(spotLight)

// Add glowing sphere
let sphereGeo = new THREE.SphereGeometry(2.8, 32, 32);
let sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
let circle = new THREE.Mesh(sphereGeo, sphereMat)
circle.position.set(0, 0, -0.1)
scene.add(circle)

let godraysEffect = new GodRaysEffect(camera, circle, {
    resolutionScale: 1,
    density: 0.5,
    decay: 0.91,
    weight: 0.2,
    samples: 100
})

let renderPass = new RenderPass(scene, camera);
let effectPass = new EffectPass(camera, godraysEffect)
effectPass.renderToScreen = true;

composer = new EffectComposer(renderer);
composer.addPass(renderPass)
composer.addPass(effectPass)

const pointLightConeRight = new THREE.PointLight(0x23168)
pointLightConeRight.position.set(2, -9, 0)
pointLightConeRight.intensity = 10
pointLightConeRight.distance = 5

scene.add(pointLightConeRight)

const pointLightConeLeft = new THREE.PointLight(0x23168)
pointLightConeLeft.position.set(-4, -9, 1)
pointLightConeLeft.intensity = 10
pointLightConeLeft.distance = 5

scene.add(pointLightConeLeft)

// add orbit control for more control to the object
// added this could use the mouse to do more control
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })

    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

// Change background
// const spaceTexture = new THREE.TextureLoader().load('space.jpg')
// scene.background = spaceTexture

function animate() {
    composer.render(0.1)

    requestAnimationFrame(animate);

    cone.rotation.y += 0.01
    earth.rotation.y += 0.01
    controls.update()
    renderer.render(scene, camera)
}

animate()
