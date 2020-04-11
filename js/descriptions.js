func_buttons.forEach(button=>{
    button.addEventListener('mouseover', ()=>{
        if(button['title']==='Select'){
            document.getElementById('description').textContent="Selects a rectangular part of the picture to move, copy, or edit.";
        }else if(button['title']==='Eraser/Color Eraser'){
            document.getElementById('description').textContent="Erases a portion of the picture, using the selected eraser shape.";
        }else if(button['title']==='Fill With Color'){
            document.getElementById('description').textContent="Fills an area with the selected drawing color.";
        }else if(button['title']==='Pick Color'){
            document.getElementById('description').textContent='Picks up a color from the picture for drawing.';
        }else if(button['title']==='Magnifier'){
            document.getElementById('description').textContent='Changes the magnification.';
        }else if(button['title']==='Pencil'){
            document.getElementById('description').textContent='Draws a free-form line one pixel wide.';
        }else if(button['title']==='Brush'){
            document.getElementById('description').textContent='Draws using a brush with the selected shape and size.';
        }else if(button['title']==='Airbrush'){
            document.getElementById('description').textContent='Draws using an airbrush of the selected size.';
        }else if(button['title']==='Text'){
            document.getElementById('description').textContent='Inserts text into the picture.';
        }else if(button['title']==='Line'){
            document.getElementById('description').textContent='Draws a straight line.';
        }else if(button['title']==='Curve'){
            document.getElementById('description').textContent='Draws a curved line.';
        }else if(button['title']==='Rectangle'){
            document.getElementById('description').textContent='Draws a rectangle with the selected fill style.';
        }else if(button['title']==='Polygon'){
            document.getElementById('description').textContent='Draws a polygon with the selected fill style.';
        }else if(button['title']==='Ellipse'){
            document.getElementById('description').textContent='Draws an ellipse with the selected fill style.';
        }else if(button['title']==='Rounded Rectangle'){
            document.getElementById('description').textContent='Draws a rounded rectangle with the selected fill style.';
        }
    });

});

document.getElementById('buttons').addEventListener('mouseout', ()=>document.getElementById('description').textContent='For Help, click Help Topics on the Help Menu.');
