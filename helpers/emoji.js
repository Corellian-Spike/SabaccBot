module.exports = (nameOrArray) => {
    const lookup = {
        "10": "<:g10:970796470997491823>",
        "9": "<:g9:970796471085584585>",
        "8": "<:g8:970796470951370833>",
        "7": "<:g7:970796470934601779>",
        "6": "<:g6:970796470947151872>",
        "5": "<:g5:970796470884253756>",
        "4": "<:g4:970796470687105075>",
        "3": "<:g3:970796470901043211>",
        "2": "<:g2:970796470649356328>",
        "1": "<:g1:970796470779412562>",

        "+10": "<:g10:970796470997491823>",
        "+9": "<:g9:970796471085584585>",
        "+8": "<:g8:970796470951370833>",
        "+7": "<:g7:970796470934601779>",
        "+6": "<:g6:970796470947151872>",
        "+5": "<:g5:970796470884253756>",
        "+4": "<:g4:970796470687105075>",
        "+3": "<:g3:970796470901043211>",
        "+2": "<:g2:970796470649356328>",
        "+1": "<:g1:970796470779412562>",
        "0": "<:s0:970796835411202068>",
        "-1": "<:r1:970796195746316348>",
        "-2": "<:r2:970796272518836284>",
        "-3": "<:r3:970796272392994876>",
        "-4": "<:r4:970796272397201468>",
        "-5": "<:r5:970796274544705616>",
        "-6": "<:r6:970796272535609385>",
        "-7": "<:r7:970796272443359293>",
        "-8": "<:r8:970796272648851576>",
        "-9": "<:r9:970796272590155867>",
        "-10": "<:r10:970796272653049876>",

        "card": "<:bk:970797526036914237>",
        "back": "<:bk:970797526036914237>",
        "deck": "<:bk:970797526036914237>",
        "cred": "<:credit:782856200349548557>",
        "credit": "<:credit:782856200349548557>",
        "credits": "<:credit:782856200349548557>",
    };
    if (nameOrArray === undefined) {
        return lookup.card;
    }
    if (Array.isArray(nameOrArray)) {
        if (nameOrArray.length > 0) {
            let output = '';
            for (card of nameOrArray) {
                output = output + (!isNaN(card.value) ? lookup[card.value] : lookup[card] ? lookup[card] : lookup.card);
            }
            return output;
        }
    }
    return !isNaN(nameOrArray.value) ? lookup[nameOrArray.value] : lookup[nameOrArray] ? lookup[nameOrArray] : lookup.card;
};