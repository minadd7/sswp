function JumpingPlayer(x, y, lc, uc, rc, dc, col) {
    // Properties (State)
    this.x = x;
    this.y = y;
    this.w = 25;
    this.h = 25;
    this.dx = 5;
    this.dy = 0;
    this.g = 0.7;
    this.launchSpeed = -15;
    this.lc = lc;  // left keycode
    this.uc = uc;  // up keycode
    this.rc = rc;  // right keycode
    this.dc = dc;  // down keycode
    this.col = col;  // colour
    this.jumpCount = 0;
    this.dstatus = 0;

    // Methods (Behaviour)
    this.update = function(platforms) {
        this.moveHz();
        this.moveVt(platforms);
    };

    this.moveHz = function() {
        if (keyIsDown(this.lc)) {
            this.x -= this.dx; // Move Left
            if (this.x < 0) { // Stop at left edge
                this.x = 0;
            }
        } else if (keyIsDown(this.rc)) {
            this.x += this.dx; // Move Right
            if (this.x + this.w > width) { // Stop at right edge
                this.x = width - this.w;
            }
        }
    };

    this.moveVt = function(platforms) {
        // Move Vertically & Apply Gravity
        this.y += this.dy;
        this.dy += this.g;

        // Land on Ground
        if (this.y + this.h > height) {
            this.dy = 0;
            this.y = height - this.h;
            this.jumpCount = 0;
        }

        // Land on a Platform
        if (!keyIsDown(this.dc)) {
            for (var i = 0; i < platforms.length; i++) {
                if (this.intersects(platforms[i])) {
                    this.dy = 0;
                    this.y = platforms[i].y - this.h;
                    break;
                }
            }
        }
    };

    this.intersects = function(aPlatform) {
        var le1 = this.x;
        var re1 = this.x + this.w;
        var te1 = this.y;
        var be1 = this.y + this.h;
        var le2 = aPlatform.x;
        var re2 = aPlatform.x + aPlatform.w;
        var te2 = aPlatform.y;
        var be2 = aPlatform.y + aPlatform.h;
        if (le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2) {
            this.jumpCount = 0;
            return true;
        } else {
            return false;
        }
    };

    this.jump = function() {
        this.dy = this.launchSpeed;
    };


    this.display = function() {
        // Draw player
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.w, this.h);
    };

    this.keyEvent = function() {
        if (keyCode == this.uc && this.jumpCount < 2) { // Jump on up code
            this.jump();
            this.jumpCount++;
        }
    };

}
