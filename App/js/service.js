'use strict'

var gCountKeySearchMap = {
    happy: 3,
    evil: 1,
    cute: 11,
    sure: 8,
    mindblown: 2,
    baby: 5,
    all: -999999999999999
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// // canvas.width/2, canvas.height/2
var gMeme = {
    selectedImgId: 1,
    txts: [
        {
            id: 0,
            line: ' ',
            size: 20,
            align: 'left',
            color: 'red',
            font: 'arial',
            posX: 100,
            posY: 100,
            shadow: false,
            alignment: 'center'
        },
    ]

}

var gImgs = [
    { id: 1, url: 'img/angry-man.jpg', keywords: ['angry', 'surprised'] },
    { id: 2, url: 'img/baby-dog.jpg', keywords: ['cute', 'baby', 'animal', 'dog'] },
    { id: 3, url: 'img/baby-winner.jpg', keywords: ['happy', 'baby', 'winner'] },
    { id: 4, url: 'img/babys-dance.jpg', keywords: ['happy', 'cute', 'baby'] },
    { id: 5, url: 'img/buz.jpg', keywords: ['sure', 'mindblown', 'scared'] },
    { id: 6, url: 'img/dancing.jpg', keywords: ['happy', 'free'] },
    { id: 7, url: 'img/evil-baby.jpg', keywords: ['evil', 'baby'] },
    { id: 8, url: 'img/fight-kiss.jpg', keywords: ['cute', 'fight'] },
    { id: 9, url: 'img/floor-pupy.jpg', keywords: ['cute', 'animal', 'dog'] },
    { id: 10, url: 'img/haim-hecht.jpg', keywords: ['sure', 'mindblown'] },
    { id: 11, url: 'img/hair-guy.jpg', keywords: ['happy', 'mindblown'] },
    { id: 12, url: 'img/hand-on-face-guy.jpg', keywords: ['happy', 'surprised', 'mindblown'] },
    { id: 13, url: 'img/hat-guy.jpg', keywords: ['happy', 'winner', 'mindblown'] },
    { id: 14, url: 'img/king-exectly.jpg', keywords: ['sure', 'winner', 'mindblown'] },
    { id: 15, url: 'img/leonardo-glass.jpg', keywords: ['happy', 'winner', 'mindblown'] },
    { id: 16, url: 'img/morphius-look.jpg', keywords: ['sure', 'winner', 'mindblown'] },
    { id: 17, url: 'img/mr-evil.jpg', keywords: ['evil', 'sure'] },
    { id: 18, url: 'img/obama.jpg', keywords: ['happy', 'president'] },
    { id: 19, url: 'img/opras-joy.jpg', keywords: ['happy', 'winner'] },
    { id: 20, url: 'img/puppy.jpg', keywords: ['cute', 'animal', 'dog'] },
    { id: 21, url: 'img/putin-finger.jpg', keywords: ['sure', 'president', 'winner'] },
    { id: 22, url: 'img/sleeping-cat.jpg', keywords: ['cute', 'animal'] },
    { id: 23, url: 'img/suprised-baby.jpg', keywords: ['cute', 'surprised', 'baby'] },
    { id: 24, url: 'img/trump-finger.jpg', keywords: ['sure', 'president', 'winner'] },
    { id: 25, url: 'img/trump-finger-2.jpg', keywords: ['sure', 'president', 'winner'] },
];


function getImgs(filterTag) {
    if (filterTag === 'all') return gImgs;
    return gImgs.filter((img) => {
        return img.keywords.some(keyword => {
            return keyword.includes(filterTag);
        })
    })
}

function getImg(id) {
    var findImgWithId = gImgs.find(function (img) {
        if (img.id === id) return img;
    });
    gMeme.selectedImgId = findImgWithId.id;
    return findImgWithId;
}

// function getFivePopularKeywords() {
//     var popKeywordsMap = {};
//     gImgs.forEach((img) => {
//         img.keywords.forEach(keyword => {
//             if (!popKeywordsMap[keyword]) popKeywordsMap[keyword] = 1;
//             else popKeywordsMap[keyword]++;
//         })
//     })

//     var max = 0;
//     var output = [];
//     for (var key in popKeywordsMap) {
//         if (popKeywordsMap[key] > max) {
//             max = popKeywordsMap[key];
//             output = [key];
//         } else if (popKeywordsMap[key] === max) {
//             output.push(key);
//         }
//     }

// }

function returnGmeme() {
    return gMeme;
}

// function getCanvasAndCtx() {
//     var canvas = document.getElementById('canvas');
//     var ctx = canvas.getContext('2d');
//     return{canvas, ctx};
// }

function findLineClicked(event) {// fit to service?
    // var canvas = document.getElementById('canvas');// ,ak this two in func-apear a lot
    // var ctx = canvas.getContext('2d');
    // console.log(event);
    // var clickPosX = event.clientX - canvas.offsetLeft;
    // var clickPosY = event.clientY - canvas.offsetTop;
    // var line = gMeme.txts.find(line => {
    //     return (clickPosY < line.posY + 10 && clickPosY > line.posY - line.size - 5
    //         && clickPosX < line.width + clickPosX + 10 && clickPosX > line.posX - 10);
    // });
    // console.log(line);
    // var text = ctx.measureText(gMeme.txts[0].line); // TextMetrics object
    // console.log(text.width,); // 16;
    // var height = parseInt(ctx.font.match(/\d+/), 10);
    // console.log(height);
    //     // if(isFound) moveLine(id);
}


function moveLine(id, moveDirection) {
    var line = gMeme.txts[id];
    console.log(moveDirection);
    if (moveDirection==='up') line.posY-=10;
    else if (moveDirection==='down') line.posY+=10;
    else if (moveDirection==='left') line.posX-=10;
    else if (moveDirection==='right') line.posX+=10;
    renderCanvas();
}




function deleteLine(index) {
    var lines = gMeme.txts;
    lines.splice(index, 1);
    console.log(lines);
    renderCanvas();
}

// function textStyle(txt) {////??????????????????
//     ctx.fillStyle = 'black'
//     ctx.font = '50px Arial'
//     ctx.fillText(txt, 100, 100)
// }

function changeTextSize(id, sizeChange) {
    var lines = gMeme.txts;
    var textSize = lines[id].size + sizeChange;
    gMeme.txts[id].size = textSize;
    renderCanvas();
}

function changeFont(font, id) {

    console.log(font);
    var lines = gMeme.txts;
    lines[id].font = font;
    renderCanvas();
}

function createKeyArr() {
    var allKeywords = [];
    var allKeywordsMap = {};
    gImgs.forEach((img) => {
        img.keywords.forEach(keyword => {
            if (!allKeywordsMap[keyword]) {
                allKeywordsMap[keyword] = true;
                allKeywords.push(keyword);
            }
            else return;
        })
    })
    return allKeywords;

}

function changeColor(color, id) {
    gMeme.txts[id].color = color;
    renderCanvas();
}


function downloadImg(elLink) {
    var canvas = document.getElementById('canvas');// ,ak this two in func-apear a lot
    var ctx = canvas.getContext('2d');
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function UpdateSearchKeyCount(imgId) {
    var value = document.querySelector('.myInput').value;
    var imgKeywords = getImg(imgId).keywords;
    if (value === '') return;
    var filterdKeywords = imgKeywords.filter(keyword => {
        return keyword.includes(value);
    })
    if (filterdKeywords.length > 1) return;
    else if (gCountKeySearchMap[filterdKeywords.toString()]) gCountKeySearchMap[filterdKeywords.toString()]++;
    else gCountKeySearchMap[filterdKeywords.toString()] = 1;
}

function UpdateSearchKeyCountByTag(filterTag) {
    if (gCountKeySearchMap[filterTag]) gCountKeySearchMap[filterTag]++;
    else gCountKeySearchMap[filterTag] = 1;
}

function getFivePopularKeywords() {
    var countMapCopy = Object.assign({}, gCountKeySearchMap);
    var fourPopKeywords = [];
    for (let i = 0; i < 5; i++) {
        var max = 0;
        for (let keyword in countMapCopy) {
            // console.log(gCountKeySearchMap[keyword]);
            if (countMapCopy[keyword] > max) max = countMapCopy[keyword];
        }
        for (let keyword in countMapCopy) {
            if (countMapCopy[keyword] === max) {
                fourPopKeywords.push(keyword);
                delete countMapCopy[keyword];
                if (fourPopKeywords.length === 5) return fourPopKeywords;
            }
        }
    }
}

function updateText(txt, id) {
    // var canvas = document.getElementById('canvas');
    // var ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // var meme = returnGmeme();
    // var img = getImg(meme.selectedImgId);
    // var newImg = new Image()
    // newImg.src = '' + img.url;
    // console.log(img);
    // newImg.onload = function () {
    //     ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height)
    // }
    var currLine = gMeme.txts[id];
    currLine.line = txt;
    // var imageObj = new Image();
    // imageObj.onload = function(){
    // meme.txts.forEach(line => {
    //     ctx.fillStyle = line.color;
    //     ctx.font = `${line.size}px ${line.font}`;
    //     ctx.globalCompositeOperation = 'source-over';
    //             // // hard-light
    //     ctx.fillText(line.line, line.posX, line.posY);
    // });
    // }
    // var img=getImg(meme.selectedImgId);
    // img.onload();
    // imageObj.src =img.url;
    renderCanvas();
}

function updateImage(id) {
    gMeme.selectedImgId = id;
    renderCanvas();
}

function updateAlignment(direction, id) {
    // console.log(direction, id);
    var lines = gMeme.txts;
    //    console.log(lines[id]);
    lines[id].alignment = direction;
    console.log(lines[id].alignment);
    renderCanvas();
}

// function UpdateSearchKeyCount(imgKeywords) {
//     var img = getImg(imgId);
//     console.log(img);
// }

function creatLineObj() {

    return {
        id: gMeme.txts.length,
        line: '',
        size: 20,
        align: 'left',
        color: 'red',
        font: 'arial',
        posX: 200,
        posY: 200,
        shadow: false,
        alignment: 'center'
    }
}

function addLine(id) {
   //there is one object in global 
    if (id !== 0) {
        var lineObj = creatLineObj();
        gMeme.txts.push(lineObj);
    }
    renderCanvas();
}

function doShadow(id) {
    gMeme.txts[id].shadow = !gMeme.txts[id].shadow;
    renderCanvas();
}


