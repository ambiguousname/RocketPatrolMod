/* Tyler Knowlton
Test Rocket Patrol Mod, Please Ignore
Started: 19:28 at 4/23
Ended:
Mods List:
- New, smaller, faster enemy spaceship (15 points)
- Alternating two player mode (15 points)
- Adding time for successful hits (15 points)
- Mouse controls (15 points)
- Phaser Particle Emitter for particle explosion when rocket hits ship (15 points)
- Display time remaining (10 points)
- 4 new explosion sound effects, randomized (10 points)
- High score (5 points)
Citations:
- https://javascript.info/import-export
*/

import {Menu, Play} from "./scenes/Scenes.js";

let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	scene: [Menu, Play]
}

window.game = new Phaser.Game(config);

game.scene.start("menuScene");

window.borderUISize = game.config.height / 15;
window.borderPadding = borderUISize / 3;