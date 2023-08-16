import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
let parentCube = new THREE.Mesh(geometry, parentMaterial)
const cube = new THREE.Mesh(geometry, material)
parentCube.add(cube)
parentCube.position.set(-3, 0, 0)
parentCube.rotation.x = Math.PI / 4
// parentCube.scale.set(2, 2, 2)
// cube.position.x = 2
cube.position.set(3, 0, 0)
// cube.scale.set(2, 2, 2)
// 绕着x轴旋转
cube.rotation.x = Math.PI / 4

// 将网格添加到场景中
scene.add(parentCube)

// 设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0) // 看向原点

// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(2)
// 将辅助坐标系添加到场景中
scene.add(axesHelper)


// 添加轨道控制器
const controls = new OrbitControls(camera, document.body)
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