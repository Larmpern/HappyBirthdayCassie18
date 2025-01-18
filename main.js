//Takes care of the first two screens
let BirthDaySongInstrumental = new Audio("./Sound/HappyBirthdaySongInstrumental.MP3");
let StartCountdown = false;
function ScreenOneComplete(){
    document.getElementsByClassName("Container")[0].style.visibility = "hidden";
    document.getElementsByClassName("MoveBoxRight")[0].style.transform = "translateX(100%)";
    document.getElementsByClassName("MoveBoxLeft")[0].style.transform = "translateX(-100%)"
    
    setTimeout(function(){
        //document.getElementsByClassName("PasswordContainer")[0].style.zIndex = "0";
    },500)
}

document.getElementById("NoButton").addEventListener("click",function()
{
   ScreenOneComplete();
})

const BackGroundMusic = document.getElementById("Music")
document.getElementById("yesButton").addEventListener("click",function()
{
    BackGroundMusic.play();
    BackGroundMusic.volume = .5;
   ScreenOneComplete();
})

let input = null;
let playonce = true
let AmountWrong = 0;
let IsWrongMessageComplete = true

function Transparency(Value,Item){
    let number;
    number=20*(100-Value)

    setTimeout(function(){
        Item.style.opacity = Value/100;

         if(Value==0){
            setTimeout(function(){
                IsWrongMessageComplete = true;
            },0)
         }

    },number)

   

}

setInterval(function(){
    if(input == null && document.querySelector("input")){
    const input = document.querySelector("input");

    input.addEventListener('keyup', (e) => {
        if(e.keyCode === 13){
            
                if(e.target.value != 18){

                    document.getElementById("WrongSound").currentTime = 0;
                    document.getElementById("WrongSound").volume = .3
                    document.getElementById("WrongSound").play();
                    

                    //This will control the hint buttons showing up
                    
                    if(AmountWrong>=0){
                        document.getElementsByClassName("HintBox1")[0].style.opacity = 1;
                        AmountWrong += 1;
                       
                    }
                    if(AmountWrong>1){
                        document.getElementsByClassName("HintBox2")[0].style.opacity = 1;
                    }

                    if(IsWrongMessageComplete){
                        IsWrongMessageComplete = false
                        for(let Index=100;Index >= 0; Index--){

                            Transparency(Index, document.getElementsByClassName("WrongBox")[0])
                        }
                    }
                    
                }
                else{
                    document.getElementById("RightSound").currentTime = 0;
                    document.getElementById("RightSound").volume = .3
                    document.getElementById("RightSound").play();
                    if(playonce){
                        BackGroundMusic.volume = 0;
                        BirthDaySongInstrumental.play();
                        StartCountdown = true;
                        playonce = false;
                        document.getElementsByClassName("HintBox2")[0].style.display = "none";
                        document.getElementsByClassName("HintBox1")[0].style.display = "none";
                        document.getElementsByClassName("PasswordContainer")[0].style.display = "none";
                        for(let Index=100;Index >= 0; Index--){

                            Transparency(Index, document.getElementsByClassName("RightBox")[0])
                        }
                        setTimeout(function(){
                            document.getElementsByClassName("MoveBackground2Up")[0].style.transform = "translateY(-100%)"
                            document.getElementsByClassName("MoveBackground2Down")[0].style.transform = "translateY(100%)"
                        },100)
                    }
                };
            
        }
        })
    }
},3000)

















import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { cameraNear, If, mod } from 'three/tsl';
import gsap from 'gsap';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { randFloat } from "three/src/math/MathUtils.js";
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';
import { traverseAncestorsGenerator } from 'three/examples/jsm/utils/SceneUtils.js';
import * as TWEEN from '@tweenjs/tween.js';

//Importing Images
import * as BackgroundImage from './Images/Star.jpg';
import * as ConcreteImage from './Images/Concrete.jpg';
import * as DirtImage from './Images/Dirt.jpg';
import { Scene } from 'three/webgpu';
//Background images for Worlds
import * as January from './Images/January.jpg';
import * as February from './Images/February.jpg';
import * as March from './Images/March.jpg';
import * as April from './Images/April.jpg';
import * as May from './Images/May.jpg';
import * as June from './Images/June.jpg';
import * as July from './Images/July.jpg';
import * as August from './Images/August.jpg';
import * as September from './Images/September.jpg';
import * as October from './Images/October.jpg';
import * as November from './Images/November.jpg';
import * as December from './Images/December.jpg';

