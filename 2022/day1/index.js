// Day 1 - Part 1

fetch('day1/input.txt')
    .then(response => response.text())
    .then(function (text) {
        let input = text.split("\n").map((x) => +x);

        let number = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i] < input[i + 1]) {
                number++;
            }
        }

        $('#1-p1').append(`<p class="answer">${number}</p>`)
    });

// Day 1 - Part 2
fetch('day1/input.txt')
    .then(response => response.text())
    .then(function (text) {
        let input = text.split("\n").map((x) => +x);

        let sums = [];

        for (let i = 0; i < input.length - 2; i++) {
            sum = input[i] + input[i+1] + input[i+2];
            sums.push(sum);
        }        

        let sumsNum = 0;

        for (let i = 0; i < sums.length; i++) {
            if (sums[i] < sums[i+1]) {
                sumsNum ++;
            }
        }

        $('#1-p2').append(`<p class="answer">${sumsNum}</p>`)
    });