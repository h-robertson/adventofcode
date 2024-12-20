const fs = require("fs");

function filterNumberCharacters(line) {
	const split = line.split("");
	const numbers = split.map((char, i) => {
		const number = Number(char);
		return {
			digit: number,
			index: i
		}
	}).filter(c => !isNaN(c.digit))
	return numbers;
}

function getCalibrationValue(line) {
	const string_value = String(line[0]) + String(line[line.length -1]);
	return Number(string_value);
}

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);

	// PART 1
	// Strip digits from each line into arrays
	const digits = input.map(line => {
		return filterNumberCharacters(line).map(c => c.digit);
	})

	// Concat first & last digit in each array
	const calib_values = digits.map(line => {
		return getCalibrationValue(line);
	})

	// Sum all calibration values
	const pt1 = calib_values.reduce((total, item) => total + item); 
	console.log('pt1:', pt1)

	// PART 2

	const dict = { "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9 }
	const new_calib_values = input.map(line => {
		// Get first & last actual digit indices
		const digits = filterNumberCharacters(line);
		let first_index = digits[0].index;
		let last_index = digits[digits.length - 1].index;
		let first_digit = Number(line[first_index]);
		let last_digit = Number(line[last_index]);
		
		// Get index of first letter of first & last number word
		let matches = [];
		Object.keys(dict).forEach(key => {
			const match = [...line.matchAll(new RegExp(key, "g"))];
			matches = matches.concat(match);
		})
		
		// If index of number word match is less than first or
		// more than last, reassign those values
		matches.forEach(match => {
			console.log(line, first_digit, last_digit, match[0])
			console.log(first_index, last_index, match.index)
			if (match.index <= first_index) {
				first_index = match.index;
				first_digit = dict[match[0]];
			}
			if (match.index >= last_index) {
				last_index = match.index;
				last_digit = dict[match[0]];
			}
			console.log(first_digit, last_digit)
		})
		return Number(String(first_digit) + String(last_digit));
	})
	
	const pt2 = new_calib_values.reduce((total, item) => total + item); 
	console.log('pt2:', pt2)
});