import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchSinglePost, fetchSinglePostSelector, fetchComments, fetchCommentsSelector } from "./postsSlice";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import Post from "./Post";
import CommentsList from "./CommentsList";

const SinglePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: post, error: errorPost, status: statusPost } = useSelector(fetchSinglePostSelector);
  const { data: comments, error: errorComments, status: statusComments } = useSelector(fetchCommentsSelector);
  console.log(comments);

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
      dispatch(fetchComments(postId));
    }
  }, []);

  return (
    <>
      {post && statusPost === StatusOfRequestEnum.SUCCESS && <Post post={post} btn={false} />}
      {comments && statusComments === StatusOfRequestEnum.SUCCESS && <CommentsList comments={comments} />}
      {statusPost === StatusOfRequestEnum.LOADING && <p>Loading...</p>}
      {statusPost === StatusOfRequestEnum.ERROR && <p>{errorPost}</p>}
    </>
  );
};

export default SinglePost;
