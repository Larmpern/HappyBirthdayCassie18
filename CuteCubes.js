import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import gsap from 'gsap';
import { mod, triNoise3D } from 'three/tsl';
import { Tween } from 'gsap/gsap-core';
import { randFloat } from 'three/src/math/MathUtils.js';

export default class CuteCube{
    constructor(BlenderURL,Position,scale,rotation,Color,scene){
        this.Go = true;
        this.RunOnce = true
        const assetLoader = new GLTFLoader();
        const BlenderMesh = new URL(BlenderURL, import.meta.url);
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
            const spotlight = new THREE.SpotLight(Color,70,100,.4,1,10);
            spotlight.position.set(Position[0],Position[1]+1,Position[2]+1);
            spotlight.target = model;
            scene.add(spotlight);
            this.Cube = model;
            this.SpotLight = spotlight;
        }.bind(this),undefined, function(error){   
            console.log(error);
        });
    }
    fall()
    {   
        if(this.RunOnce && this.SpotLight)
        {
            this.RunOnce = false;
            gsap.timeline()
            .to(this.SpotLight.position,
            {
                y:1,
                duration:1,
            })
            .to(this.Cube.position,
                {
                    y:.1,
                    duration:1,
                    onComplete:() =>
                        {
                            let LandingSoundEffect = new Audio("./Sound/FallingDown.wav");
                            LandingSoundEffect.volume = 0.5;
                            if(this.Go)
                            LandingSoundEffect.play();
                        }
                })
        }
    }
    JumpUpAndDown(TWEEN)
    {
        const RandomDelay = randFloat(0,2000);
        const tweenJump = new TWEEN.Tween({ y: .1 })
            .to({ y: 1}, 1000)
            .onUpdate(function (coords){
                this.SpotLight.position.y = coords.y+1;
                this.Cube.position.y = coords.y;
            }.bind(this))
            .easing(TWEEN.Easing.Exponential.Out)
            .delay(RandomDelay);


            const tweenFall = new TWEEN.Tween({ y: 1 })
            .to({ y: .1}, 500)
            .onUpdate(function (coords){
                this.SpotLight.position.y = coords.y+1;
                this.Cube.position.y = coords.y;
            }.bind(this))
            .easing(TWEEN.Easing.Cubic.In)
            .onComplete(function()
            {
                let LandingSoundEffect = new Audio("./Sound/FallingDown.wav");
                LandingSoundEffect.volume = 0.5;
                if(this.Go)
                LandingSoundEffect.play();
            });

        tweenJump.chain(tweenFall);
        tweenFall.chain(tweenJump);
        tweenJump.start();
    }
    IntensityOFF()
    {
        this.Go = false;
    }
}