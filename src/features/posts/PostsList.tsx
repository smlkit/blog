import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchPostsSelector } from './postsSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../../app/store';
import { StatusOfRequestEnum } from '../../types/enums/StatusOfRequestEnum';

function PostsList() {
    const dispatch = useDispatch<AppDispatch>();
    const {data: posts, error, status} = useSelector(fetchPostsSelector);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

  return (
    <section>
        <h2>BLOG POSTS</h2>

        {status === StatusOfRequestEnum.SUCCESS && posts.map(post => (
        <article key={post.id}>
            <h3>Post #{post.id}: {post.title}</h3>
            <p>{post.body}</p>
        </article>
        ))}

        {status === StatusOfRequestEnum.LOADING &&
            <p>Loading...</p>
        }

        {status === StatusOfRequestEnum.ERROR &&
            <p>{error}</p>
        }
    </section>
  )
}

export default PostsList