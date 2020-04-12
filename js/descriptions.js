let description=document.getElementById('description');

func_buttons.forEach(button=>{
    button.addEventListener('mouseover', ()=>{
        if(button['title']==='Select'){description.textContent="Selects a rectangular part of the picture to move, copy, or edit.";}
        else if(button['title']==='Eraser/Color Eraser'){description.textContent="Erases a portion of the picture, using the selected eraser shape.";}
        else if(button['title']==='Fill With Color'){description.textContent="Fills an area with the selected drawing color.";}
        else if(button['title']==='Pick Color'){description.textContent='Picks up a color from the picture for drawing.';}
        else if(button['title']==='Magnifier'){description.textContent='Changes the magnification.';}
        else if(button['title']==='Pencil'){description.textContent='Draws a free-form line one pixel wide.';}
        else if(button['title']==='Brush'){description.textContent='Draws using a brush with the selected shape and size.';}
        else if(button['title']==='Airbrush'){description.textContent='Draws using an airbrush of the selected size.';}
        else if(button['title']==='Text'){description.textContent='Inserts text into the picture.';}
        else if(button['title']==='Line'){description.textContent='Draws a straight line.';}
        else if(button['title']==='Curve'){description.textContent='Draws a curved line.';}
        else if(button['title']==='Rectangle'){description.textContent='Draws a rectangle with the selected fill style.';}
        else if(button['title']==='Polygon'){description.textContent='Draws a polygon with the selected fill style.';}
        else if(button['title']==='Ellipse'){description.textContent='Draws an ellipse with the selected fill style.';}
        else if(button['title']==='Rounded Rectangle'){description.textContent='Draws a rounded rectangle with the selected fill style.';}
    });
});

document.getElementById('buttons').addEventListener('mouseout', ()=>description.textContent='For Help, click Help Topics on the Help Menu.');

let menuItems=[...document.querySelectorAll('.menu a')];
menuItems.forEach(item=>{
    item.addEventListener('mouseover', ()=>{
        if(item===menuItems[0]){description.textContent='Creates a new document.';}
        else if(item===menuItems[1]){description.textContent='Opens an existing document.';}
        else if(item===menuItems[2]){description.textContent='Saves the active document.';}
        else if(item===menuItems[3]){description.textContent='Saves the active document with a new name.';}
        else if(item===menuItems[4]){description.textContent='Prints the active document and sets the printing options.';}
        else if(item===menuItems[5]){description.textContent='Quits Paint.';}
        else if(item===menuItems[6]){description.textContent='Undoes the last action.';}
        else if(item===menuItems[7]){description.textContent='Redoes the previously undone action.';}
        else if(item===menuItems[8]){description.textContent='Cuts the selection and puts it on clipboard.';}
        else if(item===menuItems[9]){description.textContent='Copies the selection and puts it on clipboard.';}
        else if(item===menuItems[10]){description.textContent='Inserts the contents of clipboard.';}
        else if(item===menuItems[11]){description.textContent='Selects everything.';}
        else if(item===menuItems[12]){description.textContent='Shows or hides the toolbox.';}
        else if(item===menuItems[13]){description.textContent='Shows or hides the colorbox.';}
        else if(item===menuItems[14]){description.textContent='Shows or hides the status bar.';}
        else if(item===menuItems[15]){description.textContent='Shows or hides the text toolbar.';}
        else if(item===menuItems[16]){description.textContent='Zooms the picture.';}
        else if(item===menuItems[17]){description.textContent='Displays the entire picture.';}
        else if(item===menuItems[18]){description.textContent='Flips or rotates the entire picture or selection.';}
        else if(item===menuItems[19]){description.textContent='Stretches the entire picture or selection.';}
        else if(item===menuItems[20]){description.textContent='Inverts the colors of the picture or selection.';}
        else if(item===menuItems[21]){description.textContent='Changes the attributes of the picture.';}
        else if(item===menuItems[22]){description.textContent='Clears the picture.';}
        else if(item===menuItems[23]){description.textContent='Makes the current selection either opaque or transparent.';}
        else if(item===menuItems[24]){description.textContent='Changes the foreground color to the custom selection.';}
    });
    item.addEventListener('mouseout', ()=>textContent="For Help, click Help Topics on the Help Menu.");
});

document.getElementById('help').addEventListener('mouseover', ()=>description.textContent="Displays information about this application (GitHub Repository).");
document.getElementById('help').addEventListener('mouseout', ()=>description.textContent="For Help, click Help Topics on the Help Menu.");