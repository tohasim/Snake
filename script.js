import LinkedList from "./linkedList.js";
("use strict");

//#region ******** CONTROLLER ********
window.addEventListener("load", start);
document.getElementById("replayButton").addEventListener("click", restart);
let shouldTick = true;

const GRID_ROWS = 15;
const GRID_COLS = 20;

const tickTiming = 100;
const foodTiming = 5000;
var tickTimeout;
var foodTimeout;

const snakeQueue = new LinkedList();
snakeQueue.add({
	row: Math.floor(GRID_ROWS / 2),
	col: Math.floor(GRID_COLS / 2),
});
snakeQueue.add({
	row: Math.floor(GRID_ROWS / 2),
	col: Math.floor(GRID_COLS / 2) + 1,
});
snakeQueue.add({
	row: Math.floor(GRID_ROWS / 2),
	col: Math.floor(GRID_COLS / 2) + 2,
});

const foodQueue = new LinkedList();

let controls = {
	left: false,
	right: false,
	up: false,
	down: false,
};
let direction = "left";

function restart() {
	clearTimeout(tickTimeout);
	clearTimeout(foodTimeout);
	snakeQueue.clear();
	snakeQueue.add({
		row: Math.floor(GRID_ROWS / 2),
		col: Math.floor(GRID_COLS / 2),
	});
	snakeQueue.add({
		row: Math.floor(GRID_ROWS / 2),
		col: Math.floor(GRID_COLS / 2) + 1,
	});
	snakeQueue.add({
		row: Math.floor(GRID_ROWS / 2),
		col: Math.floor(GRID_COLS / 2) + 2,
	});

	controls = {
		left: false,
		right: false,
		up: false,
		down: false,
	};
	document.getElementById("gameInfo").classList.add("hidden");
	direction = "left";
	model.clear();
	createModel();
	shouldTick = true;
	addFood();
	tick();
}

function start() {
	createModel();
	createBoard();

	console.log(`Javascript kører`);

	// Listen for keypresses
	document.addEventListener("keydown", keyDown);

	// start ticking
	tick();
	addFood();
}

function keyDown(event) {
	controls = { left: false, right: false, up: false, down: false };
	switch (event.key) {
		case "ArrowLeft": {
			if (direction != "right") controls.left = true;
			break;
		}
		case "ArrowRight": {
			if (direction != "left") controls.right = true;
			break;
		}
		case "ArrowUp": {
			if (direction != "down") controls.up = true;
			break;
		}
		case "ArrowDown": {
			if (direction != "up") controls.down = true;
			break;
		}
	}
}

function tick() {
	// setup next tick
	if (shouldTick) tickTimeout = setTimeout(tick, tickTiming);

	// remove player from model
	let part = snakeQueue.first();
	do {
		writeToCell(part.data.row, part.data.col, 0);
		part = part.next;
	} while (part !== null);

	// change direction
	if (controls.right) {
		direction = "right";
	} else if (controls.left) {
		direction = "left";
	} else if (controls.up) {
		direction = "up";
	} else if (controls.down) {
		direction = "down";
	}

	// copy head
	const head = {
		row: snakeQueue.first().data.row,
		col: snakeQueue.first().data.col,
	};

	// Move head
	switch (direction) {
		case "left":
			head.col--;
			break;
		case "right":
			head.col++;
			break;
		case "up":
			head.row--;
			break;
		case "down":
			head.row++;
			break;
	}
	if (
		head.col < 0 ||
		head.col > GRID_COLS - 1 ||
		head.row < 0 ||
		head.row > GRID_ROWS - 1
	) {
		gameOver();
	}

	//Check for collisions
	checkForColissions(head);

	// Add new head to queue, and remove old tail
	snakeQueue.addFirst(head);
	// add player to model
	part = snakeQueue.first();
	do {
		writeToCell(part.data.row, part.data.col, 1);
		part = part.next;
	} while (part !== null);

	// display the model in full
	displayBoard();
}

function checkForColissions(head) {
	if (snakeQueue.contains(head)) gameOver();
	if (readFromCell(head.row, head.col) === 0)
		snakeQueue.removeNode(snakeQueue.last());
	else {
		foodTimeout = setTimeout(addFood, foodTiming);
	}
}

function addFood() {
	const foodRow = Math.floor(Math.random() * GRID_ROWS);
	const foodCol = Math.floor(Math.random() * GRID_COLS);
	writeToCell(foodRow, foodCol, 2);
}

function gameOver() {
	clearTimeout(tickTimeout);
	clearTimeout(foodTimeout);
	shouldTick = false;
	document.getElementById("gameInfo").classList.remove("hidden");
}
//#endregion

//#region ******** MODEL ********
const model = new LinkedList();

function createModel() {
	for (let i = 0; i < GRID_ROWS; i++) {
		const row = new LinkedList();
		for (let j = 0; j < GRID_COLS; j++) {
			row.add(0);
		}
		model.add(row);
	}
}

function writeToCell(row, col, value) {
	let cell = model.get(row).data.get(col);
	cell.data = value;
}

function readFromCell(row, col) {
	return model.get(row).data.get(col).data;
}

//#endregion

//#region ******** VIEW ********
function createBoard() {
	const board = document.getElementById("grid");
	board.style.setProperty("--GRID_COLS", GRID_COLS);
	for (let row = 0; row < GRID_ROWS; row++) {
		for (let col = 0; col < GRID_COLS; col++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");
			board.appendChild(cell);
		}
	}
}

function displayBoard() {
	const cells = document.querySelectorAll("#grid .cell");
	for (let row = 0; row < GRID_ROWS; row++) {
		for (let col = 0; col < GRID_COLS; col++) {
			const index = row * GRID_COLS + col;

			switch (readFromCell(row, col)) {
				case 0:
					cells[index].classList.remove("player", "goal");
					break;
				case 1: // Note: doesn't remove goal if previously set
					cells[index].classList.add("player");
					cells[index].classList.remove("goal");
					break;
				case 2: // Note: doesn't remove player if previously set
					cells[index].classList.add("goal");
					break;
			}
		}
	}
}
//#endregion
