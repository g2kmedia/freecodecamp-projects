import React from "react"
import QuoteText from "./QuoteText.jsx"
import QuoteAuthor from "./QuoteAuthor.jsx"
import Buttons from "./Buttons.jsx"

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.fetchQuotes = this.fetchQuotes.bind(this);
        this.displayNewQuote = this.displayNewQuote.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.state = {
            quotes: [],
            currentIndex: 0,
            currentQuote: "",
            darkMode: false,
        };
    }

    componentDidMount() {
        this.fetchQuotes();
    }

    async fetchQuotes() {
        try {
            const response = await fetch("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes");

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            this.setState({
                quotes: data,
                currentIndex: 0,
                currentQuote: data[0]
            });

        } catch (error) {
            console.error("There was an error: ", error);
        }
    }

    displayNewQuote() {
        this.setState((prevState) => {

            if (prevState.currentIndex + 1 <= prevState.quotes.length - 1) {
                const newIndex = prevState.currentIndex + 1;

                return {
                    currentIndex: newIndex,
                    currentQuote: prevState.quotes[newIndex]
                };
            } else {
                this.fetchQuotes();
                return {
                    currentIndex: 0,
                    currentQuote: prevState.quotes[0] || ""
                };
            }
        });
    }

    toggleTheme() {
        this.setState((prevState) => {

            if (prevState.darkMode) {
                document.body.classList.add("bg-light");
                document.body.classList.remove("bg-dark");
                document.getElementById("credits-text").classList.remove("text-white");
            } else {
                document.body.classList.add("bg-dark");
                document.body.classList.remove("bg-light");
                document.getElementById("credits-text").classList.add("text-white");
            }

            return {
                darkMode: !prevState.darkMode
            }
        });
    }

    render() {
        return (
            <div>
                <QuoteText currentQuoteText={this.state.currentQuote.q} />
                <QuoteAuthor currentQuoteAuthor={this.state.currentQuote.a} />
                <Buttons displayNewQuote={this.displayNewQuote} darkMode={this.state.darkMode} toggleTheme={this.toggleTheme} />
            </div>
        );
    }
}

export default QuoteBox