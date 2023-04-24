import { useState } from "react";
import { addNewPost } from "./postsSlice";
import { PostsState } from "./postsSlice";
import { useThunkDispatch } from "../../app/store";

const AddPostForm = () => {
  const dispatch = useThunkDispatch();

  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const post: PostsState = {
    userId,
    id: 1,
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
    <section className="wrapper add-form">
      <h2>Add a new post</h2>
      <form className="flex add-form">
        <label>
          Post title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Post text:
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>

        <button type="button" onClick={onSavePost} disabled={!canSavePost}>
          Save post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
