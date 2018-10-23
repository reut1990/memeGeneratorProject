
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
        <img src=${img.url} alt="">
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

function creatLine(txt) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var text = gMeme.txts[0];
    text.line = txt;
    ctx.fillStyle = text.color;
    ctx.font = `${text.size}px ${text.font}`
    ctx.fillText(txt, 100, 100)
}

