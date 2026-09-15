import { useState } from "react";
import "./App.css";

interface Item {
  id: number;
  name: string;
}

interface ItemsResponse {
  items: Item[];
  message: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setError("");

      const response = await fetch("http://localhost:5000/items");

      if (!response.ok) {
        throw new Error("Failed to load items");
      }

      const data: ItemsResponse = await response.json();

      setItems(data.items);
    } catch (error) {
      console.error(error);
      setError("Не вдалося завантажити дані");
    }
  };

  return (
    <main>
      <h1>Items</h1>
      <button type="button" onClick={loadItems}>
        Load items
      </button>
      {error && <p>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
