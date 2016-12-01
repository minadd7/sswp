// ADD & REMOVE BOUNCING CIRCLES ASGN START CODE

// DECLARE GLOBAL VARIABLES
var circle;

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(600, 400);

    // Initialize Variables
    circle = new BouncingCircle(1, -5);
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    background(0);
    circle.update();
    circle.display();
}
