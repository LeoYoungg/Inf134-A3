import {SVG} from './svg.min.js';
/**
 * A button.
 * @constructor
 * @param {document} window the input window
 * @param {string} text- the text of button
 */

var Button = function(window,text){

    var rect = window.rect(150,50).fill('#73C2FB').radius(10);
    var label = window.text(text).font('family', 'serif')

    var clickEvent = null;
    var stateEvent = null;

    rect.click(function(event){
        this.fill({ color: '#4C516D'});
        if(clickEvent != null)
            clickEvent(event);
        if(stateEvent != null)
            stateEvent(event);
    })
    rect.mouseover(function(event){
        this.fill({ color: '#4682B4'});
        if(stateEvent != null)
            stateEvent(event);
    })
    rect.mouseout(function(event){
        this.fill({ color: '#73C2FB'});
        if(stateEvent != null)
            stateEvent(event);
    })

    return {
        move: function(x, y) {
            rect.move(x, y);
            label.move(x+50, y+13);
        },

        onClick: function(clickEventHandler){
            clickEvent = clickEventHandler;
        },

        onStateChange: function(stateEventHandler){
            stateEvent = stateEventHandler;
        },

    }
};

/**
 * A checkBox.
 * @constructor
 * @param {document} window the input window
 * @param {string} text- the text of the checkbox
 */
var CheckBox = function(window,text) {
    var checkboxGroup =window.group();
    var rect = window.rect(15, 15).fill('#73C2FB');
    checkboxGroup.add(rect);

    var sign = window.text('x');
    checkboxGroup.add(sign);
    sign.center(rect.cx(), rect.cy());
    sign.hide();
    var label = window.text(text).font('family', 'serif');
    label.move(rect.cx()+10,rect.cy()-10);
    checkboxGroup.add(label);
    var clickEvent = null;
    var stateEvent = null;
    var checked = false;

    checkboxGroup.click(function(event) {
        if(clickEvent != null)
            clickEvent(event);
        if(stateEvent != null)
            stateEvent(event);

        if (checked === false) {
            this.fill({color: '#4682B4'});
            sign.show();
            checked = true;
        }
        else {
            this.fill({color: 'black'});
            sign.hide();
            checked = false;
        }
    })

    return {
        /**
         * move the widget to position
         * @param {int} x the x position of landmark
         * @param {int} y the y position of landmark
         */
        move: function(x, y) {
            checkboxGroup.move(x,y);

        },
        /**
         * a function that handle a clickEvent
         * @param {eventHandler} clickEventHandler
         */
        onClick: function(clickEventHandler){
            clickEvent = clickEventHandler;
        },
        /**
         * a function that handle a stateEvent
         * @param {eventHandler} stateEventHandler
         */
        onStateChange: function(stateEventHandler){
            stateEvent = stateEventHandler;
        },
        /**
         * a function that return current check state
         */
        getCheckedState: function(){
            return checked;
        },

    }
}
/**
 * A radio button.
 * @constructor
 * @param {document} window the input window
 * @param {int} numLabels- the num of labels
 */

