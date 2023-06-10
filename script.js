import items from './items.json' assert {type: 'json'};
var isLeveloneLock = true;
var isLeveltwoLock = true;
var isLevelthreeLock = true;
const KEY = 0;


class LevelScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        this.cameras.main.setBackgroundColor('#808080');
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(1120, 0, 1120, 720));
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 180, 1280, 180));
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 360, 1280, 360));
        this.add.graphics().lineStyle(2, 0xffffff).strokeLineShape(new Phaser.Geom.Line(960, 540, 1280, 540));
        this.onEnter();
    }

    update() {
    }

    onEnter() {
    }
}

class UIScene extends Phaser.Scene {
    constructor() {
        super();
    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.add.text(this.w - 3 * this.s, this.h - 3 * this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
    }
}

class start extends Phaser.Scene {
    constructor() {
        super({ key: 'start' });
    }
    preload() {
        this.load.path = './assets/';
        this.load.audio('music', 'Tchaikovsky_dance_of_the_sugar_plum_fairy.mp3');
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.add.text(640, 240, "Escape", { fontSize: 64, color: '#000000' }).setOrigin(0.5);
        this.add.text(640, 480, "Start Screen\nTap the screen to continue", { fontSize: 48, color: '#000000' }).setOrigin(0.5);

        const music = this.sound.add('music', { loop: true });
        music.play();
        this.scene.add('UIScene', UIScene, true);

        this.input.on('pointerup', () => {
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
		for (let i = 0; i < items.length; i++) {
			items[i].isOwn = false;
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

class L0 extends LevelScene {
    constructor() {
        super('L0');
    }
    preload() {
        this.load.path = './assets/Level0/';
		this.load.image('background','/level0_background.png');
		this.load.image('unlocked_door','/unlockeddoor.png');
		this.load.image('locked_door','/door.png');
		this.load.image('key','/key.png');
		this.load.image('arrow','/arrowUI.png');

        this.load.path = './assets/Sound/';
        this.load.audio('blop_sound', '/blop_sound_effect.mp3');
        this.load.audio('door_open_sound', '/door_open_sound_effect.mp3');
    }
    onEnter() {
        this.add.image(480, 360, 'background');
		this.add.image(320, 360, 'locked_door')
			.setInteractive()
            .on('pointerdown', () => {
                if(items[KEY].isOwn) {
                    this.sound.play('door_open_sound');
					this.cameras.main.fade(1000, 0,0,0);
                    this.time.delayedCall(1000, () => {
						isLeveloneLock = false;
                        this.scene.start('LS');
                    });
				}
            });
		this.add.image(640, 360, 'unlocked_door')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('door_open_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L0_1');
                });
            });
        
        // may replace with a display function later
		if(items[KEY].isOwn) {
			this.add.image(1050, 80, items[KEY].name);
		}
    }
    update() {

    }
}

class L0_1 extends LevelScene {
	constructor() {
		super('L0_1');
	}
	preload() {
		this.load.path = './assets/Level0/';
	}
	onEnter() {
		this.add.image(480, 360, 'background');
		this.add.image(600, 600, 'arrow')
			.setInteractive()
            .on('pointerdown', () => {
                this.sound.play('blop_sound');
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('L0');
                });
            });

		if(items[KEY].isOwn) {
			this.add.image(1050, 80, items[KEY].name);		
		}
		else {
			let key = this.add.image(480, 360, items[KEY].name)
			.setInteractive()
            .on('pointerdown', () => {
                key.destroy();
                this.sound.play('blop_sound');
				this.add.image(1050, 80, items[KEY].name)
				items[KEY].isOwn = true;
            });

            this.tweens.add({
                targets: key,
                y: 330,
                duration: 1000,
                ease: 'Linear',
                repeat: -1,
            });
		}			
	}
	update() {
    
	}
}

class L1 extends LevelScene {
    constructor() {
        super('L1');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('bg1','/level1_background.png');
    }
    onEnter() {
        this.add.image(480, 360, 'bg1');
        this.add.text(640, 240, "Level 1", { fontSize: 64, color: '#000000' }).setOrigin(0.5);

        this.input.on('pointerup', () => {
            this.cameras.main.fade(1000, 0,0,0);
			this.time.delayedCall(1000, () => this.scene.start('L2'));
        });
    }
    update() {

    }
}

class L2 extends LevelScene {
    constructor() {
        super('L2');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('bg2','/level2_background.png');
    }
    onEnter() {
        this.add.image(480, 360, 'bg2');
        this.add.text(640, 240, "Level 2", { fontSize: 64, color: '#000000' }).setOrigin(0.5);
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
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
	backgroundColor: '#ffffff',
	scene: [start, LS, L0, L0_1, L1, L2, L3]
}

let game = new Phaser.Game(config);
