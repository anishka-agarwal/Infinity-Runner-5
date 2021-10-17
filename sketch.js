var PLAY;
var END;
var gameState = PLAY;
var ghost;
var window;
var tower;
var towerImg;
var ghostImg;
var windowImg;
var towerImg;
var score;

function preload(){
    ghostImg = loadImage("ghost-standing.png");
    windowImg = loadImage("door.png");
    towerImg = loadImage("tower.png");
}

function setup() {
    createCanvas(600,800);

    ghost = createSprite(200,200,50,50);
    ghost.addImage(ghostImg);
    ghost.debug = false;
    ghost.scale = 0.3;
    
    tower = createSprite(300,300);
    tower.addImage(towerImg);
    tower.velocityY = 1;

    windowsGroup = createGroup();

    score = 0;

    edges = createEdgeSprites();
}

function draw() {
    background(0);
  
    ghost.velocityY = ghost.velocityY + 0.08;
    ghost.collide(edges);

    if (gameState == PLAY) {
        score = score + Math.round(getFrameRate()/60);
        
        ghost.visible = true
        window.visible = true

        spawnWindows();

        if (ghost.isTouching(windowsGroup)) {
            windowsGroup.destroyEach();
            ghost.destroy();
            gameState == END;
        }

        tower.velocityY = -(4 + 3 * score/100);

        if (tower.y > 400) {
            tower.y = 300
        }

        if (keyDown("right_arrow")) {
            ghost.x = ghost.x + 2;
        }

        if (keyDown("left_arrow")) {
            ghost.x = ghost.x - 2;
        }

        if (keyDown("space")) {
            ghost.velocityY = -1;
        }

        if (ghost.isTouching(edges)) {
            gameState = END
        }

        

        fill("black");
        textSize(20);
        text("Score: " + score,500,50);      
    }

    if (gameState == END) {
        background("black")

        ghost.visible = false
        window.visible = false

        fill("white")
        textSize(20)
        text("Game Over! Reload The Page To Try Again",100,250)
    }

    drawSprites();  
}

function spawnWindows() {
    if (frameCount % 240 == 0) {
        var window = createSprite(200,-50);

        window.x = Math.round(random(120,400))
        window.velocityY = 1;

        window.addImage(windowImg);
        window.scale = 1;

        windowsGroup.add(window);

        window.debug = false;   
        
        ghost.depth = window.depth
        ghost.depth += 1

        window.lifetime = 800

    }
}