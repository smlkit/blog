import { FC } from "react";
import { CommentsState } from "../posts/postsSlice";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const CommentsList: FC<{ comments: CommentsState[] }> = ({ comments }) => {
  return (
    <Stack spacing={2}>
      {comments.map(function (comment) {
        return (
          <div key={comment.id} className="flex">
            <Card
              className="flex comment"
              variant="outlined"
              sx={{ minWidth: 700, maxWidth: 700, padding: 1.2 }}
            >
              <Avatar color="primary"></Avatar>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {comment.email}
                </Typography>
                <Typography variant="body2">{comment.body}</Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </Stack>
  );
};

export default CommentsList;
