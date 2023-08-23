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
camera.position.z = 15
// camera.position.y = 2
// camera.position.x = 2
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

// 创建三个球
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })
)

sphere1.position.x = -4
scene.add(sphere1)

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0x0000ff
  })
)

scene.add(sphere2)

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0xff00ff
  })
)

sphere3.position.x = 4
scene.add(sphere3)

// 创建射线
const raycaster = new THREE.Raycaster()
// 创建鼠标向量
const mouse = new THREE.Vector2()

// 监听鼠标点击
window.addEventListener('click', (e) => {
  // 设置鼠标向量的x，y值
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

  // 通过摄像机鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)

  // 计算物体和射线的焦点
  const intersects = raycaster.intersectObjects(scene.children)

  if(intersects.length > 0) {
    if(!intersects[0].object._isSelect) {
      intersects[0].object._isSelect = true
      intersects[0].object._originColor = intersects[0].object.material.color.getHex()
      intersects[0].object.material.color.set(0xff0000)
    } else {
      intersects[0].object._isSelect = false
      intersects[0].object.material.color.set(intersects[0].object._originColor)
    }
  }
})