import { FC, useState } from "react";
import { Comment } from "../../../core/store/commentsSlice";
import { Stack, Typography, Zoom } from "@mui/material";
import CommentView from "../../simple/CommentView";

const CommentsList: FC<{ comments: Comment[]; show: boolean }> = ({ comments, show }) => {
  return (
    <Zoom in={show}>
      <Stack spacing={2}>
        <Typography variant="h5" color="text.primary">
          All comments
        </Typography>
        {comments.map((comment) => (
          <CommentView key={comment.id} comment={comment} />
        ))}
      </Stack>
    </Zoom>
  );
};

export default CommentsList;
