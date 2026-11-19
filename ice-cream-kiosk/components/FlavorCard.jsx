
function Flavor(props) {
  return (
    <div
      className={`flavor-card ${props.isSoldOut ? "sold-out" : ""}`}
    >
      <h2 className="flavor">{props.name}</h2>

      <h3>Scoops: {props.scoopsSelected}</h3>

      {props.isSoldOut && <h4>Sold Out</h4>}

      <button
        onClick={props.onAdd}
        disabled={props.isSoldOut}
      >
        +
      </button>

      <button
        onClick={props.onRemove}
        disabled={props.isSoldOut || props.scoopsSelected === 0}
      >
        -
      </button>
    </div>
  );
}

export default Flavor;
