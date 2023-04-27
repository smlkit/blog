import { useState, FC } from "react";
import { addNewComment, Comment } from "../../../core/store/commentsSlice";
import { useThunkDispatch } from "../../../core/store/store";
import { Box, Grow, Typography, Button, Stack, TextField } from "@mui/material";

const AddCommentForm: FC<{ postId: number; show: boolean }> = ({ postId, show }) => {
  const dispatch = useThunkDispatch();
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(show);

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
      setShowForm(false);
    }
  };

  return (
    <>
      <Grow in={showForm} mountOnEnter unmountOnExit>
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
      </Grow>

      {/* <Grow in={showForm}>
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
      </Grow> */}
    </>
  );
};

export default AddCommentForm;
