//global only to this page!
//I added global on the second page, they both update at the same tim

function init() {
    var canvas = document.querySelector('#canvas');
    canvas.width = window.innerWidth / 1.5;
    canvas.height = window.innerHeight / 1.5;
    onGetImgs('all');
    autocomplete(document.querySelector(".myInput"));
    renderEditor();
}

function onGetImgs(filterTag) {
    var imgs = getImgs(filterTag);
    renderImgs(imgs);
    UpdateSearchKeyCountByTag(filterTag);
    renderTags();
    saveToStorage('CountKeySearchMap', getFivePopularKeywords());
}

function renderImgs(imgs) {
    var elImgcontainer = document.querySelector('.img-container');
    var strHtmls = '';
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        strHtmls += `
        <li>
        <img class="meme-img" onclick="onClickImage(${img.id})"  src=${img.url} alt="">
    </li>
        `;
    }
    elImgcontainer.innerHTML = strHtmls;
}


function renderEditor() {
    var elcontainer = document.querySelector('.editor-container');
    var strHtmls = `
       <input class="text-input" type="text" placeholder="Enter Text" oninput="onDrawText(this.value,event)" />
    <div class="buttons-edit">
        <div class="delete" onclick="onDeleteLine()">🗑</div>
        <div class="text-style">
            <input type="color" id="html5colorpicker" onchange="onClickColor(this.value)" value="#ff0000" style="width:25%;">
                <div onclick="onDoShadow()" class="shadow">S</div>
                <div class="dropup font">
                    <button class="dropbtn">font</button>
                    <div class="dropup-content">
                        <div onclick="onFont('cursive')">cursive</div>
                        <div onclick="onFont('arial')">arial</div>
                        <div onclick="onFont('impact')">impact</div>
                    </div>
                </div>
        </div>
            <div class="text-size">
                <div onclick="onBiggerText( 1)" class="biggerText">➕</div>
                <div onclick="onSmallerText(-1)" class="smallerText">➖</div>
            </div>
            <div class="alignment">
                <div class="alignLeft" onclick="onAlignText('right')">left</div>
                <div class="alignCenter" onclick="onAlignText('center')">center</div>
                <div class="alignRight" onclick="onAlignText('left')">right</div>
            </div>
            <div class="add-line" onClick="onAddLine()">add-line</div>
            <div class="arrows">
                <div class="right" onClick="onMoveLine( 'right')"> → </div>
                <div class="left" onClick="onMoveLine( 'left')"> ← </div>
                <div class="down" onClick="onMoveLine('down')">↓</div>
                <div class="Up" onClick="onMoveLine('up')">↑</div>
            </div>
        </div> 
        <div class="moveToLines" onClick="onMoveBetweenLines()">Move to Previous lines</div>

        `;

    elcontainer.innerHTML = strHtmls;

}

function onMoveBetweenLines() {
    moveBetweenLines();
    //    updatePrev();
    //    var meme = returnGmeme();
    //    if(gPrevious>meme.txts.length-1) gPrevious=0;
}

function onMoveLine(moveDirecton) {
    console.log(moveDirecton);
    moveLine(moveDirecton);
}

function onFont(font) {
    changeFont(font);
}

function onBiggerText(sizeChange) {
    changeTextSize(sizeChange);

}
function onSmallerText(sizeChange) {
    changeTextSize(sizeChange);
}
function onClickColor(color) {
    changeColor(color);
}

function onDrawText(txt, event) {
    updateText(txt, event);
}

function onClickImage(id) {
    updateImage(id);
    saveToStorage('CountKeySearchMap', getFivePopularKeywords());
    hideAllForEditor();
}

function onDoShadow(txt) {
    doShadow(txt);
}

function onAddLine() {
    // var lineValue = document.querySelector('.text-input').value;
    updateIndex();
    addLine();
    document.querySelector('.text-input').value = '';
}



function onAlignText(direction) {
    updateAlignment(direction);
}

function onDeleteLine() {
    deleteLine();
}

// function renderNewLineEditor() {
//     var meme = returnGmeme();
//     var lines = meme.txts;
//     document.querySelector('.container').innerHTML += editorSection(lines.length - 1);
// }

