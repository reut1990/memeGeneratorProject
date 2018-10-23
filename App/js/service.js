'use strict'


var gImgs = [   
    { id: 1, url: 'img/angry-man.jpg', keywords: ['angry'] },
    { id: 2, url: 'img/baby-dog.jpg', keywords: ['cute'] },
    { id: 3, url: 'img/baby-winner.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/babys-dance.jpg', keywords: ['happy', 'cute'] },
    { id: 5, url: 'img/buz.jpg', keywords: ['sure'] },
    { id: 6, url: 'img/dancing.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/evil-baby.jpg', keywords: ['evil'] },
    { id: 8, url: 'img/fight-kiss.jpg', keywords: ['cute'] },
    { id: 9, url: 'img/floor-pupy.jpg', keywords: ['cute'] },
    { id: 10, url: 'img/haim-hecht.jpg', keywords: ['sure'] },
    { id: 11, url: 'img/hair-guy.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/hand-on-face-guy.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/hat-guy.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/king-exectly.jpg', keywords: ['sure'] },
    { id: 15, url: 'img/leonardo-glass.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/morphius-look.jpg', keywords: ['sure'] },
    { id: 17, url: 'img/mr-evil.jpg', keywords: ['evil', 'sure'] },
    { id: 18, url: 'img/obama.jpg', keywords: ['happy'] },
    { id: 19, url: 'img/opras-joy.jpg', keywords: ['happy'] },
    { id: 20, url: 'img/pappy.jpg', keywords: ['cute'] },
    { id: 21, url: 'img/putin-finger.jpg', keywords: ['sure'] },
    { id: 22, url: 'img/sleeping-cat.jpg', keywords: ['cute'] },
    { id: 23, url: 'img/suprised-baby.jpg', keywords: ['cute'] },
    { id: 24, url: 'img/trump-finger.jpg', keywords: ['sure'] },
    { id: 25, url: 'img/trump-finger-2.jpg', keywords: ['sure'] },
];

function getImgs() {
    return gImgs;
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