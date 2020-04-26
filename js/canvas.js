const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

// To keep track of where the start and stop positions of the stroke are
let lastX=0;
let lastY=0;
let startX=0;
let startY=0;

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

function quadraticCurve(e){
    if(!isCurve){return;}
    let distance=Math.sqrt(Math.pow(e.offsetX-lastX, 2)+Math.pow(e.offsetY-lastY, 2));
    if(distance<=330){
        let X=prompt("X-coordinate of control point (Default: mid point)", `${(e.offsetX+lastX)/2}`);
        let Y=prompt("Y-coordinate of control point (Default: mid point)", `${(e.offsetY+lastY)/2}`);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.quadraticCurveTo(parseInt(X), parseInt(Y), e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY]=[e.offsetX, e.offsetY];
    }else{
        let X1=prompt("X-coordinate of first control point (Default: one-third distance)", `${(e.offsetX+lastX)/3}`);
        let Y1=prompt("Y-coordinate of first control point (Default: one-third distance)", `${(e.offsetY+lastY)/3}`);
        let X2=prompt("X-coordinate of second control point (Default: two-third distance)", `${2*(e.offsetX+lastX)/3}`);
        let Y2=prompt("Y-coordinate of second control point (Default: two-third distance)", `${2*(e.offsetY+lastY)/3}`);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.bezierCurveTo(parseInt(X1), parseInt(Y1), parseInt(X2), parseInt(Y2), e.offsetX, e.offsetY);
        ctx.stroke();
    }

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
    let x_coord=lastX<e.offsetX?lastX+1:e.offsetX+1;
    let y_coord=lastY<e.offsetY?lastY+1:e.offsetY+1;
    let x_width=lastX<e.offsetX?Math.abs(e.offsetX-lastX-2):Math.abs(e.offsetX-lastX+2);
    let y_width=lastY<e.offsetY?Math.abs(e.offsetY-lastY-2):Math.abs(e.offsetY-lastY+2);
    ctx.fillRect(x_coord, y_coord, x_width, y_width);
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

function draw_fill_rect(e){
    if(!isRect){return;}
    ctx.fillStyle=document.getElementById('foreground').style.backgroundColor;
    ctx.fillRect(lastX, lastY, e.offsetX-lastX, e.offsetY-lastY);
    [lastX, lastY]=[e.offsetX, e.offsetY];
}

function draw_ellipse(e){
    if(!isEllipse){return;}
    let x_center=e.offsetX<lastX?e.offsetX+(Math.abs(e.offsetX-lastX)/2):lastX+(Math.abs(e.offsetX-lastX)/2);
    let y_center=e.offsetY<lastY?e.offsetY+(Math.abs(e.offsetY-lastY)/2):lastY+(Math.abs(e.offsetY-lastY)/2);
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.ellipse(x_center, y_center, Math.abs(e.offsetX-lastX), Math.abs(e.offsetY-lastY), 0, 0, 2*Math.PI);
    ctx.stroke();
}

function draw_border_fill_ellipse(e){
    if(!isEllipse){return;}
    draw_ellipse(e);
    ctx.fillStyle="white";
    let x_center=e.offsetX<lastX?e.offsetX+(Math.abs(e.offsetX-lastX)/2):lastX+(Math.abs(e.offsetX-lastX)/2);
    let y_center=e.offsetY<lastY?e.offsetY+(Math.abs(e.offsetY-lastY)/2):lastY+(Math.abs(e.offsetY-lastY)/2);
    ctx.beginPath();
    let x_radius=e.offsetX<lastX?Math.abs(e.offsetX-lastX+1):Math.abs(e.offsetX-lastX-1);
    let y_radius=e.offsetY<lastY?Math.abs(e.offsetY-lastY+1):Math.abs(e.offsetY-lastY-1);
    ctx.ellipse(x_center, y_center, x_radius, y_radius, 0, 0, 2*Math.PI);
    ctx.fill();
}

function draw_fill_ellipse(e){
    if(!isEllipse){return;}
    let x_center=e.offsetX<lastX?e.offsetX+(Math.abs(e.offsetX-lastX)/2):lastX+(Math.abs(e.offsetX-lastX)/2);
    let y_center=e.offsetY<lastY?e.offsetY+(Math.abs(e.offsetY-lastY)/2):lastY+(Math.abs(e.offsetY-lastY)/2);
    ctx.fillStyle=document.getElementById('foreground').style.backgroundColor;
    ctx.beginPath();
    ctx.ellipse(x_center, y_center, Math.abs(e.offsetX-lastX), Math.abs(e.offsetY-lastY), 0, 0, 2*Math.PI);
    ctx.fill();
}

function wrapText(text, x, y, maxWidth) {
    let words = text.split(' ');
    let line = '';

    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += 25;
        }else {line = testLine;}
    }
    ctx.fillText(line, x, y);
}

