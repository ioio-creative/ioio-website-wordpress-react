const textAreaDelimiter = "[new-area]";

function getMultipleTextsFromSingleText(singleText) {
    return getMultipleTextsFromSingleTextWithDelimiter(singleText, textAreaDelimiter);
}

function getMultipleTextsFromSingleTextWithDelimiter(singleText, delimiter) {
    return singleText.split(delimiter);
}

export {
    getMultipleTextsFromSingleText,
    getMultipleTextsFromSingleTextWithDelimiter
};