//Importing other classes
import World from './World.js';
import CuteCube from './CuteCubes.js';
import LightBulbs from './LightBulbs.js';
import {CameraValues} from './Map.js';
//Setting up Colors
const White = new THREE.Color(1,1,1);
const CuteGreen = new THREE.Color(116/255,1,94/255);
//Local Host npx vite

//Setting up THREE.JS
const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    .01,
    1000000
);
camera.position.z = 5;
//used for testing


//BackGround
const textureLoader = new THREE.TextureLoader();
const CubeTextureLoader = new THREE.CubeTextureLoader();
const assetLoader = new GLTFLoader();
renderer.render(scene,camera)
//Starting World
const StartingWorld = new World(scene,BackgroundImage.default,5,ConcreteImage.default,[0,0,0],true);

//Adding trees
StartingWorld.AddBlenderObject('./Meshes/Tree1.glb',[-1.58,0,-1.5],.25,90);
StartingWorld.AddBlenderObject('./Meshes/Tree1.glb',[1.58,0,-1.5],.25,90);


//Creating DirtMounds for the tree
const DirtSphereGeometry = new THREE.SphereGeometry(.4,10,10);
const DirtSphereMaterial = new THREE.MeshStandardMaterial(
    {
        map: textureLoader.load(DirtImage.default),
    }
);
const DirtSphere = new THREE.Mesh(DirtSphereGeometry,DirtSphereMaterial);
StartingWorld.AddObject(DirtSphere.clone(),[-1.58,-.3,-1.5],0)
StartingWorld.AddObject(DirtSphere.clone(),[1.58,-.3,-1.5],0)


//Adding Cake
const Cake = StartingWorld.AddBlenderObject('./Meshes/Cake.glb',[0,0,-1.6],.5,204.3);


//adding spotlight
const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), .3); // Ambient light
scene.add(ambientLight);



//Rect light hovering over cake
const light = new THREE.RectAreaLight(new THREE.Color(1,1,1),1,1.7,2)
light.position.set(0,1.5,-1.6)
light.lookAt(0,0,-1.6);
scene.add(light);

const SpotLight = new THREE.SpotLight(White,22.5,200,1,0,2.5);
SpotLight.castShadow = true;
SpotLight.position.set(0,4,0);
scene.add(SpotLight)

const LightController = new LightBulbs(scene,30,-2.3,-2.3,2.3,2.3,50,.1,.5);

//CuteCube
const ListOfCuteCubes = [
new CuteCube('./Meshes/CuteCube1.glb',[-.25,10,0],.1,268*(Math.PI/180),CuteGreen,scene),
new CuteCube('./Meshes/CuteCube2.glb',[.25,10,0],.1,268*(Math.PI/180),CuteGreen,scene),
new CuteCube('./Meshes/CuteCube3.glb',[.75,10,0],.1,268*(Math.PI/180),CuteGreen,scene),
new CuteCube('./Meshes/CuteCube4.glb',[-.75,10,0],.1,268*(Math.PI/180),CuteGreen,scene),
]

function normalizeAngle(angle) {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
}

