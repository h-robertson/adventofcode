const fs = require("fs");

fs.readFile('input.txt', function(err, data) {
    const text = data.toString();
	let input = text.split("\n").map((x) => x);
	
	// Add types
	let hands = input.map(line => {
		const hand = line.split(" ");
		const cards =  hand[0].split("");
		const converted = getConvertedHand(cards);
		return {
			cards,
			converted,
			bid: Number(hand[1]),
			type: getType(converted)
		}
	})

	// Rank & add winnings
	hands.sort((a, b) => getLowerHand(a, b));
	hands = hands.map((h, i) => { 
		const rank = i + 1;
		return { ...h, rank, winnings: h.bid * rank }
	});

	// Sum winnings
	const pt1 = hands.reduce((total, hand) => (total + hand.winnings), 0)
	console.log('pt1:', pt1)
});

/* PART 2

1. Get no. of jokers
2. If jokers, get max count that isn't for J
3. increase max_count by number of jokers?

{ cards: [ 'K', 'A', 'J', '8', 'K' ], bid: 919, type: 4 }
K, A, K, 8, K
^^ only 3 of a kind even though includes count 2 
- maybe add "converted" hand where Jokers are changed?
- type based on converted hand, but sorting still based on original
*/

function getConvertedHand(hand) {
	let count = Object.assign({});
	let joker_count = 0;
	hand.forEach(card => {
		if (card == "J") joker_count ++;
		else {
			if (card in count) {
				count[card] ++; 
			}
			else count[card] = 1;
		}
	})
	if (joker_count) {
		const max_card = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b, "");
		hand = hand.map(c => c == "J" ? max_card : c)
	}
	return hand;
}

function getType(hand) {
	let count = Object.assign({});
	hand.forEach(card => {
		if (card in count) {
			count[card] ++; 
		}
		else count[card] = 1;
	})

	let count_array = Object.values(count);
	let max_count = Math.max(...count_array);

	let type;
	if (max_count == 5) type = 6;
	else if (max_count == 4) type = 5;
	else if (max_count == 3) {
		if (count_array.includes(2)) type = 4;
		else type = 3;
	}
	else if (max_count == 2) {
		const pairs = count_array.filter(c => c == 2).length;
		if (pairs > 1) type = 2;
		else type = 1;
	}
	else type = 0;
	return type;
};

function getCardValue(card) {
	if (card == "A") return 14;
	if (card == "K") return 13;
	if (card == "Q") return 12;
	// if (card == "J") return 11; PART 1
	if (card == "T") return 10;
	if (card == "J") return 1; // PART 2
	else return Number(card);
}

function getLowerHand(a, b) {
	let result = null;
	if (a.type !== b.type) return a.type > b.type ? 1 : -1;
	for (let i = 0; i < a.cards.length; i++) {
		const a_card = a.cards[i];
		const b_card = b.cards[i];
		result = compareValues(a_card, b_card);
		if (result !== null) break;
	}
	return result;
}

function compareValues(a, b) {
	const a_val = getCardValue(a);
	const b_val = getCardValue(b);
	if (a_val !== b_val) return a_val > b_val ? 1 : -1;
	else return null;
}

