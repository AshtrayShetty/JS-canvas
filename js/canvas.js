const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

// To keep track of where the start and stop positions of the stroke are
let lastX=0;
let lastY=0;

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

function draw_rect(e){
    if(!isRect){return;}
    ctx.strokeRect(lastX, lastY, e.offsetX-lastX, e.offsetY-lastY);
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

function draw_border_fill_rect(e){
    if(!isRect){return;}
    ctx.lineWidth=2;
    ctx.strokeRect(lastX, lastY, e.offsetX-lastX, e.offsetY-lastY);
    ctx.fillStyle="white";
    if(e.offsetX>lastX && e.offsetY<lastY){
        ctx.fillRect(lastX+1, e.offsetY+1, Math.abs(e.offsetX-lastX-2), Math.abs(e.offsetY-lastY+2));
    }else if(e.offsetX<lastX && e.offsetY<lastY){
        ctx.fillRect(e.offsetX+1, e.offsetY+1, Math.abs(e.offsetX-lastX+2), Math.abs(e.offsetY-lastY+2));
    }else if(e.offsetX<lastX && e.offsetY>lastY){
        ctx.fillRect(e.offsetX+1, lastY+1, Math.abs(e.offsetX-lastX+2), Math.abs(e.offsetY-lastY-2));
    }else{
        ctx.fillRect(lastX+1, lastY+1, e.offsetX-lastX-2, e.offsetY-lastY-2);
    }
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

function draw_fill_rect(e){
    if(!isRect){return;}
    ctx.fillStyle=document.getElementById('foreground').style.backgroundColor;
    ctx.fillRect(lastX, lastY, e.offsetX-lastX, e.offsetY-lastY);
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

function draw_border_fill_ellipse(e){
    if(!isEllipse){return;}
    let x_center=e.offsetX<lastX?e.offsetX+(Math.abs(e.offsetX-lastX)/2):lastX+(Math.abs(e.offsetX-lastX)/2);
    let y_center=e.offsetY<lastY?e.offsetY+(Math.abs(e.offsetY-lastY)/2):lastY+(Math.abs(e.offsetY-lastY)/2);
    ctx.beginPath();
    ctx.ellipse(x_center, y_center, Math.abs(e.offsetX-lastX), Math.abs(e.offsetY-lastY), 0, 0, 2*Math.PI);
    ctx.stroke();
}

let pressed=null;
let width=10;

//Tells if the mouse cursor is clicked or if the user is only hovering over the canvas
let isDrawing=false;
let isErase=false;
let isRect=false;
let isEllipse=false;


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
                // isLine=false;
                isRect=false;
                isErase=true;
                isEllipse=false;
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
                isRect=false;
                isEllipse=false;
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
            canvas.addEventListener('mousedown', ()=>{
                isErase=false;
                // isLine=false;
                isRect=false;
                isEllipse=false;
            });

            let button_list=[...document.querySelectorAll('.inner-div')];

            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{
                    button_list.map(button=>button.removeAttribute('id'));
                    button['id']='btn-active';
                    ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;

                    canvas.addEventListener('mousedown', (e)=>{
                        isDrawing=true;
                        isErase=false;
                        isRect=false;
                        isEllipse=false;
                        [lastX, lastY]=[e.offsetX, e.offsetY];
                    });

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

                    canvas.addEventListener('mousemove', draw, true);
                    canvas.addEventListener('mouseout', ()=>isDrawing=false);
                    canvas.addEventListener('mouseup', ()=>isDrawing=false);

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
                isRect=false;
                isEllipse=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.removeEventListener('mousemove', draw, true);
            canvas.addEventListener('mouseout', ()=>isDrawing=false);
            canvas.addEventListener('mouseup', draw, true);

        }else if(button['title']==='Rectangle' && button['id']==='btn-pressed'){

            let rect_borderless=document.createElement('button');
            rect_borderless.classList.add('inner-div');
            rect_borderless.innerHTML="<img src='./images/rectangle.png'>";
            rect_borderless.firstElementChild.style.width='34px';
            rect_borderless.style.width='44px';
            rect_borderless.firstElementChild.style.height='20px';
            rect_borderless.style.marginLeft='2px';
            color_select.appendChild(rect_borderless);

            let rect_border=document.createElement('button');
            rect_border.classList.add('inner-div');
            rect_border.innerHTML="<img src='./images/border-rectangle.png'>";
            rect_border.style.position='absolute';
            rect_border.style.top='30px';
            rect_border.style.left='2px';
            rect_border.firstElementChild.style.width='34px';
            rect_border.style.width='44px';
            rect_border.firstElementChild.style.height='15px';
            color_select.appendChild(rect_border);

            let rect_fill=document.createElement('button');
            rect_fill.classList.add('inner-div');
            rect_fill.innerHTML="<img src='./images/fill-rectangle.png'>";
            rect_fill.style.position='absolute';
            rect_fill.style.top='57px';
            rect_fill.style.left='2px';
            rect_fill.firstElementChild.style.width='34px';
            rect_fill.style.width='44px';
            rect_fill.firstElementChild.style.height='15px';
            color_select.appendChild(rect_fill);
            
            let button_list=[...document.querySelectorAll('.inner-div')];
            
            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{

                    button_list.map(button=>button.removeAttribute('id'));
                    button_list[0].innerHTML="<img src='./images/rectangle.png'>";
                    button_list[0].firstElementChild.style.width='38px';
                    button_list[0].firstElementChild.style.height='20px';
                    button['id']='btn-active';
                    
                    canvas.addEventListener('mousedown', (e)=>{
                        isRect=true;
                        isDrawing=false;
                        isErase=false;
                        isEllipse=false;
                        [lastX, lastY]=[e.offsetX, e.offsetY];
                    });
                    canvas.addEventListener('mouseout', ()=>isRect=false);
                    
                    if(button===button_list[0]){
                        button.innerHTML="<img src='./images/white-border-rect.png'>";
                        button.firstElementChild.style.width='38px';
                        button.firstElementChild.style.height='20px';
                        canvas.removeEventListener('mouseup', draw_border_fill_rect, true);
                        canvas.removeEventListener('mouseup', draw_fill_rect, true);
                        canvas.addEventListener('mouseup', draw_rect, true);

                    }else if(button===button_list[1]){
                        canvas.removeEventListener('mouseup', draw_rect, true);
                        canvas.removeEventListener('mouseup', draw_fill_rect, true);
                        canvas.addEventListener('mouseup', draw_border_fill_rect, true);
                        
                    }else if(button===button_list[2]){
                        canvas.removeEventListener('mouseup', draw_rect, true);
                        canvas.removeEventListener('mouseup', draw_border_fill_rect, true);
                        canvas.addEventListener('mouseup', draw_fill_rect, true);
                    }

                });

            });
            
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;

        }else if(button['title']==='Ellipse' && button['id']==='btn-pressed'){
            let ellipse_borderless=document.createElement('button');
            ellipse_borderless.classList.add('inner-div');
            ellipse_borderless.innerHTML="<img src='./images/ellipse_borderless.png'>";
            ellipse_borderless.firstElementChild.style.width='34px';
            ellipse_borderless.style.width='44px';
            ellipse_borderless.firstElementChild.style.height='20px';
            ellipse_borderless.style.marginLeft='2px';
            color_select.appendChild(ellipse_borderless);

            let ellipse_border=document.createElement('button');
            ellipse_border.classList.add('inner-div');
            ellipse_border.innerHTML="<img src='./images/ellipse_borderless.png'>";
            ellipse_border.style.position='absolute';
            ellipse_border.style.top='30px';
            ellipse_border.style.left='2px';
            ellipse_border.firstElementChild.style.width='34px';
            ellipse_border.style.width='44px';
            ellipse_border.firstElementChild.style.height='15px';
            color_select.appendChild(ellipse_border);

            let ellipse_fill=document.createElement('button');
            ellipse_fill.classList.add('inner-div');
            ellipse_fill.innerHTML="<img src='./images/ellipse_fill.png'>";
            ellipse_fill.style.position='absolute';
            ellipse_fill.style.top='57px';
            ellipse_fill.style.left='2px';
            ellipse_fill.firstElementChild.style.width='34px';
            ellipse_fill.style.width='44px';
            ellipse_fill.firstElementChild.style.height='15px';
            color_select.appendChild(ellipse_fill);

            let button_list=[...document.querySelectorAll('.inner-div')];

            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{

                    button_list.map(button=>button.removeAttribute('id'));
                    button_list[0].innerHTML="<img src='./images/rectangle.png'>";
                    button_list[0].firstElementChild.style.width='38px';
                    button_list[0].firstElementChild.style.height='20px';
                    button['id']='btn-active';
                    
                    canvas.addEventListener('mousedown', (e)=>{
                        isEllipse=true;
                        isRect=false;
                        isDrawing=false;
                        isErase=false;
                        [lastX, lastY]=[e.offsetX, e.offsetY];
                    });
                    canvas.addEventListener('mouseout', ()=>isRect=false);
                    
                    if(button===button_list[0]){
                        canvas.addEventListener('mouseup', draw_border_fill_ellipse, true);
                    }
                    // }else if(button===button_list[1]){
                    //     canvas.removeEventListener('mouseup', draw_rect, true);
                    //     canvas.removeEventListener('mouseup', draw_fill_rect, true);
                    //     canvas.addEventListener('mouseup', draw_border_fill_rect, true);
                        
                    // }else if(button===button_list[2]){
                    //     canvas.removeEventListener('mouseup', draw_rect, true);
                    //     canvas.removeEventListener('mouseup', draw_border_fill_rect, true);
                    //     canvas.addEventListener('mouseup', draw_fill_rect, true);
                    // }

                });

            });
            
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
            // ctx.beginPath();
            // ctx.ellipse(100, 100, 50, 50, 0, 0, 2 * Math.PI);
            // ctx.stroke();
        }else{
            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isErase=false;
                isRect=false;
            });
        }

    });
});
