
import { Component } from 'react';

import './style.css';

import { Posts } from '../../Posts';
import { loadPosts } from '../../../utils/load-posts';
import { Button } from '../../Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  };

  /*Aqui chama a api*/
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(0, postsPerPage),
      allPosts: postAndPhotos,
    });
  }
  /*carregar mais paginas*/
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);/*... é tudo*/

    this.setState({ posts, page: nextPage });

  }
  render() {
    const { posts,page,postsPerPage,allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="button-container">
          <Button 
          Qualquertexto="Next Page"
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}




