const COLORS = ["red", "green", "blue"];

const DOTS_COUNT = 3;

const DOT_W = 20;
const DOT_H = 20;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function calculateAngle(x1, y1, x2, y2) {
	const deltaY = y2 - y1;
	const deltaX = x2 - x1;
	const angleInRadians = Math.atan2(deltaY, deltaX);
	const angleInDegrees = (angleInRadians * 180) / Math.PI; // Convert radians to degrees
	return angleInDegrees >= 0 ? angleInDegrees : 360 + angleInDegrees; // Ensure positive angle
}

function calculateDistance(x1, y1, x2, y2) {
	const deltaX = x2 - x1;
	const deltaY = y2 - y1;
	const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	return distance;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// class Triangle {
//     constructor() {}

//     draw() {}
// }

const pos = [];
const dist = [];

function draw() {
	for (let i = 0; i < DOTS_COUNT; i++) {
		const randPos_x = Math.abs(Math.round(Math.random() * WIDTH - DOT_W));
		const randPos_y = Math.abs(Math.round(Math.random() * HEIGHT - DOT_H));

		// Set the line dash pattern and offset
		ctx.lineDashOffset = 0;

		ctx.setLineDash([0, 0]);

		ctx.strokeStyle = COLORS[i];
		ctx.lineWidth = 2;
		ctx.strokeRect(randPos_x, randPos_y, DOT_W, DOT_H);

		// Draw dashed lines after drawing the rectangles
		ctx.strokeStyle = "#00000020";

		// Horizontal Lines
		ctx.beginPath();
		ctx.setLineDash([5, 10]); // Set dash pattern for the lines
		ctx.moveTo(0, randPos_y + DOT_H / 2);
		ctx.lineTo(randPos_x + WIDTH, randPos_y + DOT_H / 2);
		ctx.stroke();
		ctx.closePath();

		// Vertical Lines
		ctx.beginPath();
		ctx.setLineDash([5, 10]); // Set dash pattern for the lines
		ctx.moveTo(randPos_x + DOT_W / 2, 0);
		ctx.lineTo(randPos_x + DOT_W / 2, HEIGHT);
		ctx.stroke();
		ctx.closePath();

		pos[i] = { x: randPos_x, y: randPos_y };
	}
}

function drawTriangle() {
	// Triangle Line
	ctx.strokeStyle = "#3498DB";
	ctx.beginPath();
	ctx.setLineDash([]); // Set dash pattern for the lines
	ctx.moveTo(pos[0].x + DOT_W / 2, pos[0].y + DOT_H / 2);

	for (let i = 0; i < pos.length - 1; i++) {
		ctx.lineTo(pos[i + 1].x + DOT_W / 2, pos[i + 1].y + DOT_H / 2);
	}

	ctx.lineTo(pos[0].x + DOT_W / 2, pos[0].y + DOT_H / 2);

	ctx.stroke();
}

function init() {
	// Set the canvas size
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	// Set the background color
	ctx.fillStyle = "#F1F3F4"; // Choose your desired background color
	ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw a filled rectangle covering the canvas

	draw();
	drawTriangle();
}

window.onload = () => {
	init();
};
