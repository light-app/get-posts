import "./IconButton.scss";
import { SpinnerIcon } from "../../Icons";

export const IconButton = ({ icon, label = null, onClick, loading }) => {
  return (
    <button className="icon-btn" onClick={onClick} disabled={loading}>
      {icon}
      {label && <span className="icon-btn__label">{label}</span>}
      {loading && (
        <div className="icon-btn__loader">
          <SpinnerIcon />
        </div>
      )}
    </button>
  );
};
