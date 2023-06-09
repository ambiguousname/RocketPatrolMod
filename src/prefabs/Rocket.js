// Rocket prefab
export class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
	
		// add object to existing scene
		scene.add.existing(this);

		this.isFiring = false;
		this.moveSpeed = 2;

		this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

		this.mouseEnabled = false;

		scene.input.on("pointerdown", function() {
			if (this.mouseEnabled) {
				this.isFiring = true;
			}
			this.mouseEnabled = true;
		}, this);

		scene.input.keyboard.on("keydown", function() {
			this.mouseEnabled = false;
		}, this);
	}

	update() {
		if (!this.isFiring) {	
			if (this.mouseEnabled) {
				var mouseX = game.input.mousePointer.x;
				if (this.x > mouseX && this.x >= borderUISize + this.width) {
					this.x -= this.moveSpeed;
				} else if (this.x < mouseX && this.x <= game.config.width - borderUISize - this.width) {
					this.x += this.moveSpeed;
				}
			} else {
				if (this.scene.keyLEFT.isDown && this.x >= borderUISize + this.width) {
					this.x -= this.moveSpeed;
				} else if (this.scene.keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
					this.x += this.moveSpeed;
				}
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.scene.keyF) && !this.isFiring) {
			this.isFiring = true;
			this.sfxRocket.play();
		}

		if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
			this.y -= this.moveSpeed;
		}

		if (this.y <= borderUISize * 3 + borderPadding) {
			this.reset();
		}
	}

	reset() {
		this.isFiring = false;
		this.y = game.config.height - borderUISize - borderPadding;
	}
}