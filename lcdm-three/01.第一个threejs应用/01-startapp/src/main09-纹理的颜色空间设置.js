import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入lil-gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入 hdr 加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角 
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// 设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0) // 看向原点

// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(5)
// 将辅助坐标系添加到场景中
scene.add(axesHelper)


// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
// 设置旋转速度
controls.dampingFactor = 0.05
// 设置自动旋转
// controls.autoRotate = true



// 渲染函数
function render() {
  controls.update()
  requestAnimationFrame(render)
  // 旋转网格
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  // 渲染
  renderer.render(scene, camera)
}

render()

// 监听窗口变化
window.addEventListener('resize', () => {
  // 重置渲染器尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机矩阵
  camera.updateProjectionMatrix()
})

let eventObj = {
  FullScreen() {
    document.body.requestFullscreen();
  },
  exitFullScreen() {
    document.exitFullscreen();
  }
}

// 创建 GUI
const gui = new GUI();


// 创建纹理加载器
const textureLoader = new THREE.TextureLoader()
// 加载纹理
const texture = textureLoader.load('/public/image/manhole cover.png')
// 设置纹理颜色空间
texture.colorSpace = THREE.SRGBColorSpace
// texture.colorSpace = THREE.LinearSRGBColorSpace
// texture.colorSpace = THREE.NoColorSpace

// 加载ao贴图
const aoMap = textureLoader.load('/public/image/manhole cover.png')

// 透明度贴图
const alphaMap = textureLoader.load('/public/image/door.png')

// 加载光照贴图
const lightMap = textureLoader.load('/public/image/colors.png')

// rgbeLoader 加载hdr贴图
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/public/image/brown_photostudio_02_4k.hdr', (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // 设置场景贴图
  scene.background = envMap;
  // 设置环境贴图
  scene.environment = envMap
  // 设置 plane 的环境贴图, 就可以在材质上看到环境的反射
  planeMaterial.envMap = envMap;
})

// 高光贴图
let specularMap = textureLoader.load('/public/image/manhole cover.png')

let planeGeometry = new THREE.PlaneGeometry(1, 1)
let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture, // 贴图
  transparent: true, // 允许透明 
  aoMap, // 设置ao贴图
  // alphaMap, // 透明度贴图
  // lightMap, // 光照贴图
  // reflectivity: 0.1, // 反射强度
  specularMap, // 高光贴图
})

let plane = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(plane)

gui.add(planeMaterial, "aoMapIntensity").min(0).max(5).step(0.001)
gui.add(texture, "colorSpace", {
  "sRGB": THREE.SRGBColorSpace,
  "LinearSRGB": THREE.LinearSRGBColorSpace,
  "NoColorSpace": THREE.NoColorSpace
}).onChange(() => {
  texture.needsUpdate = true // 纹理设置为更新才能切换
})