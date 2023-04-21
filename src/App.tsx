import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import SinglePost from "./features/posts/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsList />}></Route>
        <Route path="/post/:postId" element={<SinglePost />}></Route>

        {/* <Route path="*"element={<Error/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
