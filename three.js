import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";
$(document).ready(function () {
  // Scene
  const scene = new THREE.Scene();
  const gltfLoader = new THREE.GLTFLoader();
  let model = null;
  gltfLoader.load("./fork.glb", (gltf) => {
    model = gltf.scene;
    scene.add(model);
  });

  const canvas = document.querySelector(".webgl");
  const canvContainer = document.querySelector(".canvas-contain");
  const sizes = {
    width: canvContainer.offsetWidth,
    height: canvContainer.offsetHeight,
  };

  window.addEventListener("resize", () => {
    // update sizes
    sizes.width = canvContainer.offsetWidth;
    sizes.height = canvContainer.offsetHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //   update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 1);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var controls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 0, 5);
  controls.update();
  const animate = () => {
    controls.autoRotate = true;
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
});
