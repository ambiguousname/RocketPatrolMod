class Enemy extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, pointValue, sprite) {
		super(scene, x, y, sprite, 0);
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

export class BasicEnemy extends Enemy {
	constructor(scene, x, y, pointValue) {
		super(scene, x, y, pointValue, "spaceship");
	}
}



export class SmallFastEnemy extends Enemy {
	constructor(scene, x, y, pointValue) {
		super(scene, x, y, pointValue, "fast");
		this.moveSpeed *= 3;
	}
}