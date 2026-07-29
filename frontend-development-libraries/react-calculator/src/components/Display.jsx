const Display = (props) => {
  return (
    <div id="preview">
      <div id="formula-preview">
        {props.historyDisplay ? props.historyDisplay : null}
      </div>
      <div id="display">
        {props.primaryDisplay === "" && props.historyDisplay === ""
          ? "0"
          : props.primaryDisplay}
      </div>
    </div>
  );
};

export default Display