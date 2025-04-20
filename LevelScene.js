import Phaser from 'phaser';

export default class LevelScene extends Phaser.Scene {
  constructor() { super('LevelScene'); }
  init(data) {
    this.level = data.level || 1;
  }
  create() {
    // Mapa y capas
    this.map = this.make.tilemap({ key: `level${this.level}` });
    const tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.map.createLayer('Background', tileset);
    this.platforms = this.map.createLayer('Platforms', tileset);
    this.platforms.setCollisionByProperty({ collides: true });

    // Jugador
    this.player = this.physics.add.sprite(100, 450, 'presi');
    this.physics.add.collider(this.player, this.platforms);

    // Enemigos
    const judge = this.physics.add.sprite(400, 500, 'judge');
    judge.setVelocityX(50).setBounce(1, 0).setCollideWorldBounds(true);
    const journalist = this.physics.add.sprite(800, 500, 'journalist');
    journalist.setVelocityX(-50).setBounce(1, 0).setCollideWorldBounds(true);
    this.physics.add.collider(this.player, judge, this.hitEnemy, null, this);
    this.physics.add.collider(this.player, journalist, this.hitEnemy, null, this);

    // Monedas
    this.coins = this.physics.add.group({ key: 'coin', repeat: 10, setXY: { x: 150, y: 0, stepX: 200 } });
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Movimiento
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play('run', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('run', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    // Incrementar puntuación...
  }

  hitEnemy(player, enemy) {
    if (player.body.velocity.y > 0) {
      enemy.disableBody(true, true);
    } else {
      this.scene.restart({ level: this.level });
    }
  }
}
