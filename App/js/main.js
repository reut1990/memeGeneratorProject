//global only to this page--------------good????????
var gId = 0;

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
        <img onclick="onClickImage(${img.id})"  src=${img.url} alt="">
    </li>
        `;
    }
    elImgcontainer.innerHTML = strHtmls;
}

function renderEditor() {
    var elcontainer = document.querySelector('.editor-container');
    var strHtmls = `
       <input class="text-input" type="text" placeholder="Enter Text" oninput="onDrawText(this.value, ${gId})" />
       <div class="buttons-edit">
        <div class="delete" onclick="onDeleteLine(${gId})">🗑</div>
        <div class="text-style">
            <input type="color" id="html5colorpicker" onchange="onClickColor(this.value, ${gId})" value="#ff0000" style="width:25%;">
            <div onclick="onDoShadow(${gId})" class="shadow">-Å-</div>
            <div class="dropup font">
            <button class="dropbtn">font</button>
            <div class="dropup-content">
              <div onclick="onFont('cursive',${gId})">cursive</div>
              <div onclick="onFont('fantasy',${gId})">fantasy</div>
              <div onclick="onFont('david',${gId})">david</div>
            </div>
        </div>
        </div>
        <div class="text-size">
            <div onclick="onBiggerText(${gId}, 1)" class="biggerText">➕</div>
            <div onclick="onSmallerText(${gId},-1)" class="smallerText">➖</div>
        </div>
        <div class="alignment"><div onclick="onAlignText('left', ${gId})">left</div><div onclick="onAlignText('center', ${gId})">center</div><div onclick="onAlignText('right', ${gId})">right</div></div>
        <div class="add-line" onClick="onAddLine()">add-line</div>
    </div>
     `;

    elcontainer.innerHTML = strHtmls;

}

function onClickCanvas(event){
   findLineClicked(event);
}

function onFont(font,id){
    changeFont(font,id);
}

function onBiggerText(id, sizeChange) {
    changeTextSize(id, sizeChange);

}
function onSmallerText(id, sizeChange) {
    changeTextSize(id, sizeChange);
}
function onClickColor(color, id) {
    changeColor(color, id);
}

function onDrawText(txt, id) {
    updateText(txt, id);
}

function onClickImage(id) {
    updateImage(id);
    saveToStorage('CountKeySearchMap', getFivePopularKeywords());
}

function onDoShadow(txt, id) {
    doShadow(txt, id);
}

function onAddLine() {
    addLine(gId);
    document.querySelector('.text-input').value = '';
    gId++;
}

function onAlignText(direction, id) {
    updateAlignment(direction, id);
}

function onDeleteLine(id) {
    deleteLine(id);
}

// function renderNewLineEditor() {
//     var meme = returnGmeme();
//     var lines = meme.txts;
//     document.querySelector('.container').innerHTML += editorSection(lines.length - 1);
// }


function renderCanvas() {
    var meme = returnGmeme();
    var img = getImg(meme.selectedImgId);
    var imgSrc = img.url;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var newImg = new Image()
    newImg.src = imgSrc;
    newImg.onload = function () {
        ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
        // ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
        //     0, 0, canvas.width, canvas.height); // destination rectangle);
        meme.txts.forEach(line => {
            ctx.fillStyle = line.color;
            ctx.font = `${line.size}px ${line.font}`;
            console.log(line.alignment);
            ctx.textAlign = `${line.alignment}`;
            // ctx.globalCompositeOperation = 'source-over';
            //         // // hard-light
            addShadowToCanvas(line.shadow, ctx);
            ctx.fillText(line.line, canvas.width/2, canvas.height/2);
        });

    }
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'none';
    var elShowBtn = document.querySelector('.show-list');
    elShowBtn.style.display = 'inline';
    var elDownload = document.querySelector('.download');
    elDownload.style.display = 'inline-block';
    var elEditor = document.querySelector('.editor-container');
    elEditor.style.display = 'flex';
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = 'flex';
    renderTags();
    onUpdateSearchKeyCount(meme.selectedImgId);
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
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'inline-block';
    var elShowBtn = document.querySelector('.show-list');
    elShowBtn.style.display = 'none';
    var elDownload = document.querySelector('.download');
    elDownload.style.display = 'none';
    var elEditor = document.querySelector('.editor-container');
    elEditor.style.display = 'none';
    var elCanvas = document.querySelector('.canvas');
    elCanvas.style.display = 'none';
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
        <span class="size-${i + 1}" onclick="onGetImgs('${fiveKeywords[i]}')">${fiveKeywords[i]}</span>`;
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

function addAlignmentToCanvas(direction, ctx) {

}
