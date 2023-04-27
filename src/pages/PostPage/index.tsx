import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { StatusOfRequestEnum } from "../../core/types/enums/StatusOfRequestEnum";
import { fetchSinglePost, fetchSinglePostSelector } from "../../core/store/postsSlice";
import { fetchComments, fetchCommentsSelector } from "../../core/store/commentsSlice";
import { useThunkDispatch } from "../../core/store/store";
import Post from "../../components/simple/PostView";
import CommentsList from "../../components/smart/CommentsList/CommentsList";
import AddCommentForm from "../../components/smart/AddCommentForm/AddCommentForm";
import { Wrapper } from "../../containers/wrapper";

import { Button, CircularProgress, Stack } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

const SinglePost = () => {
  const navigate = useNavigate();
  const dispatch = useThunkDispatch();

  const { postId } = useParams();

  const { data: post, error: errorPost, status: statusPost } = useSelector(fetchSinglePostSelector);
  const { data: comments, error: errorComments, status: statusComments } = useSelector(fetchCommentsSelector);

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
      dispatch(fetchComments(postId));
    }
  }, []);

  return (
    <Wrapper>
      <Stack spacing={2}>
        <Button variant="outlined" onClick={() => navigate(`/posts`)} sx={{ width: "200px" }}>
          <ArrowBack />
          back to all posts
        </Button>
        {post && statusPost === StatusOfRequestEnum.SUCCESS && <Post post={post} />}
      </Stack>
      <AddCommentForm postId={Number(postId)} />
      {comments && statusComments === StatusOfRequestEnum.SUCCESS && <CommentsList comments={comments} />}
      {(statusPost === StatusOfRequestEnum.LOADING || statusComments === StatusOfRequestEnum.LOADING) && (
        <CircularProgress />
      )}
      {statusPost === StatusOfRequestEnum.ERROR && <p>{errorPost}</p>}
    </Wrapper>
  );
};

export default SinglePost;
