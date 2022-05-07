
const score = (hand) => {
    const score = {
        rank: 0,
        name: 'undefined',
    };

    if (hand.length < 2) {
        score.name = 'not enough cards';
        return score;
    }
    if (hand.length > 5) {
        score.name = 'too many cards';
        return score;
    }

    hand = hand.sort((a,b) => a-b);
    const sum = hand.reduce((currentSum, value) => currentSum + value, 0);
    const criteria = {
        isSabacc: sum === 0 ? 1 : 0,
        sabaccBonus: 0,
        pairBonus: 0,
        secondPairBonus: 0,
        runBonus: 0,
        nulhrekBonus: 48 - Math.abs(sum),
        isPositive: sum > 0 ? 1 : 0,
        numberOfCards: hand.length,
        positiveSum: hand.reduce((currentSum, value) => (value > 0) ? currentSum + value : currentSum, 0),
        highestPositiveCard: hand[hand.length - 1] > 0 ? hand[hand.length - 1] : 0,
    };

    const cheatFrequencies = hand.reduce((frequencyArray, card) => {
        frequencyArray[(card + 10)] = frequencyArray[(card + 10)] + 1;
        return frequencyArray;
    },
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    
    if (cheatFrequencies.indexOf(3) === 10 || cheatFrequencies.indexOf(4) === 10 || cheatFrequencies.indexOf(5) === 10) {
        score.name = `too many Sylops (0s)`;
        score.rank = `0`;
        return score;
    }    
    if (cheatFrequencies.indexOf(4) > 0 || cheatFrequencies.indexOf(5) > 0) {
        score.name = `too many ${cheatFrequencies.indexOf(4) > -1 ? cheatFrequencies.indexOf(4) - 10 : cheatFrequencies.indexOf(5) - 10}s`;
        score.rank = `0`;
        return score;
    }

    if (criteria.isSabacc) {
        const sabaccValues = hand.map(card => Math.abs(card));
        const frequencies = sabaccValues.reduce((frequencyArray, value) => {
            frequencyArray[value] = frequencyArray[value] + 1;
            return frequencyArray;
        },
        [0,0,0,0,0,0,0,0,0,0,0]);
        const findRun = () => {
            for (let c = 3; c < frequencies.length; c++) {
            if (frequencies[c-3] === frequencies[c-2] === frequencies[c-1] === frequencies[c]) {
                return c;
            }
            };
            return false;
        };

        if (JSON.stringify(frequencies) === '[2,0,0,0,0,0,0,0,0,0,0]') {
            score.name = `Pure Sabacc`;
            criteria.sabaccBonus = 15;
        } else if (JSON.stringify(frequencies) === '[1,0,0,0,0,0,0,0,0,0,4]') {
            score.name = `Full Sabacc`;
            criteria.sabaccBonus = 14;
        } else if (frequencies.indexOf(4) > 0 && frequencies[0] > 0) {
            score.name = `Fleet of ${frequencies.indexOf(4)}s`;
            criteria.sabaccBonus = 13;
            criteria.pairBonus = frequencies.indexOf(4);
        } else if (frequencies.indexOf(2) > 0 && frequencies.indexOf(2, frequencies.indexOf(2) + 1) > 0 && frequencies[0] > 0) {
            score.name = `Dual Power Coupling of ${frequencies.indexOf(2)}s & ${frequencies.indexOf(2, frequencies.indexOf(2) + 1)}s`;
            criteria.sabaccBonus = 12;
            criteria.pairBonus = frequencies.indexOf(2);
            criteria.secondPairBonus = frequencies.indexOf(2, frequencies.indexOf(2) + 1);
        } else if (frequencies.indexOf(2) > 0 && frequencies[0] > 0) {
            score.name = `Power Coupling of ${frequencies.indexOf(2)}s`;
            criteria.sabaccBonus = 11;
            criteria.pairBonus = frequencies.indexOf(2);
            criteria.secondPairBonus = frequencies.indexOf(2, frequencies.indexOf(2) + 1);
        } else if (frequencies.indexOf(3) > 0 && frequencies.indexOf(2, frequencies.indexOf(3) + 1) > 0) {
            score.name = `Rhylet of ${frequencies.indexOf(3)}s & ${frequencies.indexOf(2, frequencies.indexOf(3) + 1)}s`
            criteria.sabaccBonus = 10;
            criteria.pairBonus = frequencies.indexOf(3);
            criteria.secondPairBonus = frequencies.indexOf(2, frequencies.indexOf(3) + 1);
        } else if (JSON.stringify(frequencies) === '[0,0,0,0,0,0,0,1,1,1,1]') {
            score.name = `Straight Staves, ${criteria.highestPositiveCard === 10 ? 10 : -10}`;
            criteria.sabaccBonus = 9;
        } else if (frequencies.indexOf(4) > 0) {
            score.name = `Squadron of ${frequencies.indexOf(4)}s`;
            criteria.sabaccBonus = 8;
            criteria.pairBonus = frequencies.indexOf(4);
        } else if (findRun()) {
            score.name = `Straight Khyron, ${findRun()}`;
            criteria.sabaccBonus = 7;
            criteria.runBonus = 10 - findRun();
        } else if (JSON.stringify(frequencies) === '[0,1,1,1,1,0,0,0,0,0,1]') {
            score.name = `Wizard, ${criteria.highestPositiveCard === 10 ? 10 : -10}`;
            criteria.sabaccBonus = 6;
        } else if (frequencies.indexOf(3) > 0) {
            score.name = `Banthas Wild of ${frequencies.indexOf(3)}s`;
            criteria.sabaccBonus = 5;
            criteria.pairBonus = frequencies.indexOf(3);
        } else if (frequencies.indexOf(2) >= 0 && frequencies.indexOf(2, frequencies.indexOf(2) + 1) > 0){
            score.name = `Sabacc, Dual Pair of ${frequencies.indexOf(2)}s & ${frequencies.indexOf(2, frequencies.indexOf(2) + 1)}s`;
            criteria.sabaccBonus = 4;
            criteria.pairBonus = frequencies.indexOf(2);
            criteria.secondPairBonus = frequencies.indexOf(2, frequencies.indexOf(2) + 1);
        } else if (frequencies.indexOf(2) >= 0){
            score.name = `Sabacc, Pair of ${frequencies.indexOf(2)}s`;
            criteria.sabaccBonus = 3;
            criteria.pairBonus = frequencies.indexOf(2);
        } else {
            score.name = `Sabacc, ${criteria.positiveSum}`;
            criteria.sabaccBonus = 2;
        }
    } else if (!criteria.isSabacc) {
        score.name = `Nulhrek, ${sum <= 0 ? sum : `+${sum}`}`;
    }

    const twoDigits = (input) => {
    return input.toString().length === 2 ? input.toString() : '0' + input.toString()
    }

    score.rank =
    twoDigits(criteria.isSabacc) +
    twoDigits(criteria.sabaccBonus) +
    twoDigits(criteria.pairBonus) +
    twoDigits(criteria.secondPairBonus) +
    twoDigits(criteria.runBonus) +
    twoDigits(criteria.nulhrekBonus) +
    twoDigits(criteria.isPositive) +
    twoDigits(criteria.numberOfCards) +
    twoDigits(criteria.positiveSum) +
    twoDigits(criteria.highestPositiveCard);

    return score;
};

module.exports = score;