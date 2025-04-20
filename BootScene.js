import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  preload() {
    this.load.image('judge', 'assets/sprites/juez.png');
    this.load.image('journalist', 'assets/sprites/periodista.png');
    this.load.spritesheet('presi', 'assets/sprites/presi.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('coin', 'assets/sprites/moneda.png');
    this.load.tilemapTiledJSON('level1', 'assets/tilemaps/level1.json');
    this.load.image('tiles', 'assets/tilemaps/tileset.png');
    // Cargar JSONs y tilesets de niveles 2-5...
  }
  create() { this.scene.start('LevelScene', { level: 1 }); }
}
