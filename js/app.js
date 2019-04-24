// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {  //canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
    if (player.x >= this.x - 35 && player.x <= this.x + 35 && player.y >= this.y - 35 && player.y <= this.y + 35) {
        $('#gameOverModal').modal('show');
//        $('#gameOverModal .restart').click(function () {
        player.x = 200;
        player.y = 400;
//        });


    }



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
//    console.log("player x cordinate" + player.x);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (char) {

    this.sprite = char;
    this.x = 200;
    this.y = 400;
};
Player.prototype.update = function (dt) {

    if (this.y === -20)
    {
        $('#wonModal').modal('show');
        this.x = 200;
        this.y = 400;
    }

};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {

    if (e === 'right' && this.x < 400) { //player isn't on left edge
        this.x = this.x + 55;
    }
    else if (e === 'left' && this.x > 0)
    {
        this.x = this.x - 55;
    }
    else if (this.y < 400 && e === 'down')
    {
        this.y = this.y + 35;
    }
    else if (this.y > 0 && e === 'up')
    {
        this.y = this.y - 35;
    }
//    console.log(this.y);
//    console.log(this.x);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
var y_positions = [50];

$("#levels li").click(function () {

    level = $(this).attr('data-fullText');
    console.log(level);
    if (level === 'easy')
    {
        y_positions = [50];
        $('#myModal').modal('hide');
    }
    else if (level === 'medium')
    {
        y_positions = [50, 150];
        $('#myModal').modal('hide');

    }
    else if (level === 'hard')
    {
        y_positions = [50, 150, 250];
        $('#myModal').modal('hide');

    }
    var i;
    console.log(y_positions.length);
    for (i = 0; i < y_positions.length; i++)
    {
        new_enemy = new Enemy(0, y_positions[i], 100 + Math.floor(Math.random() * 505));
        allEnemies.push(new_enemy);
    }

});

var character = 'images/char-boy.png';
var player = new Player(character);

$(".character").click(function () {
//    alert("hhh");
    character = $(this).attr("src");
//    alert(character);
    player.sprite = "" + character + "";

});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
