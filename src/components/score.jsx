import "./score.css"; // Import the CSS file

const ScorePopup = ({ score, triggerPopup }) => {
    return (
      <div className={`score-popup ${triggerPopup ? "show" : ""}`}>
        +{score}
      </div>
    );
  };
  

  export default ScorePopup