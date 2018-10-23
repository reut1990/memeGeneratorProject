'use strict'

var gImgsFilter = 'all';

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

// getPopularKeywords()

function getPopularKeywords() {
    var popKeywordsMap = {};
    gImgs.forEach((img) => {
        img.keywords.forEach(keyword => {
            if (!popKeywordsMap[keyword]) popKeywordsMap[keyword] = 1;
            else popKeywordsMap[keyword]++;
        })
    })

    for (var key in popKeywordsMap) {
        var max = 0;
        var output = [];
        for (var key in popKeywordsMap) {
            if (popKeywordsMap[key] > max) {
                max = popKeywordsMap[key];
                output = [key];
            } else if (popKeywordsMap[key] === max) {
                output.push(key);
            }
        }
    }
}

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

function enlargeText() {
    var text = gMeme.txts;
    var textSize = text.size;
    textSize = textSize++;
    console.log(gMeme);
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