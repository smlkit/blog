import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchSinglePost, fetchSinglePostSelector, fetchComments, fetchCommentsSelector } from "./postsSlice";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";
import Post from "./Post";
import CommentsList from "./CommentsList";
import Button from "@mui/material/Button";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/joy/CircularProgress";
import { useThunkDispatch } from "../../app/store";

const SinglePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useThunkDispatch();
  const { data: post, error: errorPost, status: statusPost } = useSelector(fetchSinglePostSelector);
  const { data: comments, error: errorComments, status: statusComments } = useSelector(fetchCommentsSelector);

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
      dispatch(fetchComments(postId));
    }
  }, []);

  return (
    <>
      {post && statusPost === StatusOfRequestEnum.SUCCESS && <Post post={post} btn={false} />}
      <div className="wrapper">
        <Button variant="contained" onClick={() => navigate(`/`)}>
          <ArrowBack />
          back to all posts
        </Button>
      </div>
      {comments && statusComments === StatusOfRequestEnum.SUCCESS && <CommentsList comments={comments} />}
      <div className="flex progress">
        {(statusPost === StatusOfRequestEnum.LOADING || statusComments === StatusOfRequestEnum.LOADING) && (
          <CircularProgress variant="solid" />
        )}
      </div>
      {statusPost === StatusOfRequestEnum.ERROR && <p>{errorPost}</p>}
    </>
  );
};

export default SinglePost;
