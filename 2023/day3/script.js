const fs = require("fs");

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);

	const number_regex = /\d+/g;
	const symbol_regex = /[^a-zA-Z\d.]/g
	const lines = input.map((line, i) => {
		const number_matches = [...line.matchAll(number_regex)];
		let numbers = [];
		number_matches.forEach(m => {
			numbers.push({
				number: m[0],
				start_index: m.index,
				end_index: m.index + m[0].length - 1
			})
		});

		const symbol_matches = [...line.matchAll(symbol_regex)];
		let symbols = [];
		symbol_matches.forEach(m => {
			symbols.push({
				line: i,
				symbol: m[0],
				index: m.index,
			})
		});
		
		return { line, numbers, symbols };
	})

	// For each line...
	// For each number...
		// On the current line if there's a symbol with an index just before 
		// start index or just before end index
		// On the above line if there's a symbol with an index between
		// start_index - 1 and end_index + 1 (inclusive)
		// On the below line if there's a symbol with an index between
		// start_index - 1 and end_index + 1 (inclusive)

	let all_part_numbers = [];
	let possible_gears = [];
	lines.forEach((line, i) => {
		let line_part_numbers = [];
		line.numbers.forEach(number => {
			const adjacent_symbols = [];
			const symbol_current = line.symbols.find(s => {
				const symbol_before = s.index + 1 == number.start_index;
				const symbol_after = s.index - 1 == number.end_index;
				return symbol_before || symbol_after;
			})
			if (symbol_current) adjacent_symbols.push(symbol_current);

			let symbol_above = undefined;
			const line_above = lines[i - 1];
			if (line_above) {
				symbol_above = line_above.symbols.find(s => {
					return s.index >= (number.start_index - 1) && s.index <= (number.end_index + 1);
				})
			}
			if (symbol_above) adjacent_symbols.push(symbol_above);

			let symbol_below = undefined;
			const line_below = lines[i + 1];
			if (line_below) {
				symbol_below = line_below.symbols.find(s => {
					return s.index >= (number.start_index - 1) && s.index <= (number.end_index + 1);
				})
			}
			if (symbol_below) adjacent_symbols.push(symbol_below);

			if (adjacent_symbols.length) {
				adjacent_symbols.forEach(s => {
					if (s.symbol === "*") {
						const poss_gear_index = possible_gears.findIndex(sym => {
							return (sym.line === s.line) && (sym.index === s.index)
						})
						if (poss_gear_index < 0) possible_gears.push({...s, numbers: [Number(number.number)] })
						else possible_gears[poss_gear_index].numbers.push(Number(number.number));
				}
				})

				line_part_numbers.push(Number(number.number));
			}
		})

		all_part_numbers = all_part_numbers.concat(line_part_numbers);


	})	
	const pt1 = all_part_numbers.reduce((total, item) => total + item);
	console.log('pt1:', pt1)


	const gears = possible_gears.filter(g => g.numbers.length === 2);
	let pt2 = 0;
	gears.forEach(g => {
		const gear_ratio = g.numbers.reduce((total, item) => total * item);
		pt2 += gear_ratio;
	})
	console.log('pt2:', pt2)

});