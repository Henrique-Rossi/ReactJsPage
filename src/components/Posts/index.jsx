
import { PostCard } from '../PostCard';
import "./style.css";

export const Posts = ({posts}) => (
    <div className="posts">

        {posts.map(post => (  /*-----------> Sempre que utilizar map ,usa a key no elemento root,no caso pai, para definir que o objeto é unico */
            <PostCard
                key={post.id}
                post={post}

            //id={post.id}
            //title={post.title}
            //body={post.body}
            />
        ))}
    </div>
);