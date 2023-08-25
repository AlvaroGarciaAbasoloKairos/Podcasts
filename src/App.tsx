import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PodcastSearch } from "./pages/podcastSearch";
import { PodcastView } from "./pages/podcastView";
import { useViewPodcasts } from "../src/hooks";

function App() {
  const [selectedPodcastIndex, setSelectedPodcastIndex] = useState<
    number | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { podcasts, loading, error, search } = useViewPodcasts();
  
  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PodcastView
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          podcasts={podcasts}
          loading={loading}
          error={error}
          search={search}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onPlayPause={handlePlayPause}
        />
      ),
    },
    {
      path: "/podcast/:podcastId",
      element: (
        <PodcastSearch
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          podcasts={podcasts}
          loading={loading}
          error={error}
          search={search}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
    onPlayPause={handlePlayPause}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
