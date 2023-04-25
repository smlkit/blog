import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PostsState } from "./postsSlice";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../core/styles/wrapper/Wrapper";

const Post: FC<{ post: PostsState; btn: boolean }> = ({ post, btn }) => {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 700, minWidth: 700, padding: 1.5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          post №{post.id}
        </Typography>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      {btn && (
        <CardActions>
          <Button size="small" onClick={goToPost}>
            View post
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default memo(Post);
