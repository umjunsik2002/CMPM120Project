var isLeveloneLock = false;
var isLeveltwoLock = false;
var isLevelthreeLock = true;

class start extends Phaser.Scene {
	constructor() {
		super('start');
	}
	preload() {
		this.load.path = './assets/';
	}
	create() {
		this.add.text(50,50, "Adventure awaits!").setFontSize(50);
		this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
		this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
			this.time.delayedCall(1000, () => this.scene.start('LS'));
		});
	}
	update() {
    
	}
}

class LS extends Phaser.Scene {
	constructor() {
			super('LS');
	}
	preload() {
			this.load.path = './assets/';
			this.load.image('l0u','/LevelUI/Level0_unlocked.png');
			this.load.image('l1l','/LevelUI/Level1_locked.png');
			this.load.image('l1u','/LevelUI/Level1_unlocked.png');
			this.load.image('l2l','/LevelUI/Level2_locked.png');
		    this.load.image('l2u','/LevelUI/Level2_unlocked.png');
			this.load.image('l3l','/LevelUI/Level3_locked.png');
			this.load.image('l3u','/LevelUI/Level3_unlocked.png');
	}
	create() {
		this.add.image(180, 360, 'l0u')
        .setInteractive()
        .on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
			this.time.delayedCall(1000, () => this.scene.start('L0'));
		});

		if(isLeveloneLock) {
			this.add.image(480, 360, 'l1l')
        }
		else {
            this.add.image(480, 360, 'l1u')
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L1'));
            });
        }

		if(isLeveltwoLock) {
			this.add.image(780, 360, 'l2l')
        }
		else {
            this.add.image(780, 360, 'l2u')
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L2'));
            });
        }

		if(isLevelthreeLock) {
			this.add.image(1080, 360, 'l3l')
        }
		else {
            this.add.image(1080, 360, 'l3u')
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L3'));
            });
        }
        
	}
	update() {
        
	}
}

class L0 extends Phaser.Scene {
	constructor() {
		super('L0');
	}
	preload() {
		this.load.path = './assets/';
	}
	create() {
		this.add.text(50, 50, "Level 0", { fontSize: 50, color: '#000000' });
	}
	update() {
    
	}
}

class L1 extends Phaser.Scene {
	constructor() {
		super('L1');
	}
	preload() {
		this.load.path = './assets/';
	}
	create() {
		this.add.text(50, 50, "Level 1", { fontSize: 50, color: '#000000' });
	}
	update() {
    
	}
}

class L2 extends Phaser.Scene {
	constructor() {
		super('L2');
	}
	preload() {
		this.load.path = './assets/';
	}
	create() {
		this.add.text(50, 50, "Level 2", { fontSize: 50, color: '#000000' });
	}
	update() {
    
	}
}

class L3 extends Phaser.Scene {
	constructor() {
		super('L3');
	}
	preload() {
		this.load.path = './assets/';
	}
	create() {
		this.add.text(50, 50, "Level 3", { fontSize: 50, color: '#000000' });
	}
	update() {
    
	}
}



let config = {
		type: Phaser.WEBGL,
		width: 1280,
		height: 720,
		backgroundColor: '#ffffff',
		scene: [start, LS, L0, L1, L2, L3]
}

let game = new Phaser.Game(config);