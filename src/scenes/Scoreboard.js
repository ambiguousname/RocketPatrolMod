import { initializeInput } from "../Input.js";

export class Score extends Phaser.Scene {
	constructor () {
		super("scoreScene");
	}

	preload() {
		initializeInput(this);
	}

	create() {
		let textConf = {
			fontFamily: "Courier",
			fontSize: "28px",
			backgroundColor: "#F3B141",
			color: "#843605",
			align: "center",
			padding: {
				top: 5,
				bottom: 5
			},
			fixedWidth: 0
		};
		var currentScore = game.settings.scores[(game.settings.player + 1) % 2];
		var highScore = 0;
		if (localStorage.getItem("highScore") !== null && parseInt(localStorage.getItem("highScore")) >= currentScore) {
			highScore = parseInt(localStorage.getItem("highScore"));
		} else {
			highScore = currentScore;
		}
		localStorage.setItem("highScore", highScore);

		this.add.text(game.config.width/2, game.config.height/2 - 2 * borderPadding - borderUISize, "High Score: " + highScore, textConf).setOrigin(0.5);
		this.add.text(game.config.width/2, game.config.height/2, "Player 1 Score: " + game.settings.scores[0], textConf).setOrigin(0.5);
		this.add.text(game.config.width/2, game.config.height/2 + 2 * borderPadding + borderUISize, "Player 2 Score: " + game.settings.scores[1], textConf).setOrigin(0.5);
		var currentPlayer = game.settings.player;
		var nextPlayer = (game.settings.player) % 2 + 1;
		this.add.text(game.config.width/2, game.config.height/2 + 3 * borderPadding + 3 * borderUISize, `Press R to restart as Player ${currentPlayer}. \n Press -> to play as Player ${nextPlayer} \n Or press <- to go to menu.`, textConf).setOrigin(0.5);
	}

	update() {
		if (this.keyR.isDown) {
			this.scene.start("playScene");
		}
		if (this.keyRIGHT.isDown) {
			game.settings.player = (game.settings.player % 2) + 1;
			this.scene.start("playScene");
		}
		if (this.keyLEFT.isDown) {
			this.scene.start("menuScene");
		}
	}
}