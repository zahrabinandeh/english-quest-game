const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'https://i.ibb.co/6m5G0Mf/forest.png'); // پس‌زمینه جنگل
    this.load.spritesheet('player', 'https://i.ibb.co/7QpKsCX/player.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'background');

    player = this.physics.add.sprite(400, 500, 'player');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play('walk', true);
        player.flipX = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false;
    } else if (cursors.up.isDown) {
        player.setVelocityY(-200);
        player.anims.play('walk', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
        player.anims.play('walk', true);
    } else {
        player.anims.stop();
    }
}
