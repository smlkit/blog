import { useState, FC } from "react";

import { addNewComment, Comment } from "../../../core/store/commentsSlice";
import { useThunkDispatch } from "../../../core/store/store";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const AddCommentForm: FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useThunkDispatch();

  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const comment: Comment = {
    postId,
    email,
    body,
  };

  const canSaveComment = !!email && !!body;

  const onSaveComment = () => {
    if (canSaveComment) {
      dispatch(addNewComment(comment));
      setEmail("");
      setBody("");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="text.primary">
        Add new comment
      </Typography>
      <form className="flex add-form">
        <Stack spacing={2}>
          <TextField
            style={{ width: "700px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            style={{ width: "700px" }}
            multiline
            rows={4}
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button variant="contained" onClick={onSaveComment} sx={{ width: "100px" }}>
            Send
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddCommentForm;