var RadioButtons = function(window,numLabels) {
    var radioGroup = window.group();
    var radioButtonArray = [];
    var textArray = []
    var clickEvent = null;
    var stateEvent = null;
    var isSelected = false;
    var buttonSelected =-1;

    for (let i=0; i<numLabels; i++) {
        var newRadioButton =  radioGroup.circle(15).fill({color:'#73C2FB', opacity: 0.10}).stroke({color: '#4682B4', width: 1});
        radioButtonArray.push(newRadioButton);
        var label = radioGroup.text("option" + i).fill('black').font('family', 'serif');
        textArray.push(label);
    }
    for(let i = 0; i<numLabels; i++){
        radioButtonArray[i].mouseover(function(){
            if(buttonSelected != i)
                this.fill({color: '#73C2FB', opacity: 0.8}).stroke({color: '#73C2FB', width: 1.0});
        })
        radioButtonArray[i].mouseout(function(){
            if(buttonSelected != i)
                this.fill({color: 'white', opacity: 0.8}).stroke({color: '#73C2FB', width: 1.0});

        })
        radioButtonArray[i].click(function(){

            if (isSelected == false) {
                this.fill({color: '#4682B4', opacity: 1});
                isSelected = true;
            }
            if( buttonSelected != -1){
                this.fill({color: '#4682B4', opacity: 1});
                radioButtonArray[buttonSelected].fill({color: '#73C2FB', opacity: 0.2}).stroke({color: '#73C2FB', width: 1.0});
            }
            buttonSelected = i;
            if(stateEvent != null)
                stateEvent("Radio selected is "+(buttonSelected+1));
        })

    }

    return {
        /**
         * move the widget to position
         * @param {int} x the x position of landmark
         * @param {int} y the y position of landmark
         */
        move: function(x, y) {
            var newY = y;
            for (let i =0; i<numLabels; i++) {
                radioButtonArray[i].move(x, newY);
                textArray[i].move(x + 25, newY-3);
                newY += 35;
            }
        },
        /**
         * a function that update the click event and isSelected varible
         * @param {eventHandler}clickEventHandler
         */
        onClick: function(clickEventHandler){
            isSelected = true;
            clickEvent = clickEventHandler;
        },
        /**
         *
         * @param stateEventHandler
         */
        onStateChange: function(stateEventHandler){
            stateEvent = stateEventHandler;
        },
        /**
         * set the option label text by index
         * @param {int} index
         * @param {string} content
         */
        setText: function(index, content) {
            textArray[index].text(content);
        },
        /**
         * return the index of buttonSelected
         * @returns {number} buttonSelect
         */
        getSelected: function(){
            return buttonSelected;
        },
        /**
         * return whether the radio button is selected
         * @returns {boolean}
         */
        isSelected: function(){
            return isSelected;
        }

    }
}

/**
 * A textBox.
 * @constructor
 * @param {document} window the input window
 */
var TextBox = function(window) {
    var textBox = window.group();
    var rect = textBox.rect(150,30).fill({color: '#73C2FB', opacity: 0.3}).stroke({color: 'black', width: 2.0});
    var text = textBox.text("type").move(6,3);
    var state = "";
    var changeEvent = null;
    var stateEvent = null;
    var caret = textBox.rect(1, 20).stroke({color: '#73C2FB', width: 1.0}).move(5, 5).opacity(0);
    var runner = caret.animate().width(0);
    runner.loop(1000,10,10);


    textBox.mouseover(function(){
        state = "hover";
        caret.opacity(1);
        stateChange()
    })

    textBox.mouseout(function(){
        state = "idle";
        caret.opacity(0);
        stateChange()
    })

    textBox.mouseup(function(){
        state = "clicked";
        caret.opacity(1);
        stateChange();
    })

    textBox.click(function(event){
        caret.opacity(1);
        state = "clicked";
        text.text("");
        stateChange();
    })

    function stateChange(){
        stateEvent("Text Box state: "+state);
    }

    return {
        /**
         * move the widget to position
         * @param {int} x the x position of landmark
         * @param {int} y the y position of landmark
         */
        move: function(x, y) {
            textBox.move(x, y);
        },
        /**
         * an eventHandler that detect a change
         * @param {eventHandler} eventHandler the x position of landmark
         */
        onChange: function(eventHandler){
            changeEvent = eventHandler;
        },

        /**
         * a function that handles the state change
         * @param eventHandler
         */
        stateChanged: function(eventHandler) {
            stateEvent = eventHandler;
        },

        /**
         * return user input
         * @returns {string} text
         */
        text: function() {
            return text;
        },
    }
}
/**
 * A scrollBar.
 * @constructor
 * @param {document} window the input window.
 * @param {int} height- the height of the scrollbar you want.
 */
