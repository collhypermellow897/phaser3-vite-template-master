import Phaser from 'phaser'

import Epic_Quest from './Epic_Quest'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 },
		},
	},
	scene: [Epic_Quest],
}

export default new Phaser.Game(config)
