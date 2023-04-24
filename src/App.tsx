import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import { ThemeProvider, ThemeOptions, createTheme, makeStyles } from "@mui/material/styles";
import CustomGlobalStyles from "./core/utils-components/CustomGlobalStyles";

const themeOptions: ThemeOptions = {
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

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomGlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostsList />}></Route>
          <Route path="/posts/:postId" element={<SinglePostPage />}></Route>

          {/* <Route path="*"element={<Error/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
