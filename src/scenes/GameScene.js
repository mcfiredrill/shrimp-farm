import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameScene'
    });
  }

  create() {
    this.shrimpBucks = 100;

    this.showingMenu = false;
    this.add.image(0, 0, 'background').setOrigin(0);
    this.menuContainer = this.add.container(0,0);
    this.menu = this.add.sprite(0, 0, 'menu');
    this.menu.setOrigin(0);
    this.menu.play('wiggle');

    this.openMenuSfx = this.sound.add('menuOpen');
    this.closeMenuSfx = this.sound.add('menuClose');

    this.shrimpBucksText = this.add.text(100, 100, 'SHRIMPBUCKS: ' + this.shrimpBucks, {
      fontFamily: "debussy",
    });

    this.eggsOptions = this.add.text(100, 200, 'EGGS \n CHERRY\n BLUE VELVETS\n CLEARS\n', {
      fontFamily: "debussy",
    }).setInteractive();;

    this.menuContainer.add(this.menu);
    this.menuContainer.add(this.shrimpBucksText);
    this.menuContainer.add(this.eggsOptions);

    this.menuContainer.visible = this.showingMenu;
    // this.cursor = this.physics.add.sprite(150,150,'shrimp');
    // this.input.on('pointermove', (pointer) => {
    //   this.cursor.setPosition(pointer.x, pointer.y);
    // });
    this.input.setDefaultCursor('url(assets/shrimp.png), pointer');

    //this.cameras.main.startFollow(this.cursor);
    this.menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    //this.physics.add.overlap(this.cursor, this.menu, this.menuOptionHover, null, this);
    this.eggsOptions.on('pointerover', () => {
      console.log('over!');
      this.eggsOptions.setTint("#ffeb00");
    });

    this.eggsOptions.on('pointerout', () => {
      console.log('out!');
      this.eggsOptions.setTint("#ffffff");
    });
  }

  // menuOptionHover(){
  //   console.log('hovering on eggsOptions');
  //   this.eggsOptions.style.color = "#ffeb00";
  // }

  update(time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.menuKey)) {
      this.toggleMenu();
    }
    //this.shrimpBucksText.text = 'SHRIMPBUCKS: ' + this.shrimpBucks;
    this.menuContainer.visible = this.showingMenu;
  }

  toggleMenu(){
    this.showingMenu = !this.showingMenu;
    if(this.showingMenu) {
      this.openMenuSfx.play();
    } else {
      this.closeMenuSfx.play();
    }
    console.log('show menu');
    console.log(this.showingMenu);
  }
}

export default GameScene;
