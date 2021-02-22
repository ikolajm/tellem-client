export const blankInputs = inputArray => {
    return inputArray.every(input => input.trim() !== "");
}

export const matchingPasswords = passwordArray => {
    return passwordArray[0] === passwordArray[1];
}