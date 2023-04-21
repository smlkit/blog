import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchSinglePost, fetchSinglePostSelector } from "./postsSlice";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import Post from "./Post";

const SinglePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: post, error, status } = useSelector(fetchSinglePostSelector);

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, []);

  return (
    <>
      {post && status === StatusOfRequestEnum.SUCCESS && <Post post={post} btn={false} />}
      {status === StatusOfRequestEnum.LOADING && <p>Loading...</p>}
      {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
    </>
  );
};

export default SinglePost;
