// CURRENT ALGO STEPS
// 1. Tokenize input into array based on symbols
// 2. Find keyword in array and count them
// 4. Return percentage of found words among keywords

// FUTURE IMPLEMENTATION: 
// 1. Add syntactic analysis for nouns a as entities for improved context queries using Google Cloud 
// natural language API 
// 2. Check adverbs and root words in keywords
// 3. Improve input filtering + find's algorithm speed
const temp = 0.3;

export function tokenizeInput(input: string) {
    const noSpecialChar = input.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    return noSpecialChar.split(" ");
}


export function getMatchedCount(keywords: string[], inputs: string[]) {
    let matched: number = 0;
    keywords.forEach(keyword => {

        inputs.forEach(input => {
            console.log(keyword);
            console.log(input);
            if (keyword.trim() === input.trim()) {
                matched++;
            }
        })

    });
    return matched;
}

export function getMatchPercentage(keywords: string[], input: string) {
    console.log("getMatchPercentage - keywords from arg");
    console.log(keywords);
    const inputList = tokenizeInput(input);
    console.log("getMatchPercentage - inputList: ");
    console.log(inputList);
    const matched = getMatchedCount(keywords, inputList);
    console.log("getMatchPercentage - matched: " + matched);
    const percentage: number = matched/keywords.length;
    console.log("getMatchPercentage - percentage: " + percentage);
    return percentage >= temp;
}
