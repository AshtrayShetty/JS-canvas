const menu_items=[...document.querySelectorAll('#main-menu > div')];
const sub_item_list=[...document.querySelectorAll('ul.menu')];
let visible_menu=[];

const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

//Tells if the mouse cursor is clicked or if the user is only hovering over the canvas
let isDrawing=false;

// To keep track of where the start and stop positions of the stroke are
let lastX=0;
let lastY=0;

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

window.addEventListener('mousemove', function(e){
    document.getElementById('cursor-pos').textContent=`${e.clientX}x${e.clientY}`;
});

let back_fore_color=document.getElementById('foreground');
const back_fore=document.querySelectorAll('.pressed button');
back_fore.forEach(b_f=>{
    b_f.addEventListener('click', ()=>{
        back_fore_color=b_f
        ctx.strokeStyle=back_fore_color.style.backgroundColor;
    });
});

const color_change=document.querySelectorAll(".color");
color_change.forEach(color=>{
    color.addEventListener('click', ()=>{
        let col=color.style.backgroundColor;
        back_fore_color.style.backgroundColor=col;
        ctx.strokeStyle=col;
    });
});

const func_buttons=[...document.querySelectorAll("#buttons button")];

let color_select=document.getElementById('color-select');

function draw(e){
    if(!isDrawing){return;}
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

let pressed=null;
let isErase=false;
let width=10;

ctx.strokeStyle=back_fore_color.style.backgroundColor;
func_buttons.forEach(button=>{
    button.addEventListener('click', ()=>{

        if(button.firstChild===pressed){
            pressed=null;
            button.removeAttribute('id');
        }else{
            pressed=button.firstChild;
            func_buttons.map(button=>button.removeAttribute('id'));
            button['id']='btn-pressed';
        }

        isDrawing=false;
        while(color_select.hasChildNodes()){color_select.removeChild(color_select.firstElementChild);}

        if(button['title']==='Eraser/Color Eraser' && button['id']==='btn-pressed'){

            document.addEventListener('keydown', (e)=>{
                if(e.keyCode===107){++width;}
                if(width!==3 && e.keyCode===109){--width;}
            });

            canvas.addEventListener('mousedown', (e)=>{
                isDrawing=false;
                isErase=true;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.addEventListener('mousemove', (e)=>{
                if(!isErase){return;}
                ctx.clearRect(e.offsetX, e.offsetY, width, width);
            });

            canvas.addEventListener('mouseout', ()=>isErase=false);
            canvas.addEventListener('mouseup', ()=>isErase=false);

        }else if(button['title']==='Pencil' && button['id']==='btn-pressed'){

            ctx.lineCap='round';
            ctx.lineJoin='round';
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;

            canvas.addEventListener('mousedown', (e)=>{
                isDrawing=true;
                isErase=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.addEventListener('mousemove', draw, true);
            canvas.addEventListener('mouseout', ()=>isDrawing=false);
            canvas.addEventListener('mouseup', ()=>isDrawing=false);

        }else if(button['title']==='Brush' && button['id']==='btn-pressed'){

            let round_button_l=document.createElement('button');
            round_button_l.classList.add('inner-div');
            round_button_l.innerHTML='<i class="fas fa-circle"></i>';
            color_select.appendChild(round_button_l);

            let round_button_m=document.createElement('button');
            round_button_m.classList.add('inner-div');
            round_button_m.innerHTML='<i class="fas fa-circle fa-xs"></i>';
            color_select.appendChild(round_button_m);

            let round_button_s=document.createElement('button');
            round_button_s.classList.add('inner-div');
            round_button_s.innerHTML='<i class="fas fa-circle fa-xs"></i>';
            color_select.appendChild(round_button_s);

            let square_button_l=document.createElement('button');
            square_button_l.classList.add('inner-div');
            square_button_l.innerHTML='<i class="fas fa-square-full"></i>';
            color_select.appendChild(square_button_l);

            let square_button_m=document.createElement('button');
            square_button_m.classList.add('inner-div');
            square_button_m.innerHTML='<i class="fas fa-square-full fa-xs"></i>';
            color_select.appendChild(square_button_m);

            let square_button_s=document.createElement('button');
            square_button_s.classList.add('inner-div');
            square_button_s.innerHTML='<i class="fas fa-square-full fa-xs"></i>';
            color_select.appendChild(square_button_s);

            let slash_button_l=document.createElement('button');
            slash_button_l.classList.add('inner-div');
            slash_button_l.style.fontSize="19px";
            slash_button_l.innerHTML='/';
            color_select.appendChild(slash_button_l);

            let slash_button_m=document.createElement('button');
            slash_button_m.classList.add('inner-div');
            slash_button_m.style.fontSize="15px";
            slash_button_m.innerHTML='/';
            color_select.appendChild(slash_button_m);

            let slash_button_s=document.createElement('button');
            slash_button_s.classList.add('inner-div');
            slash_button_s.style.fontSize="11px";
            slash_button_s.innerHTML='/';
            color_select.appendChild(slash_button_s);

            let bslash_button_l=document.createElement('button');
            bslash_button_l.classList.add('inner-div');
            bslash_button_l.style.fontSize="18px"
            bslash_button_l.innerHTML='\\';
            color_select.appendChild(bslash_button_l);

            let bslash_button_m=document.createElement('button');
            bslash_button_m.classList.add('inner-div');
            bslash_button_m.style.fontSize="15px"
            bslash_button_m.innerHTML='\\';
            color_select.appendChild(bslash_button_m);

            let bslash_button_s=document.createElement('button');
            bslash_button_s.classList.add('inner-div');
            bslash_button_s.style.fontSize="11px"
            bslash_button_s.innerHTML='\\';
            color_select.appendChild(bslash_button_s);

            // let pattern;
            ctx.lineWidth=0;

            let button_list=[...document.querySelectorAll('.inner-div')];

            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{
                    button_list.map(button=>button.removeAttribute('id'));
                    button['id']='btn-active';
                    ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;

                    canvas.addEventListener('mousedown', (e)=>{
                        isDrawing=true;
                        isErase=false;
                        [lastX, lastY]=[e.offsetX, e.offsetY];
                    });

                    canvas.addEventListener('mousemove', draw, true);
                    canvas.addEventListener('mouseout', ()=>isDrawing=false);
                    canvas.addEventListener('mouseup', ()=>isDrawing=false);

                    if(button===button_list[0]){
                        ctx.lineWidth=10;
                        ctx.lineJoin='round';
                        ctx.lineCap='round';

                    }else if(button===button_list[1]){
                        ctx.lineWidth=7;
                        ctx.lineJoin='round';
                        ctx.lineCap='round';

                    }else if(button===button_list[2]){
                        ctx.lineWidth=2;
                        ctx.lineJoin='round';
                        ctx.lineCap='round';

                    }else if(button===button_list[3]){
                        ctx.lineWidth=10;
                        ctx.lineJoin='bevel';
                        ctx.lineCap='square';

                    }else if(button===button_list[4]){
                        ctx.lineWidth=7;
                        ctx.lineJoin='bevel';
                        ctx.lineCap='square';

                    }else if(button===button_list[5]){
                        ctx.lineWidth=2;
                        ctx.lineJoin='bevel';
                        ctx.lineCap='square';

                    }else if(button===button_list[6]){
                        // let image=document.createElement('img');
                        // image.src="./images/forward-slash.png";
                        // pattern=ctx.createPattern(image, "repeat");
                        // ctx.strokeStyle=pattern;
                        ctx.lineWidth=10;
                        ctx.lineJoin='mitter';
                        ctx.lineCap='butt';
                        ctx.stroke();

                    }else if(button===button_list[7]){
                        ctx.strokeStyle='/';
                        ctx.lineWidth=7;
                        ctx.lineJoin='mitter';
                        ctx.lineCap='butt';

                    }else if(button===button_list[8]){
                        ctx.strokeStyle='/';
                        ctx.lineWidth=2;
                        ctx.lineJoin='mitter';
                        ctx.lineCap='butt';

                    }else if(button===button_list[9]){
                        ctx.strokeStyle='\\';
                        ctx.lineWidth=10;
                        ctx.lineJoin='mitter';
                        ctx.lineCap='butt';

                    }else if(button===button_list[10]){
                        ctx.strokeStyle='\\';
                        ctx.lineWidth=7;
                        ctx.lineJoin='mitter';
                        ctx.lineCap='butt';

                    }else if(button===button_list[11]){
                        ctx.strokeStyle='\\';
                        ctx.lineWidth=2;
                        ctx.lineJoin='mitter';
                        ctx.lineCap='butt';

                    }
                });
            });

        }else if(button['title']==='Line' && button['id']==='btn-pressed'){
            
            ctx.lineCap='round';
            ctx.lineJoin='round';
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;

            canvas.addEventListener('mousedown', (e)=>{
                isDrawing=true;
                isErase=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.removeEventListener('mousemove', draw, true);
            canvas.addEventListener('mouseout', ()=>isDrawing=false);
            canvas.addEventListener('mouseup', draw);

        }else{
            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isErase=false;
            });
        }

    });
});
