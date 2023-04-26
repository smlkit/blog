import { FC } from "react";
import { Comment } from "../../../core/store/commentsSlice";
import { Stack, Typography } from "@mui/material";
import CommentView from "../../simple/CommentView";

const CommentsList: FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" color="text.primary">
        All comments
      </Typography>
      {comments.map((comment) => (
        <CommentView key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};

export default CommentsList;
