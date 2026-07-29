const InfoBox = (props) => {
  return (
    <div id="infobox">
      <div>
        <button id="close-button" onClick={() => props.toggleInfoBox(false)}>
          <i className="fa-solid fa-rectangle-xmark fa-xl"></i>
        </button>
        <div id="info-text">
          <h1>Welcome to my calculator</h1>
          <h2>Here is a short overview of what you can do:</h2>
          <ul>
            <li>Control using your keyboard.</li>
            <ul>
              <li>For numbers and operations use the according keys.</li>
              <li>
                For "=" (Equals) you can use the <b>"Enter"</b> key
              </li>
              <li>
                For "AC" (All Clear) you can use the <b>"C"</b> key
              </li>
              <li>
                If you want to delete the last number you entered, you can use{" "}
                <b>"Backspace"</b>.
              </li>
            </ul>
            <li>
              The calculator can calculate using 2 logics - "Formula" and
              "Immediate". You can switch between the two using the toggle
            </li>
            <ul>
              <li>
                <b>Formula/Expression Logic</b>: Calculator waits for the entire
                expression and calculates in the end.
                <div>Example: "3 + 5 x 6 - 2 / 4 = 32.5"</div>
              </li>
              <li>
                <b>Immediate Logic:</b> The calculation happens immediatly after
                you press the next operator instead of waiting.
                <div>Example: "3 + 5 x 6 - 2 / 4 = 11.5".</div>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBox