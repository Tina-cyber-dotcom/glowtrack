// ExercisePage.jsx
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const PLACEHOLDER = "https://picsum.photos/seed/";

export default function ExercisePage() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [addedIds, setAddedIds] = useState([]);
  const [showOnlyAdded, setShowOnlyAdded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
  const [error, setError] = useState(null);

  const PALE_BG = "#FFF8E7";
  const DARK_PINK = "#C2185B";
  const TEXT_DARK = "#4B2E3E";

  const fetchExercises = useCallback(async (page, signal) => {
    const url = `https://wger.de/api/v2/exerciseinfo/?language=2&page=${page}&limit=20`;
    try {
      const { data } = await axios.get(url, { signal });
      setExercises((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
      setHasMore(Boolean(data.next));
      setStatus("success");
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("Failed to load exercises");
        setStatus("error");
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchExercises(page, controller.signal);
    return () => controller.abort();
  }, [page, fetchExercises]);

  const filteredExercises = useMemo(() => {
    const term = search.toLowerCase().trim();
    return exercises.filter((ex) => {
      if (showOnlyAdded && !addedIds.includes(ex.id)) return false;
      if (!term) return true;

      return (
        ex.name?.toLowerCase().includes(term) ||
        ex.description?.toLowerCase().includes(term) ||
        ex.muscles?.some((m) => m.name?.toLowerCase().includes(term))
      );
    });
  }, [search, exercises, showOnlyAdded, addedIds]);

  const toggleAdd = (id) => {
    setAddedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const loadMore = () => {
    if (hasMore && status !== "loading") setPage((p) => p + 1);
  };


  return (
    <div style={{ backgroundColor: PALE_BG }} className="min-h-screen p-4">
      {/* Header */}
      <header className="max-w-3xl mx-auto">
        <h1
          className="text-3xl text-center font-pacifico"
          style={{ color: DARK_PINK }}
        >
          Explore Exercises
        </h1>

        <div className="mt-3 flex justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Results</span>
            <span style={{ color: TEXT_DARK, fontWeight: 600 }}>
              {filteredExercises.length}
            </span>
          </div>

          <button
            onClick={() => setShowOnlyAdded((s) => !s)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              showOnlyAdded
                ? "bg-[#F7B9C6] text-white border-transparent"
                : "bg-white/70 border-gray-300"
            }`}
          >
            {showOnlyAdded ? "Added only" : "Show all"}
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-3xl mx-auto mt-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, description, or muscle (e.g. squat, chest)..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-6 space-y-3">
        {status === "loading" && (
          <p className="text-center py-8 text-gray-500 animate-pulse">
            Loading exercises...
          </p>
        )}

        {status === "error" && (
          <p className="text-center py-8 text-red-500">{error}</p>
        )}

        {status === "success" && filteredExercises.length === 0 && (
          <p className="text-center py-8 text-gray-500">
            No exercises found.
          </p>
        )}

        {status === "success" &&
          filteredExercises.map((ex, index) => {
            const uniqueKey = `${ex.id}-${index}`;
            const isAdded = addedIds.includes(ex.id);
            const imageUrl =
              ex.images?.[0]?.image ||
              `${PLACEHOLDER}${ex.id}/400/300?grayscale`;

            return (
              <article
                key={uniqueKey}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/70 shadow-sm"
              >
                {/* Image */}
                <div className="w-[64px] h-[64px] rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={ex.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) =>
                      (e.currentTarget.src = `${PLACEHOLDER}${ex.id}/400/300`)
                    }
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-semibold truncate"
                    style={{ color: TEXT_DARK }}
                  >
                    {ex.name}
                  </h3>

                  {ex.description && (
                    <p
                      className="text-xs mt-1 text-gray-700 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: ex.description }}
                    />
                  )}

                  <button
                    onClick={() => toggleAdd(ex.id)}
                    className={`mt-2 px-3 py-1 rounded-full text-sm font-medium transition ${
                      isAdded
                        ? "bg-[#C2185B] text-white"
                        : "bg-white border border-[#C2185B] text-[#C2185B]"
                    }`}
                  >
                    {isAdded ? "Added" : "Add +"}
                  </button>
                </div>
              </article>
            );
          })}

        {hasMore && status === "success" && (
          <button
            onClick={loadMore}
            className="w-full py-2 mt-4 text-center text-white bg-[#C2185B] rounded-lg hover:bg-[#A01449] transition"
          >
            Load More Exercises
          </button>
        )}
      </main>
    </div>
  );
}
