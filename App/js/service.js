'use strict'


var gImgs = [{ id: 1, url: 'img/angry man.jpg', keywords: ['happy'] }];

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function textStyle(txt) {
    ctx.fillStyle = 'black'
    ctx.font = '50px Arial'
    ctx.fillText(txt, 100, 100)
}

function enlargeText(){
    var text=gMeme.txts;
    var textSize=text.size;
    textSize=textSize++;
    console.log(gMeme);
}