//Deals with Camera Setting up
let Key = "StartPosition"; //StartPosition
let PlayOnce = false;
function putInCameraValues(Key,OldKey)
{
    ButtonsOnOrOff(Key);
    let Values = CameraValues.get(Key);
    let Positions = Values.position;
    let Rotations = Values.rotation;
    Rotations = [normalizeAngle(Rotations[0]),normalizeAngle(Rotations[1]),normalizeAngle(Rotations[2])];
    //MoveCameraTween
    let duration = 1000;
    let EasingStyle = TWEEN.Easing.Linear.None;
    if(OldKey != null && Key == "LookOut")
    {
        let OldValues = CameraValues.get(OldKey);
        Values.Down = OldKey
        if(OldValues.Specific != null && OldValues.Specific[Key] != null)
        {
            //duration = OldValues.Specific[Key];
            EasingStyle = TWEEN.Easing.Sinusoidal.In;
        }
    }
    const WorldNameTag = document.getElementById("WorldNameTag");
    if(Values.CameraLookAt != null)
    {
        WorldNameTag.style.display = "block";
        WorldNameTag.textContent = Key.substring(0,Key.indexOf("W"));
    }
    else
    {
        WorldNameTag.style.display = "none";
    }
    HTMLButtons.style.display = "none";
    TWEEN.update();
    const CameraPosition = new TWEEN.Tween({
        x: camera.position.x, 
        y: camera.position.y, 
        z: camera.position.z,
        rotationx: camera.rotation.x,
        rotationy: camera.rotation.y,
        rotationz: camera.rotation.z })
    .to({
        x: Positions[0],
        y: Positions[1],
        z: Positions[2],
        rotationx:  Rotations[0],
        rotationy:  Rotations[1],
        rotationz:  Rotations[2],
    }, duration)
    .onUpdate(function (coords){
        camera.position.set(coords.x,coords.y,coords.z);
        camera.rotation.set(coords.rotationx,coords.rotationy,coords.rotationz);
    }.bind(this))
    .easing(EasingStyle)
    .onComplete(function()
    {
        camera.position.set(Positions[0],Positions[1],Positions[2]);
        camera.rotation.set(Rotations[0],Rotations[1],Rotations[2]);
        if(PlayOnce){
        HTMLButtons.style.display = "block";
        }
        PlayOnce = true
    })
    .start();
}

let UpBotton = document.getElementById("UpButton");
let DownBotton = document.getElementById("DownButton");
let RightBotton = document.getElementById("RightButton");
let LeftBotton = document.getElementById("LeftButton");
function ButtonsOnOrOff(Key)
{

    let Values = CameraValues.get(Key);
    UpBotton.style.display = "block"
    DownBotton.style.display = "block"
    RightBotton.style.display = "block"
    LeftBotton.style.display = "block"
    if(Values.Up == null)
    {
         UpBotton.style.display = "none"
    }
    if(Values.Down == null)
    {
        DownBotton.style.display = "none"
    }
    if(Values.Right == null)
    {
        RightBotton.style.display = "none"
    }
    if(Values.Left == null)
    {
        LeftBotton.style.display = "none"
    }
}

function Buttonpress(NewKey,OldKey)
{
    let ButtonSound = new Audio("./Sound/Button.mp3");
    ButtonSound.volume = .2;
    ButtonSound.play();
    Key = NewKey
    if(CameraValues.get(OldKey).DownOnce && NewKey == "StartWorldFromSpace")
    {
        CameraValues.get(OldKey).DownOnce = false;
        StartingWorld.BrightenStartingWorld(BackgroundImage.default,[0,0,0]);
    }
    putInCameraValues(NewKey,OldKey);
}

//Implementing the ButtonClicks
UpBotton.addEventListener("click",function()
{
    Buttonpress(CameraValues.get(Key).Up,Key);
})

DownBotton.addEventListener("click",function()
{
    Buttonpress(CameraValues.get(Key).Down,Key);
})

RightBotton.addEventListener("click",function()
{
    Buttonpress(CameraValues.get(Key).Right,Key);
})

LeftBotton.addEventListener("click",function()
{
    Buttonpress(CameraValues.get(Key).Left,Key);
})

//Deals with the beginning and the song playing
let Playonce = true;
BirthDaySongInstrumental.volume = .2;

const HTMLButtons = document.getElementById("Buttons");
putInCameraValues(Key,Key); // Sets the starting Positon
HTMLButtons.style.display = "none";
//Orbit Controls

const Controls = new OrbitControls(camera, renderer.domElement);
Controls.enabled = false;			//disable orbitControls
Controls.reset();					//reset orbitControls
Controls.enablePan = false; // Disable panning
Controls.enableZoom = false; // Disable zooming

//This will make all the other different worlds
let radius = 10142;
let angleDisplacement = 7.5;
const Backgrounds = 
[
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
]
const meshFiles =
[
    import.meta.glob('./Meshes/January/*.glb'),
    import.meta.glob('./Meshes/Feb/*.glb'),
    import.meta.glob('./Meshes/Mar/*.glb'),
    import.meta.glob('./Meshes/April/*.glb'),
    import.meta.glob('./Meshes/May/*.glb'),
    import.meta.glob('./Meshes/June/*.glb'),
    import.meta.glob('./Meshes/Jul/*.glb'),
    import.meta.glob('./Meshes/Aug/*.glb'),
    import.meta.glob('./Meshes/Sept/*.glb'),
    import.meta.glob('./Meshes/October/*.glb'),
    import.meta.glob('./Meshes/Nove/*.glb'),
    import.meta.glob('./Meshes/December/*.glb'),
]
const imageFiles =
[
    import.meta.glob('./Meshes/January/*.jpg'),
    import.meta.glob('./Meshes/Feb/*.jpg'),
    import.meta.glob('./Meshes/Mar/*.jpg'),
    import.meta.glob('./Meshes/April/*.jpg'),
    import.meta.glob('./Meshes/May/*.jpg'),
    import.meta.glob('./Meshes/June/*.jpg'),
    import.meta.glob('./Meshes/Jul/*.jpg'),
    import.meta.glob('./Meshes/Aug/*.jpg'),
    import.meta.glob('./Meshes/Sept/*.jpg'),
    import.meta.glob('./Meshes/October/*.jpg'),
    import.meta.glob('./Meshes/Nove/*.jpg'),
    import.meta.glob('./Meshes/December/*.jpg'),
]
let WorldClassList = [];

for(let i = 0; i < 12; i++)
{
    const x = Math.sin((360/13) * (i+angleDisplacement) * (Math.PI/180)) * radius;
    const z = Math.cos((360/13) * (i+angleDisplacement) * (Math.PI/180)) * radius;
    const WorldPosition = [x,0,z+radius];
    let Image = Backgrounds[11-i].default
    const World2 =new World(scene,Image,5,ConcreteImage.default,WorldPosition);
    World2.AddLighting();
    World2.PictureWorld();
    World2.AddBlenderObjectPicture([x-.1,0,WorldPosition[2]-1.5],.13,4.7,meshFiles[11-i]);
    World2.AddBlenderObjectCubePicture(WorldPosition,imageFiles[11-i])
    WorldClassList.push(World2);
}
let SetOnce = true
function animate() {

    //Takes Care of Singing Part
    if(Key == "StartPosition" && StartCountdown && Playonce)
    {
        Playonce = false;
        for(const Cube of ListOfCuteCubes)
        {
            setTimeout(() => {
                Cube.fall();
              }, 3000);
            setTimeout(() => {
                Cube.JumpUpAndDown(TWEEN);
                let BirthDaySong = new Audio("./Sound/HappyBirthdaySong.MP3");
                BirthDaySong.volume = .2;
                setTimeout(() => {
                    BirthDaySong.play();
                    BirthDaySong.addEventListener('ended',function()
                    {
                        HTMLButtons.style.display = "block";
                        BirthDaySongInstrumental.muted = true;  
                        Cube.IntensityOFF();
                        BackGroundMusic.volume = .5;
                        for(const WorldClass of WorldClassList)
                        {
                            WorldClass.PictureFramesActive();
                        }
                    })
                  }, randFloat(0,300));
              }, 4500);
            }
    }

    if(Key == "LookOut")
    {
        SetOnce = false
    Controls.enabled = true; // Ensure controls stay updated.
    Controls.target = new THREE.Vector3(0,500,10000);
    }
    else
    {
        Controls.enabled = false;
    }
    TWEEN.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

const PictureIslandNames = [
    "JanuaryIn",
    "FebruaryIn",
    "MarchIn",
    "AprilIn",
    "MayIn",
    "JuneIn",
    "JulyIn",
    "AugustIn",
    "SeptemberIn",
    "OctoberIn",
    "NovemberIn",
    "DecemberIn",
]
window.addEventListener("keypress", function(e)
{
    if(PictureIslandNames.includes(Key))
    {
        const WorldIn = WorldClassList[11-PictureIslandNames.indexOf(Key)];
        switch (e.key) 
        {
            case "d":
            case "ArrowRight":
                WorldIn.MoveToRight();
                break;
            case "a":
            case "ArrowLeft":
                WorldIn.MoveToLeft();
                break;
        }
    }
})

window.addEventListener('resize',function()
    {
        camera.aspect= window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(this.window.innerWidth,this.window.innerHeight);

    }
);

