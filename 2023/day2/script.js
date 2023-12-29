const fs = require("fs");

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);
	
	const id_regex = /(?<=Game )\d+/;
	const remove_id_regex = /Game \d+: /;
	const red_regex = /\d+(?= red)/;
	const green_regex = /\d+(?= green)/;
	const blue_regex = /\d+(?= blue)/;

	const games = input.map(game => {
		const id = game.match(id_regex)[0];
		const picks = game.replace(remove_id_regex, "").split(";").map(e => e.trim());

		let red = 0;
		let green = 0;
		let blue = 0;
		picks.forEach(p => {
			const red_m = p.match(red_regex);
			if (red_m) red = Math.max(red, Number(red_m[0]));
			const green_m = p.match(green_regex);
			if (green_m) green = Math.max(green, Number(green_m[0]));
			const blue_m = p.match(blue_regex);
			if (blue_m) blue = Math.max(blue, Number(blue_m[0]));
		})
		return { id, red, green, blue };
	})
	
	const poss_games = games.filter(game => {
		return (game.red <= 12) && (game.green <= 13) && (game.blue <= 14);
	})

	const pt1 = poss_games
		.map(g => Number(g.id))
		.reduce((total, item) => total + item); 
	console.log('pt1:', pt1)

	const powers = games.map(game => {
		return game.red * game.green * game.blue;
	})
	
	const pt2 = powers.reduce((total, item) => total + item);
	console.log('pt2:', pt2)
});