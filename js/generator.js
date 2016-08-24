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
    for (i = 0; i < n; i++) {
        tiles[i] = new Array(m);
    }
    return tiles;
}
function randomIntFromInterval(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function TileTdProto(x, y, tiletype, texture, tileorientation, walkable, buildable, next) {
    "use strict";
    this.x = x;
    this.y = y;
    this.tiletype = tiletype;
    this.texture = texture;
    this.tileorientation = tileorientation;
    this.walkable = walkable;
    this.buildable = buildable;
    this.next = next;
}
function TileRoomProto(x, y, tiletype, texture, tileorientation, walkable) {
    "use strict";
    this.x = x;
    this.y = y;
    this.tiletype = tiletype;
    this.texture = texture;
    this.tileorientation = tileorientation;
    this.walkable = walkable;
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
    return textures;
}
function checkUpLeft(tiles, overx, overy) {
    "use strict";
    if (tiles[overx - 1][overy - 1] !== null) {
        if (tiles[overx - 1][overy - 1].walkable === true) {
            return true;
        }
    }
    return false;
}
function checkDownLeft(tiles, overx, overy) {
    "use strict";
    if (tiles[overx - 1][overy + 1] !== null) {
        if (tiles[overx - 1][overy + 1].walkable === true) {
            return true;
        }
    }
    return false;
}
function generateTdLevel(n, m, stage, textures, xsize, ysize) {
    "use strict";
    var floortexture = textures[0];
    var entrances = $('#entrances').val();
    var exits = $('#exits').val();
    var tiles = getTilesArray(n, m);
    var i, j, temp;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            tiles[i][j] = new TileTdProto(i * xsize, j * ysize, "", floortexture.clone(), "", "", "", "");
            //console.log("Adding tile[" + i + "][" + j + "] with coords " + tiles[i][j].x + ":" + tiles[i][j].y);
            temp = tiles[i][j].texture;
            temp.x = tiles[i][j].x;
            temp.y = tiles[i][j].y;
            stage.addChild(temp);
            stage.update();
        }
    }
    //stage.addChild(grasstile);
    var pathtiles = [];
    var randomtile = randomIntFromInterval(2, (m - 1) - 2); //m-1 since we're 0 based
    var dirandom, oldX, oldY;
    var generatePath = true;
    var overX = 0;
    var overY = randomtile;
    var path;
    //draw first tile
    path = textures[1].clone();
    path.x = overX * xsize;
    path.y = overY * ysize;
    pathtiles.push(path);
    tiles[overX][overY].tiletype = "path";
    tiles[overX][overY].walkable = true;

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
            if (overY - 1 <= 1 || tiles[overX][overY - 1].walkable === true || checkUpLeft(tiles, overX, overY)) {
                temptopchance = 0;
            }
            //disable down
            if (overY + 1 >= m - 2 || tiles[overX][overY + 1].walkable === true || checkDownLeft(tiles, overX, overY)) {
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
            console.log("temptopchance: " + temptopchance + "; temprightchance: " + temprightchance + "; tempdownchance: " + tempdownchance);
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
        switch(direction) {
            case 0:
                overY--;
                console.log("Going from " + oldX + ":" + oldY + " up to " + overX + ":" + overY);
                break;
            case 2:
                overY++;
                console.log("Going from " + oldX + ":" + oldY + " down to " + overX + ":" + overY);
                break;
            case 1:
                overX++;
                console.log("Going from " + oldX + ":" + oldY + " right to " + overX + ":" + overY);
                break;
            default:
                overX++;
                break;
        }
        tiles[oldX][oldY].next = overX + ":" + overY;//chain the path tiles together
        tiles[overX][overY].tiletype = "path";
        tiles[overX][overY].walkable = true;
        //TODO get texture rotation according to direction
        path = textures[1].clone();
        path.x = overX * xsize;
        path.y = overY * ysize;
        pathtiles.push(path);
        if (overX === n - 1) {
            generatePath = false;
        }
    } while (generatePath);

    console.log(pathtiles.length + " tiles out of " + (n * m));

    var etcTileChance = 66; //TODO get from HTML;
    var etcTile;
    var tlc, tcc, trc, lc, cc, rc, dlc, dcc, drc;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {//TODO Fix check
            /*tlc = typeof tiles[i-1][j-1] != 'undefined' ? tiles[i-1][j-1].tiletype !== "path" : true;
            tcc = typeof tiles[i-1][j] != 'undefined' ? tiles[i-1][j].tiletype !== "path" : true;
            trc = typeof tiles[i-1][j+1] != 'undefined' ? tiles[i-1][j+1].tiletype !== "path" : true;
            lc = typeof tiles[i-1][j] != 'undefined' ? tiles[i-1][j].tiletype !== "path" : true;
            cc = typeof tiles[i][j] != 'undefined' ? tiles[i][j].tiletype !== "path" : true;
            rc = typeof tiles[i+1][j] != 'undefined' ? tiles[i+1][j].tiletype !== "path" : true;
            dlc = typeof tiles[i+1][j-1] != 'undefined' ? tiles[i+1][j-1].tiletype !== "path" : true;
            dcc = typeof tiles[i+1][j] != 'undefined' ? tiles[i+1][j].tiletype !== "path" : true;
            drc = typeof tiles[i+1][j+1] != 'undefined' ? tiles[i+1][j+1].tiletype !== "path" : true;
            if (tlc && tcc && trc && lc && cc && rc && dlc && dcc && drc) {*/
            if (tiles[i][j].tiletype !== "path") {
                if (randomIntFromInterval(1, 100) < etcTileChance) {
                    etcTile = textures[randomIntFromInterval(7, 9)].clone();
                    etcTile.x = i * xsize;
                    etcTile.y = j * ysize;
                    etcTile.tiletype = "etc";
                    pathtiles.push(etcTile);
                }
            } else {
                continue;
            }
        }
    }



    pathtiles.forEach(function (element) {
        stage.addChild(element);
    });
    stage.update();
    //console.log("I shoud generate " + n + " by " + m + " large array with " + entrances + " entrances and " + exits + " exits!");

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
    var tiletexture, walkable, doorncheck, doorecheck, doorscheck, doorwcheck, temp;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            walkable = true;
            if (i === 0 || j === 0 || i === n - 1 || j === m - 1) {
                doorncheck = (i === Math.floor(n / 2) && j === 0) && doorn === 'true';
                doorecheck = (i === 0 && j === Math.floor(m / 2)) && doore === 'true';
                doorscheck = (i === Math.floor(n / 2) && j === m - 1) && doors === 'true';
                doorwcheck = (i === n - 1 && j === Math.floor(m / 2)) && doorw === 'true';
                if (doorncheck || doorecheck || doorscheck || doorwcheck) {
                    tiletexture = doortexture.clone();
                } else {
                    tiletexture = walltexture.clone();
                    walkable = false;
                }
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
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
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
    var n = $('#ninput').val();
    var m = $('#ninput2').val();
    var canvas = idCanvas(n, m);
    var imgscalex = (canvas.width / n) / 100;
    var imgscaley = (canvas.height / m) / 100;
    var xsize = imgscalex * 100;
    var ysize = imgscaley * 100;
    var stage = new createjs.Stage(canvas);
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
     * @type {Array}
     */
    var textures = loadTiles(imgscalex, imgscaley);
    stage.enableMouseOver();
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