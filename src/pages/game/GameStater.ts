import { Application, Assets, Container, Sprite } from "pixi.js";

interface GameConfig {
    width: number;
    height: number;
    backgroundColor: number;
}

let tilesSize = 16
let map = {
    width: 4,
    hegiht: 4,
    tiles: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ]
}


export class GameStater {

    app: any = null
    tileTexture: any = []

    constructor(config?: any) {
        let baseconfig = { ...config, width: innerWidth, height: 720, }
        this.app = new Application(baseconfig);
        // The application will create a canvas element for you that you
        // can then insert into the DOM
        document.querySelector('#game')!.appendChild(this.app.view);
    }
    async initRes() {
        const bunny = await Assets.load('./arcade_platformerV2.png');
        let texture = new Sprite(bunny)
        for (let i = 0; i < map.tiles.length; i++) {
            let x = i % map.width
            let y = Math.floor(i / map.width)
            let tile = new Sprite(texture.texture)
            tile.x = x * tilesSize
            tile.y = y * tilesSize
            tile.width = tilesSize
            tile.height = tilesSize
            this.app.stage.addChild(tile)
        }
    }

    async initWolrd() {
        this.initRes();
        let background = new Container();
        for (let y = 0; i < map.hegiht; y++) {
            for (let x = 0; x < map.width; x++) {
                let tile = map.tiles[y * map.width + x]//?
                let sprite = new Sprite(await Assets.TextureCache['tile' + tile])
                sprite.x = x * tilesSize
                sprite.y = y * tilesSize
                background.addChild(sprite)
            }
        }
        // load the texture we need
        const texture = await Assets.load('https://pixijs.io/examples/examples/assets/bunny.png');

        // This creates a texture from a 'bunny.png' image
        const bunny = new Sprite(texture);

        // Setup the position of the bunny
        bunny.x = this.app.renderer.width / 2;
        bunny.y = this.app.renderer.height / 2;


        // Rotate around the center
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // Add the bunny to the scene we are building
        this.app.stage.addChild(bunny);

        // Listen for frame updates
        this.app.ticker.add(() => {
            // each frame we spin the bunny around a bit
            bunny.rotation += 0.01;
        });
    }
}