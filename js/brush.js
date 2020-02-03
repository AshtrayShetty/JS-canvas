var color_select=document.getElementById('color-select');

while(document.getElementById('color-select').hasChildNodes()){
    document.getElementById('color-select').removeChild(document.getElementById('color-select').firstElementChild);
}

var round_button_l=document.createElement('button');
round_button_l.classList.add('inner-div');
round_button_l.innerHTML='<i class="fas fa-circle"></i>';
color_select.appendChild(round_button_l);

var round_button_m=document.createElement('button');
round_button_m.classList.add('inner-div');
round_button_m.innerHTML='<i class="fas fa-circle fa-xs"></i>';
color_select.appendChild(round_button_m);

var round_button_s=document.createElement('button');
round_button_s.classList.add('inner-div');
round_button_s.innerHTML='<i class="fas fa-circle fa-xs"></i>';
color_select.appendChild(round_button_s);

var square_button_l=document.createElement('button');
square_button_l.classList.add('inner-div');
square_button_l.innerHTML='<i class="fas fa-square-full"></i>';
color_select.appendChild(square_button_l);

var square_button_m=document.createElement('button');
square_button_m.classList.add('inner-div');
square_button_m.innerHTML='<i class="fas fa-square-full fa-xs"></i>';
color_select.appendChild(square_button_m);

var square_button_s=document.createElement('button');
square_button_s.classList.add('inner-div');
square_button_s.innerHTML='<i class="fas fa-square-full fa-xs"></i>';
color_select.appendChild(square_button_s);

var slash_button_l=document.createElement('button');
slash_button_l.classList.add('inner-div');
slash_button_l.style.fontSize="19px";
slash_button_l.innerHTML='/';
color_select.appendChild(slash_button_l);

var slash_button_m=document.createElement('button');
slash_button_m.classList.add('inner-div');
slash_button_m.style.fontSize="15px";
slash_button_m.innerHTML='/';
color_select.appendChild(slash_button_m);

var slash_button_s=document.createElement('button');
slash_button_s.classList.add('inner-div');
slash_button_s.style.fontSize="11px";
slash_button_s.innerHTML='/';
color_select.appendChild(slash_button_s);

var bslash_button_l=document.createElement('button');
bslash_button_l.classList.add('inner-div');
bslash_button_l.style.fontSize="18px"
bslash_button_l.innerHTML='\\';
color_select.appendChild(bslash_button_l);

var bslash_button_m=document.createElement('button');
bslash_button_m.classList.add('inner-div');
bslash_button_m.style.fontSize="15px"
bslash_button_m.innerHTML='\\';
color_select.appendChild(bslash_button_m);

var bslash_button_s=document.createElement('button');
bslash_button_s.classList.add('inner-div');
bslash_button_s.style.fontSize="11px"
bslash_button_s.innerHTML='\\';
color_select.appendChild(bslash_button_s);

var button_list=[...document.querySelectorAll('.inner-div')];
button_list.forEach(button=>{
    button.addEventListener('click', ()=>{
        button_list.map(button=>button.removeAttribute('id'));
        button['id']='btn-active';
    });
});

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

document.querySelector('.fa-pencil-alt').parentNode.addEventListener('click', ()=>{
    delete color_select;
    delete round_button_l;
    delete round_button_m;
    delete round_button_s;
    delete square_button_l;
    delete square_button_m;
    delete square_button_s;
    delete slash_button_l;
    delete slash_button_m;
    delete slash_button_s;
    delete bslash_button_l;
    delete bslash_button_m;
    delete bslash_button_s;
});