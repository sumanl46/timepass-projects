const COLORS = ["red", "green", "blue"];

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

function drawDots(dots, lines) {
	dots.forEach((d, i) => {
		d.style.width = `${DOT_W}px`;
		d.style.height = `${DOT_H}px`;

		const randPos_x = Math.abs(Math.round(Math.random() * WIDTH - DOT_W));
		const randPos_y = Math.abs(Math.round(Math.random() * HEIGHT - DOT_H));

		d.style.backgroundColor = COLORS[i];
		lines[i].style.backgroundImage = `linear-gradient(to bottom, ${COLORS[i]}, ${COLORS[i + 1] ?? COLORS[0]})`;
		lines[i].style.width = `${DOT_W}px`;

		d.style.left = `${randPos_x}px`;
		d.style.top = `${randPos_y}px`;
		d.innerHTML = `<span>${i}</span>`;
	});
}

function drawTraingle() {
	const container = document.querySelector(".container");
	const dots = container.querySelectorAll(".dots .dot");
	const lines = container.querySelectorAll(".lines .line");

	drawDots(dots, lines);

	const pos = [];
	const dist = [];

	for (let i = 0; i < dots.length; i++) {
		const dot = dots[i].getBoundingClientRect();
		const x = dot.x;
		const y = dot.y;
		pos[i] = {
			x,
			y,
		};
	}

	pos.forEach((_, i) => {
		if (i >= dots.length - 1) {
			dist[i] = calculateDistance(pos[i].x, pos[i].y, pos[0].x, pos[0].y);
		} else {
			dist[i] = calculateDistance(pos[i].x, pos[i].y, pos[i + 1].x, pos[i + 1].y);
		}
	});

	lines.forEach((line, i) => {
		line.style.height = `${dist[i]}px`;

		line.style.left = `${pos[i].x}px`;
		line.style.top = `${pos[i].y}px`;

		var x1,
			y1,
			x2,
			y2 = 0;

		if (i >= dots.length - 1) {
			x1 = pos[i].x;
			y1 = pos[i].y;
			x2 = pos[0].x;
			y2 = pos[0].y;
		} else {
			x1 = pos[i].x;
			y1 = pos[i].y;
			x2 = pos[i + 1].x;
			y2 = pos[i + 1].y;
		}

		let angle = calculateAngle(x1, y1, x2, y2);
		// angle = angle * (180 / Math.PI);

		line.style.transformOrigin = "top";
		line.style.transform = `rotate(${y1 > y2 ? -angle : angle}deg)`;

		console.log(angle);
	});
}

window.onload = () => {
	drawTraingle();
};
