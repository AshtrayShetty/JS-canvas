while(document.getElementById('color-select').hasChildNodes()){
    document.getElementById('color-select').removeChild(document.getElementById('color-select').firstElementChild);
}

ctx.strokeStyle=`${document.getElementById('foreground').style.backgroundColor}`;

document.querySelectorAll('.color').forEach(color=>{
    color.addEventListener('click', ()=>ctx.strokeStyle=`${color.style.backgroundColor}`);
});

document.getElementById('foreground').addEventListener('click', ()=>ctx.strokeStyle=`${document.getElementById('foreground').style.backgroundColor}`);

ctx.lineCap='round';
ctx.lineJoin='round';

// Increase width of line -> Use ctx.lineWidth 
ctx.lineWidth=1;

function draw(e){
    if(!isDrawing){return;}
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