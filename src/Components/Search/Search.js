import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { currentSongFetch } from '../../actions/current'
import { searchFetch, SearchAction } from '../../actions/search';
import { suggestPost, SuggestAction } from '../../actions/suggest';

class Search extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  // componentDidMount() {
  //   this.props.searchFetch()
  // }

  handleSearchChange = event => {
    console.log(event)
    this.setState({
      query: event.target.value
  })
}


  render() {
    console.log(this.state)
    var search =  (
      <div>
          Song name: <input type="text" value={this.state.query} onChange={this.handleSearchChange} /><br></br>
          <button onClick={ () => this.props.searchFetch(this.state.query)}>Search</button>
      </div>
    )
    if(this.props.searchList.items){
      return(
        <div>
          {search}
          {this.props.searchList.items.map((item) => (
          <div>
            <p>{item.snippet.title}</p>
            <img src={item.snippet.thumbnails.medium.url}></img>
            <button onClick={ () => this.props.suggestPost(item)}>Suggest</button>
          </div>
          )
        )}
        </div>
      )
    }

    return(<div>{search}</div>)
  }


  }
//
const mapStateToProps = (state: MainState) => ({
    searchList: state.search.searchList,
    suggestResult: state.suggest
});

// const mapStateToProps = (state: MainState) => (console.log(state));
//
// Provide access to dispatching actions

const mapDispatchToProps = (dispatch: Dispatch<SearchAction>) => ({
    ...bindActionCreators({ searchFetch, suggestPost }, dispatch)
});
// //
// // Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(Search);
// export default Restaurateur;