function draw_text(){
    let textArea=[...document.querySelectorAll('textarea')];

    textArea.map(area=>{
        area.style.zIndex='-1';
        area.style.borderStyle="none";
        ctx.fillStyle=`${document.getElementById('foreground').style.backgroundColor}`;
        ctx.font=`${area.style.fontSize} ${area.style.fontFamily}`;
        if(area.style.fontWeight==='bolder'){ctx.font="bold "+ctx.font;}
        if(area.style.fontStyle==='italic'){ctx.font="italic "+ctx.font;}
        wrapText(area.value, area.offsetLeft, area.offsetTop, parseFloat(area.style.width.substr(0, area.style.width.length-2)));
        area.remove();
    });
}

function draw_roundedRect(e){
    if(!isRoundedRect || Math.abs(lastX-e.offsetX)<40 || Math.abs(lastY-e.offsetY)<40){return;}
    let startX=e.offsetX<lastX?e.offsetX:lastX;
    let startY=e.offsetY<lastY?e.offsetY:lastY;
    let endX=e.offsetX>lastX?e.offsetX:lastX;
    let endY=e.offsetY>lastY?e.offsetY:lastY;
    ctx.beginPath();
    ctx.moveTo(startX+20, startY);
    ctx.lineTo(endX-20, startY);
    ctx.arc(endX-20, startY+20, 20, 3*(Math.PI)/2, 0, false);
    ctx.lineTo(endX, endY-20);
    ctx.arc(endX-20, endY-20, 20, 0, (Math.PI)/2, false);
    ctx.lineTo(startX+20, endY);
    ctx.arc(startX+20, endY-20, 20, (Math.PI)/2, Math.PI, false);
    ctx.lineTo(startX, startY+20);
    ctx.arc(startX+20, startY+20, 20, (Math.PI), 3*(Math.PI)/2, false);
    ctx.stroke();
}

function draw_roundedRect_borderFill(e){
    if(!isRoundedRect || Math.abs(lastX-e.offsetX)<40 || Math.abs(lastY-e.offsetY)<40){return;}
    draw_roundedRect(e);
    ctx.fillStyle="white";
    let startX=e.offsetX<lastX?e.offsetX:lastX;
    let startY=e.offsetY<lastY?e.offsetY:lastY;
    let endX=e.offsetX>lastX?e.offsetX:lastX;
    let endY=e.offsetY>lastY?e.offsetY:lastY;
    ctx.beginPath();
    ctx.moveTo(startX+21, startY+1);
    ctx.lineTo(endX-21, startY+1);
    ctx.arc(endX-21, startY+21, 20, 3*(Math.PI)/2, 0, false);
    ctx.lineTo(endX-1, endY-21);
    ctx.arc(endX-21, endY-21, 20, 0, (Math.PI)/2, false);
    ctx.lineTo(startX+21, endY-1);
    ctx.arc(startX+21, endY-21, 20, (Math.PI)/2, Math.PI, false);
    ctx.lineTo(startX+1, startY+21);
    ctx.arc(startX+21, startY+21, 20, (Math.PI), 3*(Math.PI)/2, false);
    ctx.fill();
}

function draw_roundedRect_fill(e){
    if(!isRoundedRect || Math.abs(lastX-e.offsetX)<40 || Math.abs(lastY-e.offsetY)<40){return;}
    ctx.fillStyle=document.getElementById('foreground').style.backgroundColor;
    let startX=e.offsetX<lastX?e.offsetX:lastX;
    let startY=e.offsetY<lastY?e.offsetY:lastY;
    let endX=e.offsetX>lastX?e.offsetX:lastX;
    let endY=e.offsetY>lastY?e.offsetY:lastY;
    ctx.beginPath();
    ctx.moveTo(startX+20, startY);
    ctx.lineTo(endX-20, startY);
    ctx.arc(endX-20, startY+20, 20, 3*(Math.PI)/2, 0, false);
    ctx.lineTo(endX, endY-20);
    ctx.arc(endX-20, endY-20, 20, 0, (Math.PI)/2, false);
    ctx.lineTo(startX+20, endY);
    ctx.arc(startX+20, endY-20, 20, (Math.PI)/2, Math.PI, false);
    ctx.lineTo(startX, startY+20);
    ctx.arc(startX+20, startY+20, 20, (Math.PI), 3*(Math.PI)/2, false);
    ctx.fill();
}

let pressed=null;
let width=10;

let isDrawing=false;
let isErase=false;
let isRect=false;
let isEllipse=false;
let isColorPick=false;
let isCurve=false;
let isText=false;
let isRoundedRect=false;
let isSAirbrush=false;
let isMAirbrush=false;
let isLAirbrush=false;
let isZoomed=false;
let isFill=false;
let isPolygonTransparent=false;
let isPolygonOpaque=false;
let isPolygonFill=false;

let textArea=null;

ctx.strokeStyle=back_fore_color.style.backgroundColor;

