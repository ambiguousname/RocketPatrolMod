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
			align: "right",
			padding: {
				top: 5,
				bottom: 5
			},
			fixedWidth: 0
		};
		this.add.text(game.config.width/2, game.config.height/2, "High Score: ", textConf);
		this.add.text(game.config.width/2, game.config.height/2 + borderPadding + borderUISize, "Player 1 Score: ", textConf);
		this.add.text(game.config.width/2, game.config.height/2 + 2 * borderPadding + 2 * borderUISize, "Press R to restart.", textConf);
	}
}