const QuoteAuthor = ({ currentQuoteAuthor }) => {
  return (
    <div id="author" className="text-end bg-warning pb-3">- {currentQuoteAuthor}</div>
  );
}

export default QuoteAuthor