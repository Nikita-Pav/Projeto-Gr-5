// Global variables
var width;
var height;

var score1 = 0;
var score2 = 0;
var scoreText;

// Variables for turn-based game
var currentPlayer = 1; // 1 for Player 1, 2 for Player 2
var turnTime = 10; // 10 seconds per turn
var timeText;
var turnTimer;

// Selection tracking
var selectedProduct = null;
var selectedNumbers = [];
var selectedProductPos = null;
var gridMarkers = [];

// Make JogoPvP globally accessible
window.JogoPvP = class JogoPvP extends Phaser.Scene {

    constructor() {
        super('JogoPvP');
    }

    preload() {
        this.load.image('background','assets/background.png');
        this.load.image('titulo','assets/titulo.png');
        this.load.image('btPVP', 'assets/bt-level0.png');
        this.load.image('home', 'assets/bt_home.png');
        this.load.image('quadrado', 'assets/quadrado-recebenumeros.png');
        this.load.image('lapis', 'assets/lapis.png');
        this.load.image('ampTempo', 'assets/ampulhetaTempo.png');
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

        //PVP
        this.btPVP = this.add.sprite(0.135 * width, 0.18 * height, 'btPVP');
        this.btPVP.setScale(1);

        // Timer setup
        this.ampulheta = this.add.sprite(0.21 * width, 0.45 * height, 'ampTempo');
        this.ampulheta.setScale(0.8);
        
        timeText = this.add.text(0.21 * width, 0.45 * height, turnTime, {
            fontSize: '48px', 
            fill: '#000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Player turn indicator
        this.playerTurnText = this.add.text(0.21 * width, 0.35 * height, 'Jogador 1', {
            fontSize: '32px',
            fill: '#FF0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Store references for the game board and numbers
        this.numerosColuna = this.gerarNumerosUnicos(5, 1, 9);
        this.matriz = Array.from({ length: 5 }, () => Array(5).fill(null));
        this.quadradosGrid = Array.from({ length: 5 }, () => Array(5).fill(null));
        this.quadradosNumeros = [];
        this.gridMarkers = Array.from({ length: 5 }, () => Array(5).fill(null));

        // Criar lista de produtos únicos entre dois números distintos da coluna
        let produtos = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i !== j) { // To ensure distinct numbers
                    produtos.push(this.numerosColuna[i] * this.numerosColuna[j]);
                }
            }
        }
        
        // Adicionar produtos repetidos para preencher o grid 5x5 (20 produtos únicos para 25 espaços)
        while (produtos.length < 25) {
            const randomIndex = Phaser.Math.Between(0, produtos.length - 1);
            produtos.push(produtos[randomIndex]);
        }
        
        // Embaralhar a lista de produtos para distribuição aleatória
        Phaser.Utils.Array.Shuffle(produtos);
        
        // Preencher a matriz com os produtos nos índices embaralhados
        let prodIndex = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.matriz[i][j] = produtos[prodIndex++];
            }
        }
        
        // Exibir números na coluna à direita
        for (let i = 0; i < 5; i++) {
            let quad = this.add.sprite(0.85 * width, (0.43 + i * 0.1) * height, 'quadrado');
            quad.setScale(1);
            quad.setInteractive({useHandCursor: true});
            
            // Add data properties to track which number this is
            quad.data = {
                numero: this.numerosColuna[i],
                index: i
            };
            
            let numText = this.add.text(quad.x, quad.y, this.numerosColuna[i], {
                fontSize: '64px',
                color: '#000',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
            
            this.quadradosNumeros.push({
                sprite: quad,
                text: numText,
                value: this.numerosColuna[i]
            });
            
            // Add click handler for number selection
            quad.on('pointerdown', () => this.selectNumber(i));
        }
        
        // Exibir matriz com produtos posicionados aleatoriamente
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let quad = this.add.sprite((0.4 + j * 0.07) * width, (0.38 + i * 0.12) * height, 'quadrado');
                quad.setScale(1.1);
                quad.setInteractive({useHandCursor: true});
                
                // Add data properties to track position and product value
                quad.data = {
                    row: i,
                    col: j,
                    produto: this.matriz[i][j]
                };
                
                let prodText = this.add.text(quad.x, quad.y, this.matriz[i][j], {
                    fontSize: '36px',
                    color: '#000',
                    fontFamily: 'Arial'
                }).setOrigin(0.5);
                
                this.quadradosGrid[i][j] = {
                    sprite: quad,
                    text: prodText,
                    value: this.matriz[i][j],
                    marked: false,
                    marker: null
                };
                
                // Add click handler for product selection
                quad.on('pointerdown', () => this.selectProduct(i, j));
            }
        }

        // Setup score display
        score1 = 0;
        score2 = 0;
        scoreText = this.add.text(180, 290, score1 + '-' + score2, { fontSize: '64px', fill: '#049' });

        // Start the timer for the first player's turn
        this.startPlayerTurn();

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
        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch (gameObject){
                case this.btHome:
                    console.log("Home button clicked");
                    this.cleanupGameObjects();
                    this.scene.start('Menu');
                    break;
                default:
                    break;
            }
        }, this);
    }

    gerarNumerosUnicos(qtd, min, max) {
        let numeros = new Set();
        while (numeros.size < qtd) {
            numeros.add(Phaser.Math.Between(min, max));
        }
        return Array.from(numeros);
    }

    // Start timer for current player's turn
    startPlayerTurn() {
        // Reset selections
        selectedProduct = null;
        selectedNumbers = [];
        selectedProductPos = null;
        
        // Update player turn display
        this.playerTurnText.setText(`Jogador ${currentPlayer}`);
        this.playerTurnText.setFill(currentPlayer === 1 ? '#FF0000' : '#0000FF');
        
        // Reset and start timer
        turnTime = 10;
        timeText.setText(turnTime);
        
        // Clear any existing timer
        if (turnTimer) {
            this.time.removeEvent(turnTimer);
        }
        
        // Create a new timer
        turnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }
    
    // Update the timer each second
    updateTimer() {
        turnTime--;
        timeText.setText(turnTime);
        
        if (turnTime <= 0) {
            // Time's up, switch to the other player
            this.switchPlayer();
        }
    }
    
    // Switch to the other player's turn
    switchPlayer() {
        // Clear any existing timer
        if (turnTimer) {
            this.time.removeEvent(turnTimer);
            turnTimer = null;
        }
        
        // Switch the current player
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        
        // Start the new player's turn
        this.startPlayerTurn();
    }
    
    // Handle product selection from the grid
    selectProduct(row, col) {
        // Check if the position is already marked
        if (this.quadradosGrid[row][col].marked) {
            return; // Already marked, can't select
        }
        
        // Reset previous selection if exists
        if (selectedProduct !== null) {
            // Unhighlight previous selection
            const prev = selectedProductPos;
            if (prev) {
                this.quadradosGrid[prev.row][prev.col].sprite.setTint(0xffffff);
            }
        }
        
        // Save the new selection
        selectedProduct = this.matriz[row][col];
        selectedProductPos = { row, col };
        
        // Highlight the selected product
        this.quadradosGrid[row][col].sprite.setTint(0xffff00); // Yellow highlight
        
        // Check if we have 2 numbers selected, then we can validate
        if (selectedNumbers.length === 2) {
            this.validateMultiplication();
        }
    }
    
    // Handle number selection from the column
    selectNumber(index) {
        const number = this.numerosColuna[index];
        
        // Check if we already have 2 numbers selected
        if (selectedNumbers.length === 2) {
            // Reset selections
            selectedNumbers = [];
            
            // Unhighlight all numbers
            this.quadradosNumeros.forEach(num => {
                num.sprite.setTint(0xffffff);
            });
        }
        
        // Add the selected number
        selectedNumbers.push({
            index,
            value: number
        });
        
        // Highlight the selected number
        this.quadradosNumeros[index].sprite.setTint(0xffff00); // Yellow highlight
        
        // Check if we have a product and 2 numbers selected, then we can validate
        if (selectedProduct !== null && selectedNumbers.length === 2) {
            this.validateMultiplication();
        }
    }
    
    // Validate if the product equals the multiplication of the selected numbers
    validateMultiplication() {
        if (selectedProduct === null || selectedNumbers.length !== 2) {
            return; // Not ready to validate
        }
        
        const num1 = selectedNumbers[0].value;
        const num2 = selectedNumbers[1].value;
        const product = selectedProduct;
        
        // Check if multiplication is correct
        const isCorrect = (num1 * num2 === product);
        
        // Determine which player gets the point based on correctness
        const scoringPlayer = isCorrect ? currentPlayer : (currentPlayer === 1 ? 2 : 1);
        
        // Mark the square with X or O based on who gets the point
        this.markGridPosition(selectedProductPos.row, selectedProductPos.col, scoringPlayer);
        
        // Update scores
        if (scoringPlayer === 1) {
            score1++;
        } else {
            score2++;
        }
        
        // Update score display
        scoreText.setText(score1 + '-' + score2);
        
        // Check if the game is over (if all positions are marked)
        if (this.checkGameOver()) {
            this.endGame();
        } else {
            // Switch to the next player
            this.switchPlayer();
        }
    }
    
    // Mark a grid position with X or O
    markGridPosition(row, col, player) {
        if (this.quadradosGrid[row][col].marked) {
            return; // Already marked
        }
        
        const marker = player === 1 ? 'X' : 'O';
        const color = player === 1 ? '#FF0000' : '#0000FF';
        
        // Create marker text
        const markerText = this.add.text(
            this.quadradosGrid[row][col].sprite.x,
            this.quadradosGrid[row][col].sprite.y,
            marker,
            {
                fontSize: '64px',
                fontFamily: 'Arial',
                color: color
            }
        ).setOrigin(0.5);
        
        // Save the marker
        this.quadradosGrid[row][col].marked = true;
        this.quadradosGrid[row][col].marker = markerText;
        this.quadradosGrid[row][col].player = player;
    }
    
    // Check if the game is over (all positions marked)
    checkGameOver() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (!this.quadradosGrid[i][j].marked) {
                    return false; // Found an unmarked position, game continues
                }
            }
        }
        return true; // All positions are marked, game over
    }
    
    // End the game and show results
    endGame() {
        // Stop the timer
        if (turnTimer) {
            this.time.removeEvent(turnTimer);
            turnTimer = null;
        }
        
        // Determine the winner
        let resultText;
        if (score1 > score2) {
            resultText = "Jogador 1 venceu!";
        } else if (score2 > score1) {
            resultText = "Jogador 2 venceu!";
        } else {
            resultText = "Empate!";
        }
        
        // Add a semi-transparent overlay
        const overlay = this.add.rectangle(
            width * 0.5,
            height * 0.5,
            width,
            height,
            0x000000,
            0.7
        );
        
        // Display the result
        const gameOverText = this.add.text(
            width * 0.5,
            height * 0.5,
            resultText,
            {
                fontSize: '64px',
                fontFamily: 'Arial',
                color: '#000000',
                backgroundColor: '#FFFFFF',
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5);
        
        // Make sure the text is on top of the overlay
        gameOverText.setDepth(1);
        
        // Create a container for the menu button to improve hit detection
        const menuButtonBg = this.add.rectangle(
            width * 0.5,
            height * 0.6,
            200,
            50,
            0x000000
        ).setOrigin(0.5);
        
        // Add option to return to menu
        const menuButton = this.add.text(
            width * 0.5,
            height * 0.6,
            "Voltar ao Menu",
            {
                fontSize: '32px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                padding: { x: 15, y: 8 }
            }
        ).setOrigin(0.5);
        
        // Set both rectangle and text to be interactive
        menuButtonBg.setInteractive({ useHandCursor: true });
        menuButton.setDepth(1);
        
        // Add the pointer down event to the background rectangle
        menuButtonBg.on('pointerdown', () => {
            console.log("Menu button clicked");
            // Clean up any references before transitioning
            this.cleanupGameObjects();
            
            // Use scene.start with explicit this reference
            this.scene.start('Menu');
        });
        
        // Make sure these elements stay on top
        menuButtonBg.setDepth(1);
        menuButton.setDepth(2);
    }
    
    // Clean up objects before scene transition
    cleanupGameObjects() {
        // Reset global variables
        selectedProduct = null;
        selectedNumbers = [];
        selectedProductPos = null;
        
        // Clear any timers
        if (turnTimer) {
            this.time.removeEvent(turnTimer);
            turnTimer = null;
        }
        
        // Clean up custom data objects on sprites
        if (this.quadradosGrid) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (this.quadradosGrid[i][j] && this.quadradosGrid[i][j].sprite) {
                        // Remove custom data
                        if (this.quadradosGrid[i][j].sprite.data) {
                            this.quadradosGrid[i][j].sprite.data = null;
                        }
                    }
                }
            }
        }
        
        if (this.quadradosNumeros) {
            this.quadradosNumeros.forEach(num => {
                if (num.sprite && num.sprite.data) {
                    num.sprite.data = null;
                }
            });
        }
    }
    
    // Handle scene shutdown properly
    shutdown() {
        this.cleanupGameObjects();
        
        // Call the parent shutdown
        super.shutdown();
    }
    
    update() {
        // Any per-frame updates can go here if needed
    }
}