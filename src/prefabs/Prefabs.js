import {BasicEnemy, SmallFastEnemy} from "./Enemies.js";
import {Rocket} from "./Rocket.js";


function preloadSprites(scene){
	scene.load.image('rocket', './assets/rocket.png');
	scene.load.image('spaceship', './assets/spaceship.png');
	scene.load.image('starfield', './assets/starfield.png');
	scene.load.image('fast', './assets/smallfastship.png');
}

export {preloadSprites, BasicEnemy, SmallFastEnemy, Rocket};