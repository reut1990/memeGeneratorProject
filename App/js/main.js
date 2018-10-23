function onBiggerText(){
   enlargeText();
}
function onSmallerText(){
}

function renderProjs() {
    var elPortfolioContainer = document.querySelector('.img-container');
    var imgs = getImgs();
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


