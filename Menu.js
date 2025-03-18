let width ;
let height;
let callOnce = 0;

class Menu extends Phaser.Scene {

    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('background','assets/background.png');
        this.load.image('titulo','assets/titulo.png');
        this.load.image('btCreditos','assets/bt-creditos.png');
        this.load.image('btInstrucoes', 'assets/bt-instrucoes.png');
        this.load.image('btTop', 'assets/bt-top.png');
        this.load.image('btPVP', 'assets/bt-level0.png');
        this.load.image('btLvl1', 'assets/bt-level1.png');
        this.load.image('btLvl2', 'assets/bt-level2.png');
        this.load.image('btLvl3', 'assets/bt-level3.png');
        this.load.image('lapis', 'assets/lapis.png');

        this.load.image('creditos', 'assets/creditos-img.png');
        this.load.image('instrucoes', 'assets/instrucoes-img.png');
        this.load.image('btFechar', 'assets/bt-fechar.png');
    }

    create() {
        //Variáveis a ser usadas para adicionar os sprites
        width = game.config.width;
        height = game.config.height;

        //Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height,'background');     
        this.background.setScale(1.5);
        
        //Titulo
        this.titulo = this.add.sprite(0.6 * width, 0.16 * height,'titulo');
        this.titulo.setScale(1.7);

        //Creditos-bt
        this.btCreditos = this.add.sprite(0.94 * width, 0.90 * height, 'btCreditos');
        this.btCreditos.setScale(1.2);
        this.btCreditos.setInteractive({ useHandCursor: true });

        //Instrucoes-bt
        this.btInstrucoes = this.add.sprite(0.94 * width, 0.74 * height, 'btInstrucoes');
        this.btInstrucoes.setScale(1.2);
        this.btInstrucoes.setInteractive({ useHandCursor: true });

        //Top-bt
        this.btTop = this.add.sprite(0.94 * width, 0.58 * height, 'btTop');
        this.btTop.setScale(1.2);
        this.btTop.setInteractive({useHandCursor: true});

        //PVP
        this.btPVP = this.add.sprite(0.565 * width, 0.365 * height, 'btPVP');
        this.btPVP.setScale(1);
        this.btPVP.setInteractive({useHandCursor: true});

        //Level1
        this.btLvl1 = this.add.sprite(0.565 * width, 0.54 * height, 'btLvl1');
        this.btLvl1.setScale(1);
        this.btLvl1.setInteractive({useHandCursor: true});

        //Level2
        this.btLvl2 = this.add.sprite(0.565 * width, 0.715 * height, 'btLvl2');
        this.btLvl2.setScale(1);
        this.btLvl2.setInteractive({useHandCursor: true});
        
        //level3
        this.btLvl3 = this.add.sprite(0.565 * width, 0.89 * height, 'btLvl3');
        this.btLvl3.setScale(1);
        this.btLvl3.setInteractive({useHandCursor: true});

        //Lapis
        this.lapis = this.add.sprite(0.435 * width, 0.66 * height, 'lapis');
        this.lapis.setScale(1.35);

        //Creditos-img
        this.cerditos = this.add.sprite(0.5*width, 0.5*height, 'creditos');
        this.cerditos.setScale(1.5);
        this.cerditos.visible = false;

        //Instrucoes-img
        this.instrucoes = this.add.sprite(0.5*width, 0.5*height, 'instrucoes');
        this.instrucoes.setScale(1.5);
        this.instrucoes.visible = false;

        //bt-fechar
        this.btFechar = this.add.sprite(0.94*width, 0.1*height, 'btFechar');
        this.btFechar.setScale(1.1);
        this.btFechar.setInteractive({useHandCursor: true});
        this.btFechar.visible = false;        

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
        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch(gameObject) {
                case this.btPVP:
                    this.scene.transition({ target: 'JogoPvP', duration: 100 });
                    break;
                case this.btLvl1:
                    this.scene.transition({ target: 'JogoPvE', duration: 100, data: {level: 1} });
                    break;
                case this.btLvl2:
                    this.scene.transition({ target: 'JogoPvE', duration: 100, data: {level: 2} });
                    break;
                case this.btLvl3:
                    this.scene.transition({ target: 'JogoPvE', duration: 100, data: {level: 3} });
                    break;
                case this.btCreditos:
                    break;
                case this.btInstrucoes:
                    break;
                default:
                    break;
            }    
            
        },this);
    }

    update() {
        width = game.config.width;
        height = game.config.height;
    }
}
