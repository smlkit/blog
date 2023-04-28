import { FC, memo } from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { Post } from "../../../core/types/modules/Post";

interface PostViewProps {
  post: Post;
  goTo?: () => void;
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
          <Button size="small" onClick={goTo}>
            View post
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

const areEqual = (prevProps: PostViewProps, nextProps: PostViewProps): boolean =>
  isDeepEqual(prevProps.post, nextProps.post) && isFuncEqual(prevProps.goTo, nextProps.goTo);

const isDeepEqual = (object1: any, object2: any) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
      return false;
    }
  }
  return true;
};

const isObject = (object: any) => {
  return object != null && typeof object === "object";
};

const isFuncEqual = (func1: any, func2: any) => func1.toString() === func2.toString();

export default memo(PostView, areEqual);
