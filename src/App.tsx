import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomThemeProvider from "./core/theme/CustomThemeProvider";
import { ThemeOptions } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import PostsList from "./pages/PostListPage";
import SinglePostPage from "./pages/PostPage";
import AddPostForm from "./pages/AddPostPage";
import AlbumsPage from "./pages/AlbumsPage";
import Nav from "./components/smart/nav/Nav";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#00ADB5",
    },
    secondary: {
      main: "#0F4C75",
    },
    background: {
      paper: "#222831",
    },
    text: {
      primary: "#b5bcc7",
      secondary: "#6d737d",
    },
  },
};

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Nav />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/posts" element={<PostsList />}></Route>
            <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
            <Route path="/add-post" element={<AddPostForm />}></Route>
            <Route path="/albums" element={<AlbumsPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
