var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circles = [];
const G = 1
const exponent = 1
const m = 2

canvas.addEventListener('click', function(event) {
    var x = event.offsetX;
    var y = event.offsetY;

    circles.push({x: x, y: y, radius: 10, color: "white", x_vel: 0, y_vel: 0, a: [0,0]});
});

function abs(x, y) {
    return Math.sqrt(x**2 + y**2);
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//resize the canvas whenever the window size changes
window.addEventListener('resize', resizeCanvas);

//resize it initially
resizeCanvas();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //physics
    for (var i = 0; i < circles.length; i++) {
        circles[i].a = [0, 0];
        for (var j = 0; j < circles.length; j++) {
            if (j === i) continue;
            var r_x = circles[j].x - circles[i].x;
            var r_y = circles[j].y - circles[i].y;
            var r_size = abs(r_x, r_y);
            var force = G * m / Math.pow(r_size, exponent);
            circles[i].a[0] += force * (r_x / r_size); // acceleration in x-direction
            circles[i].a[1] += force * (r_y / r_size); // acceleration in y-direction
        }
    }

    //updating positions, velocities and drawing the circles
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        drawCircle(circle);
        circle.x += circle.x_vel;
        circle.y += circle.y_vel;
        circle.x_vel += circle.a[0];
        circle.y_vel += circle.a[1];
    }

    requestAnimationFrame(update);

}

update();