import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'TitleScene'
    });
  }

  funText(text) {
    const length = text.length
    let i = 0
    this.time.addEvent({
      callback: () => {
        this.label.text += text[i]
        ++i
      },
      repeat: length - 1,
      delay: 200
    });
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0);
    this.music = this.sound.add('bgm');
    this.music.play({
      loop: true
    });

    this.label = this.add.text(100, 100, '', {
      fontFamily: "debussy",
    });

    this.funText("welcome to shrimp farms\n press space or something");

    this.tweens.add({
      targets: this.label,
      y: 250,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });

    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // this.input.on('pointerdown', () => {
    //   this.startGame();
    // });
  }

  update(time, delta) {
    if (this.startKey.isDown) {
      this.startGame();
    }
  }

  startGame(){
    this.scene.start('GameScene');
  }

}

export default TitleScene;
