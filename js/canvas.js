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
        back_fore_color=b_f;
        document.getElementById('color-select').style.backgroundColor=b_f.style.backgroundColor;
    });
});

const color_change=document.querySelectorAll(".color");
color_change.forEach(color=>{
    color.addEventListener('click', ()=>{
        let col=color.style.backgroundColor;
        back_fore_color.style.backgroundColor=col;
    });
});

const func_buttons=[...document.querySelectorAll("#buttons button")];

let script=undefined;
func_buttons.forEach(button=>{
    button.addEventListener('click', ()=>{
        if(script!==undefined){document.body.removeChild(document.body.lastChild);}
        if(button['id']!=='btn-pressed'){
            func_buttons.map(button=>button.removeAttribute('id'));
            button['id']='btn-pressed';
            if(button.firstElementChild.classList.contains('fa-pencil-alt')){
                if(button['id']==='btn-pressed'){
                    script=document.createElement('script');
                    script.src="./js/pencil.js";
                    document.body.appendChild(script);
                }
            }else if(button.firstElementChild.classList.contains('fa-paint-brush')){
                if(button['id']==='btn-pressed'){
                    script=document.createElement('script');
                    script.src="./js/brush.js";
                    document.body.appendChild(script);
                }
            }
        }else{button.removeAttribute('id');}
    });
});