function AddItalic(italic, ctx, line) {
    if (italic === true) ctx.font = `italic ${line.size}px ${line.font}`;
    else ctx.font = `${line.size}px ${line.font}`;
}

function renderCanvas() {
    var meme = returnGmeme();
    var img = getImg(meme.selectedImgId);
    console.log('img.id in render', img.id);
    var imgSrc = img.url;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var newImg = new Image()
    newImg.src = imgSrc;
    let ratio = newImg.width / newImg.height;
    canvas.width = newImg.width;
    canvas.height = newImg.height;
    if (newImg.width > 500) {
        newImg.width = 500;
        canvas.width = 500;
        canvas.height = newImg.width / ratio;
    }
    else if (window.innerWidth < 500) {
        // if (newImg.width > 500) {
        //     newImg.width = 300;
        //     canvas.width = 300;
        //     canvas.height = newImg.width / ratio;
        // }
    }
    newImg.onload = function () {
        ctx.drawImage(newImg, 0, 0, newImg.width, newImg.width / ratio);
        meme.txts.forEach(line => {
            ctx.fillStyle = line.color;
            ctx.textAlign = `${line.alignment}`;
            addShadowToCanvas(line.shadow, ctx);
            AddItalic(line.italic, ctx, line);
            ctx.fillText(line.line, line.posX, line.posY);
        });

    }

    renderTags();
    onUpdateSearchKeyCount(meme.selectedImgId);
}


function hideAllForEditor() {
    var elMain = document.querySelector('.main-container');
    elMain.style.display = 'none';
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add("display-none");
    var elAbout = document.querySelector('.about-container');
    elAbout.classList.add("display-none");
    var elcontact = document.querySelector('.contact-container');
    elcontact.style.display = 'none';
    var elShowBtn = document.querySelector('.show-list');
    elShowBtn.style.display = 'inline';
    var elDownload = document.querySelector('.download');
    elDownload.style.display = 'inline-block';
    var elEditor = document.querySelector('.editor-container');
    elEditor.style.display = 'flex';
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = 'flex';
}

// function DynamicText(img) {
//     document.getElementById('name').addEventListener('keyup', function() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       DrawOverlay(img);
//       DrawText(); 
//       text_title = this.value;
//       ctx.fillText(text_title, 50, 50);
//     });
//   }

function onShowList() {
    console.log('inside onShowList')
    var elMain = document.querySelector('.main-container');
    elMain.style.display = 'flex';
    var elAbout = document.querySelector('.about-container');
    elAbout.classList.remove("display-none");
    var elcontact = document.querySelector('.contact-container');
    elcontact.classList.remove("display-none");
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.remove("display-none");
    var elShowBtn = document.querySelector('.show-list');
    elShowBtn.style.display = 'none';
    var elDownload = document.querySelector('.download');
    elDownload.style.display = 'none';
    var elEditor = document.querySelector('.editor-container');
    elEditor.style.display = 'none';
    clearCanvas();
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = 'none';
}

function clearCanvas() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


function autocomplete(inp) {
    var arr = createKeyArr();
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    onGetImgs(inp.value);
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function onUpdateSearchKeyCount(imgId) {
    UpdateSearchKeyCount(imgId);
}

function renderTags() {
    var fiveKeywords = getFromStorage('CountKeySearchMap');
    if (!fiveKeywords) fiveKeywords = getFivePopularKeywords();
    var eltagsContainer = document.querySelector('.tags');
    var strHtmls = '';
    for (var i = 0; i < fiveKeywords.length; i++) {
        strHtmls += `
        <span class="size-${i + 1} tag" onclick="onGetImgs('${fiveKeywords[i]}')">${fiveKeywords[i]}</span>`;
    }
    eltagsContainer.innerHTML = strHtmls;
}

function addShadowToCanvas(isShadow, ctx) {
    if (isShadow) {
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    } else {
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
    }
}


// function addAlignmentToCanvas(direction, ctx) {

// }


function scrollToGallery() {
    onShowList();
    document.querySelector('.nav-container').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToAbout() {
    onShowList();
    document.querySelector('.about-container').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToContact() {
    onShowList();
    document.querySelector('.contact-container').scrollIntoView({
        behavior: 'smooth'
    });
}

function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    mainMenu.classList.toggle('open');
}
