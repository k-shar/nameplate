// Set up the scene
const scene = new THREE.Scene();
const camera = createCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);
const controls = createControls();
const lights = createLights();
var selectedLightIndex = 0;
const colorPicker = createColorPicker();

// Initialize the scene
function createCamera() {
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cam.position.set(75, 30, 0);
    cam.lookAt(0, 0, 0);
    return cam;
}

function createControls() {
    const ctrl = new THREE.OrbitControls(camera, renderer.domElement);
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.25;
    ctrl.screenSpacePanning = false;
    ctrl.maxPolarAngle = Math.PI / 2;
    return ctrl;
}


function createColorPicker() {
    var colorPicker = new iro.ColorPicker("#picker", {
        width: 150,
        color: "#ffffff"
    });
    
    colorPicker.on(["color:init", "color:change"], function(color){
        lights[selectedLightIndex].spotlight.color.set(new THREE.Color(color.hexString));
        lights[selectedLightIndex].box.material.color.set(new THREE.Color(colorPicker.color.hexString));
    });

}

function createLights() {
    
    const lightsArr = [];
    const numberOfLights = 3;

    for (let i = 0; i < numberOfLights; i++) {

        const spotlight = new THREE.SpotLight(0xffffff);
        spotlight.position.set(-50, 50, -50 + i * (100 / (numberOfLights-1)));
        spotlight.target.position.set(0, 0, -50 + i * (100 / (numberOfLights-1)));
        spotlight.distance = 0; // infinite throw
        spotlight.angle = 0.1; // how wide the beam is
        spotlight.penumbra = 0.6; // how blurry the beam is
        spotlight.castShadow = true;

        // Create a box to represent the spotlight
        const boxGeometry = new THREE.BoxGeometry(5, 5, 15);
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const spotlightBox = new THREE.Mesh(boxGeometry, boxMaterial);
        spotlightBox.position.copy(spotlight.position);
        spotlightBox.visible = true;
        const direction = new THREE.Vector3().subVectors(spotlight.target.position, spotlight.position).normalize();
        spotlightBox.lookAt(direction.add(spotlight.position));

        // spot beams
        const spotlightHelper = new THREE.SpotLightHelper(spotlight);

        scene.add(spotlightBox);
        scene.add(spotlight);
        scene.add(spotlight.target);
        scene.add(spotlightHelper);
        
        lightsArr.push({ spotlight, helper: spotlightHelper, box: spotlightBox });
        
    }

    return lightsArr;
}

// Add initial scene objects
function initScene() {
    addFloor();
    addGround();
    addAmbientLight();
    const cube = addCube();

    // make lights look at their target
    lights.forEach(light => {
        const direction = new THREE.Vector3().subVectors(light.spotlight.target.position, light.spotlight.position).normalize();
        light.box.lookAt(direction.add(light.spotlight.position));
        light.box.material.color.set(light.spotlight.color);
    });

    // Add DragControls
    const dragControls = new THREE.DragControls([cube], camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function(event) {
        controls.enabled = false;
    });
    dragControls.addEventListener('dragend', function(event) {
        controls.enabled = true;
    });

}

function addCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xf00ff0 });
    const cube = new THREE.Mesh(geometry, material);
    cube.scale.set(5, 15, 7);
    cube.position.set(25, 5, 0);
    cube.castShadow = true;
    scene.add(cube);
    return cube;
}

function addFloor() {
    const floorGeo = new THREE.PlaneGeometry(10000, 10000);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x80F080, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);
}

function addGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}

function addAmbientLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}


window.addEventListener('resize', () => setSize());


function angle_to_xy(value) {
    const angle = parseFloat(value);
    const radians = angle * (Math.PI / 180);
    const radius = 50;
    const light = lights[selectedLightIndex].spotlight;
    light.target.position.x = radius * Math.sin(radians) + light.position.x;
    light.target.position.z = radius * Math.cos(radians) + light.position.z;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    lights.forEach(light => light.helper.update());
    lights.forEach(light => scene.add(light.helper)); 
    setSize();
}

function setSize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// Initialize everything
initScene();
animate();

document.addEventListener("DOMContentLoaded", function() {
    setSize();
});