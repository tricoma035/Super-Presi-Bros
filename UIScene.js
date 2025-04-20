import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() { super('UIScene'); }
  create() {
    this.levelText = this.add.text(16, 16, 'Nivel 1', { fontSize: '24px', fill: '#ffffff' });
    this.scene.get('LevelScene').events.on('transition', (nextLevel) => {
      this.levelText.setText(`Nivel ${nextLevel}`);
    });
  }
}
