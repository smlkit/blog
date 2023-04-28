import { FC, memo } from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { Post } from "../../../core/types/modules/Post";

interface PostViewProps {
  post: Post;
  goTo?: (arg: number) => void;
}

const PostView: FC<PostViewProps> = ({ post, goTo }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 700, minWidth: 700, padding: 1.5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          post #{post.id}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      {goTo && (
        <CardActions>
          <Button size="small" onClick={() => goTo(post.id)}>
            View post
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default memo(PostView);
