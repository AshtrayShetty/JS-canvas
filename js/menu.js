const menu_items=[...document.querySelectorAll('#main-menu > div')];
const sub_item_list=[...document.querySelectorAll('ul.menu')];
let visible_menu=[];
//unsure how else to achieve this without global scope, I cannot bind to the event listener as I will not be able to remove the event listener
let imageData = new Image();

menu_items.forEach(item=>{
    item.querySelector('li').addEventListener('click', ()=>{
        if(visible_menu.length!==0){
            let to_hide=visible_menu.shift();
            to_hide.querySelector('li').classList.remove('active');
            to_hide.querySelector('ul.menu').style.visibility="hidden";
            if(to_hide===item){return;}
        }
        sub_item_list[menu_items.indexOf(item)].style.visibility="visible";
        visible_menu.push(menu_items[menu_items.indexOf(item)]);
        item.querySelector('li').classList.add('active');   
    });
});

canvas.addEventListener('click', ()=>{
    //moved to own functions to use on image load
    closeMenus();
});

//moved to function to use on image load
function closeMenus(){
    let to_inactive=visible_menu.shift();
    to_inactive.querySelector('li').classList.remove('active');
    sub_item_list.map(sub_item=>sub_item.style.visibility="hidden");
}

window.addEventListener('mousemove', (e)=>document.getElementById('cursor-pos').textContent=`${e.clientX}x${e.clientY}`);

function colorChange(){
    document.getElementById('foreground').style.backgroundColor=document.getElementById('head')['value'];
};

function newCanvas(){window.location.reload();}

let clicks=false;

document.getElementById("flip").addEventListener('click', ()=>{
    clicks=(!clicks);
    canvas.style.transform=`rotate(${90*clicks}deg)`;
    if(clicks){
        canvas.style.height="1466px";
        canvas.style.width="610px";
        canvas.style.position="absolute";
        canvas.style.top="-403px";
        canvas.style.left="32.45%";
    }else{
        canvas.style.height="610px";
        canvas.style.width="1466px";
        canvas.style.top="25px";
        canvas.style.left="70px";
    }
});

function invertColors(){
    for(let i=0; i<=610; ++i){
        for(j=0; j<=1466; ++j){
            let data=ctx.getImageData(j, i, 1, 1).data;
            if(data[0]===0 && data[1]===0 && data[2]===0 && data[3]===0){ctx.fillStyle=`rgb(${data[0]}, ${data[1]}, ${data[2]})`;}
            else{ctx.fillStyle=`rgb(${255-data[0]}, ${255-data[1]}, ${255-data[2]})`;}
            ctx.fillRect(j, i, 1, 1);
        }
    }
}

document.getElementById('save').addEventListener('click', (e)=>{
    document.getElementById('save').href=canvas.toDataURL();
    document.getElementById('save').download="js_canvas.png";
});

document.getElementById('zoom').addEventListener('click', ()=>{
    let zoomed=canvas.style.transform==="scale(1.4)"?true:false;

    if(!zoomed){
        canvas.style.transform='scale(1.4)';
        canvas.style.left='364px';
        canvas.style.top='147px';
    }else if(zoomed){
        canvas.style.transform='scale(1)';
        canvas.style.left='70px';
        canvas.style.top='25px';
    }
    zoomed=!zoomed;
});

function clearCanvas(){ctx.clearRect(0, 0, 1466, 610);}

function toggleToolBox(){
    document.getElementById('sidebar').classList.toggle('toggleToolBox');
    document.getElementById('canvas').classList.toggle('canvas-left');
}

function toggleColorBox(){
    document.getElementById('bottom').classList.toggle('toggleColorBox');
    document.getElementById('sidebar').style.height='93.4vh';
}

function toggleStatusBar(){
    document.getElementById('status-bar').classList.toggle('toggleStatusBar');
}


//when clicking the open option in the menu
function openFile() {
    //create a file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    //detect image selected
    input.addEventListener("change", (event) => {
      readSelectedImage(event.target.files[0]);
      input.remove();
    });

  }
  
function readSelectedImage(uploadedImage) {
    //create a new file reader
    const fReader = new FileReader();
    //listen for the load event of the file
    fReader.onload = (e) => {
        //1st try commented out
        //let imageData = new Image();
        imageData.onload = () => {
            closeMenus();
        //1st iteration, promp user for coordinates
        // const x = window.prompt('X pos');
        // const y = window.prompt('Y pos');
        //loadImageOntoCanvas(imageData,x,y);

            const drawRatios = calculateImageRatios(imageData.width,imageData.height);
        //after selecting an image show an empty div highlighting where the image will be placed
            const imgPlacementDiv = document.querySelector('#image-placement'); 
            imgPlacementDiv.style.width = drawRatios.width + 'px';
            imgPlacementDiv.style.height = drawRatios.height + 'px';
            imgPlacementDiv.style.display = "block";
            //update the image 'preview' div position on mopusemove
            canvas.addEventListener('mousemove', updateImagePlacementDiv);
            //place the image on the canvas
            canvas.addEventListener('click',imagePlaceClick);
        };
        //set the image src to trigger the load
        imageData.src = e.target.result;
    };
    //pass the data to the filereader
    fReader.readAsDataURL(uploadedImage);
}

//after selecting an image show an empty div highlighting where the image will be placed
function updateImagePlacementDiv(e){
    const imgPlacementDiv = document.querySelector('#image-placement'); 
    const x = e.clientX;
    const y = e.clientY;
    imgPlacementDiv.style.top = y + 'px';
    imgPlacementDiv.style.left = x + 'px';
}

//get the x and Y position of the click, hide the preview div again and remove the event listeners
function imagePlaceClick(e){
    const x = e.clientX - 70;
    const y = e.clientY - 25;
    loadImageOntoCanvas(imageData,x,y);
    canvas.removeEventListener('click', imagePlaceClick);
    canvas.removeEventListener('mousemove', updateImagePlacementDiv);
    document.querySelector('#image-placement').style.display = "none";
}

//put the image on the canvas
function loadImageOntoCanvas(image, x, y) {
    const drawRatios = calculateImageRatios(image.width,image.height);

    ctx.drawImage(image, x, y, drawRatios.width, drawRatios.height);
}

//cresize the image and 'preview' if required.
function calculateImageRatios(width,height){
    //set the default value for small images
    let drawWidth = width;
    let drawHeight = height;
    //check if the image is too wide, if so resize the to the canvas width
    if(width > canvas.width){
        ratio = canvas.width / width;
        drawWidth = canvas.width;
        drawHeight = height * ratio;
    }
    //check if the imagge is too tall, if so resize to the canvas height
    if(height > canvas.height){
        ratio = canvas.height / height;
        drawHeight = canvas.height;
        drawWidth = width * ratio;
    }
    //return the new values
    return {
        width:drawWidth,
        height:drawHeight
    };
}