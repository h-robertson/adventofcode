const fs = require("fs");

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);
	
	const times = input[0].split(/\s+/);
	times.shift();
	const distances = input[1].split(/\s+/);
	distances.shift();

	const races = times.map((t, i) => {
		return {
			race: i,
			time: Number(t),
			distance: Number(distances[i])
		}
	})
	
	const wins = races.map(r => getNumWins(r.time, r.distance))
	const pt1 = wins.reduce((total, item) => total * item);
	console.log('pt1:', pt1)

	const time = Number(times.join(""));
	const distance = Number(distances.join(""));
	
	const pt2 = getNumWins(time, distance);
	console.log('pt2:', pt2)
});

function getNumWins(time, record) {
	let wins = 0;
	for (let i = 0; i < time + 1; i++) {
		const speed = i;
		const moving_ms = time - i;
		const distance = speed * moving_ms;
		if (distance > record) wins ++;
	}
	return wins;
}