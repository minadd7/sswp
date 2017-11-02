function ball(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.xSpeed = 0;
    this.xSP = 210;
    this.ySpeed = 0;
    this.ballStatus = "standby";
    this.swi = 0; // Variable to prevent that 1 ball decrease brick's life twice.

    this.update = function() {
        if (this.x > 405 || this.x < 15) { // Bounce it when it touches the wall
            this.xSpeed *= -1;
        }
        if (this.y < 45) { // Bounce when it touches the top
            this.ySpeed *= -1;
        }
        if (this.ballStatus == "fire") {
            this.swi = 0;
            this.x += this.xSpeed;
            for (var j = 0; j < 6; j++) {
				for (var k = 0; k < 9; k++) {
					if (this.x >= j * 69 - 4 && this.x <= (j + 1) * 69 + 8 && this.y >= k * 50 + 80 && this.y <= (k + 1) * 50 + 90) {
						if (bricks[j][k] == -1) {
							chkball++;
							bricks[j][k] = 0;
						} else if (bricks[j][k] > 0) {
                            this.x -= this.xSpeed;
                            this.xSpeed *= -1;
                            bricks[j][k]--;
                            this.swi++;
                            twinkleArray[j][k] = 1;
                            // sound.play();
                        }
					}
				}
			}
            this.y += this.ySpeed;
            for (var j = 0; j < 6; j++) {
				for (var k = 0; k < 9; k++) {
					if (this.x >= j * 69 - 4 && this.x <= (j + 1) * 69 + 8 && this.y >= k * 50 + 80 && this.y <= (k + 1) * 50 + 90) {
						if (bricks[j][k] == -1) {
							chkball++;
							bricks[j][k] = 0;
						} else if (bricks[j][k] > 0) {
                            this.y -= this.ySpeed;
                            this.ySpeed *= -1;
                            twinkleArray[j][k] = 1;
                            bricks[j][k]--;
                            // sound.play();
                        }
					}
				}
			}
        }

    };

    this.defineSpeed = function() { // Define speed based on ball's speed.
        var h = dist(this.x, this.y, mouseX, mouseY);
        this.xSpeed = this.speed * (mouseX - this.x) / h;
        this.ySpeed = this.speed * (mouseY - this.y) / h;
    };

    this.display = function() {
        // Shadow
        noStroke();
        fill(150, 80);
        ellipse(this.x + 4, this.y + 5, 20, 20);
        // Ball
        fill(50, 150, 255);
        ellipse(this.x, this.y, 20, 20);

        textSize(12);
        noStroke();
        fill(50, 150, 255);
    };
}

function fireBalls() {
	if (timer % 4 === 0 && timer > 0) { // Fire balls every 4 frames except 0.
		balls[timer/4 - 1].ballStatus = "fire";
        ballCount++;
	}
}