func_buttons.forEach(button=>{
    button.addEventListener('click', ()=>{

        document.getElementById('color-select').style.backgroundColor="#bbc6c9";
        document.getElementById('text-editor').style.visibility="hidden";

        isDrawing=false;
        isErase=false;
        isRect=false;
        isEllipse=false;
        isColorPick=false;
        isText=false;
        isCurve=false;
        isRoundedRect=false;
        isSAirbrush=false;
        isMAirbrush=false;
        isLAirbrush=false;
        isZoomed=false;
        isFill=false;
        isPolygonTransparent=false;
        isPolygonOpaque=false;
        isPolygonFill=false;

        if(button.firstChild===pressed){
            pressed=null;
            button.removeAttribute('id');
        }else{
            pressed=button.firstChild;
            func_buttons.map(button=>button.removeAttribute('id'));
            button['id']='btn-pressed';
        }

        canvas.style.cursor='default';

        isDrawing=false;
        while(color_select.hasChildNodes()){color_select.removeChild(color_select.firstElementChild);}

        if(button['title']==='Eraser/Color Eraser' && button['id']==='btn-pressed'){

            document.addEventListener('keydown', (e)=>{
                if(e.keyCode===107){++width;}
                if(width!==3 && e.keyCode===109){--width;}
            });

            draw_text();

            canvas.addEventListener('mousedown', (e)=>{
                isDrawing=false;
                isRect=false;
                isErase=true;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.addEventListener('mousemove', (e)=>{
                if(!isErase){return;}
                ctx.clearRect(e.offsetX, e.offsetY, width, width);
            });

            canvas.addEventListener('mouseout', ()=>isErase=false);
            canvas.addEventListener('mouseup', ()=>isErase=false);

        }else if(button['title']==='Fill With Color' && button['id']==='btn-pressed'){
            
            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isRect=false;
                isErase=false;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                isFill=true;
            });

            canvas.addEventListener('mouseup', (e)=>{
                if(!isFill){return;}
                ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
                let data=ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                let fillData=ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                let [startX, startY]=[e.offsetX+1, e.offsetY];
                
                while(startX<=1467 && fillData[0]===data[0] && fillData[1]===data[1] && fillData[2]===data[2]){
                    let yBound=ctx.getImageData(startX+1, startY+1, 1, 1).data;
                    while(startY<=610 && fillData[0]===yBound[0] && fillData[1]===yBound[1] && fillData[2]===yBound[2]){
                        ++startY;
                        yBound=ctx.getImageData(startX, startY+1, 1, 1).data;
                    }

                    ctx.beginPath();
                    ctx.moveTo(startX+1, e.offsetY);
                    ctx.lineTo(startX+1, startY);
                    ctx.stroke();

                    startY=e.offsetY;
                    yBound=ctx.getImageData(startX+1, startY-1, 1, 1).data;
                    while(startY>=0 && fillData[0]===yBound[0] && fillData[1]===yBound[1] && fillData[2]===yBound[2]){
                        --startY;
                        yBound=ctx.getImageData(startX+1, startY-1, 1, 1).data;
                    }

                    ctx.beginPath();
                    ctx.moveTo(startX+1, e.offsetY);
                    ctx.lineTo(startX+1, startY);
                    ctx.stroke();

                    ++startX;
                    startY=e.offsetY;
                    fillData=ctx.getImageData(startX+1, e.offsetY, 1, 1).data;
                }

                [startX, startY]=[e.offsetX, e.offsetY];
                data=ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                fillData=ctx.getImageData(startX, startY, 1, 1).data;
                while(startX>0 && fillData[0]===data[0] && fillData[1]===data[1] && fillData[2]===data[2]){
                    let yBound=ctx.getImageData(startX+1, startY+1, 1, 1).data;
                    while(startY<=610 && fillData[0]===yBound[0] && fillData[1]===yBound[1] && fillData[2]===yBound[2]){
                        ++startY;
                        yBound=ctx.getImageData(startX+1, startY+1, 1, 1).data;
                    }

                    ctx.beginPath();
                    ctx.moveTo(startX+1, e.offsetY);
                    ctx.lineTo(startX+1, startY);
                    ctx.stroke();

                    startY=e.offsetY;
                    yBound=ctx.getImageData(startX-1, startY-1, 1, 1).data;
                    while(startY>=0 && fillData[0]===yBound[0] && fillData[1]===yBound[1] && fillData[2]===yBound[2]){
                        --startY;
                        yBound=ctx.getImageData(startX-1, startY-1, 1, 1).data;
                    }

                    ctx.beginPath();
                    ctx.moveTo(startX+1, e.offsetY);
                    ctx.lineTo(startX+1, startY);
                    ctx.stroke();

                    --startX;
                    startY=e.offsetY;
                    fillData=ctx.getImageData(startX-1, e.offsetY, 1, 1).data;
                }

                let yBound=ctx.getImageData(startX, startY, 1, 1).data;
                while(startY<=610 && fillData[0]===yBound[0] && fillData[1]===yBound[1] && fillData[2]===yBound[2]){
                    ++startY;
                    yBound=ctx.getImageData(startX, startY, 1, 1).data;
                }
                ctx.beginPath();
                ctx.moveTo(e.offsetX+1, e.offsetY+1);
                ctx.lineTo(e.offsetX+1, startY);
                ctx.stroke();

                startY=e.offsetY;
                yBound=ctx.getImageData(startX, startY-1, 1, 1).data;
                fillData=ctx.getImageData(e.offsetX, e.offsetY-1, 1, 1).data;
                console.log([yBound, fillData]);
                while(startY>=0 && fillData[0]===yBound[0] && fillData[1]===yBound[1] && fillData[2]===yBound[2]){
                    console.log(startY);
                    --startY;
                    yBound=ctx.getImageData(startX, startY, 1, 1).data;
                }
                ctx.beginPath();
                ctx.moveTo(e.offsetX+1, e.offsetY-1);
                ctx.lineTo(e.offsetX+1, startY);
                ctx.stroke();
            });


        }else if(button['title']==='Pick Color' && button['id']==='btn-pressed'){
            
            draw_text();

            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isErase=false;
                isRect=false;
                isEllipse=false;
                isCurve=false;
                isColorPick=true;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });

            canvas.addEventListener('mousemove', (e)=>{
                if(!isColorPick){return;}
                let data=ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                if(data[3]===0){
                    if(data[0]===0 && data[1]===0 && data[2]===0){
                        document.getElementById('color-select').style.backgroundColor="white";
                    }
                }else{
                    document.getElementById('color-select').style.backgroundColor=`rgb(${data[0]}, ${data[1]}, ${data[2]})`;
                }
            });

            canvas.addEventListener('mouseout', ()=>isColorPick=false);

            canvas.addEventListener('mouseup', ()=>{
                if(!isColorPick){return;}
                document.getElementById('foreground').style.backgroundColor=document.getElementById('color-select').style.backgroundColor;
                isColorPick=false;
            });
        
        }else if(button['title']==='Magnifier' && button['id']==='btn-pressed'){

            draw_text();
            let zoomed=canvas.style.transform==="scale(1.4)"?true:false;

            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isErase=false;
                isRect=false;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isLAirbrush=false;
                isMAirbrush=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isText=false;
                isZoomed=true;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });

            canvas.addEventListener('click', ()=>{
                if(!zoomed && isZoomed){
                    canvas.style.transform='scale(1.4)';
                    canvas.style.left='364px';
                    canvas.style.top='147px';
                }else if(zoomed && isZoomed){
                    canvas.style.transform='scale(1)';
                    canvas.style.left='70px';
                    canvas.style.top='25px';
                }
                zoomed=!zoomed;
            });

        }else if(button['title']==='Pencil' && button['id']==='btn-pressed'){

            ctx.lineCap='round';
            ctx.lineJoin='round';
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
            
            draw_text();

            canvas.addEventListener('mousedown', (e)=>{
                isDrawing=true;
                isErase=false;
                isRect=false;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.addEventListener('mousemove', draw, true);
            canvas.addEventListener('mouseout', ()=>isDrawing=false);
            canvas.addEventListener('mouseup', ()=>isDrawing=false);

        }else if(button['title']==='Brush' && button['id']==='btn-pressed'){

            draw_text();

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

            ctx.lineWidth=0;
            canvas.addEventListener('mousedown', ()=>{
                isErase=false;
                isRect=false;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });

            let button_list=[...document.querySelectorAll('.inner-div')];

            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{
                    button_list.map(button=>button.removeAttribute('id'));
                    button['id']='btn-active';
                    ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;

                    canvas.addEventListener('mousedown', (e)=>{
                        isDrawing=true;
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

        }else if(button['title']==="Airbrush" && button['id']==='btn-pressed'){

            let small_brush=document.createElement('canvas');
            small_brush.classList.add('inner-div');
            small_brush.style.width='48px';
            small_brush.style.height='14px';
            small_brush.style.backgroundColor='#bbc6c9';
            small_brush.style.position='absolute';
            small_brush.style.top='2px';
            small_brush.style.left='0';
            let sBrush=small_brush.getContext('2d');
            let image=new Image();
            image.src='../images/airbrush.png';
            sBrush.drawImage(image, 0, 0, 25, 25, 60, 0, 150, 150);
            color_select.appendChild(small_brush);

            let medium_brush=document.createElement('canvas');
            medium_brush.classList.add('inner-div');
            medium_brush.style.width='48px';
            medium_brush.style.height='14px';
            medium_brush.style.backgroundColor='#bbc6c9';
            medium_brush.style.position='absolute';
            medium_brush.style.top='25px';
            medium_brush.style.left='0';
            let mBrush=medium_brush.getContext('2d');
            mBrush.drawImage(image, 23, 0, 25, 25, 60, 0, 175, 175);
            color_select.appendChild(medium_brush);

            let large_brush=document.createElement('canvas');
            large_brush.classList.add('inner-div');
            large_brush.style.width='48px';
            large_brush.style.height='14px';
            large_brush.style.backgroundColor='#bbc6c9';
            large_brush.style.position='absolute';
            large_brush.style.top='50px';
            large_brush.style.left='0';
            let lBrush=large_brush.getContext('2d');
            lBrush.drawImage(image, 50, 0, 25, 30, 60, 0, 200, 200);
            color_select.appendChild(large_brush);
            
            let button_list=[...color_select.querySelectorAll('.inner-div')];
            draw_text();
            
            canvas.addEventListener('mousedown', (e)=>{
                isText=false;
                isDrawing=false;
                isEllipse=false;
                isRect=false;
                isEllipse=false;
                isErase=false;
                isColorPick=false;
                isCurve=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                document.querySelector('object').getSVGDocument().querySelectorAll('path').forEach(path=>path.setAttribute('fill', document.getElementById('foreground').style.backgroundColor));
            });
            
            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{
                    
                    button_list.map(btn=>btn.style.backgroundColor="#bbc6c9");
                    button.style.backgroundColor="navy";
                    
                    let svgString = new XMLSerializer().serializeToString(document.querySelector('object').getSVGDocument().querySelector('svg'));
                    let DOMURL = self.URL || self.webkitURL || self;
                    let brushPattern = new Image();
                    let svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
                    let url = DOMURL.createObjectURL(svg);
                    brushPattern.src = url;
                    
                    if(button===button_list[0]){
                        
                        canvas.addEventListener('mousedown', ()=>{
                            isSAirbrush=true;
                            isMAirbrush=false;
                            isLAirbrush=false;
                        });
                        
                        canvas.addEventListener('mousemove', (e)=>{
                            if(!isSAirbrush){return;}
                            ctx.drawImage(brushPattern, 60, 0, 15, 35, e.offsetX, e.offsetY, 10, 40);
                        });
                        
                    }else if(button===button_list[1]){
                        
                        canvas.addEventListener('mousedown', ()=>{
                            isSAirbrush=false;
                            isMAirbrush=true;
                            isLAirbrush=false;
                        });
                        
                        canvas.addEventListener('mousemove', (e)=>{
                            if(!isMAirbrush){return;}
                            ctx.drawImage(brushPattern, 0, 56, 55, 55, e.offsetX, e.offsetY, 50, 70);
                        });
                        
                    }else if(button===button_list[2]){
                        
                        canvas.addEventListener('mousedown', ()=>{
                            isSAirbrush=false;
                            isMAirbrush=false;
                            isLAirbrush=true;
                        });
                        
                        canvas.addEventListener('mousemove', (e)=>{
                            if(!isLAirbrush){return;}
                            ctx.drawImage(brushPattern, 50, 36, 55, 55, e.offsetX, e.offsetY, 90, 90);
                        });
                        
                    }
                    
                    canvas.addEventListener('mouseout', ()=>{
                        isSAirbrush=false;
                        isMAirbrush=false;
                        isLAirbrush=false;
                    });
                    
                    canvas.addEventListener('mouseup', ()=>{
                        isSAirbrush=false;
                        isMAirbrush=false;
                        isLAirbrush=false;
                    });
                });

            });
            
        }else if(button['title']==="Text" && button['id']==='btn-pressed'){

            canvas.style.cursor="crosshair";

            canvas.addEventListener('mousedown', (e)=>{
                isText=true;
                isDrawing=false;
                isEllipse=false;
                isRect=false;
                isEllipse=false;
                isErase=false;
                isColorPick=false;
                isCurve=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                [lastX, lastY]=[e.clientX, e.clientY];
            });

            canvas.addEventListener('mouseout', ()=>isText=false);
            canvas.addEventListener('mouseup', (e)=>{

                if(!isText){return;}
                let textArea=document.createElement('textarea');
                textArea.style.width=`${Math.abs(lastX-e.clientX)}px`;
                textArea.style.height=`${Math.abs(lastY-e.clientY)}px`;
                textArea.style.position="absolute";
                textArea.style.left=`${lastX<e.offsetX?lastX:e.clientX}px`;
                textArea.style.top=`${lastY<e.offsetY?lastY:e.clientY}px`;
                textArea.style.outline="none";
                textArea.style.borderStyle="dashed";
                document.getElementById('canvas-container').appendChild(textArea);

                textArea.addEventListener("focus", ()=>{
                    document.getElementById('text-editor').style.visibility="visible";
                    textArea.style.fontFamily=document.getElementById('fonts').value;
                    textArea.style.fontSize=`${document.getElementsByName('size')[0].value}px`;
                    textArea.style.color=document.getElementById('foreground').style.backgroundColor;

                    let bold=true, italic=true, underline=true;

                    document.getElementById('text-editor').querySelectorAll("button").forEach(styleButton=>{
                        styleButton.addEventListener('click', ()=>{
                            if(styleButton===document.getElementById('text-editor').querySelectorAll("button")[0]){
                                if(!bold){textArea.style.fontWeight="normal";}
                                else{textArea.style.fontWeight="bolder";} 
                                bold=(!bold);
                            }else if(styleButton===document.getElementById('text-editor').querySelectorAll("button")[1]){
                                if(!italic){textArea.style.fontStyle="normal";}
                                else{textArea.style.fontStyle="italic";}
                                italic=(!italic);
                            }else if(styleButton===document.getElementById('text-editor').querySelectorAll("button")[2]){
                                if(!underline){textArea.style.textDecoration="none";}
                                else{textArea.style.textDecoration="underline";}
                                underline=(!underline);
                            }
                        });
                    });
                });

                [lastX, lastY]=[e.clientX, e.clientY];
            });

        }else if(button['title']==='Line' && button['id']==='btn-pressed'){
            
            canvas.style.cursor="crosshair";
            ctx.lineCap='round';
            ctx.lineJoin='round';
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
            
            draw_text();

            canvas.addEventListener('mousedown', (e)=>{
                isDrawing=true;
                isErase=false;
                isRect=false;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });

            canvas.removeEventListener('mousemove', draw, true);
            canvas.addEventListener('mouseout', ()=>isDrawing=false);
            canvas.addEventListener('mouseup', draw, true);

        }else if(button['title']==='Curve' && button['id']==='btn-pressed'){

            canvas.style.cursor="crosshair";
            ctx.lineCap='round';
            ctx.lineJoin='round';
            ctx.lineWidth=1;
            
            draw_text();
            
            canvas.addEventListener('mousedown', (e)=>{
                isColorPick=false;
                isDrawing=false;
                isEllipse=false;
                isErase=false;
                isRect=false;
                isCurve=true;
                isText=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
                [lastX, lastY]=[e.offsetX, e.offsetY];
            });
            
            canvas.removeEventListener('mousemove', draw, true);
            canvas.addEventListener('mouseout', ()=>isDrawing=false);
            canvas.addEventListener('mouseup', quadraticCurve);

            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
            
        }else if(button['title']==='Rectangle' && button['id']==='btn-pressed'){

            canvas.style.cursor="crosshair";

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
            
            draw_text();

            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isErase=false;
                isEllipse=false;
                isColorPick=false;
                isText=false;
                isCurve=false;
                isRoundedRect=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });
            
            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{

                    button_list.map(button=>button.removeAttribute('id'));
                    button_list[0].innerHTML="<img src='./images/rectangle.png'>";
                    button_list[0].firstElementChild.style.width='38px';
                    button_list[0].firstElementChild.style.height='20px';
                    button['id']='btn-active';
                    
                    canvas.addEventListener('mousedown', (e)=>{
                        isRect=true;
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

        }else if(button['title']==='Polygon' && button['id']==='btn-pressed'){

            canvas.style.cursor="crosshair";
            
            draw_text();

            let polygon_borderless=document.createElement('button');
            polygon_borderless.classList.add('inner-div');
            polygon_borderless.innerHTML="<img src='./images/ellipse_borderless.png'>";
            polygon_borderless.firstElementChild.style.width='34px';
            polygon_borderless.style.width='44px';
            polygon_borderless.firstElementChild.style.height='17px';
            polygon_borderless.style.marginLeft='2px';
            color_select.appendChild(polygon_borderless);

            let polygon_border=document.createElement('button');
            polygon_border.classList.add('inner-div');
            polygon_border.innerHTML="<img src='./images/ellipse_borderless.png'>";
            polygon_border.style.position='absolute';
            polygon_border.style.top='30px';
            polygon_border.style.left='2px';
            polygon_border.firstElementChild.style.width='34px';
            polygon_border.style.width='44px';
            polygon_border.firstElementChild.style.height='15px';
            color_select.appendChild(polygon_border);

            let polygon_fill=document.createElement('button');
            polygon_fill.classList.add('inner-div');
            polygon_fill.innerHTML="<img src='./images/ellipse_fill.png'>";
            polygon_fill.style.position='absolute';
            polygon_fill.style.top='57px';
            polygon_fill.style.left='2px';
            polygon_fill.firstElementChild.style.width='34px';
            polygon_fill.style.width='44px';
            polygon_fill.firstElementChild.style.height='15px';
            color_select.appendChild(polygon_fill);
            
            let button_list=[...document.querySelectorAll('.inner-div')];
            let clicks=false;

            canvas.addEventListener('mousedown', (e)=>{
                isRect=false;
                isDrawing=false;
                isErase=false;
                isColorPick=false;
                isText=false;
                isRoundedRect=false;
                isCurve=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
            });
            
            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{

                    button_list.map(button=>button.removeAttribute('id'));
                    button['id']='btn-active';
                    
                    if(button===button_list[0]){

                        clicks=false;

                        if(isPolygonOpaque){
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(startX, startY);
                            ctx.stroke();
                            ctx.fill();
                        }else if(isPolygonFill){
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(startX, startY);
                            ctx.fill();
                        }

                        ctx.lineWidth=1;
                        canvas.addEventListener('mousedown', (e)=>{
                            isPolygonTransparent=true;
                            isPolygonOpaque=false;
                            isPolygonFill=false;
                            [lastX, lastY]=[e.offsetX, e.offsetY];
                            if(!clicks && isPolygonTransparent){
                                [startX, startY]=[lastX, lastY];
                                ctx.beginPath();
                            }else if(clicks && isPolygonTransparent){
                                ctx.lineTo(e.offsetX, e.offsetY);
                                ctx.stroke();
                            }
                        });
                        
                        canvas.addEventListener('mouseout', ()=>{
                            if(!clicks){isPolygonTransparent=false;}
                        });
                        
                        canvas.addEventListener('mouseup', (e)=>{
                            if(!isPolygonTransparent){return;}
                            ctx.beginPath();
                            if(!clicks){
                                ctx.moveTo(lastX, lastY);
                                clicks=true;
                            }
                            ctx.lineTo(e.offsetX, e.offsetY);
                            ctx.stroke();
                        });

                    }else if(button===button_list[1]){
                        
                        clicks=false;

                        if(isPolygonTransparent){
                            ctx.beginPath();
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(startX, startY);
                            ctx.stroke();
                        }else if(isPolygonFill){
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(startX, startY);
                            ctx.fill();
                        }
                        
                        ctx.lineWidth=2;
                        canvas.addEventListener('mousedown', (e)=>{
                            isPolygonTransparent=false;
                            isPolygonOpaque=true;
                            isPolygonFill=false;
                            ctx.fillStyle='white';
                            [lastX, lastY]=[e.offsetX, e.offsetY];
                            if(!clicks && isPolygonOpaque){
                                [startX, startY]=[lastX, lastY];
                                ctx.beginPath();
                            }else if(clicks && isPolygonOpaque){
                                ctx.lineTo(e.offsetX, e.offsetY);
                                ctx.stroke();
                            }
                        });
                        
                        canvas.addEventListener('mouseout', ()=>{
                            if(!clicks){isPolygonOpaque=false;}
                        });
                        
                        canvas.addEventListener('mouseup', (e)=>{
                            if(!isPolygonOpaque){return;}
                            if(!clicks){
                                ctx.moveTo(lastX, lastY);
                                clicks=true;
                            }
                            ctx.lineTo(e.offsetX, e.offsetY);
                            [lastX, lastY]=[e.offsetX, e.offsetY];
                        });

                    }else if(button===button_list[2]){

                        clicks=false;

                        if(isPolygonTransparent){
                            ctx.beginPath();
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(startX, startY);
                            ctx.stroke();
                        }else if(isPolygonOpaque){
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(startX, startY);
                            ctx.stroke();
                            ctx.fill();
                        }
                        
                        ctx.lineWidth=1;
                        canvas.addEventListener('mousedown', (e)=>{
                            isPolygonTransparent=false;
                            isPolygonOpaque=false;
                            isPolygonFill=true;
                            ctx.fillStyle=document.getElementById('foreground').style.backgroundColor;
                            [lastX, lastY]=[e.offsetX, e.offsetY];
                            if(!clicks && isPolygonFill){
                                [startX, startY]=[lastX, lastY];
                                ctx.beginPath();
                            }else if(clicks && isPolygonFill){
                                ctx.lineTo(e.offsetX, e.offsetY);
                                ctx.stroke();
                            }
                        });
                        
                        canvas.addEventListener('mouseout', ()=>{
                            if(!clicks){isPolygonFill=false;}
                        });
                        
                        canvas.addEventListener('mouseup', (e)=>{
                            if(!isPolygonFill){return;}
                            if(!clicks){
                                ctx.moveTo(lastX, lastY);
                                clicks=true;
                            }
                            ctx.lineTo(e.offsetX, e.offsetY);
                            [lastX, lastY]=[e.offsetX, e.offsetY];
                        });
                    }

                });

            });

        }else if(button['title']==='Ellipse' && button['id']==='btn-pressed'){

            canvas.style.cursor="crosshair";
            
            draw_text();

            let ellipse_borderless=document.createElement('button');
            ellipse_borderless.classList.add('inner-div');
            ellipse_borderless.innerHTML="<img src='./images/ellipse_borderless.png'>";
            ellipse_borderless.firstElementChild.style.width='34px';
            ellipse_borderless.style.width='44px';
            ellipse_borderless.firstElementChild.style.height='17px';
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

            canvas.addEventListener('mousedown', ()=>{
                isRect=false;
                isDrawing=false;
                isErase=false;
                isColorPick=false;
                isText=false;
                isRoundedRect=false;
                isCurve=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });

            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{

                    button_list.map(button=>button.removeAttribute('id'));
                    button['id']='btn-active';
                    
                    canvas.addEventListener('mousedown', (e)=>{
                        isEllipse=true;
                        [lastX, lastY]=[e.offsetX, e.offsetY];
                    });

                    canvas.addEventListener('mouseout', ()=>isEllipse=false);
                    
                    if(button===button_list[0]){
                        canvas.addEventListener('mouseup', draw_ellipse, true);
                        canvas.removeEventListener('mouseup', draw_border_fill_ellipse, true);
                        canvas.removeEventListener('mouseup', draw_fill_ellipse, true);

                    }else if(button===button_list[1]){
                        canvas.removeEventListener('mouseup', draw_ellipse, true);
                        canvas.addEventListener('mouseup', draw_border_fill_ellipse, true);
                        canvas.removeEventListener('mouseup', draw_fill_ellipse, true);
                    }else if(button===button_list[2]){
                        canvas.removeEventListener('mouseup', draw_ellipse, true);
                        canvas.removeEventListener('mouseup', draw_border_fill_ellipse, true);
                        canvas.addEventListener('mouseup', draw_fill_ellipse, true);
                    }

                });

            });
            
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;
            
        }else if(button['title']==="Rounded Rectangle" && button['id']==="btn-pressed"){

            draw_text();

            let rounded_borderless=document.createElement('button');
            rounded_borderless.classList.add('inner-div');
            rounded_borderless.innerHTML="<img src='./images/ellipse_borderless.png'>";
            rounded_borderless.firstElementChild.style.width='34px';
            rounded_borderless.style.width='44px';
            rounded_borderless.firstElementChild.style.height='17px';
            rounded_borderless.style.marginLeft='2px';
            color_select.appendChild(rounded_borderless);

            let rounded_border=document.createElement('button');
            rounded_border.classList.add('inner-div');
            rounded_border.innerHTML="<img src='./images/ellipse_borderless.png'>";
            rounded_border.style.position='absolute';
            rounded_border.style.top='30px';
            rounded_border.style.left='2px';
            rounded_border.firstElementChild.style.width='34px';
            rounded_border.style.width='44px';
            rounded_border.firstElementChild.style.height='15px';
            color_select.appendChild(rounded_border);

            let rounded_fill=document.createElement('button');
            rounded_fill.classList.add('inner-div');
            rounded_fill.innerHTML="<img src='./images/ellipse_fill.png'>";
            rounded_fill.style.position='absolute';
            rounded_fill.style.top='57px';
            rounded_fill.style.left='2px';
            rounded_fill.firstElementChild.style.width='34px';
            rounded_fill.style.width='44px';
            rounded_fill.firstElementChild.style.height='15px';
            color_select.appendChild(rounded_fill);

            let button_list=[...document.querySelectorAll('.inner-div')];

            canvas.addEventListener('mousedown', ()=>{
                isRect=false;
                isDrawing=false;
                isErase=false;
                isColorPick=false;
                isText=false;
                isCurve=false;
                isEllipse=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });

            button_list.forEach(button=>{
                button.addEventListener('click', ()=>{

                    button_list.map(button=>button.removeAttribute('id'));
                    button['id']='btn-active';
                    
                    canvas.addEventListener('mousedown', (e)=>{
                        isRoundedRect=true;
                        [lastX, lastY]=[e.offsetX, e.offsetY];
                    });

                    canvas.addEventListener('mouseout', ()=>isRoundedRect=false);
                    
                    if(button===button_list[0]){
                        canvas.addEventListener('mouseup', draw_roundedRect, true);
                        canvas.removeEventListener('mouseup', draw_roundedRect_borderFill, true);
                        canvas.removeEventListener('mouseup', draw_roundedRect_fill, true);

                    }else if(button===button_list[1]){
                        canvas.removeEventListener('mouseup', draw_roundedRect, true);
                        canvas.addEventListener('mouseup', draw_roundedRect_borderFill, true);
                        canvas.removeEventListener('mouseup', draw_roundedRect_fill, true);
                    }else if(button===button_list[2]){
                        canvas.removeEventListener('mouseup', draw_roundedRect, true);
                        canvas.removeEventListener('mouseup', draw_roundedRect_borderFill, true);
                        canvas.addEventListener('mouseup', draw_roundedRect_fill, true);
                    }

                });

            });
            
            ctx.lineWidth=1;
            ctx.strokeStyle=document.getElementById('foreground').style.backgroundColor;


        }else{
            
            draw_text();

            canvas.addEventListener('mousedown', ()=>{
                isDrawing=false;
                isErase=false;
                isRect=false;
                isEllipse=false;
                isColorPick=false;
                isCurve=false;
                isText=false;
                isSAirbrush=false;
                isMAirbrush=false;
                isLAirbrush=false;
                isZoomed=false;
                isFill=false;
                isPolygonTransparent=false;
                isPolygonOpaque=false;
                isPolygonFill=false;
            });
        }

    });
});
