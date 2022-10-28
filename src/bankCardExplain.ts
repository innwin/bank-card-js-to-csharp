import {BankCardInfo, bankCardList, BankCardPattern} from "./bankCardList";

export const bankCardExplainToCSharp = (): string => {
    let cSharp = new Array<string>();
    cSharp.push("{");
    for (let i = 0; i < bankCardList.length; i++) {
        if (i > 0) {
            cSharp[cSharp.length - 1] += ",";
        }
        insertBankCard(bankCardList[i], cSharp);
    }
    cSharp.push("}");
    return cSharp.join("\n");
};

const insertBankCard = (bankCard: BankCardInfo, source: string[]) => {
    const bankCardCreateText = `new("${bankCard.bankCode}", "${bankCard.bankName}"`;
    if (!bankCard.patterns) {
        source.push(`${bankCardCreateText}, null)`);
        return;
    }

    source.push(`${bankCardCreateText}, new []`);
    source.push("{");
    for (let i = 0; i < bankCard.patterns.length; i++) {
        if (i > 0) {
            source[source.length - 1] += ",";
        }
        insertBankCardPattern(bankCard.patterns[i], source);
    }
    source.push("})");
};

const insertBankCardPattern = (pattern: BankCardPattern, source: string[]) => {
    source.push(`new BankCardNumberPatterns(${getBankCardType(pattern.cardType)}, @"${pattern.reg.source}")`);
}

const getBankCardType = (cardType: string): string => {
    switch (cardType) {
        case 'DC':
            return "BankCardType.DC";
        case 'CC':
            return "BankCardType.CC";
        case 'PC':
            return "BankCardType.PC";
        case 'SCC':
            return "BankCardType.SCC";
        default:
            throw new Error();
    }
}
