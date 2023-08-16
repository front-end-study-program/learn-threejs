import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入lil-gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

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
const geometry = new THREE.BufferGeometry()

// 使用索引绘制 - 共用顶点，只要四个顶点就能生成一个面
const vertices = new Float32Array([
  -1.0, -1.0, 0,
  1.0, -1.0, 0,
  1.0, 1.0, 0,
  -1.0, 1.0, 0
])
//创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引
const indices = new Uint16Array([
  0, 1, 2, 2, 3, 0
])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 设置2个顶点组，形成2个材质
geometry.addGroup(0, 3, 0)
geometry.addGroup(3, 3, 1)

console.log(geometry);

// 创建材质
const material = new THREE.MeshBasicMaterial({ 
  color: 0x00ff00, 
  // side: THREE.DoubleSide, // 双面是否都可以看见
  wireframe: true, // 线框模式
})
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})
const plan = new THREE.Mesh(geometry, [material, material1])
scene.add(plan)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00
})
const cubeMaterial1 = new THREE.MeshBasicMaterial({
  color: 0xff0000
})
const cubeMaterial2 = new THREE.MeshBasicMaterial({
  color: 0x0000ff
})
const cubeMaterial3 = new THREE.MeshBasicMaterial({
  color: 0xff00ff
})
const cubeMaterial4 = new THREE.MeshBasicMaterial({
  color: 0x00ffff
})
const cubeMaterial5 = new THREE.MeshBasicMaterial({
  color: 0xffff00
})
const cube = new THREE.Mesh(
  cubeGeometry,
  [cubeMaterial, cubeMaterial1, cubeMaterial2, cubeMaterial3, cubeMaterial4, cubeMaterial5]
)

cube.position.x = 2;

scene.add(cube)

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
// 添加全屏功能
gui.add(eventObj, 'FullScreen').name('全屏');
gui.add(eventObj, 'exitFullScreen').name('退出全屏');
