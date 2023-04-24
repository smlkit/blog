import { useState } from "react";

import { addNewPost, PostsState } from "./postsSlice";
import { useThunkDispatch } from "../../app/store";
import { Wrapper } from "../../styled";

import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const AddPostForm = () => {
  const dispatch = useThunkDispatch();

  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const post: PostsState = {
    userId,
    id: 0,
    title,
    body,
  };

  const canSavePost = !!title && !!body && !!userId;

  const onSavePost = () => {
    if (canSavePost) {
      dispatch(addNewPost(post));
      setTitle("");
      setBody("");
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Add a new post
      </Typography>
      <form className="flex add-form">
        <Stack spacing={2}>
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
            rows={4}
            label="Type something..."
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button variant="contained" onClick={onSavePost}>
            Send
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddPostForm;
