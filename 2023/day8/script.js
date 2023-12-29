const fs = require("fs");

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);
	
	const instructions = input.shift();

	const node_regex = /(.+) = \(([^,]+), ([^)]+)\)/;
	const nodes = input.filter(l => l !== "").map(line => {
		const match = line.match(node_regex);
		if (match) {
			return {
				id: match[1],
				l: match[2],
				r: match[3],
			};
		}
	})
	
	let current_node = "AAA";
	let instruction_index = 0;
	let step_counter = 0;
	while (current_node !== "ZZZ") {
		// Get current node
		const node = nodes.find(n => n.id == current_node);
		
		// Get instruction
		const instruction = instructions[instruction_index];
		
		// Follow instruction
		current_node = instruction == "L" ? node.l : node.r;
		
		// Increment instruction index (reset at end of instructions)
		if (instructions[instruction_index + 1] == undefined) {
			instruction_index = 0;
		}
		else instruction_index ++;
		step_counter ++;
	}
	const pt1 = step_counter;
	// console.log('pt1:', pt1)
});