var ScrollBar = function(window,height){
    var group = window.group()
    var rect = window.rect(50, height).fill('white').radius(10).stroke({color: 'black', width: 2.0});
    group.add(rect);

    var slider = window.rect(50, height/3).fill('#73C2FB').radius(10);
    group.add(slider);

    var moveEvent = null;
    var currentEvent = null;
    var mouseDown = false;
    var lastPosition = rect.y();
    var direction;

    slider.mousedown(function(event){
        if (currentEvent != null)
            currentEvent(event)
        mouseDown = true;
    })

    slider.mouseup(function(event){
        if (currentEvent != null)
            currentEvent(event)
        mouseDown = false;

    })

    slider.mousemove(function(event){
        if(moveEvent != null){
            moveEvent(event);
        }

        if (currentEvent != null)
            currentEvent(event);

        if (mouseDown) {
            if (slider.y() < rect.y()){
                slider.y(rect.y());
            }
            else if (slider.y() > rect.y() + height - height/3){
                slider.y(rect.y() + height - height/3);
            }
            else{
                if (((event.offsetY - 25) >= rect.y()) && ((event.offsetY - 25) <= rect.y() + height - height/3)){
                    slider.y(event.offsetY - 25);
                }

                if (event.offsetY > lastPosition) {
                    direction = "Downwards";
                    lastPosition = event.offsetY;
                    console.log("Move downwards");
                }
                else {
                    direction = "Upwards";
                    console.log("Move upwards");
                }
            }
        }
    })

    return {
        /**
         * move the widget to position
         * @param {int} x the x position of landmark
         * @param {int} y the y position of landmark
         */
        move: function(x, y) {
            group.move(x, y);
        },

        /**
         * a function that return hte scroll position
         * @returns {string}
         */
        getScrollPosition: function() {
            return "(" + slider.x() + "," + slider.y() + ")";
        },

        /**
         * a function that handle a moveEvent
         * @param {eventHandler} currentEventHandler the x position of landmark
         */
        onMove: function(moveEventHandler){
            moveEvent = moveEventHandler;
        },

        /**
         * a function that handles a stateChange event
         * @param {eventHandler} currentEventHandler the x position of landmark
         */
        onStateChange: function(currentEventHandler){
            currentEvent = currentEventHandler;
        }
    }
}

/**
 * A progressBar.
 * @constructor
 * @param {document} window the input window
 */
var ProgressBar = function(window){
    var progressBar = window.group();
    var barWidth = 400;
    var bar = progressBar.rect(barWidth,20).stroke({color: '#4682B4', width: 1}).fill('none').move(5, 5).front();
    bar.radius(5);
    var progress = progressBar.rect(130, 19).fill({color: '#4682B4', opacity:0.5}).move(5, 6);
    progress.radius(5);

    var right = progressBar.text(">").font({'family': 'serif', 'size': 50}).fill("#73C2FB");
    var left = progressBar.text("<").font({'family': 'serif', 'size': 50}).fill("#73C2FB");
    var progressEvent = null;
    var stateEvent = null;
    var state = "";
    var widthChange = 20;

    right.click(function(event){
        var newWidth = progress.width() + widthChange;
        if (barWidth - newWidth <= 1) {
            progress.width(barWidth);
        }
        else {
            progress.width(newWidth);
        }
        if (progressEvent != null) {
            progressEvent("Progress bar go right wards" + widthChange);
        }
        state = "clicked rightwards ";
        stateChange();
    });

    left.click(function(event) {
        state = "clicked leftwards";
        let newWidth = progress.width() - widthChange;
        if (newWidth<= 0) {
            progress.width(0);
        }
        else{
            console.log(2)
            progress.width(newWidth);
        }
        stateChange();
    });


    function stateChange(){
        console.log("State: "+state);
    };

    return {
        /**
         * move the widget to position
         * @param {int} x the x position of landmark
         * @param {int} y the y position of landmark
         */
        move: function(x,y) {
            progressBar.move(x, y);

            left.move(x+50, y);
            right.move(x+barWidth, y);
        },

        /**
         * set the width of the bar
         * @param {int} width
         */
        setBarWidth: function(width) {
            bar.width(width);
            barWidth = width;
        },

        /**
         * set the changed width per click
         * @param {int} width
         */

        setWidthChangeValue: function(width) {
            widthChange = width;
            let currW = bar.width() - 2;
            progress.width(currW * (width/100));
        },

        /**
         * return the width change value
         * @returns {number}
         */

        getWidthChangeValue: function() {
            return widthChange;
        },
        /**
         * a function that update stateEvent
         * @param event
         */
        stateChanged: function(event) {
            stateEvent = event;
        },

    }

}



var MyToolkit = (function() {
    return {Button, CheckBox, RadioButtons, TextBox, ScrollBar, ProgressBar};
}());

export{MyToolkit};