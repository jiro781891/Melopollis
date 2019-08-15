import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { socketConnect, socketSend, playListFetch } from '../../actions';
import Song from '../Song'
import { stopWatchSocketConnect } from '../../actions/stopwatch';
// import { MainState } from '../../index';
// import { ArticlesState } from '../reducers';
//
// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// // State interface (not internal component state)
// // TODO: Form state can be probably partially based on `redux-form` interfaces, but I can't find proper one
// interface StateProps {
//     articlesState: ArticlesState;
//     formState: {
//         articlesSearch: {
//             values?: {
//                 phrase: string;
//             }
//         }
//     };
// }
//
// // Actions interface
// interface DispatchProps {
//     articlesFetch: typeof articlesFetch;
// }
//
// // Component interface
// interface Props extends StateProps, DispatchProps {}
//
// const styles = (theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     // backgroundColor: theme.palette.background.paper,
//     paddingTop: '10%'
//   },
//   articleImage:{
//     width: '-webkit-fill-available'
//   },
//   sectionPadding:{
//     paddingBottom: theme.spacing(5)
//   },
//   removeUnderLine:{
//     textDecoration: 'none'
//   }
//   }))

class Votes extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.socketConnect();
    this.props.playListFetch();
    this.props.stopWatchSocketConnect()
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps.stopwatch.stopwatch)
    if(nextProps.stopwatch && nextProps.stopwatch.stopwatch === 0){
      this.props.playListFetch();
    }
    return true
  }

    // If the render method will be too long (at some point in the future)
    // it should be sliced to multiple methods like `renderLoading`, `renderError`, `renderList` etc.
    render() {

      const playList = this.props.playListState
      const stopwatch = this.props.stopwatch

      if (playList){
        return (
          <div >
            {stopwatch ? <p>{stopwatch.stopwatch}</p> : null}
            {playList.songsList.map((vote) => (
              <Song vote={vote} key={vote.id} socketSend={this.props.socketSend}/>
            ))}
            {/* <button onClick={ ()() }>Up</button> */}
          </div>
        )
      }
      return ( <div>a</div> )


  }
}

//
// Provide access to state
// const mapStateToProps = (state: MainState) => ({
//     voteState: state.vote,
//     formState: state.form,
//     playListState: state.songsList
// });

const mapStateToProps = (state: MainState) => ({
    voteState: state.votes,
    formState: state.form,
    playListState: state.songs,
    stopwatch: state.stopwatch
});

// Provide access to dispatching actions
const mapDispatchToProps = (dispatch: Dispatch<ArticlesAction>) => ({
    ...bindActionCreators({socketConnect, socketSend, playListFetch, stopWatchSocketConnect }, dispatch)
});
//
// Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(Votes);
// export default Votes;
