import Phaser from 'phaser'

export default class Epic_Quest extends Phaser.Scene {
	constructor() {
		super('Epic_Quest')
	}

	init() {
		this.platforms = [];
		this.hero = undefined;
		this.cursor = undefined;
		this.right = undefined;
		this.end = undefined;
		this.gameover= undefined;
		this.noActions = undefined;
		this.blocking = undefined;
		this.goblin = undefined;
		this.skeleton = undefined;
		this.scoreText = undefined;
		this.score = 0;
	}

	preload() {
		this.load.image("platform", "images/platform.png")
		this.load.image("platform2", "images/platform2.png")
		this.load.image("background", "images/temp-backgroundv2.png")
		
		this.load.spritesheet("hero_idle", "images/knight/knight_idle.png", {
			frameWidth: 42,
			frameHeight: 40
		})
		this.load.spritesheet("hero_walk", "images/knight/knight_walk.png", {
			frameWidth:42, 
			frameHeight:40
		})
		this.load.spritesheet("hero_slash", "images/knight/knight_slash.png", {
			frameWidth: 80,
			frameHeight: 36
		})
		this.load.spritesheet("hero_block", "images/knight/knight_block.png", {
			frameWidth: 42,
			frameHeight: 40
		})
		this.load.spritesheet("goblin_idle", "images/Goblin/idle_goblin.png",{
			frameWidth: 100,
			frameHeight: 150
		})
		this.load.spritesheet("skeleton_idle", "images/Skeleton/idle_skeleton.png",{
			frameWidth: 60,
			frameHeight: 60 
		})
	}

	create() {
		this.add.image(400, 300, "background")
		this.platforms = this.physics.add.staticGroup();
		// this.platforms.create(600, 400, "platform");
		// this.platforms.create(50, 250, "platform");
		// this.platforms.create(750, 220, "platform");
		this.platforms.create(400, 568, "platform").setScale(2).refreshBody();

		this.hero = this.physics.add.sprite(100, 490, "hero_idle");
		this.hero.setCollideWorldBounds(true);

		this.cursor = this.input.keyboard.createCursorKeys();
		
		// this.skeleton = this.physics.add.sprite(750, 490, "skeleton_idle");
		
		// this.skeleton.setCollideWorldBounds(true);
		// this.skeleton.setFlipX(true);

		// this.goblin = this.physics.add.sprite(650, 490, "goblin_idle");
		// this.goblin.setCollideWorldBounds(true);
		// this.goblin.setFlipX(true);

		this.skeleton = this.physics.add.group({
			key: "skeleton_idle",
			repeat: 5,
			setXY: { x: 250, y: 10, stepX: 100 },
		  });
		
		
		this.physics.add.collider(this.hero, this.platforms,);
		this.createAnimation();

		this.physics.add.collider(this.skeleton, this.platforms,); 
		this.createAnimation();
		

		// this.physics.add.collider(this.goblin, this.platforms,);

		this.physics.add.overlap(
			this.hero,
			this.skeleton,
			this.hitSkeleton,
			null,
			this	
		)
	
		this.scoreText = this.add.text(12, 16, "Score : 0", {
			fontSize: "32px",
			fill: "black",
		  });
	}

	update(time) {
		this.movePlayer(this.hero, time);
		if (this.score >= 60) {
			this.physics.pause();
			this.add.text(300, 300, "You Win!!!", {
			  fontSize: "48px",
			  fill: "yellow",
			});
		  }
	}

	movePlayer(hero, time) {
		if (this.cursor.left.isDown) {
			this.hero.setVelocity(-200, 0);
			this.hero.play("hero_walk", true)
			this.hero.setFlipX(true);
		} else if (this.cursor.right.isDown) {
			this.hero.setVelocity(200, 0);
			this.hero.play("hero_walk", true)
			this.hero.setFlipX(false);
		} else {
			this.hero.setVelocity(0, 0);
			if (this.noActions == true) {
				this.hero.play("hero_idle", true)
			}
		}
		this.hero.setCollideWorldBounds(true);
		// if (this.cursor.up.isDown) {
		// 	this.hero.setVelocity(0, -200);  
		// 	this.hero.anims.play("turn");
		//   }
		//   if (this.cursor.down.isDown) {
		// 	this.hero.setVelocity(0, 200);  
		// 	this.hero.anims.play("turn");
		//    }
		this.hero.setCollideWorldBounds(true);
		
		//Bug Character pls fix
		if (this.cursor.up.isDown) {
			this.noActions = false
			this.hero.play("hero_slash")
			this.time.delayedCall(1000, () => {
				this.noActions = true
				}, [], this)
		} else if (this.cursor.down.isDown) {
			this.noActions = false
			this.hero.play("hero_block")
			this.time.delayedCall(700, () => {
				this.hero.anims.pause(this.hero.anims.currentAnim.frames[6])
				this.blocking = true
				}, [], this)
		} else {
			this.blocking = false
		}
	}

	

	hitSkeleton(hero, skeleton) {
		//hero.play('hero_slash');
		skeleton.destroy();
		this.score += 10; 
    	this.scoreText.setText('Score : '+this.score);
	}

	platform() {

	}

	createAnimation() {
		this.anims.create({
			key: 'hero_walk',
			frames: this.anims.generateFrameNumbers('hero_walk', { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'hero_idle',
			frames: this.anims.generateFrameNumbers('hero_idle', { start: 0, end: 3 }),
			frameRate: 2,
			repeat: -1
		})
		this.anims.create({
			key: 'hero_slash',
			frames: this.anims.generateFrameNumbers('hero_slash', { start: 0, end: 9 }),
			frameRate: 10
		});
		this.anims.create({
			key: 'hero_block',
			frames: this.anims.generateFrameNumbers('hero_block', { start: 0, end: 6 }),
			frameRate: 10,
			repeat: -1
		});
		// this.anims.create({
		// 	key: 'skeleton_idle',
		// 	frames: this.anims.generateFrameNumbers('skeleton_idle', { start: 0, end: 3 }),
		// 	frameRate: 2,
		// 	repeat: -1
		// })
		
}

}

// Hello world ?