import React, { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Comment } from "../../../core/store/commentsSlice";

const CommentView: FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 700,
        maxWidth: 700,
        padding: 1.2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Avatar color="primary"></Avatar>
      <CardContent>
        <Typography fontSize="14px" color="text.secondary" gutterBottom>
          {comment.email}
        </Typography>
        <Typography variant="body2">{comment.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentView;
