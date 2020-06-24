const menu_items=[...document.querySelectorAll('#main-menu > div')];
const sub_item_list=[...document.querySelectorAll('ul.menu')];
let visible_menu=[];

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
    let to_inactive=visible_menu.shift();
    to_inactive.querySelector('li').classList.remove('active');
    sub_item_list.map(sub_item=>sub_item.style.visibility="hidden");
});

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
