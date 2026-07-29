const Buttons = (props) => {
  return (
    <div id="buttons" className="d-flex justify-content-between align-items-center bg-warning">
      {/* JUST A PLACEHOLDER */}
      <a id="tweet-quote" title="Share on X" href="twitter.com/intent/tweet" target="_blank"><i className="bi bi-twitter-x fs-2"></i></a>

      {
        props.darkMode ?
          <button id="theme-toggle" onClick={props.toggleTheme} className="btn btn-light"><i className="bi bi-sun-fill"></i></button> :
          <button id="theme-toggle" onClick={props.toggleTheme} className="btn btn-dark"><i className="bi bi-moon-fill"></i></button>
      }


      <button id="new-quote" className="btn btn-primary" onClick={props.displayNewQuote}>New Quote</button>
    </div>
  );
}

export default Buttons