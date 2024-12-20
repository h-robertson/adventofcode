const fs = require("fs");

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);
	const id_regex = /(?<=Card\s+)\d+/;
	const strip_id = /Card\s+\d+:\s+/;

	const cards = input.map((line, i) => {
		const id = line.match(id_regex)[0];
		const to_strip = line.match(strip_id)[0];
		const numbers = (line.replace(to_strip, "")).split(" | ");
		const winning = numbers[0].split(" ").filter(d => d !== "").map(n => Number(n));
		const actual = numbers[1].split(" ").filter(d => d !== "").map(n => Number(n));
		return {
			id,
			index: i,
			winning,
			actual,
			win_count: 0,
			copies: 1			
		}
	})

	let pt1 = 0;
	cards.forEach((c, i) => {
		c.actual.forEach(a => {
			if (c.winning.includes(a)) c.win_count ++;
		})
		if (c.win_count) {
			pt1 += 1 * Math.pow(2, (c.win_count - 1))
		};
	})

	// If a card has n wins, add a copy to each of the next n cards
	cards.forEach((card, index) => {
		for (let i = 0; i < card.copies; i++) {			
			for (let i = 0; i < card.win_count; i++) {
				cards[index + i + 1].copies ++;
			}
		}
	})

	const pt2 = cards.reduce((total, c) => { return (total + c.copies) }, 0)
	console.log(pt2);

});
