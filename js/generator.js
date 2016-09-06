var TilesEnum = {
    ETC: "ETC",
    BASIC: "BASIC",
    PATH: "PATH",
    WALL: "WALL",
    DOOR: "DOOR",
    DARK: "DARK",
    DARKW: "DARKW",
    DARKC: "DARKC",
    STAIR: "STAIR",
    OBSTACLE: "OBSTACLE",
    BENCH: "BENCH"
};
var tiles = [];
function idCanvas(n, m) {
    "use strict";
    var canvas = document.getElementById("genCanvas");
    var cwidth = $("#canvasDiv").width();
    canvas.width = cwidth;
    canvas.height = (cwidth / n) * m;
    return canvas;
}
function getTilesArray(n) {
    "use strict";
    var tiles = [];
    var i;
    for (i = 0; i < n; i += 1) {
        tiles[i] = [];
    }
    return tiles;
}
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function TileT1Proto(x, y, tiletype, next, rotation) {
    "use strict";
    this.x = x;
    this.y = y;
    this.tiletype = tiletype;
    this.next = next;
    this.rotation = rotation;
}
function TileT2Proto(x, y, tiletype, rotation) {
    "use strict";
    this.x = x;
    this.y = y;
    this.tiletype = tiletype;
    this.rotation = rotation;
}
function loadTiles(imgscalex, imgscaley) {
    "use strict";
    var textures = [];
    var grasstexture = new createjs.Bitmap("res/grass.jpg");
    grasstexture.scaleX = imgscalex;
    grasstexture.scaleY = imgscaley;
    textures.push(grasstexture);
    var pathtexture = new createjs.Bitmap("res/path.jpg");
    pathtexture.scaleX = imgscalex;
    pathtexture.scaleY = imgscaley;
    textures.push(pathtexture);
    var floortexture = new createjs.Bitmap("res/floor.jpg");
    floortexture.scaleX = imgscalex;
    floortexture.scaleY = imgscaley;
    textures.push(floortexture);
    var walltexture = new createjs.Bitmap("res/wall.jpg");
    walltexture.scaleX = imgscalex;
    walltexture.scaleY = imgscaley;
    textures.push(walltexture);
    var darktexture = new createjs.Bitmap("res/darkness.jpg");
    darktexture.scaleX = imgscalex;
    darktexture.scaleY = imgscaley;
    textures.push(darktexture);
    var darkctexture = new createjs.Bitmap("res/darkness_c.jpg");
    darkctexture.scaleX = imgscalex;
    darkctexture.scaleY = imgscaley;
    textures.push(darkctexture);
    var doortexture = new createjs.Bitmap("res/door.jpg");
    doortexture.scaleX = imgscalex;
    doortexture.scaleY = imgscaley;
    textures.push(doortexture);
    var tree1texture = new createjs.Bitmap("res/tree1.png");
    tree1texture.scaleX = imgscalex;
    tree1texture.scaleY = imgscaley;
    textures.push(tree1texture);
    var tree2texture = new createjs.Bitmap("res/tree2.png");
    tree2texture.scaleX = imgscalex;
    tree2texture.scaleY = imgscaley;
    textures.push(tree2texture);
    var tree3texture = new createjs.Bitmap("res/tree3.png");
    tree3texture.scaleX = imgscalex;
    tree3texture.scaleY = imgscaley;
    textures.push(tree3texture);
    var darkwtexture = new createjs.Bitmap("res/darkness_w.jpg");
    darkwtexture.scaleX = imgscalex;
    darkwtexture.scaleY = imgscaley;
    textures.push(darkwtexture);
    var benchtexture = new createjs.Bitmap("res/bench.png");
    benchtexture.scaleX = imgscalex;
    benchtexture.scaleY = imgscaley;
    textures.push(benchtexture);
    var plant1texture = new createjs.Bitmap("res/plant1.png");
    plant1texture.scaleX = imgscalex;
    plant1texture.scaleY = imgscaley;
    textures.push(plant1texture);
    var plant2texture = new createjs.Bitmap("res/plant2.png");
    plant2texture.scaleX = imgscalex;
    plant2texture.scaleY = imgscaley;
    textures.push(plant2texture);
    var plant3texture = new createjs.Bitmap("res/plant3.png");
    plant3texture.scaleX = imgscalex;
    plant3texture.scaleY = imgscaley;
    textures.push(plant3texture);
    var rock1texture = new createjs.Bitmap("res/rock1.png");
    rock1texture.scaleX = imgscalex;
    rock1texture.scaleY = imgscaley;
    textures.push(rock1texture);
    var rock2texture = new createjs.Bitmap("res/rock2.png");
    rock2texture.scaleX = imgscalex;
    rock2texture.scaleY = imgscaley;
    textures.push(rock2texture);
    var stairstexture = new createjs.Bitmap("res/stairs.png");
    stairstexture.scaleX = imgscalex;
    stairstexture.scaleY = imgscaley;
    textures.push(stairstexture);
    var treewalltexture = new createjs.Bitmap("res/treewall.png");
    treewalltexture.scaleX = imgscalex;
    treewalltexture.scaleY = imgscaley;
    textures.push(treewalltexture);
    return textures;
}
function checkUpLeft(tiles, overx, overy) {
    "use strict";
    if (tiles[overx - 1][overy - 1] !== null) {
        if (tiles[overx - 1][overy - 1].tiletype === TilesEnum.PATH) {
            return true;
        }
    }
    return false;
}
function checkDownLeft(tiles, overx, overy) {
    "use strict";
    if (tiles[overx - 1][overy + 1] !== null) {
        if (tiles[overx - 1][overy + 1].tiletype === TilesEnum.PATH) {
            return true;
        }
    }
    return false;
}
function generateDarkness(n, m, obstructionsCount, tiles) {
    "use strict";
    var generateMore = true;
    var testtilex, testtiley, temptype;
    var sidesize, i, j, rotation;
    testtilex = randomIntFromInterval(2, n - 6);//m - 6 = 0-based, the wall, at least one space from the wall, at least 3 spaces for the darkness
    testtiley = randomIntFromInterval(2, m - 6);//n - 6 = 0-based, the wall, at least one space from the wall, at least 3 spaces for the darkness
    sidesize = Math.floor(Math.sqrt(obstructionsCount));
    if (testtilex + sidesize < n - 2 && testtiley + sidesize < m - 2) { //check bounds
        for (i = 0; i < sidesize; i += 1) {
            for (j = 0; j < sidesize; j += 1) {
                if (i === 0 && j === 0) {
                    temptype = TilesEnum.DARKC;
                    rotation = 0;
                } else if (i === sidesize - 1 && j === 0) {
                    temptype = TilesEnum.DARKC;
                    rotation = 1;
                } else if (i === 0 && j === sidesize - 1) {
                    temptype = TilesEnum.DARKC;
                    rotation = 3;
                } else if (i === sidesize - 1 && j === sidesize - 1) {
                    temptype = TilesEnum.DARKC;
                    rotation = 2;
                } else if (i === 0) {
                    temptype = TilesEnum.DARKW;
                    rotation = 3;
                } else if (j === 0) {
                    temptype = TilesEnum.DARKW;
                    rotation = 0;
                } else if (j === sidesize - 1) {
                    temptype = TilesEnum.DARKW;
                    rotation = 2;
                } else if (i === sidesize - 1) {
                    temptype = TilesEnum.DARKW;
                    rotation = 1;
                } else {
                    temptype = TilesEnum.DARK;
                    rotation = 0;
                }
                tiles[testtilex + i][testtiley + j] = new TileT2Proto(testtilex + i, testtiley + j, temptype, rotation);
            }
        }
        generateMore = false;
    } //retry if out of bounds
    return generateMore;
}
function generateDecorationsExt(n, m, tiles, decorationsChance, walln, walls, wallw, walle, generateByWalls) {
    "use strict";
    /**
     * 0 - up (unchanged)
     * 1 - down
     * 2 - left
     * 3 - right
     */
    var benchRotation;
    var i, j, temp;
    var check;
    for (i = 1; i < n - 1; i += 1) {
        for (j = 1; j < m - 1; j += 1) {
            if (generateByWalls === true) {
                check = (i === 1 && wallw) || (i === n - 2 && walle) || (j === 1 && walln) || (j === m - 2 && walls);
            } else {
                check = i === 1 || i === n - 2 || j === 1 || j === m - 2;
            }
            if (check) {//ONLY NEXT TO WALLS
                if (tiles[i - 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j - 1].tiletype !== TilesEnum.DOOR && tiles[i + 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j + 1].tiletype !== TilesEnum.DOOR) {//NOT NEXT TO DOORS CHECK
                    if (randomIntFromInterval(1, 100) - (100 - decorationsChance) > 0) {
                        if (tiles[i][j].tiletype === TilesEnum.BASIC) {
                            temp = randomIntFromInterval(11, 14);
                            if (temp === 11) {
                                benchRotation = 0;//default
                                if (j === 1 && i > 1) {//0
                                    benchRotation = 0;
                                } else if (i === n - 2 && j > 1) {//90
                                    benchRotation = 1;
                                } else if (j === m - 2 && i > 1) {//180
                                    benchRotation = 2;
                                } else if (i === 1 && j > 1) {//270
                                    benchRotation = 3;
                                }
                            }
                            tiles[i][j] = new TileT2Proto(i, j, temp === 11 ? TilesEnum.BENCH : TilesEnum.ETC, temp === 11 ? benchRotation : 0);
                        }
                    }
                }
            }
        }
    }
}
function generateDecorations(n, m, tiles, decorationsChance) {
    "use strict";
    generateDecorationsExt(n, m, tiles, decorationsChance, false, false, false, false, false);
}
function generateHorizontalObstructions(n, m, tiles) {
    "use strict";
    var i, j;
    j = Math.floor(m / 3);
    for (i = 1; i < n - randomIntFromInterval(3, 5); i += 1) {
        tiles[i][j] = new TileT2Proto(i, j, TilesEnum.OBSTACLE, 0);
    }
    j = Math.floor(2 * m / 3);
    for (i = n - 2; i > randomIntFromInterval(2, 5); i -= 1) {
        tiles[i][j] = new TileT2Proto(i, j, TilesEnum.OBSTACLE, 0);
    }
    return false; //this can not fail
}
function generateVerticalObstructions(n, m, tiles) {
    "use strict";
    var i, j;
    i = Math.floor(n / 3);
    for (j = 1; j < m - randomIntFromInterval(3, 5); j += 1) {
        tiles[i][j] = new TileT2Proto(i, j, TilesEnum.OBSTACLE, 0);
    }
    i = Math.floor(2 * n / 3);
    for (j = m - 2; j > randomIntFromInterval(2, 5); j -= 1) {
        tiles[i][j] = new TileT2Proto(i, j, TilesEnum.OBSTACLE, 0);
    }
    return false; //this can not fail
}
function generateRandomObstructions(n, m, obstructionsPerc, tiles) {
    "use strict";
    var i, j;
    for (i = 1; i < n - 1; i += 1) {
        for (j = 1; j < m - 1; j += 1) {
            if (tiles[i - 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j - 1].tiletype !== TilesEnum.DOOR && tiles[i + 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j + 1].tiletype !== TilesEnum.DOOR) {//NOT NEXT TO DOORS CHECK
                if (randomIntFromInterval(0, 100) < obstructionsPerc) {
                    tiles[i][j] = new TileT2Proto(i, j, TilesEnum.OBSTACLE, 0);
                }
            }
        }
    }
    return false;//this can not fail
}
function generateType1Level(requiredData) {
    "use strict";
    var n = requiredData.n;
    var m = requiredData.m;
    var tiles = getTilesArray(n);
    var i, j;

    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            tiles[i][j] = new TileT1Proto(i, j, TilesEnum.BASIC, "", 0);
        }
    }

    var dirandom, oldX, oldY;
    var generatePath = true;
    var overX = 0;
    var overY = requiredData.overY;
    //first tile
    tiles[overX][overY] = new TileT1Proto(overX, overY, TilesEnum.PATH, "", 0);
    var topchance = requiredData.topchance;
    var rightchance = requiredData.rightchance;
    var downchance = requiredData.downchance;
    var temptopchance, temprightchance, tempdownchance;
    /**(
     * 0 = up
     * 1 = right
     * 2 = down
     * @type {number}
     */
    var direction = 0;
    do {
        //CALCULATE DIRECTION
        if (overX === 0 || overX === n - 2) {//FIRST OR LAST TILE DIRECTION = RIGHT
            direction = 1;
        } else {//CALCULATE DIRECTION BY CHANCE
            temptopchance = topchance;
            temprightchance = rightchance;
            tempdownchance = downchance;

            //disable up
            if (overY - 1 <= 1 || tiles[overX][overY - 1].tiletype === TilesEnum.PATH || checkUpLeft(tiles, overX, overY)) {
                temptopchance = 0;
            }
            //disable down
            if (overY + 1 >= m - 2 || tiles[overX][overY + 1].tiletype === TilesEnum.PATH || checkDownLeft(tiles, overX, overY)) {
                tempdownchance = 0;
            }

            if (temptopchance === 0 && tempdownchance !== 0) {
                temprightchance += Math.floor(topchance / 2);
                tempdownchance += Math.floor(topchance / 2);
                if (temprightchance + tempdownchance < 100) {
                    tempdownchance += 100 - (temprightchance + tempdownchance);
                }
            } else if (temptopchance === 0 && tempdownchance === 0) {
                temprightchance = 100;
            } else if (temptopchance !== 0 && tempdownchance === 0) {
                temprightchance += Math.floor(downchance / 2);
                temptopchance += Math.floor(downchance / 2);
                if (temprightchance + temptopchance < 100) {
                    temptopchance += 100 - (temprightchance + temptopchance);
                }
            }
            dirandom = randomIntFromInterval(1, 100);
            if (dirandom <= temptopchance) {
                direction = 0;
            } else if (dirandom <= temptopchance + temprightchance) {
                direction = 1;
            } else if (dirandom <= temptopchance + temprightchance + tempdownchance) {
                direction = 2;
            } else {//can not happen, safety code.
                direction = 0;
            }
        }//END OF DIRECTION CALCULATION

        oldX = overX;
        oldY = overY;
        switch (direction) {//MOVE TILE
            case 0:
                overY -= 1;
                break;
            case 2:
                overY += 1;
                break;
            case 1:
                overX += 1;
                break;
            default:
                overX += 1;
        }
        tiles[oldX][oldY].next = overX + ":" + overY;//chain the path tiles together
        tiles[overX][overY].tiletype = TilesEnum.PATH;
        if (overX === n - 1) {
            generatePath = false;
        }
    } while (generatePath);
    //END OF TILES CREATION

    //GENERATE TREE WALLS
    var generateTreeWalls = requiredData.generateTreeWalls;
    if (generateTreeWalls) {
        var generateVerticalWalls = requiredData.generateVerticalWalls;
        var generateForest = requiredData.generateForest;
        if (generateForest) {
            for (i = 0; i < n; i += 1) {//EVERYTHING IS FOREST NOW
                for (j = 0; j < m; j += 1) {
                    if (tiles[i][j].tiletype !== TilesEnum.PATH) {
                        tiles[i][j].tiletype = TilesEnum.WALL;
                    }
                }
            }
            for (i = 0; i < n; i += 1) {//CLEAR AROUND THE PATH
                for (j = 0; j < m; j += 1) {
                    if (tiles[i][j].tiletype === TilesEnum.PATH) {
                        if (tiles[i][j - 1].tiletype !== TilesEnum.PATH) {//above
                            tiles[i][j - 1].tiletype = TilesEnum.BASIC;
                        }
                        if (tiles[i][j + 1].tiletype !== TilesEnum.PATH) {//below
                            tiles[i][j + 1].tiletype = TilesEnum.BASIC;
                        }
                        if (i - 1 >= 0) {
                            if (tiles[i - 1][j].tiletype !== TilesEnum.PATH) {//left
                                tiles[i - 1][j].tiletype = TilesEnum.BASIC;
                            }
                        }
                        if (i + 1 < n) {
                            if (tiles[i + 1][j].tiletype !== TilesEnum.PATH) {//right
                                tiles[i + 1][j].tiletype = TilesEnum.BASIC;
                            }
                        }
                        if (i - 1 >= 0 && j - 1 >= 0) {//top left
                            if (tiles[i - 1][j - 1].tiletype !== TilesEnum.PATH) {
                                tiles[i - 1][j - 1].tiletype = TilesEnum.BASIC;
                            }
                        }
                        if (i + 1 < n && j - 1 >= 0) {//top right
                            if (tiles[i + 1][j - 1].tiletype !== TilesEnum.PATH) {
                                tiles[i + 1][j - 1].tiletype = TilesEnum.BASIC;
                            }
                        }
                        if (i - 1 >= 0 && j + 1 < m) {//bottom left
                            if (tiles[i - 1][j + 1].tiletype !== TilesEnum.PATH) {
                                tiles[i - 1][j + 1].tiletype = TilesEnum.BASIC;
                            }
                        }
                        if (i + 1 < n && j + 1 < m) {//bottom right
                            if (tiles[i + 1][j + 1].tiletype !== TilesEnum.PATH) {
                                tiles[i + 1][j + 1].tiletype = TilesEnum.BASIC;
                            }
                        }
                    }
                }
            }
            for (i = 0; i < n; i += 1) {
                for (j = 0; j < m; j += 1) {
                    if (tiles[i][j].tiletype === TilesEnum.WALL) {
                        tiles[i][j] = new TileT1Proto(i, j, TilesEnum.WALL, "", 0);
                    }
                }
            }
        } else { //GENERATE ONLY WALLS
            for (i = 0; i < n; i += 1) {
                for (j = 0; j < m; j += 1) {
                    if ((i === 0 && generateVerticalWalls) || (i === n - 1 && generateVerticalWalls) || j === 0 || j === m - 1) {
                        if (tiles[i][j].tiletype === TilesEnum.BASIC) {
                            tiles[i][j] = new TileT1Proto(i, j, TilesEnum.WALL, "", 0);
                        }
                    }
                }
            }
        }
    }
    //END OF TREE WALLS GENERATION

    //GENERATE DECORATIONS
    var etcSpawn = requiredData.etcSpawn;
    if (etcSpawn) {
        var etcTileChance = requiredData.etcTileChance;
        //var etcTile;
        for (i = 0; i < n; i += 1) {
            for (j = 0; j < m; j += 1) {
                if (tiles[i][j].tiletype === TilesEnum.BASIC) {
                    if (randomIntFromInterval(1, 100) < etcTileChance) {
                        tiles[i][j] = new TileT1Proto(i, j, TilesEnum.ETC, "", 0);
                    }
                }
            }
        }
    }
    //END OF DECORATIONS

    return tiles;
}
function generateType2Level(requiredData) {
    "use strict";
    var n = requiredData.n;
    var m = requiredData.m;
    var doorn = requiredData.doorn;
    var doore = requiredData.doore;
    var doors = requiredData.doors;
    var doorw = requiredData.doorw;
    var tiles = getTilesArray(n);
    var i, j;
    var tiletype, doorncheck, doorecheck, doorscheck, doorwcheck;
    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if (i === 0 || j === 0 || i === n - 1 || j === m - 1) {//If we're on the walls
                doorncheck = (doorn === "true") && (i === Math.floor(n / 2) && j === 0);
                doorecheck = (doorw === "true") && (i === 0 && j === Math.floor(m / 2));
                doorscheck = (doors === "true") && (i === Math.floor(n / 2) && j === m - 1);
                doorwcheck = (doore === "true") && (i === n - 1 && j === Math.floor(m / 2));
                if (doorncheck || doorecheck || doorscheck || doorwcheck) {
                    tiletype = 1;//DOOR
                } else {
                    tiletype = 2;//WALL
                }
            } else {
                tiletype = 0;//BASIC
            }
            switch (tiletype) {
                case 0:
                    tiles[i][j] = new TileT2Proto(i, j, TilesEnum.BASIC, 0);
                    break;
                case 1:
                    tiles[i][j] = new TileT2Proto(i, j, TilesEnum.DOOR, 0);
                    break;
                case 2:
                    tiles[i][j] = new TileT2Proto(i, j, TilesEnum.WALL, 0);
                    break;
            }
        }
    }
    //END OF TILES

    // GENERATE OBSTRUCTIONS
    var generateObstructions = requiredData.generateObstructions;
    var obstructionsPerc = requiredData.obstructionsPerc;
    var obstructionsCount = Math.floor((n * m) / obstructionsPerc);
    var maxtriescount = 0;
    if (n > 7 && m > 7) { //ensure we have at least some space
        do {
            maxtriescount += 1;
            if (maxtriescount >= 5) {
                generateObstructions = false;
                alert("Could not generate obstructions, try different values of the variables!");
                break;
            }
            switch (randomIntFromInterval(0, 3)) {
                case 0:
                    generateObstructions = generateRandomObstructions(n, m, obstructionsPerc, tiles);
                    break;
                case 1:
                    generateObstructions = generateVerticalObstructions(n, m, tiles);
                    break;
                case 2:
                    generateObstructions = generateHorizontalObstructions(n, m, tiles);
                    break;
                case 3:
                    generateObstructions = generateDarkness(n, m, obstructionsCount, tiles);
                    break;
            }
        } while (generateObstructions);
    }
    //END OF OBSTRUCTIONS

    //GENERATE DECORATIONS
    var generateDecorationsSwitch = requiredData.generateDecorationsSwitch;
    if (generateDecorationsSwitch) {
        var decorationsChance = requiredData.decorationsChance;
        generateDecorations(n, m, tiles, decorationsChance);
    }
    //END OF DECORATIONS
    return tiles;
}
function generateType3Level(requiredData) {
    "use strict";
    var n = requiredData.n;
    var m = requiredData.m;
    var walln = requiredData.walln;
    var walle = requiredData.walle;
    var walls = requiredData.walls;
    var wallw = requiredData.wallw;
    var tiles = getTilesArray(n);
    var i, j, tiletype;

    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if ((i === 0 && j === 0) || (i === 0 && j === m - 1) || (i === n - 1 && j === 0) || (i === n - 1 && j === m - 1)) {
                tiletype = 1;
            } else if (((walln === "true") && j === 0) || ((walle === "true") && i === n - 1) || ((wallw === "true") && i === 0) || ((walls === "true") && j === m - 1)) {
                tiletype = 1;
            } else {
                tiletype = 0;
            }
            switch (tiletype) {
                case 0:
                    tiletype = TilesEnum.BASIC;
                    break;
                case 1:
                    tiletype = TilesEnum.WALL;
                    break;
            }
            tiles[i][j] = new TileT2Proto(i, j, tiletype, 0);
        }
    }
    //END OF TILES GENERATION

    //GENERATE OBSTRUCTIONS
    var generateObstructions = requiredData.generateObstructions;
    var obstructionsPerc = requiredData.obstructionsPerc;
    var obstructionsCount = Math.floor((n * m) / obstructionsPerc);
    var maxtriescount = 0;
    if (n > 7 && m > 7) { //ensure we have at least some space
        do {
            maxtriescount += 1;
            if (maxtriescount >= 5) {
                generateObstructions = false;
                alert("Could not generate obstructions, try different values of the variables!");
                break;
            }
            if (walln === "true" && walls === "true" && walle === "true" && wallw === "true") { //CLOSED ROOM
                switch (randomIntFromInterval(0, 3)) {
                    case 0:
                        generateObstructions = generateRandomObstructions(n, m, obstructionsPerc, tiles);
                        break;
                    case 1:
                        generateObstructions = generateVerticalObstructions(n, m, tiles);
                        break;
                    case 2:
                        generateObstructions = generateHorizontalObstructions(n, m, tiles);
                        break;
                    case 3:
                        generateObstructions = generateDarkness(n, m, obstructionsCount, tiles);
                        break;
                }
            } else if (walln === "true" && walls === "true") {
                switch (randomIntFromInterval(0, 2)) {
                    case 0:
                        generateObstructions = generateRandomObstructions(n, m, obstructionsPerc, tiles);
                        break;
                    case 1:
                        generateObstructions = generateVerticalObstructions(n, m, tiles);
                        break;
                    case 2:
                        generateObstructions = generateDarkness(n, m, obstructionsCount, tiles);
                        break;
                }
            } else if (wallw === "true" && walle === "true") {
                switch (randomIntFromInterval(0, 2)) {
                    case 0:
                        generateObstructions = generateRandomObstructions(n, m, obstructionsPerc, tiles);
                        break;
                    case 1:
                        generateObstructions = generateHorizontalObstructions(n, m, tiles);
                        break;
                    case 2:
                        generateObstructions = generateDarkness(n, m, obstructionsCount, tiles);
                        break;
                }
            } else {
                switch (randomIntFromInterval(0, 1)) {
                    case 0:
                        generateObstructions = generateRandomObstructions(n, m, obstructionsPerc, tiles);
                        break;
                    case 1:
                        generateObstructions = generateDarkness(n, m, obstructionsCount, tiles);
                        break;
                }
            }


        } while (generateObstructions);
    }
    //END OF OBSTRUCTIONS

    //GENERATE DECORATIONS
    var generateDecorationsSwitch = requiredData.generateDecorationsSwitch;
    if (generateDecorationsSwitch) {
        var decorationsChance = requiredData.decorationsChance;
        generateDecorationsExt(n, m, tiles, decorationsChance, (walln === "true"), (walls === "true"), (wallw === "true"), (walle === "true"), true);
    }
    //END OF DECORATIONS

    //STAIRS
    var generateStairs = requiredData.generateStairs;
    if ((walln === "true") && (walls === "true") && (wallw === "true") && (walle === "true")) { //if all walls are on - we must have an entrance
        generateStairs = true;
    }
    if (generateStairs) {
        var tryGen = true;
        var x, y;
        while (tryGen) {
            x = randomIntFromInterval(2, n - 2);
            y = randomIntFromInterval(2, m - 2);
            if (tiles[x][y].tiletype === TilesEnum.BASIC) {
                tiles[x][y] = new TileT2Proto(x, y, TilesEnum.STAIR, 0);
                tryGen = false;
            }
        }
    }
    //END OF STAIRS

    return tiles;
}
function drawLevel(n, m, tiles, which, stage, textures, xsize, ysize) {
    "use strict";
    var i, j;
    var texture;
    var base;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            //Ensure we have a base to work on
            if (which === 0) {
                base = textures[0].clone();
            } else {
                base = textures[2].clone();
            }
            base.x = tiles[i][j].x * xsize;
            base.y = tiles[i][j].y * xsize;
            stage.addChild(base);

            //DETERMINE TEXTURE
            switch (tiles[i][j].tiletype) {
                case TilesEnum.BENCH:
                    texture = textures[11].clone();//Bench
                    break;
                case TilesEnum.DARK:
                    texture = textures[4].clone();//Darkness
                    break;
                case TilesEnum.DARKC:
                    texture = textures[5].clone();//Darkness corner
                    break;
                case TilesEnum.DARKW:
                    texture = textures[10].clone();//Darkness wall
                    break;
                case TilesEnum.DOOR:
                    texture = textures[6].clone();//Door
                    break;
                case TilesEnum.ETC:
                    if (which === 0) {
                        texture = textures[randomIntFromInterval(7, 9)].clone();//Trees
                    } else {
                        texture = textures[randomIntFromInterval(12, 14)].clone();//Potted plants
                    }
                    break;
                case TilesEnum.OBSTACLE:
                    texture = textures[randomIntFromInterval(15, 16)].clone();//Rocks
                    break;
                case TilesEnum.PATH:
                    texture = textures[1].clone();//Path
                    break;
                case TilesEnum.STAIR:
                    texture = textures[17].clone();//Staircase
                    break;
                case TilesEnum.WALL:
                    if (which === 0) {
                        texture = textures[18].clone();//Tree wall
                    } else {
                        texture = textures[3].clone();//Stone wall
                    }
                    break;
                default:
                    //clones the base texture to reset params etc.
                    texture = base.clone();
            }
            //END OF TEXTURE DETERMINATION

            //ROTATION
            switch (tiles[i][j].rotation) {
                case 1:
                    texture.regX = 0;
                    texture.regY = texture.image.height;
                    texture.rotation = 90;
                    break;
                case 2:
                    texture.regX = texture.image.width;
                    texture.regY = texture.image.height;
                    texture.rotation = 180;
                    break;
                case 3:
                    texture.regX = texture.image.width;
                    texture.regY = 0;
                    texture.rotation = 270;
                    break;
            }//END OF ROTATION

            texture.x = tiles[i][j].x * xsize;
            texture.y = tiles[i][j].y * ysize;
            stage.addChild(texture);
        }
    }
    stage.update();
}
function generateLevel(which) {
    "use strict";
    var n = $("#ninput").val();
    var m = $("#ninput2").val();
    if (n < 8 || m < 8) {
        alert("Please, choose bigger numbers for side sizes");
        return;
    }
    var canvas = idCanvas(n, m);
    var imgscalex = (canvas.width / n) / 100;
    var imgscaley = (canvas.height / m) / 100;
    var xsize = imgscalex * 100;
    var ysize = imgscaley * 100;
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver();
    /**
     * Textures:
     * 0 - grass
     * 1 - path
     * 2 - floor
     * 3 - wall
     * 4 - darkness
     * 5 - darkness corner
     * 6 - door
     * 7 - tree1
     * 8 - tree2
     * 9 - tree3
     * 10 - darkness wall
     * 11 - bench
     * 12 - plant1
     * 13 - plant2
     * 14 - plant3
     * 15 - rock1
     * 16 - rock2
     * 17 - stairs
     * 18 - tree wall
     * @type {Array}
     */
    var textures = loadTiles(imgscalex, imgscaley);
    var requiredData;
    switch (which) {
        case 0:
            requiredData = {
                n: n,
                m: m,
                overY: randomIntFromInterval(2, (m - 1) - 2),
                topchance: 33,
                rightchance: 33,
                downchance: 34,
                generateTreeWalls: true,
                generateVerticalWalls: true,
                generateForest: true,
                etcSpawn: true,
                etcTileChance: 66
            };
            tiles = generateType1Level(requiredData);
            break;
        case 1:
            requiredData = {
                n: n,
                m: m,
                doorn: $("input[name='doorn']:checked").val(),
                doore: $("input[name='doore']:checked").val(),
                doors: $("input[name='doors']:checked").val(),
                doorw: $("input[name='doorw']:checked").val(),
                generateObstructions: true,
                obstructionsPerc: 10,
                generateDecorationsSwitch: true,
                decorationsChance: 80,
                textures: textures,
                xsize: xsize,
                ysize: ysize
            };
            tiles = generateType2Level(requiredData);
            break;
        case 2:
            requiredData = {
                n: n,
                m: m,
                walln: $("input[name='walln']:checked").val(),
                walle: $("input[name='walle']:checked").val(),
                walls: $("input[name='walls']:checked").val(),
                wallw: $("input[name='wallw']:checked").val(),
                generateObstructions: true,
                obstructionsPerc: 10,
                generateDecorationsSwitch: true,
                decorationsChance: 80,
                generateStairs: true,
                textures: textures,
                xsize: xsize,
                ysize: ysize
            };
            tiles = generateType3Level(requiredData);
            break;
    }
    drawLevel(n, m, tiles, which, stage, textures, xsize, ysize);
}
function exportJSON() {
    "use strict";
    if (tiles === "undefined" || tiles.length === 0) {
        alert("Please, generate a level first!");
    } else {
        var json = JSON.stringify(tiles);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
        var dlAnchorElem = document.getElementById("downloadAnchorElem");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "generatedLevel.json");
        dlAnchorElem.click();
    }
}