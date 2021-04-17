
import { Component } from 'react';

import './style.css';

import { Posts } from '../../Posts';
import { loadPosts } from '../../../utils/load-posts';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: '',
  };








  /*Aqui chama a api*/
  async componentDidMount() {
    await this.loadPosts();
  }










  loadPosts = async () => {
    const { postsPerPage } = this.state;

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










  /*pesquisa*/
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }










  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <section className="container">

        
        <div className="search-container">
          {/* essa função ira fazer com que so aparece o h1 se tiver algo digitado no inputsearchValue tranform a variavel em boleana*/}

          {!!searchValue && ( 
            <h1>Search value: {searchValue}</h1>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />

        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <h1>Nenhum resultado Encontrado =C</h1>
        )}
        <div className="button-container">

          {!searchValue && (/*Some o botao se estiver pesquisando algo */
            <Button
              Qualquertexto="Next Page"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />)}
        </div>
      </section>
    );
  }
}




