let width ;
let height;

let score1 = 0;
let score2 = 0;
let scoreText;

let time = 10.0;
let timeText;

class JogoPvE extends Phaser.Scene {

    constructor() {
        super('JogoPvE');
    }

    preload() {
        this.load.image('background','assets/background.png');
        this.load.image('titulo','assets/titulo.png');
        this.load.image('btPVE', 'assets/bt-level1.png');
        this.load.image('ampTempo', 'assets/ampulhetaTempo.png');
        this.load.image('home', 'assets/bt_home.png');
        this.load.image('quadrado', 'assets/quadrado-recebenumeros.png');
        this.load.image('lapis', 'assets/lapis.png');
    }

    create() {
        //Variáveis a ser usadas para adicionar os sprites
        width = game.config.width;
        height = game.config.height;

        //Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height,'background');     
        this.background.setScale(1.5);
        
        //Titulo
        this.titulo = this.add.sprite(0.605 * width, 0.16 * height,'titulo');
        this.titulo.setScale(1.7);

        //Home
        this.btHome = this.add.sprite(0.07 * width, 0.89 * height, 'home');
        this.btHome.setScale(1.2);
        this.btHome.setInteractive({useHandCursor: true});

        //PVE
        this.btPVE = this.add.sprite(0.135 * width, 0.18 * height, 'btPVE');
        this.btPVE.setScale(1);
        //this.btPVP.setInteractive({useHandCursor: true});

        //Ampulheta
        this.ampTempo = this.add.sprite(0.135 * width, 0.4 * height, 'ampTempo');
        this.ampTempo.setScale(1);

        //quadrado 0 0
        this.quad00 = this.add.sprite(0.403 * width, 0.38 * height, 'quadrado');
        this.quad00.setScale(1.1);
        this.quad00.setInteractive({useHandCursor: true});

        //quadrado 0 1
        this.quad01 = this.add.sprite(0.473 * width, 0.38 * height, 'quadrado');
        this.quad01.setScale(1.1);
        this.quad01.setInteractive({useHandCursor: true});

        //quadrado 0 2
        this.quad02 = this.add.sprite(0.543 * width, 0.38 * height, 'quadrado');
        this.quad02.setScale(1.1);
        this.quad02.setInteractive({useHandCursor: true});

        //quadrado 0 3
        this.quad03 = this.add.sprite(0.613 * width, 0.38 * height, 'quadrado');
        this.quad03.setScale(1.1);
        this.quad03.setInteractive({useHandCursor: true});

        //quadrado 0 4
        this.quad04 = this.add.sprite(0.683 * width, 0.38 * height, 'quadrado');
        this.quad04.setScale(1.1);
        this.quad04.setInteractive({useHandCursor: true});

        //quadrado 1 0
        this.quad10 = this.add.sprite(0.403 * width, 0.5 * height, 'quadrado');
        this.quad10.setScale(1.1);
        this.quad10.setInteractive({useHandCursor: true});

        //quadrado 1 1
        this.quad11 = this.add.sprite(0.473 * width, 0.5 * height, 'quadrado');
        this.quad11.setScale(1.1);
        this.quad11.setInteractive({useHandCursor: true});

        //quadrado 1 2
        this.quad12 = this.add.sprite(0.543 * width, 0.5 * height, 'quadrado');
        this.quad12.setScale(1.1);
        this.quad12.setInteractive({useHandCursor: true});

        //quadrado 1 3
        this.quad13 = this.add.sprite(0.613 * width, 0.5 * height, 'quadrado');
        this.quad13.setScale(1.1);
        this.quad13.setInteractive({useHandCursor: true});

        //quadrado 1 4
        this.quad14 = this.add.sprite(0.683 * width, 0.5 * height, 'quadrado');
        this.quad14.setScale(1.1);
        this.quad14.setInteractive({useHandCursor: true});

        //quadrado 2 0
        this.quad20 = this.add.sprite(0.403 * width, 0.62 * height, 'quadrado');
        this.quad20.setScale(1.1);
        this.quad20.setInteractive({useHandCursor: true});

        //quadrado 2 1
        this.quad21 = this.add.sprite(0.473 * width, 0.62 * height, 'quadrado');
        this.quad21.setScale(1.1);
        this.quad21.setInteractive({useHandCursor: true});

        //quadrado 2 2
        this.quad22 = this.add.sprite(0.543 * width, 0.62 * height, 'quadrado');
        this.quad22.setScale(1.1);
        this.quad22.setInteractive({useHandCursor: true});

        //quadrado 2 3
        this.quad23 = this.add.sprite(0.613 * width, 0.62 * height, 'quadrado');
        this.quad23.setScale(1.1);
        this.quad23.setInteractive({useHandCursor: true});

        //quadrado 2 4
        this.quad24 = this.add.sprite(0.683 * width, 0.62 * height, 'quadrado');
        this.quad24.setScale(1.1);
        this.quad24.setInteractive({useHandCursor: true});

        //quadrado 3 0
        this.quad30 = this.add.sprite(0.403 * width, 0.74 * height, 'quadrado');
        this.quad30.setScale(1.1);
        this.quad30.setInteractive({useHandCursor: true});

        //quadrado 3 1
        this.quad31 = this.add.sprite(0.473 * width, 0.74 * height, 'quadrado');
        this.quad31.setScale(1.1);
        this.quad31.setInteractive({useHandCursor: true});

        //quadrado 3 2
        this.quad32 = this.add.sprite(0.543 * width, 0.74 * height, 'quadrado');
        this.quad32.setScale(1.1);
        this.quad32.setInteractive({useHandCursor: true});

        //quadrado 3 3
        this.quad33 = this.add.sprite(0.613 * width, 0.74 * height, 'quadrado');
        this.quad33.setScale(1.1);
        this.quad33.setInteractive({useHandCursor: true});

        //quadrado 3 4
        this.quad34 = this.add.sprite(0.683 * width, 0.74 * height, 'quadrado');
        this.quad34.setScale(1.1);
        this.quad34.setInteractive({useHandCursor: true});

        //quadrado 4 0
        this.quad40 = this.add.sprite(0.403 * width, 0.86 * height, 'quadrado');
        this.quad40.setScale(1.1);
        this.quad40.setInteractive({useHandCursor: true});

        //quadrado 4 1
        this.quad41 = this.add.sprite(0.473 * width, 0.86 * height, 'quadrado');
        this.quad41.setScale(1.1);
        this.quad41.setInteractive({useHandCursor: true});

        //quadrado 4 2
        this.quad42 = this.add.sprite(0.543 * width, 0.86 * height, 'quadrado');
        this.quad42.setScale(1.1);
        this.quad42.setInteractive({useHandCursor: true});

        //quadrado 4 3
        this.quad43 = this.add.sprite(0.613 * width, 0.86 * height, 'quadrado');
        this.quad43.setScale(1.1);
        this.quad43.setInteractive({useHandCursor: true});

        //quadrado 4 4
        this.quad44 = this.add.sprite(0.683 * width, 0.86 * height, 'quadrado');
        this.quad44.setScale(1.1);
        this.quad44.setInteractive({useHandCursor: true});

        //q 5 0
        this.quad50 = this.add.sprite(0.855 * width, 0.43 * height, 'quadrado');
        this.quad50.setScale(1);
        this.quad50.setInteractive({useHandCursor: true});

        //q 5 1
        this.quad51 = this.add.sprite(0.855 * width, 0.53 * height, 'quadrado');
        this.quad51.setScale(1);
        this.quad51.setInteractive({useHandCursor: true});

        //q 5 2
        this.quad52 = this.add.sprite(0.855 * width, 0.63 * height, 'quadrado');
        this.quad52.setScale(1);
        this.quad52.setInteractive({useHandCursor: true});

        //q 5 3
        this.quad53 = this.add.sprite(0.855 * width, 0.73 * height, 'quadrado');
        this.quad53.setScale(1);
        this.quad53.setInteractive({useHandCursor: true});

        //q 5 4
        this.quad54 = this.add.sprite(0.855 * width, 0.83 * height, 'quadrado');
        this.quad54.setScale(1);
        this.quad54.setInteractive({useHandCursor: true});

        //Lapis
        this.lapis = this.add.sprite(0.305 * width, 0.68 * height, 'lapis');
        this.lapis.setScale(1.2);

        //BT Logic
        //BT Highlight
        this.input.on('gameobjectover',function(pointer, gameObject) {
            gameObject.displayHeight += 5;
            gameObject.displayWidth += 5;
        },this);
        this.input.on('gameobjectout',function(pointer, gameObject) {
            gameObject.displayHeight -= 5;
            gameObject.displayWidth -= 5;
        },this);

        scoreText = this.add.text(180, 290, score1+'-'+score2, { fontSize: '100px', fill: '#0A4' });
        timeText = this.add.text(230, 450, time+'s', { fontSize: '75px', fill: '#FFF'});
    }

}