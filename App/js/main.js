
function init() {
    onSetFilter('all');
}

function onSetFilter(statusFilter) {
    var imgs = getImgs(statusFilter);
    renderImgs(imgs);
}

function renderImgs(imgs) {
    var elPortfolioContainer = document.querySelector('.img-container');
    console.log(imgs);
    var strHtmls = '';
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        strHtmls += `
        <li>
        <img onclick="drawImage(${img.id})" src=${img.url} alt="">
    </li>
        `;
    }
    elPortfolioContainer.innerHTML = strHtmls;
}

function onBiggerText() {
    enlargeText();

}
function onSmallerText() {
    decreaseText();
}
function onClickColor(color) {
       console.log(color);
       changeColor(color);
}

function drawText(txt) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var memes=returnGmeme();
    drawImage(memes.id);
    var text = gMeme.txts[0];
    text.line = txt;
    ctx.fillStyle = text.color;
    ctx.font = `${text.size}px ${text.font}`;
    ctx.globalCompositeOperation='destination-over';
    // ctx.zIndex=3;
    ctx.fillText(txt, 100, 100)
}

function drawImage(id) {
    var imgSrc= getSrc(id);
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    console.log(imgSrc);
    var newImg = new Image()
    newImg.src = ''+imgSrc;
    newImg.onload = function() {
        ctx.drawImage(newImg, 0, 0 ,canvas.width, canvas.height)
    }
   var elGallery=document.querySelector('.gallery');
   elGallery.style.display='none';
   var elShowBtn=document.querySelector('.show-list');
   elShowBtn.style.display='inline';
   var elDownload=document.querySelector('.download');
   elDownload.style.display='inline-block';

}

function onShowList(){
    var elGallery=document.querySelector('.gallery');
    elGallery.style.display='inline-block';
    var elShowBtn=document.querySelector('.show-list');
   elShowBtn.style.display='none';
   var elDownload=document.querySelector('.download');
   elDownload.style.display='none';
}