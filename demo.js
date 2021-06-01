import {MyToolkit} from './MyToolkit.js';
import {SVG} from './svg.min.js'

var window = SVG().addTo('body').size('1000','1000');

//button
var btn = new MyToolkit.Button(window, "Hello");
btn.move(30,30);

btn.onClick(function(e){
    console.log(e);
});
btn.onStateChange(function(e) {
    console.log(e);
});

//checkbox
var checkbox = new MyToolkit.CheckBox(window, "Yang's Check box");
checkbox.move(50 ,200);

checkbox.onStateChange(function(e) {
    console.log(e);
});

//radio button
var radioBs = new MyToolkit.RadioButtons(window,3);
radioBs.move(30, 300);

radioBs.onStateChange(function(e){
    console.log(e);
});

//textBox
var textbox = new MyToolkit.TextBox(window);
textbox.move(30, 100);
textbox.onChange(function(e){
    console.log(e);
    console.log(textbox.text);
});
textbox.stateChanged(function(e) {
    console.log(e);
});
//scrollBar
var scrollbar = new MyToolkit.ScrollBar(window,300);
scrollbar.move(300,30);
scrollbar.onStateChange(function (e){
    console.log(e)
});
//ProgressBar
var progressBar = new MyToolkit.ProgressBar(window);
progressBar.move(25,450);
progressBar.setBarWidth(500);
progressBar.setWidthChangeValue(40);