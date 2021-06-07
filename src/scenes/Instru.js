class Instru extends Phaser.Scene {
    constructor() {
        super("instruScene");
    }

    create() {
        let titleConfig = {
            color: '#000000',
            fontFamily: 'Fipps',
            fontSize: '42px',
            stroke: '#FFFF00',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        let textConfig = {
            color: '#CD00CD',
            fontFamily: 'Minecraftia',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        let credit2Config = {
            color: '#000000',
            fontFamily: 'Minecraftia',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        //add instructions
        this.pointer = this.input.activePointer;
        this.count = 0;
        let menu1Config = { fontFamily: 'Pangolin', fontSize: '50px', color: '#ffff00', stroke: '#000000', strokeThickness: 3, padding: { top: 5, bottom: 5, }, fixedWidth: 0 }
        if (newGame == true) {
            this.background = this.add.sprite(1, 0, 'classroom').setScale(1.0).setOrigin(0.0).setDepth(-1).setAlpha(0.5)
                .setInteractive().on('pointerup', () => {
                    this.count += 1;
                    this.nextline();
                    console.log("x:", this.input.x, "y:", this.input.y, "Count: ", this.count);

                });
        } else if (played1 == false) {
            this.background = this.add.sprite(1, 0, 'classroom').setScale(1.0).setOrigin(0.0).setDepth(-1).setAlpha(0.5)
                .setInteractive().on('pointerup', () => {
                    this.count += 1;
                    this.nextline();
                    console.log("x:", this.input.x, "y:", this.input.y, "Count: ", this.count);
                    this.test = this.add.text(centerX, centerY - 200, 'Its Loafing Time!', titleConfig).setOrigin(0.5);
                });

        } else if (played1 == true && played2 == false) {
            this.background = this.add.sprite(0, 0, 'scene2(version2)').setScale(1.0).setOrigin(0.0).setDepth(-1).setAlpha(0.5)
                .setInteractive().on('pointerup', () => {
                    this.count += 1;
                    console.log("x:", this.input.x, "y:", this.input.y, "Count: ", this.count);

                    this.nextline();
                });
            this.add.text(centerX, centerY - 300, 'You are Now in High School!', menu1Config).setOrigin(0.5);
        } else if (played2 == true && played3 == false) {

            this.background = this.add.sprite(0, 0, 'WorkArea').setScale(1.0).setOrigin(0.0).setDepth(0).setAlpha(0.5)
                .setInteractive().on('pointerup', () => {
                    this.count += 1;
                    console.log("x:", this.input.x, "y:", this.input.y, "Count: ", this.count);

                    this.nextline();
                });
            this.add.text(centerX, centerY - 300, 'You are Now A Happy Work-man!', menu1Config).setOrigin(0.5);
        }
        //type space to play
        this.i = this.add.text(centerX, centerY + 280, '-->   [      Click To Continue      ]   <--', textConfig)
            .setOrigin(0.5).setDepth(10);
        if (played1 == true && played2 == true && played3 == true) {
            this.i.destroy();
        }

    }

    nextline() {
        let credit2Config = {
            color: '#A020F0',
            fontFamily: 'Minecraftia',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'middle',
            fixedWidth: 0,
        }
        let textConfig2 = {
            color: '#ffff00',
            fontFamily: 'Minecraftia',
            fontSize: '130px',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        this.text1;
        let menu1Config = { fontFamily: 'Pangolin', fontSize: '130px', color: '#ffff00', stroke: '#000000', strokeThickness: 3, padding: { top: 5, bottom: 5, }, fixedWidth: 0 }
        if (newGame == true) {
            if (this.count == 1) {
                this.a = this.add.text(350, 150, 'In  an  involute  society  everyone  is  working', credit2Config);
            } else if (this.count == 2) {
                this.b = this.add.text(350, 220, '   the  hardest  to  compete  with  each  other', credit2Config);
            } else if (this.count == 3) {
                this.c = this.add.text(350, 290, '          But  everything  has  an  exception', credit2Config);
            } else if (this.count == 4) {
                this.d = this.add.text(350, 360, 'You  will  be  the  one  who  againstthe  autority', credit2Config);
            } else if (this.count == 5) {
                this.e = this.add.text(350, 430, '       trying  to  relax  as  much  as  you  can !', credit2Config);
            } else if (this.count == 6) {
                this.f = this.add.text(350, 500, '                               It  is  Loafing  Time !', credit2Config)
            } else if (this.count == 7) {
                newGame = false;
                this.count = 0;
                this.a.destroy();
                this.b.destroy();
                this.c.destroy();
                this.d.destroy();
                this.e.destroy();
                this.f.destroy();
            }
        } else if (played1 == false && newGame == false) {

            if (this.count == 1) {

                this.kid = this.add.sprite(1050, 720, 'kid').setOrigin(0, 1).setScale(1).setAlpha(1);
                this.text1 = this.add.text(950, 420, "This is You \n 'The Naughty' \n              -->", credit2Config)
            } else if (this.count == 2) {
                this.text1.destroy();
            }
            if (this.count == 2) {
                this.trashCan = this.add.sprite(380, 720, 'trashCan').setOrigin(0, 1).setScale(0.7).setAlpha(0.7);
                this.text2 = this.add.text(363, 500, "And This is Your Goal:\n Throw the TrashBall into it \n      |\n      v", credit2Config)
            } else if (this.count == 3) {
                this.text2.destroy();
            }
            if (this.count == 3) {
                this.Box = this.add.graphics();
                this.Bar = this.add.graphics();
                this.Box.fillStyle(0x222222, 0.8);
                this.Box.fillRect(1190, 30, 50, 320);
                this.text3 = this.add.text(930, 90, "Hold the Space \nto increase The strength\n 'Use Mouse to aim!' \n\n                      -->", credit2Config)
            } else if (this.count == 4) {
                this.text3.destroy();
            }
            if (this.count == 4) {
                this.teacher = this.add.sprite(50, 110, 'teacher').setOrigin(0.0).setScale(1.1);
                this.text4 = this.add.text(240, 173, "This is Your Teacher, \nyou do'nt want to be Caught \nwhen he turns around! \n          <--", credit2Config)
            } else if (this.count == 5) {
                this.text4.destroy();
            }
            if (this.count == 5) {
                this.student1 = this.add.sprite(680, 438, 'girl').setOrigin(0.0).setScale(1.1);
                this.text5 = this.add.text(500, 400, "This is Your Classmate, \ntry to not hit on her \nor she will tell the teacher!\n                            -->", credit2Config)
            } else if (this.count == 6) {
                this.text5.destroy();
            }
            if (this.count == 6) {
                this.text6 = this.add.text(430, 230, "Let's Go!", textConfig2);
            } else if (this.count == 7) {
                this.text6.destroy();
            }
            if (this.count == 7) {
                played1 = true;
                this.scene.stop();
                this.i.setAlpha(0);
                this.scene.start("playScene1");
            }
        } else if (played1 == true && played2 == false) {
            if (this.count == 1) {
                this.player = this.add.sprite(648, 360, 'noeating').setScale(1.0).setOrigin(0.5, 0.5);
                this.text1 = this.add.text(430, 100, "This is You, again \n  A HighSchooler \nBut still A Naughty!\n                -->", credit2Config)
            } else if (this.count == 2) {
                this.text1.destroy();
            }
            // if (this.count == 2)
            if (this.count == 2) {
                this.teacherOP = this.add.sprite(648, 389, 'teacher2_speaking').setScale(1).setOrigin(0.5, 0.5);
                this.text2 = this.add.text(363, 400, "And This is Your Teacher:\n She speaks LOOOOUdly\n                         -->", credit2Config)
            } else if (this.count == 3) {
                this.text2.destroy();
            }
            if (this.count == 3) {
                this.text3 = this.add.text(790, 100, "Your Goal: \nEat up your chips\n 'without been caught!' \n Press Space to Eat! \n ->[ SPACE ]<-", credit2Config)
            } else if (this.count == 4) {
                this.text3.destroy();
            }
            if (this.count == 4) {
                this.beat = this.add.sprite(700, 550, 'rhythmBar(Orange)').setScale(0.5);
                this.beat = this.add.sprite(800, 550, 'rhythmBar(Orange)').setScale(0.5);
                this.beat = this.add.sprite(900, 550, 'rhythmBar(Orange)').setScale(0.5);
                this.text4 = this.add.text(693, 317, "This bar here Shows\nwhen will the teacher speak\n     |      |      |\n     v     v     v", credit2Config);
            } else if (this.count == 5) {
                this.text4.destroy();
            }
            if (this.count == 5) {
                // this.student1 = this.add.sprite(680, 438, 'girl').setOrigin(0.0).setScale(1.1);
                this.text5 = this.add.text(859, 550, "When she open her Mouth\n Eat Your Chips!!!!\n Eat em up before the Class Over!", credit2Config)
            } else if (this.count == 6) {
                this.text5.destroy();
            }
            if (this.count == 6) {
                this.text6 = this.add.text(430, 230, "Let's Go!", menu1Config);
            } else if (this.count == 7) {
                this.text6.destroy();
            }
            if (this.count == 7) {
                played2 = true;
                this.scene.stop();
                this.i.setAlpha(0);
                this.scene.start("playScene2");
            }
        } else if (played2 == true && played3 == false) {
            if (this.count == 1) {
                this.text1 = this.add.text(332, 555, "Guess Who is it? \n  A 'Happy' Work-Man \n                -->", credit2Config)
            } else if (this.count == 2) {
                this.text1.destroy();
            }
            if (this.count == 2) {
                this.computerScreen = this.add.sprite(580, 400, 'game-screen').setOrigin(0.0).setScale(1.1);
                this.text2 = this.add.text(728, 417, "Your Goal this time:\ntry to Play games\n during work time!\n <--", credit2Config)
            }else if (this.count == 3) {
                this.text2.destroy();
            }
            if (this.count == 3) {
                this.Box = this.add.graphics();
                this.Bar = this.add.graphics();
                this.Bar.x = 240;
                this.Box.x = 240;
                this.Bar.y = 80;
                this.Box.y = 80;
                this.Box.fillStyle(0x222222, 0.8);
                this.Box.fillRect(220, 60, 320, 50);
                this.text3 = this.add.text(780, 150, "Hold Space to Play Game \nTry to Full-fill this Bar!\n '(without been caught!)'\n ->[ SPACE ]<-", credit2Config)
            }else if (this.count == 4) {
                this.text3.destroy();
            }
            if (this.count == 4) {
                this.boss = new Boss(this, 0).setDepth(1);
                this.text4 = this.add.text(200, 470, "Wacth OOOOOUT Your BOSS!\nwhen he's on the Window\n     <--", credit2Config);
            }else if (this.count == 5) {
                this.text4.destroy();
            }
            if (this.count == 5) {
                this.colleague = this.add.sprite(569, 297, 'college_peak').setOrigin(0.0);
                this.door = this.add.sprite(1120, 200, 'manager').setOrigin(0.0);
                this.text6 = this.add.text(859, 550, "                  -->\nBecareful with your Colleague\nand Manager too!", credit2Config)
            }else if (this.count == 6) {
                this.text6.destroy();
            }
            if (this.count == 6) {
                this.text6 = this.add.text(430, 230, "Let's Go!", menu1Config);
            }else if (this.count == 7) {
                this.text6.destroy();
            }
            if (this.count == 7) {
                played2 = true;
                this.scene.stop();
                this.i.setAlpha(0);
                this.scene.start("playScene");
            }
        }
    }

    update() {
    }
}