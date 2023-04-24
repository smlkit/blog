import { useSelector } from "react-redux";
import { fetchPosts, filteredPostsSelector } from "./postsSlice";
import { useEffect, useState } from "react";
import { useThunkDispatch } from "../../app/store";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import Post from "./Post";
import AddPostForm from "./AddPostForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/joy/CircularProgress";

function PostsList() {
  const dispatch = useThunkDispatch();
  const [filterString, setFilterString] = useState<string>("");
  const { data: posts, error, status } = useSelector(filteredPostsSelector(filterString));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <AddPostForm />
      <section className="post-list">
        <h2>BLOG POSTS</h2>
        <div>
          <TextField
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
        </div>

        {status === StatusOfRequestEnum.SUCCESS &&
          posts.map((post) => <Post post={post} btn={true} key={post.id} />)}

        {status === StatusOfRequestEnum.LOADING && <CircularProgress variant="solid" />}

        {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
      </section>
    </>
  );
}

export default PostsList;
