const QuoteText = ({ currentQuoteText }) => {
    return (
        <div id="text" className="d-flex justify-content-center align-items-center text-center bg-warning" style={{ minHeight: "220px" }}>
            {currentQuoteText ? currentQuoteText : "Too many attempts to call the API recently, please try again later."}
        </div>
    );
}

export default QuoteText