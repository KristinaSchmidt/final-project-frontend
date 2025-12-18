const Feed = ({ posts, loading }) => {
  if (loading) {
    return <p>Loading feed...</p>;
  }

  if (!posts || posts.length === 0) {
    return <p>No posts yet.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id || post.id}>
          <p>{post.text || post.caption || "Post without text"}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;