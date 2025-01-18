import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mod } from 'three/tsl';
import gsap from 'gsap';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

//Importing Images
import * as BackgroundImage from './Images/Star.jpg';
import * as ConcreteImage from './Images/Concrete.jpg';
import * as DirtImage from './Images/Dirt.jpg';
import { Scene, SpotLightHelper } from 'three/webgpu';
const White = new THREE.Color(1,1,1);

export default class World{
    constructor(scene,SphereImage, PlaneSize,PlaneImage,Position,FirstWorld)
    {
        //Adds The Sphere
        this.Position = Position
        this.scene = scene
        const textureLoader = new THREE.TextureLoader();
        const  BackgroundSphereGeometry = new THREE.SphereGeometry(1000,64,64);
        let BackgroundSphereMaterial;
        if(FirstWorld != null)
        {
            BackgroundSphereMaterial = new THREE.MeshStandardMaterial(
                {
                    side: THREE.BackSide,
                    map: textureLoader.load(SphereImage),        
                }
            )
        }
        else
        {
            BackgroundSphereMaterial = new THREE.MeshBasicMaterial(
                {
                    side: THREE.BackSide,
                    map: textureLoader.load(SphereImage),        
                }
            )
        }
        const BackgroundSphere = new THREE.Mesh(BackgroundSphereGeometry,BackgroundSphereMaterial);
        BackgroundSphere.position.set(Position[0],Position[1],Position[2])
        this.Sphere = BackgroundSphere;
        scene.add(BackgroundSphere);

        const StartingPlaneGeometry = new THREE.PlaneGeometry(PlaneSize,PlaneSize);
        const Texture = textureLoader.load(PlaneImage);
        Texture.wrapS = THREE.RepeatWrapping;
        Texture.wrapT = THREE.RepeatWrapping;
        Texture.repeat.set( 4, 4 ); 
        const StartingPlaneMaterial = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: Texture,
        });
        const StartingPlane = new THREE.Mesh(StartingPlaneGeometry,StartingPlaneMaterial);
        StartingPlane.rotation.x = -.5 * Math.PI;
        StartingPlane.receiveShadow = true;
        StartingPlane.position.set(Position[0],Position[1],Position[2])
        this.Plane = StartingPlane;
        scene.add(StartingPlane);

    }
    AddObject(Object,Position,rotation)
    {
        Object.castShadow = true;
        Object.receiveShadow = true;
        Object.rotation.y = rotation;
        Object.position.set(Position[0],Position[1],Position[2]);

        this.scene.add(Object);
    }
    AddBlenderObject(BlenderURL,Position,scale,rotation)
    {
        const assetLoader = new GLTFLoader();
        const BlenderMesh = new URL(BlenderURL, import.meta.url);
        const scene = this.scene
        let model;
        assetLoader.load(BlenderMesh.href, function(gltf)
        {
            model = gltf.scene;
            scene.add(model);
            model.position.set(Position[0],Position[1],Position[2])
            model.scale.set(scale,scale,scale);
            model.rotation.y = rotation;
            model.castShadow = true
            model.receiveShadow = true
        },undefined, function(error){
            console.log(error);
        });
    }
   BrightenStartingWorld(SphereImage,Position)
   {
    const textureLoader = new THREE.TextureLoader();
    this.scene.remove(this.Sphere);
    const  BackgroundSphereGeometry = new THREE.SphereGeometry(1000,64,64);
    const BackgroundSphereMaterial = new THREE.MeshBasicMaterial(
        {
            side: THREE.BackSide,
            map: textureLoader.load(SphereImage),        
        }
    )
    const BackgroundSphere = new THREE.Mesh(BackgroundSphereGeometry,BackgroundSphereMaterial);
    BackgroundSphere.position.set(Position[0],Position[1],Position[2])
    BackgroundSphere.rotation.y = 90;
    this.scene.add(BackgroundSphere)
   }
   AddLighting()
   {
    const SpotLight = new THREE.SpotLight(White,22.5);
    SpotLight.castShadow = true;
    let Position = this.Position;
    SpotLight.position.set(Position[0],Position[1]+3,Position[2]);
    SpotLight.target = this.Plane;
    this.scene.add(SpotLight);
   }
   PictureWorld()
   {
    const textureLoader = new THREE.TextureLoader();
        //Adding trees
    let thisX = this.Position[0]
    let thisZ = this.Position[2]
    this.AddBlenderObject('./Meshes/Tree1.glb',[-1.58+thisX,0,-1.5+thisZ],.25,90);
    this.AddBlenderObject('./Meshes/Tree1.glb',[1.58+thisX,0,-1.5+thisZ],.25,90);


    //Creating DirtMounds for the tree
    const DirtSphereGeometry = new THREE.SphereGeometry(.4,10,10);
    const DirtSphereMaterial = new THREE.MeshStandardMaterial(
        {
            map: textureLoader.load(DirtImage.default),
        }
    );
    const DirtSphere = new THREE.Mesh(DirtSphereGeometry,DirtSphereMaterial);
    this.AddObject(DirtSphere.clone(),[-1.58+thisX,-.3,-1.5+thisZ],0)
    this.AddObject(DirtSphere.clone(),[1.58+thisX,-.3,-1.5+thisZ],0)
   }
   AddBlenderObjectPicture(Position,scale,rotation,files)
    {
        const fileKeys = Object.keys(files);
        const assetLoader = new GLTFLoader();
        const scene = this.scene

        fileKeys.forEach(async (filePath) => {
            const BlenderMesh = new URL(filePath, import.meta.url);
            let model;
            assetLoader.load(BlenderMesh.href, function(gltf)
            {
                model = gltf.scene;
                scene.add(model);
                model.position.set(Position[0],Position[1],Position[2])
                model.scale.set(scale,scale,scale);
                model.rotation.y = rotation;
                model.castShadow = true
                model.receiveShadow = true
            }.bind(this)
            ,undefined, function(error){
                console.log(error);
            });
        });
    }
    AddBlenderObjectCubePicture(Position,files)
    {
        const textureLoader = new THREE.TextureLoader();
        const fileKeys = Object.keys(files);
        this.ListOfPictures = [];
        this.Index = 0;
        const assetLoader = new GLTFLoader();
        const scene = this.scene

        fileKeys.forEach(async (filePath) => {
            const Texture = textureLoader.load(filePath);
            Texture.minFilter = THREE.LinearFilter;
            Texture.magFilter = THREE.LinearFilter;
            Texture.colorSpace = THREE.SRGBColorSpace;
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: Texture,
                transparent: true,
             });
            const model = new THREE.Mesh(geometry, material);
            model.visible = false;
            scene.add(model);
            model.position.set(Position[0]-.1,1,Position[2]-1.44)
            model.scale.set(1.8,1.8,.01);
            this.ListOfPictures.push(model);
        });
    }
    PictureFramesActive()
    {
        if(this.ListOfPictures.length != 0)
        this.ListOfPictures[0].visible = true
    }
    MoveToRight()
    {
        let index = this.Index;
        this.ListOfPictures[this.Index].visible = false;
        index++;
        if(index  == this.ListOfPictures.length)
        {
            index = 0;
        }
        this.ListOfPictures[index].visible = true;
        this.Index = index;
    }
    MoveToLeft()
    {
        let index = this.Index;
        this.ListOfPictures[this.Index].visible = false;
        index -= 1;
        if(index < 0)
        {
            index = this.ListOfPictures.length-1;
        }
        this.ListOfPictures[index].visible = true;
        this.Index = index;
    }
}