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
    if (overx - 1 >= 0 && overy - 1 >= 0) {
        if (tiles[overx - 1][overy - 1] !== null) {
            if (tiles[overx - 1][overy - 1].tiletype === TilesEnum.PATH) {
                return true;
            }
        }
    }
    return false;
}
function checkUpRight(tiles, overx, overy, n) {
    "use strict";
    if (overx + 1 <= n - 1 && overy - 1 >= 0) {
        if (tiles[overx + 1][overy - 1] !== null) {
            if (tiles[overx + 1][overy - 1].tiletype === TilesEnum.PATH) {
                return true;
            }
        }
    }
    return false;
}
function checkDownLeft(tiles, overx, overy, m) {
    "use strict";
    if (overx - 1 >= 0 && overy + 1 <= m - 1) {
        if (tiles[overx - 1][overy + 1] !== null) {
            if (tiles[overx - 1][overy + 1].tiletype === TilesEnum.PATH) {
                return true;
            }
        }
    }
    return false;
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
                    if (randomIntFromInterval(1, 100) - (100 - decorationsChance) >= 0) {
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
                            tiles[i][j].tiletype = temp === 11 ? TilesEnum.BENCH : TilesEnum.ETC;
                            if (temp === 11) {
                                tiles[i][j].rotation = benchRotation;
                            }
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
function generateDarkness(n, m, obstructionsCount, tiles) {
    "use strict";
    var maxtriescount = 0;
    var generateMore = true;
    var testtilex, testtiley, temptype;
    var sidesize, i, j, rotation;
    sidesize = Math.floor(Math.sqrt(obstructionsCount));
    var xsize = n - (sidesize + 2);
    var ysize = m - (sidesize + 2);
    if (xsize < 2 || ysize < 2) {
        return true;
    }
    while (maxtriescount < 5) {
        maxtriescount += 1;
        testtilex = randomIntFromInterval(2, xsize);
        testtiley = randomIntFromInterval(2, ysize);
        if (testtilex + sidesize < n - 2 && testtiley + sidesize < m - 2) {
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
                    tiles[testtilex + i][testtiley + j].tiletype = temptype;
                    tiles[testtilex + i][testtiley + j].rotation = rotation;
                }
            }
            generateMore = false;
        }
    }
    return generateMore;
}
function generateHorizontalObstructions(n, m, tiles) {
    "use strict";
    var i, j;
    j = Math.floor(m / 3);
    for (i = 1; i < n - randomIntFromInterval(3, 5); i += 1) {
        tiles[i][j].tiletype = TilesEnum.OBSTACLE;
    }
    j = Math.floor(2 * m / 3);
    for (i = n - 2; i > randomIntFromInterval(2, 5); i -= 1) {
        tiles[i][j].tiletype = TilesEnum.OBSTACLE;
    }
    return false; //this can not fail
}
function generateVerticalObstructions(n, m, tiles) {
    "use strict";
    var i, j;
    i = Math.floor(n / 3);
    for (j = 1; j < m - randomIntFromInterval(3, 5); j += 1) {
        tiles[i][j].tiletype = TilesEnum.OBSTACLE;
    }
    i = Math.floor(2 * n / 3);
    for (j = m - 2; j > randomIntFromInterval(2, 5); j -= 1) {
        tiles[i][j].tiletype = TilesEnum.OBSTACLE;
    }
    return false; //this can not fail
}
function generateRandomObstructions(n, m, obstructionsPerc, tiles) {
    "use strict";
    var i, j;
    for (i = 1; i < n - 1; i += 1) {
        for (j = 1; j < m - 1; j += 1) {
            if (tiles[i - 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j - 1].tiletype !== TilesEnum.DOOR && tiles[i + 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j + 1].tiletype !== TilesEnum.DOOR) {//NOT NEXT TO DOORS CHECK
                if (randomIntFromInterval(0, 100) <= obstructionsPerc) {
                    tiles[i][j].tiletype = TilesEnum.OBSTACLE;
                }
            }
        }
    }
    return false;//this can not fail
}
function calculateDirection(chance1, chance2, chance3, overX, overY, n, m, type) {
    "use strict";
    var tempchance1 = chance1;
    var tempchance2 = chance2;
    var tempchance3 = chance3;
    /**(
     * 0 = up
     * 1 = right
     * 2 = down
     * 3 = left
     * @type number
     */
    var direction = 1;
    switch (type) {
        case 0:
            //disable up
            if (overY - 1 <= 1 || tiles[overX][overY - 1].tiletype === TilesEnum.PATH || checkUpLeft(tiles, overX, overY)) {
                tempchance1 = 0;
            }
            //disable down
            if (overY + 1 >= m - 2 || tiles[overX][overY + 1].tiletype === TilesEnum.PATH || checkDownLeft(tiles, overX, overY, m)) {
                tempchance3 = 0;
            }
            break;
        case 1:
            //disable left
            if (overX - 1 <= 1 || tiles[overX - 1][overY].tiletype === TilesEnum.PATH || checkUpLeft(tiles, overX, overY)) {
                tempchance3 = 0;
            }
            //disable right
            if (overX + 1 >= n - 2 || tiles[overX + 1][overY].tiletype === TilesEnum.PATH || checkUpRight(tiles, overX, overY, n)) {
                tempchance1 = 0;
            }
            break;
        case 2:
            //disable right
            if (overX + 1 >= n - 2) {
                tempchance1 = 0;
            }
            break;
        case 3:
            //disable right
            if (overX + 1 >= n - 2) {
                tempchance1 = 0;
            }
            break;
        case 4:
            //disable down
            if (overY + 1 >= m - 2) {
                tempchance1 = 0;
            }
            break;
        case 5:
            //disable up
            if (overY - 1 <= 1) {
                tempchance2 = 0;
            }
            break;
    }
    if (type === 0 || type === 1) {
        if (tempchance1 === 0 && tempchance3 !== 0) {
            tempchance2 += Math.floor(chance1 / 2);
            tempchance3 += Math.floor(chance1 / 2);
            if (tempchance2 + tempchance3 < 100) {
                tempchance3 += 100 - (tempchance2 + tempchance3);
            }
        } else if (tempchance1 === 0 && tempchance3 === 0) {
            tempchance2 = 100;
        } else if (tempchance1 !== 0 && tempchance3 === 0) {
            tempchance2 += Math.floor(chance3 / 2);
            tempchance1 += Math.floor(chance3 / 2);
            if (tempchance2 + tempchance1 < 100) {
                tempchance1 += 100 - (tempchance2 + tempchance1);
            }
        }
    } else {
        if (tempchance1 === 0) {
            tempchance2 = 100;
        } else if (tempchance2 === 0) {
            tempchance1 = 100;
        }
    }
    var dirandom = randomIntFromInterval(1, 100);
    if (type === 0 || type === 1) {
        if (dirandom <= tempchance1) {
            direction = type === 0 ? 0 : 1;//UP OR RIGHT
        } else if (dirandom > tempchance1 && dirandom <= tempchance1 + tempchance2) {
            direction = type === 0 ? 1 : 2;//RIGHT OR DOWN
        } else if (dirandom > tempchance1 + tempchance2 && dirandom <= tempchance1 + tempchance2 + tempchance3) {//100
            direction = type === 0 ? 2 : 3;//DOWN OR LEFT
        }
    } else {
        if (dirandom <= tempchance1) {
            direction = 1;//RIGHT
        } else {
            switch (type) {
                case 2:
                case 4:
                    direction = 2;//DOWN
                    break;
                case 3:
                case 5:
                    direction = 0;//UP
                    break;
            }
        }
    }
    return direction;
}
function checkOtherCoordinate(overAny, type, length) {
    "use strict";
    if (overAny < 2) {
        overAny = 2;
        console.log("Cannot have value < 2 for the non-leading coordinate for type " + (type + 1));
    }
    if (overAny > length - 2) {
        overAny = length - 2;
        console.log("Cannot have value > (length of the wall - 2) for the non-leading coordinate for type " + (type + 1));
    }
    return overAny;
}
function generateType1Level(requiredData) {
    "use strict";
    var n = parseInt(requiredData.n);
    var m = parseInt(requiredData.m);
    if (isNaN(n) || n < 9 || isNaN(m) || m < 9) {
        console.error("Invalid or too small n or m values, supply an integer with at least 9 as its value!");
        return [];
    }
    tiles = getTilesArray(n);
    var i, j;
    var type = parseInt(requiredData.type);
    if (isNaN(type) || type < 0 || type > 5) {
        console.error("Invalid type! Continuing with default");
        type = 0;
    }

    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            tiles[i][j] = new TileT1Proto(i, j, TilesEnum.BASIC, "", 0);
        }
    }

    var overX = parseInt(requiredData.overX);
    var overY = parseInt(requiredData.overY);
    if (isNaN(overX) || overX < 0 || isNaN(overY) || overY < 0) {
        console.error("Invalid overX or overY values, continuing with default");
        overX = Math.floor(n / 2);
        overY = Math.floor(m / 2);
    }
    switch (type) {
        case 0:
        case 2:
        case 3:
            overX = 0;
            overY = checkOtherCoordinate(overY, type, m);
            break;
        case 1:
        case 4:
            overY = 0;
            overX = checkOtherCoordinate(overX, type, n);
            break;
        case 5:
            overY = m - 1;
            overX = checkOtherCoordinate(overX, type, n);
            break;
    }

    //first tile
    tiles[overX][overY].tiletype = TilesEnum.PATH;

    //CHANCES INPUT CHECK
    var chance1 = parseInt(requiredData.chance1);
    var chance2 = parseInt(requiredData.chance2);
    var chance3 = parseInt(requiredData.chance3);
    if (isNaN(chance1) || isNaN(chance2) || isNaN(chance3)) {
        console.error("Invalid chance data! Continuing with default vaules!");
        chance1 = 33;
        chance2 = 33;
        chance3 = 34;
    }
    var sum;
    switch (type) {
        case 0:
        case 1:
            sum = chance1 + chance2 + chance3;
            if (sum !== 100) {
                console.error("Invalid 3 chances values! sum=" + sum);
            }
            if (sum > 100) {
                chance1 = 33;
                chance2 = 33;
                chance3 = 34;
            } else if (sum < 100) {
                chance3 += 100 - sum;
            }
            break;
        default:
            sum = chance1 + chance2;
            if (sum !== 100) {
                console.error("Invalid 2 chances values! sum=" + sum);
            }
            if (sum > 100) {
                chance1 = 50;
                chance2 = 50;
            } else if (sum < 100) {
                chance2 += 100 - sum;
            }
            chance3 = 0;//Chance3 defaults to 0
    }
    //END OF CHANCES INPUT CHECK
    /**(
     * 0 = up
     * 1 = right
     * 2 = down
     * 3 = left
     * @type number
     */
    var direction;
    var generatePath = true;
    var oldX, oldY;
    do {
        direction = -1;//Invalid value for the check later
        //CALCULATE DIRECTION
        switch (type) {
            case 0:
                if (overX === 0 || overX === n - 2) {
                    direction = 1;//RIGHT
                }
                break;
            case 1:
                if (overY === 0 || overY === m - 2) {
                    direction = 2;//DOWN
                }
                break;
            case 2:
                if (overX === 0 || overX === 1) {
                    direction = 1;//RIGHT
                } else if (overX === n - 2) {
                    direction = 2;//DOWN
                }
                break;
            case 3:
                if (overX === 0 || overX === 1) {
                    direction = 1;//RIGHT
                } else if (overX === n - 2) {
                    direction = 0;//UP
                }
                break;
            case 4:
                if (overY === 0 || overY === 1) {
                    direction = 2;//DOWN
                } else if (overY === m - 3) {
                    direction = 1;//RIGHT
                }
                break;
            case 5:
                if (overY === m - 1 || overY === m - 2) {
                    direction = 0;//UP
                } else if (overY === 2) {
                    direction = 1;//RIGHT
                }
                break;
        }
        if (direction === -1) {//CALCULATE DIRECTION BY CHANCE
            direction = calculateDirection(chance1, chance2, chance3, overX, overY, n, m, type);
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
            case 3:
                overX -= 1;
                break;
            default:
                overX += 1;
        }
        tiles[oldX][oldY].next = overX + ":" + overY;//chain the path tiles together
        tiles[overX][overY].tiletype = TilesEnum.PATH;
        if (overX === n - 1 || overY === m - 1 || (type === 3 && overY === 0)) {
            generatePath = false;
        }
    } while (generatePath);
    //END OF TILES CREATION

    //GENERATE WALLS
    var generateWalls = requiredData.generateWalls;
    if (generateWalls) {
        var fillLevel = requiredData.fillLevel;
        if (fillLevel) {//FILL LEVEL
            for (i = 0; i < n; i += 1) {//EVERYTHING IS FULL NOW
                for (j = 0; j < m; j += 1) {
                    if (tiles[i][j].tiletype !== TilesEnum.PATH) {
                        tiles[i][j].tiletype = TilesEnum.WALL;
                    }
                }
            }
        } else { //GENERATE WALLS ONLY
            var generateHorizontalWalls = requiredData.generateHorizontalWalls;
            var generateVerticalWalls = requiredData.generateVerticalWalls;
            if (generateHorizontalWalls || generateVerticalWalls) {
                for (i = 0; i < n; i += 1) {
                    for (j = 0; j < m; j += 1) {
                        if (generateHorizontalWalls) {
                            if (j === 0 || j === m - 1) {
                                if (tiles[i][j].tiletype !== TilesEnum.PATH) {
                                    tiles[i][j].tiletype = TilesEnum.WALL;
                                }
                            }
                        }
                        if (generateVerticalWalls) {
                            if (i === 0 || i === n - 1) {
                                if (tiles[i][j].tiletype !== TilesEnum.PATH) {
                                    tiles[i][j].tiletype = TilesEnum.WALL;
                                }
                            }
                        }
                    }
                }
            }
        }
        for (i = 0; i < n; i += 1) {//CLEAR AROUND THE PATH
            for (j = 0; j < m; j += 1) {
                if (tiles[i][j].tiletype === TilesEnum.PATH) {
                    if (j - 1 >= 0 && tiles[i][j - 1].tiletype !== TilesEnum.PATH) {//above
                        tiles[i][j - 1].tiletype = TilesEnum.BASIC;
                    }
                    if (j + 1 <= m - 1 && tiles[i][j + 1].tiletype !== TilesEnum.PATH) {//below
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
        }//END OF CLEARING AROUND THE PATH
    }
    //END OF WALLS GENERATION

    //GENERATE DECORATIONS
    var etcSpawn = requiredData.etcSpawn;
    if (etcSpawn) {
        var etcTileChance = parseInt(requiredData.etcTileChance);
        if (isNaN(etcTileChance) || etcTileChance < 0 || etcTileChance > 100) {
            console.error("etcTileChance is invalid, continuing with default!");
            etcTileChance = 66;
        }
        for (i = 0; i < n; i += 1) {
            for (j = 0; j < m; j += 1) {
                if (tiles[i][j].tiletype === TilesEnum.BASIC) {
                    if (randomIntFromInterval(1, 100) <= etcTileChance) {
                        tiles[i][j].tiletype = TilesEnum.ETC;
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
    var n = parseInt(requiredData.n);
    var m = parseInt(requiredData.m);
    if (isNaN(n) || isNaN(m) || n < 9 || m < 9) {
        console.error("Invalid n or m, choose different values!");
        return [];
    }
    var doorn = requiredData.doorn;
    var doore = requiredData.doore;
    var doors = requiredData.doors;
    var doorw = requiredData.doorw;
    tiles = getTilesArray(n);
    var i, j;
    var tiletype, doorncheck, doorecheck, doorscheck, doorwcheck;
    if (doorn !== true && doore !== true && doors !== true && doorw !== true) {
        doorn = true;
        console.log("You must choose at least 1 door! Continuing with default north door!");
    }
    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if (i === 0 || j === 0 || i === n - 1 || j === m - 1) {//If we're on the walls
                doorncheck = doorn && (i === Math.floor(n / 2) && j === 0);
                doorecheck = doorw && (i === 0 && j === Math.floor(m / 2));
                doorscheck = doors && (i === Math.floor(n / 2) && j === m - 1);
                doorwcheck = doore && (i === n - 1 && j === Math.floor(m / 2));
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
    var obstructionsPerc = parseInt(requiredData.obstructionsPerc);
    if (isNaN(obstructionsPerc) || obstructionsPerc < 0 || obstructionsPerc > 100) {
        obstructionsPerc = 10;
        console.error("Invalid obstructions percent! Continuing with default value!");
    }
    var obstructionsCount = Math.floor((n * m) * (obstructionsPerc / 100));
    while (generateObstructions) {
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
    }
    //END OF OBSTRUCTIONS

    //GENERATE DECORATIONS
    var generateDecorationsSwitch = requiredData.generateDecorationsSwitch;
    if (generateDecorationsSwitch) {
        var decorationsChance = parseInt(requiredData.decorationsChance);
        if (isNaN(decorationsChance) || decorationsChance < 0 || decorationsChance > 100) {
            decorationsChance = 80;
            console.error("Invalid obstructions percent! Continuing with default value!");
        }
        generateDecorations(n, m, tiles, decorationsChance);
    }
    //END OF DECORATIONS
    return tiles;
}
function generateType3Level(requiredData) {
    "use strict";
    var n = parseInt(requiredData.n);
    var m = parseInt(requiredData.m);
    if (isNaN(n) || isNaN(m) || n < 9 || m < 9) {
        console.error("Invalid n or m, choose different values!");
        return [];
    }
    var walln = requiredData.walln;
    var walle = requiredData.walle;
    var walls = requiredData.walls;
    var wallw = requiredData.wallw;
    tiles = getTilesArray(n);
    var i, j, tiletype;

    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if ((i === 0 && j === 0) || (i === 0 && j === m - 1) || (i === n - 1 && j === 0) || (i === n - 1 && j === m - 1)) {
                //Corner
                tiletype = 1;
            } else if ((walln && j === 0) || (walle && i === n - 1) || (wallw && i === 0) || (walls && j === m - 1)) {
                //Wall
                tiletype = 1;
            } else {
                //Basic tile
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
    var obstructionsPerc = parseInt(requiredData.obstructionsPerc);
    if (isNaN(obstructionsPerc) || obstructionsPerc < 0 || obstructionsPerc > 100) {
        obstructionsPerc = 10;
        console.error("Invalid obstructions percent! Continuing with default value!");
    }
    var obstructionsCount = Math.floor((n * m) * (obstructionsPerc / 100));

    while (generateObstructions) {
        if (walln && walls && walle && wallw) { //CLOSED ROOM
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
        } else if (walln && walls) {
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
        } else if (wallw && walle) {
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


    }
    //END OF OBSTRUCTIONS

    //GENERATE DECORATIONS
    var generateDecorationsSwitch = requiredData.generateDecorationsSwitch;
    if (generateDecorationsSwitch) {
        var decorationsChance = parseInt(requiredData.decorationsChance);
        if (isNaN(decorationsChance) || decorationsChance < 0 || decorationsChance > 100) {
            decorationsChance = 80;
            console.error("Invalid obstructions percent! Continuing with default value!");
        }
        generateDecorationsExt(n, m, tiles, decorationsChance, walln, walls, wallw, walle, true);
    }
    //END OF DECORATIONS

    //STAIRS
    var generateStairs = requiredData.generateStairs;
    if (walln && walls && wallw && walle) { //if all walls are on - we must have an entrance
        generateStairs = true;
    }
    if (generateStairs) {
        var tryGen = true;
        var x, y, ii = 0;
        while (tryGen) {
            ii += 1;
            if (ii >= 100) {
                console.error("Could not generate stairs!");
                tryGen = false;
            }
            x = randomIntFromInterval(2, n - 2);
            y = randomIntFromInterval(2, m - 2);
            if (tiles[x][y].tiletype === TilesEnum.BASIC) {
                tiles[x][y].tiletype = TilesEnum.STAIR;
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
                base = textures[0].clone();//Grass
            } else {
                base = textures[2].clone();//Floor
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
    var m = $("#minput").val();
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

    var type = parseInt($("input[name=tdtype]:checked").val());
    var overX = $("#overX").val();
    var overY = $("#overY").val();
    var chance1 = $("#chance1").val();
    var chance2 = $("#chance2").val();
    var chance3 = $("#chance3").val();
    var generateWalls = $("input[name=generateTreeWalls]:checked").val() === "true";
    var generateVerticalWalls = $("input[name=generateVerticalWalls]:checked").val() === "true";
    var generageHorizontalWalls = $("input[name=generateHorizontalWalls]:checked").val() === "true";
    var fillLevel = $("input[name=generateForest]:checked").val() === "true";
    var etcSpawn = $("input[name=etcSpawn]:checked").val() === "true";
    var etcTileChance = $("#etcTileChance").val();
    switch (type) {
        case 0://Horizontal; the leftmost column is 0 to start from the left side
            overX = 0;
            overY = overY === "" ? randomIntFromInterval(2, (m - 1) - 2) : overY;
            break;
        case 1://Vertical; the top column is 0 to start from the top side
            overX = overX === "" ? randomIntFromInterval(2, (n - 1) - 2) : overX;
            overY = 0;
            break;
        case 2://TOP RIGHT -|; the leftmost column is 0 to start from the left side down
            overX = 0;
            overY = overY === "" ? randomIntFromInterval(2, (m - 1) - 2) : overY;
            break;
        case 3://BOTTOM RIGHT _|; the leftmost column is 0 to start from the left side up
            overX = 0;
            overY = overY === "" ? randomIntFromInterval(2, (m - 1) - 2) : overY;
            break;
        case 4://BOTTOM LEFT |_; the top column is 0 to start from the top side right
            overX = overX === "" ? randomIntFromInterval(2, (n - 1) - 2) : overX;
            overY = 0;
            break;
        case 5://TOP LEFT |-; the top column is 0 to start from the top right
            overX = overX === "" ? randomIntFromInterval(2, (n - 1) - 2) : overX;
            overY = 0;
            break;
    }

    var doorn = $("input[name='doorn']:checked").val() === "true";
    var doore = $("input[name='doore']:checked").val() === "true";
    var doors = $("input[name='doors']:checked").val() === "true";
    var doorw = $("input[name='doorw']:checked").val() === "true";
    var generateObstructionsT2 = $("input[name=genobst2]:checked").val() === "true";
    var generateDecorationsT2 = $("input[name=gendecot2]:checked").val() === "true";
    var obsperct2 = $("#obsPercT2").val();
    var decoperct2 = $("#decoPercT2").val();

    var walln = $("input[name='walln']:checked").val() === "true";
    var walle = $("input[name='walle']:checked").val() === "true";
    var walls = $("input[name='walls']:checked").val() === "true";
    var wallw = $("input[name='wallw']:checked").val() === "true";
    var generateObstructionsT3 = $("input[name=genobst3]:checked").val() === "true";
    var generateDecorationsT3 = $("input[name=gendecot3]:checked").val() === "true";
    var generateStairT3 = $("input[name=genstairt3]:checked").val() === "true";
    var obsperct3 = $("#obsPercT3").val();
    var decoperct3 = $("#decoPercT3").val();
    switch (which) {
        case 0:
            requiredData = {
                n: n,
                m: m,
                type: type,
                overX: overX,
                overY: overY,
                chance1: chance1,
                chance2: chance2,
                chance3: chance3,
                generateWalls: generateWalls,
                generateVerticalWalls: generateVerticalWalls,
                generateHorizontalWalls: generageHorizontalWalls,
                fillLevel: fillLevel,
                etcSpawn: etcSpawn,
                etcTileChance: etcTileChance
            };
            tiles = generateType1Level(requiredData);
            break;
        case 1:
            requiredData = {
                n: n,
                m: m,
                doorn: doorn,
                doore: doore,
                doors: doors,
                doorw: doorw,
                generateObstructions: generateObstructionsT2,
                obstructionsPerc: obsperct2,
                generateDecorationsSwitch: generateDecorationsT2,
                decorationsChance: decoperct2,
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
                walln: walln,
                walle: walle,
                walls: walls,
                wallw: wallw,
                generateObstructions: generateObstructionsT3,
                obstructionsPerc: obsperct3,
                generateDecorationsSwitch: generateDecorationsT3,
                decorationsChance: decoperct3,
                generateStairs: generateStairT3,
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