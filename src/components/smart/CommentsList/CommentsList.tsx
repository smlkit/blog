import { FC } from "react";
import { Comment } from "../../../core/store/commentsSlice";
import Stack from "@mui/material/Stack";
import CommentView from "../../simple/CommentView";

const CommentsList: FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentView comment={comment} />
      ))}
    </Stack>
  );
};

export default CommentsList;
