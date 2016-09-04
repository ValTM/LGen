var TilesEnum = {
    ETC: "ETC",
    BASIC: "BASIC",
    PATH: "PATH",
    WALL: "WALL",
    DOOR: "DOOR",
    DARK: "DARK",
    DARKW: "DARKW",
    DARKC: "DARKC"
};
function idCanvas(n, m) {
    "use strict";
    var canvas = document.getElementById("genCanvas");
    var cwidth = $("#canvasDiv").width();
    canvas.width = cwidth;
    canvas.height = (cwidth / n) * m;
    return canvas;
}
function getTilesArray(n, m) {
    "use strict";
    var tiles = new Array(n);
    var i;
    for (i = 0; i < n; i += 1) {
        tiles[i] = new Array(m);
    }
    return tiles;
}
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function TileTdProto(x, y, tiletype, texture, next) {
    "use strict";
    this.x = x;
    this.y = y;
    this.tiletype = tiletype;
    this.texture = texture;
    this.next = next;
}
function TileRoomProto(x, y, tiletype, texture) {
    "use strict";
    this.x = x;
    this.y = y;
    this.tiletype = tiletype;
    this.texture = texture;
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
function generateTdLevel(n, m, stage, textures, xsize, ysize) {
    "use strict";
    var floortexture = textures[0];
    var pathtexture = textures[1];
    var tiles = getTilesArray(n, m);
    var i, j, temp;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            tiles[i][j] = new TileTdProto(i, j, TilesEnum.BASIC, floortexture.clone(), "");
            //console.log("Adding tile[" + i + "][" + j + "] with coords " + tiles[i][j].x + ":" + tiles[i][j].y);
            temp = tiles[i][j].texture;
            temp.x = tiles[i][j].x * xsize;
            temp.y = tiles[i][j].y * ysize;
            stage.addChild(temp);
        }
    }
    //stage.addChild(grasstile);
    var overlaytiles = [];
    var randomtile = randomIntFromInterval(2, (m - 1) - 2); //m-1 since we're 0 based
    var dirandom, oldX, oldY;
    var generatePath = true;
    var overX = 0;
    var overY = randomtile;
    var path;
    //draw first tile
    tiles[overX][overY] = new TileTdProto(overX, overY, TilesEnum.PATH, pathtexture.clone(), "");
    path = tiles[overX][overY].texture;
    path.x = tiles[overX][overY].x * xsize;
    path.y = tiles[overX][overY].y * ysize;
    overlaytiles.push(path);

    //TODO get from html
    var topchance = 33;
    var rightchance = 33;
    var downchance = 34;
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
            if (dirandom <= temptopchance) {//TODO make 33, 66 and 100 variable controlled
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
        switch(direction) {//MOVE TILE
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
                overX +=1;
        }
        tiles[oldX][oldY].next = overX + ":" + overY;//chain the path tiles together
        tiles[overX][overY].tiletype = TilesEnum.PATH;
        //TODO get texture rotation according to direction
        path = textures[1].clone();
        path.x = tiles[overX][overY].x * xsize;
        path.y = tiles[overX][overY].y * ysize;
        overlaytiles.push(path);
        if (overX === n - 1) {
            generatePath = false;
        }
    } while (generatePath);

    //TODO Yes/no etc spawn
    var etcTileChance = 66; //TODO get from HTML;
    var etcTile;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if (tiles[i][j].tiletype !== TilesEnum.PATH) {
                if (randomIntFromInterval(1, 100) < etcTileChance) {
                    tiles[i][j] = new TileTdProto(i, j, TilesEnum.ETC, textures[randomIntFromInterval(7, 9)].clone(), "");
                    etcTile = tiles[i][j].texture;
                    etcTile.x = tiles[i][j].x * xsize;
                    etcTile.y = tiles[i][j].y * ysize;
                    overlaytiles.push(etcTile);
                }
            }
        }
    }

    //console.log(tiles);

    overlaytiles.forEach(function (element) {
        stage.addChild(element);
    });
    stage.update();

}
function generateDarkness(n, m, obstructionsCount, tiles, xsize, ysize, stage, textures) {
    "use strict";
    var darktexture = textures[4];
    var darkctexture = textures[5];
    var darkwtexture = textures[10];
    var generateMore = true;
    var testtilex, testtiley, temptexture, temptype, temp;
    var sidesize, i, j;
    testtilex = randomIntFromInterval(2, n - 6);//m - 6 = 0-based, the wall, at least one space from the wall, at least 3 spaces for the darkness
    testtiley = randomIntFromInterval(2, m - 6);//n - 6 = 0-based, the wall, at least one space from the wall, at least 3 spaces for the darkness
    sidesize = Math.floor(Math.sqrt(obstructionsCount));
    if (testtilex + sidesize < n - 2 && testtiley + sidesize < m - 2) { //check bounds
        for (i = 0; i < sidesize; i += 1) {
            for (j = 0; j < sidesize; j += 1) {
                if (i === 0 && j === 0) {
                    temptype = TilesEnum.DARKC;
                    temptexture = darkctexture.clone();
                } else if (i === sidesize - 1 && j === 0) {
                    temptype = TilesEnum.DARKC;
                    temptexture = darkctexture.clone();
                    temptexture.regX = 0;
                    temptexture.regY = temptexture.image.height;
                    temptexture.rotation = 90;
                } else if (i === 0 && j === sidesize - 1) {
                    temptype = TilesEnum.DARKC;
                    temptexture = darkctexture.clone();
                    temptexture.regX = temptexture.image.width;
                    temptexture.regY = 0;
                    temptexture.rotation = 270;
                } else if (i === sidesize - 1 && j === sidesize - 1) {
                    temptype = TilesEnum.DARKC;
                    temptexture = darkctexture.clone();
                    temptexture.regX = temptexture.image.width;
                    temptexture.regY = temptexture.image.height;
                    temptexture.rotation = 180;
                } else if (i === 0) {
                    temptype = TilesEnum.DARKW;
                    temptexture = darkwtexture.clone();
                    temptexture.regX = temptexture.image.width;
                    temptexture.regY = 0;
                    temptexture.rotation = 270;
                } else if (j === 0) {
                    temptype = TilesEnum.DARKW;
                    temptexture = darkwtexture.clone();
                } else if (j === sidesize - 1) {
                    temptype = TilesEnum.DARKW;
                    temptexture = darkwtexture.clone();
                    temptexture.regX = temptexture.image.width;
                    temptexture.regY = temptexture.image.height;
                    temptexture.rotation = 180;
                } else if (i === sidesize - 1) {
                    temptype = TilesEnum.DARKW;
                    temptexture = darkwtexture.clone();
                    temptexture.regX = 0;
                    temptexture.regY = temptexture.image.height;
                    temptexture.rotation = 90;
                } else {
                    temptype = TilesEnum.DARK;
                    temptexture = darktexture.clone();
                }
                tiles[testtilex + i][testtiley + j] = new TileRoomProto(testtilex + i, testtiley + j, temptype, temptexture);
                temp = tiles[testtilex + i][testtiley + j].texture;
                temp.x = tiles[testtilex + i][testtiley + j].x * xsize;
                temp.y = tiles[testtilex + i][testtiley + j].y * ysize;
                stage.addChild(temp);
            }
        }
        generateMore = false;
    } //retry if out of bounds
    return generateMore;
}
function generateBoILevel(n, m, stage, textures, xsize, ysize) {
    "use strict";
    var floortexture = textures[2];
    var walltexture = textures[3];
    var doortexture = textures[6];
    var doorn = $("input[name='doorn']:checked").val();
    var doore = $("input[name='doore']:checked").val();
    var doors = $("input[name='doors']:checked").val();
    var doorw = $("input[name='doorw']:checked").val();
    var tiles = getTilesArray(n, m);
    var i, j;
    var tiletype, doorncheck, doorecheck, doorscheck, doorwcheck, temp;

    //GENERATE TILES
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if (i === 0 || j === 0 || i === n - 1 || j === m - 1) {
                doorncheck = (doorn === "true") && (i === Math.floor(n / 2) && j === 0);
                doorecheck = (doorw === "true") && (i === 0 && j === Math.floor(m / 2));
                doorscheck = (doors === "true") && (i === Math.floor(n / 2) && j === m - 1);
                doorwcheck = (doore === "true") && (i === n - 1 && j === Math.floor(m / 2));
                if (doorncheck || doorecheck || doorscheck || doorwcheck) {
                    tiletype = 1;
                } else {
                    tiletype = 2;
                }
            } else {
                tiletype = 0;
            }
            switch (tiletype) {
                case 0:
                    tiles[i][j] = new TileRoomProto(i, j, TilesEnum.BASIC, floortexture.clone());
                    break;
                case 1:
                    tiles[i][j] = new TileRoomProto(i, j, TilesEnum.DOOR, doortexture.clone());
                    break;
                case 2:
                    tiles[i][j] = new TileRoomProto(i, j, TilesEnum.WALL, walltexture.clone());
                    break;
            }
            temp = tiles[i][j].texture;
            temp.x = tiles[i][j].x * xsize;
            temp.y = tiles[i][j].y * ysize;
            stage.addChild(temp);
        }
    }

    //OBSTRUCTIONS
    var generateObstructions = true; //TODO get from html
    var obstructionsPerc = 10;//TODO get from html
    var obstructionsCount = Math.floor((n * m) / obstructionsPerc);

    var maxtriescount = 0;
    do {
        maxtriescount += 1;
        if (maxtriescount >= 5) {
            generateObstructions = false;
            alert("Could not generate obstructions, try different values of the variables!");
            break;
        }
        //TODO >1 type of obstructions and random picker - random rocks, horiz or vert lines of rocks/wall
        //START OF DARKNESS GENERATION
        if (n > 7 && m > 7) {//Ensure we have some space
            generateObstructions = generateDarkness(n, m, obstructionsCount, tiles, xsize, ysize, stage, textures);
            //END OF DARKNESS GENERATION
        } else {//Quit if we're not generating
            generateObstructions = false;
        }
    } while (generateObstructions);


    //DECORATIONS
    var generateDecorations = true;//TODO get from HTML
    var decorationsChance = 80;//TODO get from HTML
    var temptile;
    /**
     * 0 - up (unchanged)
     * 1 - down
     * 2 - left
     * 3 - right
     */
    var benchdirection;
    if (generateDecorations) {
        for (i = 1; i < n - 1; i += 1) {
            for (j = 1;  j < m - 1; j += 1) {
                if (i === 1 || i === n - 2 || j === 1 || j === m - 2) {//ONLY NEXT TO WALLS
                    if (tiles[i - 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j - 1].tiletype !== TilesEnum.DOOR && tiles[i + 1][j].tiletype !== TilesEnum.DOOR && tiles[i][j + 1].tiletype !== TilesEnum.DOOR) {//NOT NEXT TO DOORS CHECK
                        if (randomIntFromInterval(1, 100) - (100 - decorationsChance) > 0) {
                            if (tiles[i][j].tiletype === TilesEnum.BASIC) {
                                temptile = randomIntFromInterval(11, 14);
                                tiles[i][j] = new TileRoomProto(i, j, TilesEnum.ETC, textures[temptile].clone());
                                temp = tiles[i][j].texture;
                                temp.x = tiles[i][j].x * xsize;
                                temp.y = tiles[i][j].y * ysize;
                                if (temptile === 11) {
                                    benchdirection = 0;//default
                                    if (i === 1 && j > 1) {
                                        benchdirection = 2;
                                    } else if (i === n - 2 && j > 1) {
                                        benchdirection = 3;
                                    } else if (j === 1 && i > 1) {
                                        benchdirection = 0;
                                    } else if (j === m - 2 && i > 1) {
                                        benchdirection = 1;
                                    }
                                    switch (benchdirection) {
                                        case 1:
                                            temp.regX = temp.image.width;
                                            temp.regY = temp.image.height;
                                            temp.rotation = 180;
                                            break;
                                        case 2:
                                            temp.regX = temp.image.width;
                                            temp.regY = 0;
                                            temp.rotation = 270;
                                            break;
                                        case 3:
                                            temp.regX = 0;
                                            temp.regY = temp.image.height;
                                            temp.rotation = 90;
                                            break;
                                    }
                                }
                                stage.addChild(temp);
                            }
                        }
                    }
                }
            }
        }
    }

    stage.update();
    //TODO
}
function generateOwLevel(n, m, stage, textures, xsize, ysize) {
    "use strict";
    var floortexture = textures[2];
    var walltexture = textures[3];
    var walln = $("input[name='walln']:checked").val();
    var walle = $("input[name='walle']:checked").val();
    var walls = $("input[name='walls']:checked").val();
    var wallw = $("input[name='wallw']:checked").val();
    var tiles = getTilesArray(n, m);
    var i, j, walkable, tiletexture, temp;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            walkable = true;
            if ((i === 0 && j === 0) || (i === 0 && j === m - 1) || (i === n - 1 && j === 0) || (i === n - 1 && j === m - 1)) {//TODO add wall checks
                tiletexture = walltexture.clone();
                walkable = false;
            } else {
                tiletexture = floortexture.clone();
            }
            tiles[i][j] = new TileRoomProto(i * xsize, j * ysize, "", tiletexture, "", walkable);
            temp = tiles[i][j].texture;
            temp.x = tiles[i][j].x;
            temp.y = tiles[i][j].y;
            stage.addChild(temp);
            stage.update();
        }
    }
    stage.update();
    //TODO
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
     * @type {Array}
     */
    var textures = loadTiles(imgscalex, imgscaley);
    switch (which) {
        case 0:
            generateTdLevel(n, m, stage, textures, xsize, ysize);
            break;
        case 1:
            generateBoILevel(n, m, stage, textures, xsize, ysize);
            break;
        case 2:
            generateOwLevel(n, m, stage, textures, xsize, ysize);
            break;
    }
}