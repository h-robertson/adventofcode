// Day 2 - Part 1

fetch('day2/input.txt')
    .then(response => response.text())
    .then(function (text) {

        let input = text.split("\n")
            .filter(e => e)
            .map(x => x.split(" "));

        let depth = 0;
        let horizontal = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i][0] === "forward") {
                horizontal += +input[i][1];
            }
            else if (input[i][0] === "up") {
                depth -= +input[i][1];
            }
            else {
                depth += +input[i][1];
            }
        }

        $('#2-p1').append(`<p class="answer">${horizontal * depth}</p>`)

// Day 2 - Part 2

        depth = 0;
        horizontal = 0;
        let aim = 0;


        for (let i = 0; i < input.length; i++) {
            if (input[i][0] === "forward") {
                horizontal += +input[i][1];
                depth += (+input[i][1] * aim);
            }
            else if (input[i][0] === "up") {
                aim -= +input[i][1];
            }
            else {
                aim += +input[i][1];
            }
        }

        $('#2-p2').append(`<p class="answer">${horizontal * depth}</p>`)

    });
