import { useSelector } from "react-redux";
import { fetchPosts, filteredPostsSelector } from "../../core/store/postsSlice";
import { useEffect, useState } from "react";
import { useThunkDispatch } from "../../core/store/store";
import { StatusOfRequestEnum } from "../../core/types/enums/StatusOfRequestEnum";
import Post from "../../components/simple/PostView";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Wrapper } from "../../containers/wrapper/Wrapper";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PostsList() {
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();
  const [filterString, setFilterString] = useState<string>("");
  const { data: posts, error, status } = useSelector(filteredPostsSelector(filterString));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary">
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

      {status === StatusOfRequestEnum.SUCCESS && (
        <Stack spacing={2}>
          {posts.map((post) => (
            <Post
              post={post}
              key={post.id}
              goTo={() => {
                navigate(`/posts/${post.id}`);
              }}
            />
          ))}
        </Stack>
      )}

      {status === StatusOfRequestEnum.LOADING && <CircularProgress />}

      {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
    </Wrapper>
  );
}

export default PostsList;