// function onBiggerText(){
//    enlargeText();
// }
// function onSmallerText(){
// }

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


