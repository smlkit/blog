import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchPostsSelector, filteredPostsSelector } from "./postsSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../app/store";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import Post from "./Post";

function PostsList() {
  const dispatch = useDispatch<AppDispatch>();
  const [filterString, setFilterString] = useState<string>("");
  const { data: posts, error, status } = useSelector(filteredPostsSelector(filterString));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <section className="post-list">
      <h2>BLOG POSTS</h2>
      <div>
        <input type="text" onChange={(e) => setFilterString(e.target.value)} value={filterString} />
      </div>

      {status === StatusOfRequestEnum.SUCCESS &&
        posts.map((post) => <Post post={post} btn={true} key={post.id} />)}

      {status === StatusOfRequestEnum.LOADING && <p>Loading...</p>}

      {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
    </section>
  );
}

export default PostsList;
