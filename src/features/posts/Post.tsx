import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostsState } from './postsSlice';
import { FC, memo } from 'react';

const Post: FC<{post: PostsState}> = ({post}) => {
return (
  <Card variant="outlined" sx={{ maxWidth: 600, padding: 1.5 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        post №{post.id}
      </Typography>
      <Typography variant="h5" component="div">
        {post.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        -- by user {post.userId}
      </Typography>
      <Typography variant="body2">
        {post.body}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">View post</Button>
    </CardActions>
  </Card>
);
}

export default memo(Post)
