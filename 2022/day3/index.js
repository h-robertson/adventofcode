// Day 3 - Part 1

function binToDec(binaryValue) {
    var decimal = parseInt(binaryValue, 2)
    return decimal;
}

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

        $('#3-p1').append(`<p class="answer">${binToDec(gamma)*binToDec(epsilon)}</p>`)


// Day 3 - Part 2

        let most, least;
        let most_input = least_input = input;

        for (let i = 0; i < input[0].length; i++) {

            if (most_input.length > 1) {
                zero_most = 0;
                one_most = 0;

                for (let j = 0; j < most_input.length; j++) {
                    most_input[j][i] === "0" ? zero_most ++ : one_most ++;                
                }

                zero_most > one_most ? most = "0" : most = "1";
                most_input = most_input.filter(x => x[i] === most);

            }

            if (least_input.length > 1) {
                zero_least = 0;
                one_least = 0;

                for (let j = 0; j < least_input.length; j++) {
                    least_input[j][i] === "0" ? zero_least ++ : one_least ++;
                }

                zero_least <= one_least ? least = "0" : least = "1";
                least_input = least_input.filter(x => x[i] === least);
            }

        }

        $('#3-p2').append(`<p class="answer">${binToDec(most_input) * binToDec(least_input)}</p>`)

    });