var isLeveloneLock = true;
var isLeveltwoLock = true;
var isLevelthreeLock = true;
const KEY = 0;
const items = [false];

class LS extends Phaser.Scene {
	constructor() {
			super('LS');
	}
	preload() {
			this.load.path = './assets/LevelUI/';
			this.load.image('l0u','/Level0_unlocked.png');
			this.load.image('l1l','/Level1_locked.png');
			this.load.image('l1u','/Level1_unlocked.png');
			this.load.image('l2l','/Level2_locked.png');
		    this.load.image('l2u','/Level2_unlocked.png');
			this.load.image('l3l','/Level3_locked.png');
			this.load.image('l3u','/Level3_unlocked.png');
	}
	create() {
		// reset items
		for (let i = 0; i < items.length; i++) {
			items[i] = false;
		  }
		  
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
		this.load.path = './assets/Level0/';
		this.load.image('background','/level0_background.png');
		//this.load.image('unlocked_door','/unlocked_door.png');
		//this.load.image('locked_door','/locked_door.png');
		this.load.image('unlocked_door','/testdoor.png');
		this.load.image('locked_door','/testdoor.png');
		this.load.image('key','/key.png');
		this.load.image('arrow','/testarrow.png');
	}
	create() {
		this.cameras.main.setBackgroundColor('#808080');
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(1120, 0, 1120, 720));
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 180, 1280, 180));
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 360, 1280, 360));
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 540, 1280, 540));
		this.add.image(480, 360, 'background');
		this.add.image(480, 360, 'locked_door')
			.setInteractive()
			.setScale(0.1)
            .on('pointerdown', () => {
                if(items[KEY]) {
					isLeveloneLock = false;
					this.cameras.main.fade(1000, 0,0,0);
                	this.time.delayedCall(1000, () => this.scene.start('LS'));
				}
            });
		this.add.image(600, 360, 'unlocked_door')
			.setInteractive()
			.setScale(0.1)
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L0_1'));
            });

		if(items[KEY]) {
			this.add.image(1050, 80, 'key');
		}
	}
	update() {
    
	}
}

class L0_1 extends Phaser.Scene {
	constructor() {
		super('L0_1');
	}
	preload() {
		this.load.path = './assets/Level0/';
	}
	create() {
		this.cameras.main.setBackgroundColor('#808080');
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(1120, 0, 1120, 720));
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 180, 1280, 180));
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 360, 1280, 360));
		this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 540, 1280, 540));
		this.add.image(480, 360, 'background');
		this.add.image(600, 600, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('L0'));
            });

		if(items[KEY]) {
			this.add.image(1050, 80, 'key');		
		}
		else {
			let key = this.add.image(480, 360, 'key')
			.setInteractive()
            .on('pointerdown', () => {
                key.destroy();
				this.add.image(1050, 80, 'key')
				items[KEY] = true;
            });
		}
		

			
	}
	update() {
    
	}
}

class L1 extends Phaser.Scene {
	constructor() {
		super('L1');
	}
	preload() {
		this.load.path = './assets/Level1/';
	}
	create() {
		this.cameras.main.setBackgroundColor('#808080');
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
		this.load.path = './assets/Level2/';
	}
	create() {
		this.cameras.main.setBackgroundColor('#808080');
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
		this.load.path = './assets/Level3/';
	}
	create() {
		this.cameras.main.setBackgroundColor('#808080');
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
		scene: [LS, L0, L0_1, L1, L2, L3]
}

let game = new Phaser.Game(config);
