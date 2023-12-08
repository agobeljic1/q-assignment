import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

const PostsPage = React.lazy(() => import("./ui/pages/PostsPage.tsx"));
const PostDetailsPage = React.lazy(
  () => import("./ui/pages/PostDetailsPage.tsx")
);
const NotFoundPage = React.lazy(() => import("./ui/pages/NotFoundPage.tsx"));

function Root() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route element={<App />}>
            <Route path="posts" element={<PostsPage />} />
            {/* honestly /post/:id should be /posts/:id but you wanted that */}
            <Route path="post/:id" element={<PostDetailsPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
