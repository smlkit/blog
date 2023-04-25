import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";

import { fetchSinglePost, fetchSinglePostSelector } from "./postsSlice";
import { fetchComments, fetchCommentsSelector } from "../comments/commentsSlice";

import { useThunkDispatch } from "../../app/store";
import Post from "./Post";
import CommentsList from "../comments/CommentsList";
import AddCommentForm from "../comments/AddCommentForm";
import { Wrapper } from "../../core/styles/wrapper/Wrapper";

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
        {post && statusPost === StatusOfRequestEnum.SUCCESS && <Post post={post} btn={false} />}
        <Button variant="contained" onClick={() => navigate(`/`)}>
          <ArrowBack />
          back to all posts
        </Button>
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
