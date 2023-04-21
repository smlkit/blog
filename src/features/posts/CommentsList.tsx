import { FC } from "react";
import { CommentsState } from "./postsSlice";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CommentsList: FC<{ comments: CommentsState[] }> = ({ comments }) => {
  return (
    <div className="comments-container">
      {comments.map(function (comment) {
        return (
          <div key={comment.id} className="flex">
            <Card
              style={{ backgroundColor: "#f9f9f9" }}
              className="flex comment"
              variant="outlined"
              sx={{ minWidth: 700, maxWidth: 700, padding: 1.2 }}
            >
              <Avatar color="primary"></Avatar>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {comment.email}
                  <Typography variant="h5" component="div">
                    by user #{comment.id}
                  </Typography>
                </Typography>
                <Typography variant="body2">{comment.body}</Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
