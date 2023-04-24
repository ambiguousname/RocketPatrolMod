export class Enemy extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, pointValue) {
		super(scene, x, y, 'spaceship', 0);
		scene.add.existing(this);
		this.points = pointValue;
		this.moveSpeed = game.settings.spaceshipSpeed;
	}

	update() {
		this.x -= this.moveSpeed;
		if (this.x <= 0 - this.width) {
			this.reset();
		}
	}

	reset() {
		this.x = game.config.width;
	}
}