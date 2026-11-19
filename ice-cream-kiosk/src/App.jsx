
import { useState } from "react";
import "./App.css";
import Flavor from "../components/FlavorCard.jsx";

function App() {
  const [flavors, setFlavors] = useState([
    {
      id: 1,
      name: "Vanilla 🍦",
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      id: 2,
      name: "Chocolate 🍫",
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      id: 3,
      name: "Strawberry 🍓",
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      id: 4,
      name: "Pistachio 🥜",
      isSoldOut: true,
      scoopsSelected: 0
    }
  ]);

  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const totalScoop = flavors.reduce((sum, flavor) => {
    return sum + flavor.scoopsSelected;
  }, 0);

  const totalPrice = totalScoop * 5;

  const visibleFlavors = flavors.filter((flavor) => {
    return !showOnlyAvailable || !flavor.isSoldOut;
  });

  function handleAdd(id) {
    setFlavors((prevFlavors) => {
      const total = prevFlavors.reduce(
        (sum, flavor) => sum + flavor.scoopsSelected,
        0
      );

      if (total >= scoopLimit) {
        return prevFlavors;
      }

      return prevFlavors.map((flavor) => {
        if (flavor.id === id && !flavor.isSoldOut) {
          return {
            ...flavor,
            scoopsSelected: flavor.scoopsSelected + 1
          };
        }

        return flavor;
      });
    });
  }

  function handleRemove(id) {
    setFlavors((prevFlavors) => {
      return prevFlavors.map((flavor) => {
        if (
          flavor.id === id &&
          !flavor.isSoldOut &&
          flavor.scoopsSelected > 0
        ) {
          return {
            ...flavor,
            scoopsSelected: flavor.scoopsSelected - 1
          };
        }

        return flavor;
      });
    });
  }

  function handleClearOrder() {
    setFlavors((prevFlavors) => {
      return prevFlavors.map((flavor) => ({
        ...flavor,
        scoopsSelected: 0
      }));
    });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🍦 Ice-Cream Kiosk</h1>
        <p>Choose your favorite ice cream flavors!</p>
      </header>

      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) =>
              setShowOnlyAvailable(e.target.checked)
            }
          />
          Show only available
        </label>
      </div>

      {totalScoop >= scoopLimit && (
        <div className="notice">
          Scoop limit reached!
        </div>
      )}

      <div className="all-cards">
        {visibleFlavors.map((flavor) => (
          <Flavor
            key={flavor.id}
            name={flavor.name}
            scoopsSelected={flavor.scoopsSelected}
            isSoldOut={flavor.isSoldOut}
            onAdd={() => handleAdd(flavor.id)}
            onRemove={() => handleRemove(flavor.id)}
            scoopLimitReached={totalScoop >= scoopLimit}
          />
        ))}
      </div>

      {visibleFlavors.length === 0 && (
        <p className="no-flavors">
          No flavors to show
        </p>
      )}

      <div className="order-summary">
        <h2>Order Summary</h2>

        <p>Total Scoops: {totalScoop}</p>
        <p>Total Price: {totalPrice} ₪</p>

        {totalScoop === 0 && (
          <p className="empty-order">
            Your order is empty
          </p>
        )}

        <button
          className="clear-btn"
          onClick={handleClearOrder}
          disabled={totalScoop === 0}
        >
          Clear Order
        </button>
      </div>
    </div>
  );
}

export default App;
