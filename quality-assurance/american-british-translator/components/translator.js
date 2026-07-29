const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text, locale) {
        // Check for time
        text = this.translateTime(text, locale);

        // Check for titles/honorifics
        text = this.translateTitle(text, locale);

        // Check for spelling
        text = this.translateSpelling(text, locale);

        // Check for words to translate
        text = this.translateWords(text, locale);

        return text;
    }
    
    translateTime(text, locale) {
        const regex = /\b([01]?\d|2[0-3])([:.])([0-5]\d)\b/g;

        if (!regex.test(text)) {
            return text;
        }

        text = text.replace(regex, (match, hour, sep, minute) => {
            if (locale === "american-to-british" && sep === ":") {
                let replacement = `${hour}.${minute}`;
                
                // Highlight translation in output and return
                return this.highlight(replacement);
            } else if (locale === "british-to-american" && sep === ".") {
                let replacement = `${hour}:${minute}`;

                // Highlight translation in output and return
                return this.highlight(replacement);
            }
            return match; // No change needed
        });

        return text;
    }

    translateTitle(text, locale) {
        let titlesMap;

        if (locale === "american-to-british") {
            titlesMap = americanToBritishTitles;
        } else if (locale === "british-to-american") {
            // Reverse the mapping for British to American
            titlesMap = Object.fromEntries(
                Object.entries(americanToBritishTitles)
                .map(([key, value]) => [value, key])
            );
        }

        const textWords = text.split(" ");

        const translatedText = textWords.map(word => {
            const wordLowerCase = word.toLowerCase();

            if (titlesMap[wordLowerCase]) {
                // Replace word and fix title to upper case
                let replacement = titlesMap[wordLowerCase];
                replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
                
                // Highlight translation in output and return
                return this.highlight(replacement);
            }

            // Return word if no translation needed
            return word;
        });

        text = translatedText.join(" ");

        return text;
    }

    translateSpelling(text, locale) {
        let spellingMap;

        if (locale === "american-to-british") {
            spellingMap = americanToBritishSpelling;
        } else if (locale === "british-to-american") {
            // Reverse the mapping for British to American
            spellingMap = Object.fromEntries(
                Object.entries(americanToBritishSpelling)
                .map(([key, value]) => [value, key])
            );
        }

        // Replace the words if needed and return the text
        return this.replaceWords(text, spellingMap);
    }

    translateWords(text, locale) {
        let wordsMap;

        if (locale === "american-to-british") wordsMap = americanOnly;
        if (locale === "british-to-american") wordsMap = britishOnly;

        // Replace the words if needed and return the text
        return this.replaceWords(text, wordsMap);
    }

    replaceWords(text, translationMap) {
        // Create a regex pattern from the translation map keys
        // Sort keys by length (descending) to match longer phrases first
        const sortedKeys = Object.keys(translationMap)
            .sort((a, b) => b.length - a.length)
            .map(key => key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')); // Escape regex special chars
        
        const pattern = new RegExp(`\\b(${sortedKeys.join('|')})\\b`, 'gi');
        
        // Replace matches with their translations
        return text.replace(pattern, (match) => {
            const matchLower = match.toLowerCase();
            let replacement = translationMap[matchLower];
            
            // Preserve original case
            if (match === match.toUpperCase()) {
                replacement = replacement.toUpperCase();
            } else if (match[0] === match[0].toUpperCase()) {
                replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            
            // Highlight translation in output
            return this.highlight(replacement);
        });
    }
    

    highlight(string) {
        return `<span class="highlight">${string}</span>`
    }
}

module.exports = Translator;
