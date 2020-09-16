//https://steemit.com/utopian-io/@onepice/create-scenes-and-scene-transitions-at-phaser3-library
var GameScene1 = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function GameScene1 ()
    {
        Phaser.Scene.call(this, { key: 'GameScene1' });
    },

    preload: function ()
    {
        this.load.spritesheet('Girl', 'Girl.png',  {frameWidth: 256, frameHeight:256, endFrame: 12});
        this.load.spritesheet('Boy', 'Boy.png', {frameWidth: 64, frameHeight:64, endFrame: 36});
        this.load.image('Particle', 'Particle.png');
        this.load.image('Scene1', 'Scene1.jpg');
        this.load.image('Ground2', 'Ground2.jpg');
        this.load.image('Ground3', 'Ground3.jpg');
        this.load.image('PortalL', 'PortalL.png');
        this.load.image('PortalR', 'PortalR.png');
        this.load.image('Yashit', 'Yashit.png');
        this.load.image('Anthima', 'Anthima.png');
        this.load.image('Amitabh', 'Amitabh.png');
        this.load.image('Haunted', 'Haunted.jpg');
        this.load.image('House', 'House.png');
        this.load.image('Door', 'Door.png');
        this.load.image('Win', 'Win.png');
        this.load.audio('first', ['First.wav','First.ogg']);
    },

    create: function ()
    {
        ground = this.add.sprite(400, 380, 'Scene1');
        ground.setScale(1.5,1);

        door = this.add.sprite(400, 510, 'Door');
        door.setScale(0.15, 0.2);
        door.setInteractive({ useHandCursor: true });
        door.setInteractive().on('pointerdown', function() {
            this.scene.scene.start('GameScene2');
            this.scene.scene.pause('GameScene1');
        });

        haunted = this.add.sprite(400, 150, 'Haunted');
        haunted.setScale(0.5);
        house = this.add.sprite(300, 250, 'House');
        house.setScale(0.5);

        backgroundMusic = game.add.audio('first');

        haunted.setInteractive({ useHandCursor: true });
        haunted.setInteractive().on('pointerdown', function() {
            //backgroundMusic.play();
        });
        
        cursors = this.input.keyboard.createCursorKeys();
    }
});

//create a scene with class
var GameScene2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene2' });
    },
    
    create: function ()
    {
        ground1 = this.add.sprite(400, 300, 'Ground2');
        ground1.setScale(1, 1.2);
        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'rightG',
            frames: this.anims.generateFrameNumbers('Girl', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftG',
            frames: this.anims.generateFrameNumbers('Girl', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pauseG',
            frames: this.anims.generateFrameNumbers('Girl', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        
        portalL = this.add.sprite(50, 420, 'PortalL');
        portalL.setScale(0.1);
        portalR = this.add.sprite(750, 420, 'PortalR');
        portalR.setScale(0.1);
        Girl = this.add.sprite(300, 440, 'Girl');
        Girl.setScale(0.5);
    },

    update: function(){
        if (cursors.right.isDown)
        {
            if (Girl.x != 710)
            {
                Girl.anims.play('rightG', true);
                Girl.x += 2;
            }
        } 
        else if (cursors.left.isDown)
        {
            if (Girl.x != 80)
            {
                Girl.anims.play('leftG', true);
                Girl.x -= 2;
            }
        }
        else if (Girl.x <= 100)
        {
            portalL.setInteractive({ useHandCursor: true });
            portalL.setInteractive().on('pointerdown', function() {
                this.scene.scene.start('GameScene3');
                this.scene.scene.pause('GameScene2');
            });
        }
        else if (Girl.x >= 680)
        {
            portalR.setInteractive({ useHandCursor: true });
            portalR.setInteractive().on('pointerdown', function() {
                this.scene.scene.start('GameScene2');
            });
        }
        else
        {
            Girl.anims.play('pauseG', true);
        }

    }
});

var GameScene3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene3' });
    },
    
    create: function ()
    {
        ground2 = this.add.sprite(400, 320, 'Ground3');
        ground2.setScale(0.2);
        var txt5 = this.add.image(400, 100, 'Win');
        txt5.setInteractive({ useHandCursor: true });
        txt5.setInteractive().on('pointerdown', function() {
            this.scene.scene.start('GameScene1');
            this.scene.scene.pause('GameScene3');
        });

        var particles = this.add.particles('Particle');
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.05, end: 0 },
            blendMode: 'ADD'
        });
        
        logo1 = this.physics.add.image(100, 100, 'Yashit');
        logo1.setScale(0.3);
        logo1.setVelocity(100, 0);
        logo1.setBounce(1, 1);
        logo1.setGravityY(300);
        logo1.setCollideWorldBounds(true);
        emitter.startFollow(logo1, -60, 30);
    }
});

//settings required to configure the game
var config = {
    type: Phaser.AUTO,   
    width: 800,
    height:  600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 10,
        }
    },
    
    //set background color
    backgroundColor: 0x8080,
    scale: {
        //we place it in the middle of the page.
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene:[GameScene1, GameScene2, GameScene3]

};

var game = new Phaser.Game(config);