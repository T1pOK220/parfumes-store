import { useEffect, useState } from "react";
import "./App.css";
import { checkHealth, fetchWithResilience } from "./lib/http";
import { HttpError } from "./lib/http-error";

interface Item {
  id: number;
  name: string;
}

interface ItemsResponse {
  items: Item[];
  message: string;
}

interface ApiErrorResponse {
  error?: string;
  code?: string;
  details?: unknown;
  requestId?: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [, setConsecutiveFailures] = useState(0);
  const [isDegraded, setIsDegraded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDegraded) {
      return;
    }

    const checkService = async () => {
      try {
        const isHealthy = await checkHealth("http://localhost:5000");

        if (isHealthy) {
          setConsecutiveFailures(0);
          setIsDegraded(false);
          setError("");
        }
      } catch {
        // Сервіс ще недоступний — повторимо перевірку пізніше.
      }
    };

    const intervalId = setInterval(() => {
      void checkService();
    }, 5000);

    void checkService();

    return () => clearInterval(intervalId);
  }, [isDegraded]);

  const loadItems = async () => {
    if (isDegraded || isLoading) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetchWithResilience(
        "http://localhost:5000/parfumes",
        {
          method: "GET",
          timeoutMs: 3000,
          retry: {
            retries: 2,
            baseDelayMs: 250,
            jitter: true,
          },
        },
      );

      if (!response.ok) {
        let apiError: ApiErrorResponse = {};

        try {
          apiError = (await response.json()) as ApiErrorResponse;
        } catch {
          // Відповідь може бути не у форматі JSON.
        }

        const requestId =
          response.headers.get("X-Request-Id") ?? apiError.requestId;

        const message = apiError.error ?? `Помилка запиту: ${response.status}`;

        throw new HttpError(
          requestId ? `${message} (Request ID: ${requestId})` : message,
          response.status,
          requestId ?? undefined,
        );
      }
      const data: ItemsResponse = await response.json();
      setItems(data.items);
      setConsecutiveFailures(0);
      setIsDegraded(false);
    } catch (caughtError) {
      console.error(caughtError);

      setError(
        caughtError instanceof Error &&
          caughtError.message !== "Failed to fetch"
          ? caughtError.message
          : "Не вдалося завантажити дані. Перевірте з'єднання.",
      );
      const isTemporaryFailure =
        !(caughtError instanceof HttpError) ||
        caughtError.status === 429 ||
        caughtError.status >= 500;

      if (isTemporaryFailure) {
        setConsecutiveFailures((previous) => {
          const next = previous + 1;

          if (next >= 3) {
            setIsDegraded(true);
          }

          return next;
        });
      } else {
        setConsecutiveFailures(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>Items</h1>
      <button
        type="button"
        onClick={loadItems}
        disabled={isLoading || isDegraded}
      >
        {isLoading ? "Loading..." : "Load items"}
      </button>

      {isDegraded && (
        <p role="alert">Сервіс перевантажений. Спробуйте пізніше.</p>
      )}
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
