const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

ctx.strokeStyle=`${document.getElementById('foreground').style.backgroundColor}`;
ctx.lineCap='round';
ctx.lineJoin='round';

// Increase width of line -> Use ctx.lineWidth 
ctx.lineWidth=1;

let isDrawing=false; //Tells if the mouse cursor is clicked or if the user is only hovering over the canvas

// To keep track of where the start and stop positions of the stroke are
let lastX=0;
let lastY=0;

function draw(e){
    if(!isDrawing){return;}
    console.log(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e)=>{
    isDrawing=true;
    [lastX, lastY]=[e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', ()=>isDrawing=false);
canvas.addEventListener('mouseup', ()=>isDrawing=false);