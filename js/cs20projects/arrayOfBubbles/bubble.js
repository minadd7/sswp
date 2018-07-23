function Bubble(x, y, col) {
    // Properties (State)
    this.x = x;
    this.y = y;
    this.r = random(2.4, 6.4);
    this.col = col;
    this.magic = function(i) {
        this.col = rcolors[i];
    };

    // Methods (Behaviour)
    this.update = function() {
        // Move Bubble object by random amounts
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    };

    this.display = function() {
        // Draw Bubble object to the canvas
        noFill();
        stroke(this.col);
        fill(this.col);
        ellipse(this.x, this.y, 2 * this.r);
    };

}
