'use strict'
var gId = 0;
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
            size: 30,
            align: 'left',
            color: 'red',
            font: 'impact',
            posX: 300,
            posY: 100,
            shadow: false,
            alignment: 'center',
            italic:false
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

function moveLine(moveDirection) {
    var line = gMeme.txts[gId];
    console.log(moveDirection);
    if (moveDirection === 'up') line.posY -= 10;
    else if (moveDirection === 'down') line.posY += 10;
    else if (moveDirection === 'left') line.posX -= 10;
    else if (moveDirection === 'right') line.posX += 10;
    renderCanvas();
}

function moveBetweenLines(){
    gId--;
    console.log('betweenn lines in service', gId);
    var lines=gMeme.txts;
    lines.forEach(function(line){
       if(line.id===gId) line.italic=true;
       else line.italic=false;
    });
    if((gId<0) || (gId===0)) gId=gMeme.txts.length-1;

    renderCanvas();
}



// function updatePrev(){
//     gPrev++;
//     var lines=gMeme.txts;
//     if(gPrev>lines.length-1) gPrev=0;
// }



function deleteLine() {//check-----------------------------------------------------
    var lines = gMeme.txts;
    lines.splice(gId, 1);
    renderCanvas();
}



function changeTextSize(sizeChange) {
    console.log('when change text size -gId', gId);
    var lines = gMeme.txts;
    var textSize = lines[gId].size + sizeChange;
    gMeme.txts[gId].size = textSize;
    renderCanvas();
}

function changeFont(font) {

    console.log(font);
    var lines = gMeme.txts;
    lines[gId].font = font;
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

function changeColor(color) {
    gMeme.txts[gId].color = color;
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
function updateIndex() {
    gId++;
}

function updateText(txt,event) {
    console.log('in update text gId is', gId)
    var currLine = gMeme.txts[gId];
    currLine.line = txt;
    renderCanvas();
    if (event.keyCode === 13) {
        console.log('enter presed');
        document.querySelector('.text-input').value = '';
    }

}





function updateImage(id) {
    console.log('in update img-id', id);
    gMeme.selectedImgId = id;
    renderCanvas();
}

function updateAlignment(direction) {
    var lines = gMeme.txts;
    lines[gId].alignment = direction;
    console.log(lines[gId].alignment);
    renderCanvas();
}

function creatLineObj() {

    return {
        id: gMeme.txts.length,
        line: '',
        size: 30,
        align: 'left',
        color: 'black',
        font: 'impact',
        posX: 300,
        posY: 200,
        shadow: false,
        alignment: 'center',
        italic:false
    }
}

function addLine() {
    //there is one object in global 
    if (gId !== 0) {
        var lineObj = creatLineObj();
        gMeme.txts.push(lineObj);
    }
    gId=gMeme.txts.length-1;
    renderCanvas();
}

function doShadow() {
    gMeme.txts[gId].shadow = !gMeme.txts[gId].shadow;
    renderCanvas();
}


