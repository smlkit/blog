import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import Nav from "./components/Nav";
import AddPostForm from "./features/posts/AddPostForm";
import CustomThemeProvider from "./core/providers/CustomThemeProvider";

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
            <Route path="/" element={<PostsList />}></Route>
            <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
            <Route path="/add-post" element={<AddPostForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
