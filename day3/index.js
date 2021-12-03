// Day 3 - Part 1

fetch('day3/input.txt')
    .then(response => response.text())
    .then(function (text) {

        let input = text.split("\n")

        let gamma = "";
        let zero = 0;
        let one = 0;

        for (let i = 0; i < input[0].length; i++){

            zero = 0;
            one = 0;

            for (let j = 0; j < input.length; j++) {
                input[j][i]=== "0" ? zero ++ : one ++;
            }

            zero > one ? gamma += "0" : gamma += "1";
        }

        let epsilon = "";

        for (let k = 0; k < gamma.length; k++) {
            gamma[k] === "0" ? epsilon += "1" : epsilon += "0";
        }

        $('#3-p1').append(`<p class="answer">${parseInt(gamma,2)*parseInt(epsilon,2)}</p>`)

    });