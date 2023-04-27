import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../../core/store/postsSlice";
import { Post } from "../../core/types/modules/Post";
import { useThunkDispatch } from "../../core/store/store";
import { Wrapper } from "../../containers/wrapper";
import { Typography, TextField, Button, Stack, Box } from "@mui/material";

const AddPostForm = () => {
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const post: Post = {
    userId,
    id: 0,
    title,
    body,
  };

  const canSavePost = !!title && !!body && !!userId;

  const onSavePost = () => {
    if (canSavePost) {
      navigate("/posts");
      dispatch(addNewPost(post));
      setTitle("");
      setBody("");
    }
  };

  return (
    <Wrapper>
      <Box textAlign="center">
        <Typography variant="h4" color="text.primary" gutterBottom>
          Add a new post
        </Typography>
        <form>
          <Stack spacing={2} alignItems="center">
            <TextField
              style={{ width: "700px" }}
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              style={{ width: "700px" }}
              multiline
              rows={6}
              label="Type something..."
              variant="outlined"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <Button variant="contained" onClick={onSavePost} sx={{ width: "100px" }}>
              Send
            </Button>
          </Stack>
        </form>
      </Box>
    </Wrapper>
  );
};

export default AddPostForm;
