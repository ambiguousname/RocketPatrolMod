
export function initializeInput(scene) {
	scene.keyLEFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	scene.keyRIGHT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	scene.keyF = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
	scene.keyR = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
}