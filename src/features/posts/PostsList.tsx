import { useSelector } from "react-redux";
import { fetchPosts, filteredPostsSelector } from "./postsSlice";
import { useEffect, useState } from "react";
import { useThunkDispatch } from "../../app/store";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import Post from "./Post";
import AddPostForm from "./AddPostForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Wrapper } from "../../styled";
import { Stack, Typography } from "@mui/material";

function PostsList() {
  const dispatch = useThunkDispatch();
  const [filterString, setFilterString] = useState<string>("");
  const { data: posts, error, status } = useSelector(filteredPostsSelector(filterString));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Wrapper>
      <AddPostForm />
      <section className="post-list">
        <Typography variant="h3" color="text.primary">
          Blog posts
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            style={{ width: "610px" }}
            id="outlined-basic"
            label="Filter"
            variant="outlined"
            size="small"
            onChange={(e) => setFilterString(e.target.value)}
            value={filterString}
          />
          <Button variant="contained" size="medium" onClick={() => setFilterString("")}>
            Clear
          </Button>
        </Stack>

        {status === StatusOfRequestEnum.SUCCESS &&
          posts.map((post) => <Post post={post} btn={true} key={post.id} />)}

        {status === StatusOfRequestEnum.LOADING && <CircularProgress />}

        {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
      </section>
    </Wrapper>
  );
}

export default PostsList;
