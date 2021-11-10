import Phaser from "phaser";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }

  loadAnimations() {
    console.log(this.textures);
    let frameNames = this.textures.get('menu').getFrameNames();
    console.log(frameNames);

    this.anims.create({
      key: 'wiggle',
      frames: this.anims.generateFrameNames("menu",
        {
          start: 32,
          end: 37,
          zeroPad: 4,
          prefix: 'menu.png',
          suffix: '.png',
        }),
      frameRate: 7,
      repeat: -1
    });
  }

  preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
          //makeAnimations(this);
          this.loadAnimations();
            progress.destroy();
            this.scene.start('TitleScene');
        });

    //this.load.image("logo", logoImg);
    this.load.audio("bgm", "src/assets/shrimp_farmer.mp3");
    this.loadFont("src/assets/debussy.ttf");
    this.load.image('shrimp', 'src/assets/shrimp.png');
    this.load.image('background', 'src/assets/bg.png');
    //this.load.image('menu', 'src/assets/menu-0.png');
    this.load.atlas('menu', 'src/assets/menu-0.png', 'src/assets/menu.json');

  }

}

export default BootScene;
