const fs = require("fs");
const cliProgress = require('cli-progress');

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n\n").map((x) => x);

	const seeds = input[0].split(" ").slice(1).map(Number);	
	const almanac = input.slice(1);

	const maps = almanac.map(map => {
		map = map.split("\n");
		map.shift();
		map = map.map(line => {
			line = line.split(" ").map(el => Number(el));
			return {
				dest_start: line[0],
				dest_end: line[0] + (line[2] - 1),
				src_start: line[1],
				src_end: line[1] + (line[2] - 1)
			}
		})
		return map;
	})

	const locations = seeds.map(seed => {
		const soil = find(seed, maps[0]);
		const fertilizer = find(soil, maps[1]);
		const water = find(fertilizer, maps[2]);
		const light = find(water, maps[3]);
		const temperature = find(light, maps[4]);
		const humidity = find(temperature, maps[5]);
		const location = find(humidity, maps[6]);
		return location;
	});
	
	const pt1 = Math.min(...locations);
	// console.log('pt1:', pt1)


	let pt2 = Infinity;

	let seeds_length = 0;
	for (let i = 1; i < seeds.length; i+= 2) {
		seeds_length += seeds[i];
	}

	// create a new progress bar instance and use shades_classic theme
	const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

	// start the progress bar with a total value of 200 and start value of 0
 	bar1.start(seeds_length, 0);
	
	for (let i = 0; i < seeds.length; i+= 2) {
		const start_seed = seeds[i];
		const range = seeds[i + 1];
		for (let j = 0; j < range; j++) {
			bar1.update((i + 1) * (j + 1));
			const new_seed = start_seed + j;
			const soil = find(new_seed, maps[0]);
			const fertilizer = find(soil, maps[1]);
			const water = find(fertilizer, maps[2]);
			const light = find(water, maps[3]);
			const temperature = find(light, maps[4]);
			const humidity = find(temperature, maps[5]);
			const location = find(humidity, maps[6]);
			pt2 = Math.min(pt2, location)
		}
	}
	console.log('pt2:', pt2)
	// 60568880
	bar1.stop();
});	

// Find m in map where el is located
// Get index in m where el is located
// Return destination match at that index
function find(src, map) {
	const match = map.find((m) => {
		return (m.src_start <= src) && (m.src_end >= src);
	});
	if (!match) return src;
	const index = src - match.src_start;
	const dest =  match.dest_start + index;
	return dest;
}
