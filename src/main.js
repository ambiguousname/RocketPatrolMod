/* Tyler Knowlton
Test Rocket Patrol Mod, Please Ignore
Started: 19:28 at 4/23
Ended:
Mods List:
- New, smaller, faster enemy spaceship (15 points)
- Alternating two player mode (15 points)
- Adding time for successful hits (15 points)
- Mouse controls (15 points) (Press left click while in the game, and then move the mouse around the screen to move the ship. Pressing any key will reset to keyboard controls)
- Phaser Particle Emitter for particle explosion when rocket hits ship (15 points)
- Display time remaining (10 points)
- Implement parallax scrolling for the background
- High score (5 points)
Citations:
- https://javascript.info/import-export
*/

import {Menu, Play, Score} from "./scenes/Scenes.js";

let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [Menu, Play, Score]
}

window.game = new Phaser.Game(config);

game.scene.start("menuScene");

window.borderUISize = game.config.height / 15;
window.borderPadding = borderUISize / 3;