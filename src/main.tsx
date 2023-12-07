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

const Posts = React.lazy(() => import("./ui/pages/Posts"));
const PostDetails = React.lazy(() => import("./ui/pages/PostDetails"));
const NotFound = React.lazy(() => import("./ui/pages/NotFound"));

function Root() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route element={<App />}>
            <Route path="posts" element={<Posts />} />
            {/* honestly /post/:id should be /posts/:id but you wanted that */}
            <Route path="post/:id" element={<PostDetails />} />
            <Route path="/not-found" element={<NotFound />} />
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
