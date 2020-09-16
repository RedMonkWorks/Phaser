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
        this.load.image('Scene1', 'Scene1.jpg');
        this.load.image('Yashit', 'Yashit.png');
        this.load.image('Anthima', 'Anthima.png');
        this.load.image('Amitabh', 'Amitabh.png');
        this.load.image('Haunted', 'Haunted.jpg');
        this.load.image('House', 'House.png');
        this.load.image('Door', 'Door.png');
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

        Girl = this.add.sprite(300, 440, 'Girl');
        Girl.setScale(0.5);
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
