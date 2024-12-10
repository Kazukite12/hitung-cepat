import { useState, useEffect } from "react";
import "./countdown.css";

const CountdownOverlay = ({ onCountdownEnd }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 500);
      return () => clearTimeout(timer); // Clean up the timer
    } else {
      onCountdownEnd(); // Trigger when countdown ends
    }
  }, [count, onCountdownEnd]);

  return (
    count > 0 && (
      <div className="countdown-overlay">
        <div className="countdown-number">{count}</div>
      </div>
    )
  );
};

export default CountdownOverlay;
