import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

type AuthorDetailsProps = {
  id: number,
  name: string,
  email: string,
  website: string
}

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

const AuthorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<AuthorDetailsProps | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        // Obtener detalles del autor
        const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!authorResponse.ok) {
          throw new Error('Failed to fetch author details');
        }
        const authorData = await authorResponse.json();
        setAuthor(authorData);

        // Obtener todas las publicaciones del autor
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch author posts');
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching author details and posts:', error);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  return (
    <div className='mt-6 mx-3'>
      {author && (
        <div>
          <h2 className='font-semibold'>Author Details</h2>
          <p className='font-semibold'>Name: <span className='font-normal'>{author.name}</span></p>
          <p className='font-semibold'>Email: <span className='font-normal'>{author.email}</span></p>
          <p className='font-semibold'>Website: <span className='font-normal'>{author.website}</span></p>
        </div>
      )}

      <h3 className='mt-8 font-semibold'>Posts by {author?.name}</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id} className='mt-2'>
            <Link to={`/post/${post.id}`} className='font-semibold text-blue-500 hover:underline'>Title: <span className='font-normal'>{post.title}</span></Link>
            <p className='font-semibold'>Body: <span className='font-normal'>{post.body}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorDetails;