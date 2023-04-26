import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Post } from "../../../core/types/modules/Post";
import { FC, memo } from "react";

interface PostViewProps {
  post: Post;
  goTo?: () => void;
}

const PostView: FC<PostViewProps> = ({ post, goTo }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 700, minWidth: 700, padding: 1.5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          post №{post.id}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      {goTo && (
        <CardActions>
          <Button size="small" onClick={goTo}>
            View post
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default memo(PostView);
