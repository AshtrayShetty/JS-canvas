# JS Canvas

A little something I made to test my Javscript skills. Took me a lot of time though!! (Hope it was worth it :smiley:). 
 
**IMPORTANT** :  
 *Please do note that the proper cursor image isn't visible for some features*.

## Motivation

There were two primary motivating factors :

* [This feature requested on this issue](https://github.com/svcastaneda/svcastaneda.github.io/issues/4)
* [jspaint](https://github.com/1j01/jspaint) had some issues which I thought I could resolve (ended up making a separate project :grin:) 
  
There was also the added fact that I wanted to test how well I could do with only **Vanilla Javascript**.  
I also wanted to  learn how to work with **HTML Canvas**.

## What is this project even?

This project was supposed to be a "**remastered**" version of **MS Paint** for Windows 98. But as I kept finishing up my work, I found out some rather unique behaviour for some of the functions. I decided to keep these and make this project my own and not just some remake/copy of some other project/product. The application might be buggy as there might be some bugs that I might not have come across. Feel free to raise an issue and I will look into it and probably try to resolve it.

# Page Layout

![A Screenshot of how the app looks!](/images/Readme.jpg "A very 'Informative' screenshot")

# Features / Functions

Here are the features and what they do :

### 1 Free Select :
Don't bother a lot about this one. Just deactivates all the other functions (couldn't come up with any other feature and the styling looked bad without the one button).

### 2 Clip :
This feature lets the user select a rectangular area and allows you to use other features inside this rectangular area (while this feature is selected).

### 3 Eraser :
Lets the user erase the drawing on the canvas. You can also increase/decrease the eraser size by pressing and holding the '+' and '-' buttons (respectively) on your numpad.

### 4 Fill Color : 
Utilizes the flood-fill algorithm (iterative) to implement the fill bucket feature. Details about the algorithm can be found [here](http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/).

### 5 Color Picker :
Lets the user select any color present on the canvas as their foreground color.

### 6 Magnify :
Zooms into the canvas allowing the user to closely (literally) examine and edit their drawing. The feature persists till the feature is deselected.

### 7 Pencil :
Draws a 1px "*pencil-like drawing*" over the canvas. Color of the pencil **can be changed**.

### 8 Brush :
Similar to pencil but gives you different brush sizes and shapes.

### 9 Airbrush :
Gives the airbrush type effect (similar to brush but it's a spray).

### 10 Text :
Lets the user enter (and then draw) text with many formatting options (bold, italics, underline, different font styles and sizes and colors).

### 11 Line :
Allows the user to draw a line from point A to point B 1px wide.

### 12 Curve :
User can enter the coordinates of the control points (their number depends on the length of the line expected to be drawn). Based on these coordinates, users can draw curves. For now, it's a prompt which asks for the coordinates since I've not been able to enable dragging the control points to change the curvature.

### 13 Rectangle :
Allows the user to draw a rectangle. Three types:

* #### Transparent bordered :
    When drawn over another figure, that figure can be seen. Only a rectangle with the border with foreground color on the color pallete is drawn.

* #### Opaque bordered :
    Similar to Transparent bordered. But when drawn over a figure, the figure is not visible. Instead, a fill color corresponding to the active background color selected in the color palleter is visible.

* #### Fill Rectangle :
    Fills the rectangle drawn with the foreground color on the color pallete. No border for the rectangle.

### 14 Polygon :
Lets the user draw any type of polygon. Same 3 types of features as rectangle.

### 15 Ellipse :
Similar to rectangle feature, but an ellipse is drawn. Same three types of features.

### 16 Rounded Rectangle :
Similar to rectangle but the edges of the rectangle are *rounded*. Same three types as in the rectangle feature.

## How can you contribute?
* If you feel there is an issue that needs reporting, feel free to raise an issue.  
* If that issue has already been raised, encourage the discussion further so that it can come to my notice quickly.
* If you feel that you can contribute to help resolve an issue, comment on the issue and I will look into the assigning roles part.
* Fork the repository and create a new pull request to contribute for new features and/or improve existing ones.
  
# License 
This project was created under the MIT License.
