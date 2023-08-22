import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入lil-gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入 gltf 模型加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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

// 创建长方体
// const boxGeometry = new THREE.BoxGeometry(1, 1, 100)
// const boxMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00
// })
// const box = new THREE.Mesh(boxGeometry, boxMaterial)
// scene.add(box)

// 创建场景 fog
// scene.fog = new THREE.Fog(0x999999, 0.1, 50); // 线性雾
// 创建场景指数 fog
// scene.fog = new THREE.FogExp2(0x999999, 0.1)
scene.background = new THREE.Color(0x999999)

// 实例化加载器 gltf
const gltfLoader = new GLTFLoader()
// 加载模型
gltfLoader.load(
  'models/ShaderBall.glb',
  (gltf) => {
    scene.add(gltf.scene)
  }
)

gltfLoader.load(
  'models/collision-world.glb',
  (gltf) => {
    scene.add(gltf.scene)
  }
)

// 加载环境贴图
const rgbeLoader = new RGBELoader()
rgbeLoader.load(
  '/image/brown_photostudio_02_4k.hdr', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envMap;
  }
)