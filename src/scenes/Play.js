import {preloadSprites, BasicEnemy, SmallFastEnemy, Rocket} from "../prefabs/Prefabs.js";
import { initializeInput } from "../Input.js";

export class Play extends Phaser.Scene {
	constructor() {
		super("playScene");
	}

	#enemies = [];

	// #region PHASER FUNCTIONS:

	preload() {
		initializeInput(this);
		preloadSprites(this);
		this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
	}

	#fields = [];

	create() {
		var starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
		starfield.tileMoveSpeed = 4;
		this.#fields.push(starfield);
		for (var i = 0; i < 10; i++) {
			let field = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
			field.tileMoveSpeed = Math.random() * 2;

			field.tilePositionX = Math.floor(Math.random() * 100);
			field.tilePositionY = Math.floor(Math.random() * 100);

			field.tint = Math.floor(Math.random() * 0xffffff);
			this.#fields.push(field);
		}
		
		this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

		this.genEnemies();
		this.drawGameWindow();

		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
			frameRate: 30
		});
		
		this.createScoreboard();

		this.startEndGameTimer = this.time.now;
		this.endGameTime = game.settings.gameTimer;
	}

	update() {
		var secondElapsed = this.time.now - this.startEndGameTimer;
		var fullSecs = (this.endGameTime - secondElapsed)/1000;
		if (fullSecs <= 0) {
			game.settings.scores[(game.settings.player + 1) % 2] = this.p1Score;
			this.scene.start("scoreScene");
		}

		var secsFormat = (Math.floor(fullSecs * 10)/10).toString();
		while (secsFormat.length < 4) {
			if (secsFormat.length < 3) {
				secsFormat += ".";
			}
			secsFormat += "0";
		}
		this.timerLeft.text = secsFormat + "s";
		if (this.gameOver) {
			if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
				this.scene.restart();
			} else if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
				this.scene.start("scoreScene");
			}
		}

		this.#fields.forEach(function(field) {
			field.tilePositionX -= field.tileMoveSpeed;
		});
		if (!this.gameOver) {
			this.p1Rocket.update();
			this.#enemies.forEach(function(ship) {
				ship.update();
			}, this);
		}

		this.#enemies.forEach(function(ship) {
			if (this.checkCollision(this.p1Rocket, ship)) {
				this.p1Rocket.reset();
				this.shipExplode(ship);
			}
		}, this);
	}

	// #endregion

	// #region Custom Initialization:
	drawGameWindow(){
		// green UI background
		this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
		// white borders
		this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
		this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
		this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
		this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
	}

	genEnemies(){
		this.#enemies.push(new BasicEnemy(this, game.config.width + borderUISize*6, borderUISize*4, 30).setOrigin(0, 0));
		this.#enemies.push(new BasicEnemy(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 20).setOrigin(0,0));
		this.#enemies.push(new BasicEnemy(this, game.config.width, borderUISize*6 + borderPadding*4, 10).setOrigin(0,0));
		this.#enemies.push(new SmallFastEnemy(this, game.config.width + borderUISize * 8, borderUISize * 8 + borderPadding * 5, 50));
	}

	createScoreboard() {
		this.p1Score = 0;
		let scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
			  top: 5,
			  bottom: 5,
			},
			fixedWidth: 100
		  }
		this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
		scoreConfig.fixedWidth = 0;
		this.timerLeft = this.add.text(borderUISize * 5 + borderPadding, borderPadding * 2 + borderUISize, "0", scoreConfig);
		
		scoreConfig.backgroundColor = "#" + (game.settings.player === 1 ? "F3" : "55") + "B141";
		scoreConfig.color = (game.settings.player === 1) ? "#843605" : "#000000";
		this.add.text(game.config.width - 5 * borderUISize - borderPadding, borderUISize + 2 * borderPadding, "Player " + game.settings.player, scoreConfig);
	}

	// #endregion

	// #region Custom Update:

	checkCollision(rocket, ship) {
		// simple AABB checking
		if (rocket.x < ship.x + ship.width && 
		  rocket.x + rocket.width > ship.x && 
		  rocket.y < ship.y + ship.height &&
		  rocket.height + rocket.y > ship. y) {
		  return true;
		} else {
		  return false;
		}
	}

	shipExplode(ship) {
		// temporarily hide ship
		ship.alpha = 0;
		// create explosion sprite at ship's position
		let boom = this.add.sprite(ship.x, ship.y, 'explosion');
		boom.displayWidth = ship.width;
		boom.displayHeight = ship.height;

		let particles = this.add.particles('explosion', {
			speed: 500,
			lifespan: 500,
			scale: { start: 0.3, end: 0},
			x: ship.x,
			y: ship.y,
			frequency: -1,
		});
		particles.emitParticle(50);

		boom.anims.play('explode');             // play explode animation
		boom.on('animationcomplete', () => {    // callback after anim completes
			ship.reset();                         // reset ship position
			ship.alpha = 1;                       // make ship visible again
			boom.destroy();                       // remove explosion sprite
		});

		this.p1Score += ship.points;
		this.endGameTime += ship.points * 80;
  		this.scoreLeft.text = this.p1Score;
		this.sound.play('sfx_explosion');
	}

	// #endregion
}