const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

const highlightText = (text) => {
    return `<span class="highlight">${text}</span>`;
}

suite('Unit Tests', () => {
    suite("American to British", () => {
        const locale = "american-to-british"

        test("Spelling: favorite", () => {
            assert.strictEqual(translator.translate("Mangoes are my favorite fruit.", locale), `Mangoes are my ${highlightText("favourite")} fruit.`);
        });

        test("Spelling: yogurt", () => {
            assert.strictEqual(translator.translate("I ate yogurt for breakfast.", locale), `I ate ${highlightText("yoghurt")} for breakfast.`);
        });

        test("Word: condo", () => {
            assert.strictEqual(translator.translate("We had a party at my friend's condo.", locale), `We had a party at my friend's ${highlightText("flat")}.`);
        });

        test("Word: trashcan", () => {
            assert.strictEqual(translator.translate("Can you toss this in the trashcan for me?", locale), `Can you toss this in the ${highlightText("bin")} for me?`);
        });

        test("2 words match: parking lot", () => {
            assert.strictEqual(translator.translate("The parking lot was full.", locale), `The ${highlightText("car park")} was full.`);
        });

        test("3 words match - Rube Goldberg machine", () => {
            assert.strictEqual(translator.translate("Like a high tech Rube Goldberg machine.", locale), `Like a high tech ${highlightText("Heath Robinson device")}.`);
        });

        test("2 words match - play hooky", () => {
            assert.strictEqual(translator.translate("To play hooky means to skip class or work.", locale), `To ${highlightText("bunk off")} means to skip class or work.`);
        });

        test("Titles - Mr.", () => {
            assert.strictEqual(translator.translate("No Mr. Bond, I expect you to die.", locale), `No ${highlightText("Mr")} Bond, I expect you to die.`);
        });

        test("Titles - Dr.", () => {
            assert.strictEqual(translator.translate("Dr. Grosh will see you now.", locale), `${highlightText("Dr")} Grosh will see you now.`);
        });

        test("Time", () => {
            assert.strictEqual(translator.translate("Lunch is at 12:15 today.", locale), `Lunch is at ${highlightText("12.15")} today.`);
        });
    });

    suite("British to American", () => {
        const locale = "british-to-american";

        test("Word: footie", () => {
            assert.strictEqual(translator.translate("We watched the footie match for a while.", locale), `We watched the ${highlightText("soccer")} match for a while.`);
        });

        test("Word: paracetamol + capitalization", () => {
            assert.strictEqual(translator.translate("Paracetamol takes up to an hour to work.", locale), `${highlightText("Tylenol")} takes up to an hour to work.`);
        });

        test("Spelling: caramelise", () => {
            assert.strictEqual(translator.translate("First, caramelise the onions.", locale), `First, ${highlightText("caramelize")} the onions.`);
        });

        test("Multiple words: bank holiday, funfair", () => {
            assert.strictEqual(translator.translate("I spent the bank holiday at the funfair.", locale), `I spent the ${highlightText("public holiday")} at the ${highlightText("carnival")}.`);
        });

        test("Multiple words + special characters: bicky, chippy", () => {
            assert.strictEqual(translator.translate("I had a bicky then went to the chippy.", locale), `I had a ${highlightText("cookie")} then went to the ${highlightText("fish-and-chip shop")}.`);
        });

        test("Multiple words with 2 words or more", () => {
            assert.strictEqual(translator.translate("I've just got bits and bobs in my bum bag.", locale), `I've just got ${highlightText("odds and ends")} in my ${highlightText("fanny pack")}.`);
        });

        test("2 words", () => {
            assert.strictEqual(translator.translate("The car boot sale at Boxted Airfield was called off.", locale), `The ${highlightText("swap meet")} at Boxted Airfield was called off.`);
        });

        test("Title - Mrs", () => {
            assert.strictEqual(translator.translate("Have you met Mrs Kalyani?", locale), `Have you met ${highlightText("Mrs.")} Kalyani?`);
        });

        test("Title - Prof", () => {
            assert.strictEqual(translator.translate("Prof Joyner of King's College, London.", locale), `${highlightText("Prof.")} Joyner of King's College, London.`);
        });

        test("Time", () => {
            assert.strictEqual(translator.translate("Tea time is usually around 4 or 4.30.", locale), `Tea time is usually around 4 or ${highlightText("4:30")}.`);
        });
    });

    suite("Highlight Translation (NEEDED DUE TO FCC REQUIREMENTS)", () => {
        test("Highlight: favorite", () => {
            assert.strictEqual(translator.translate("Mangoes are my favorite fruit.", "american-to-british"), `Mangoes are my ${highlightText("favourite")} fruit.`);
        });

        test("Highlight: yogurt", () => {
            assert.strictEqual(translator.translate("I ate yogurt for breakfast.", "american-to-british"), `I ate ${highlightText("yoghurt")} for breakfast.`);
        });

        test("Highlight: footie", () => {
            assert.strictEqual(translator.translate("We watched the footie match for a while.", "british-to-american"), `We watched the ${highlightText("soccer")} match for a while.`);
        });

        test("Highlight: paracetamol", () => {
            assert.strictEqual(translator.translate("Paracetamol takes up to an hour to work.", "british-to-american"), `${highlightText("Tylenol")} takes up to an hour to work.`);
        });
    });
});
