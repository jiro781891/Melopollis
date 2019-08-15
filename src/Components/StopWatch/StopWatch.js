import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { playListFetch } from '../../actions';
import { stopWatchSocketConnect } from '../../actions/stopwatch';

// // Component interface
// interface Props extends StateProps, DispatchProps {}
//
const styles = (theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    paddingTop: '10%'
  },
  articleImage:{
    width: '-webkit-fill-available'
  },
  sectionPadding:{
    paddingBottom: theme.spacing(5)
  },
  removeUnderLine:{
    textDecoration: 'none'
  }
  }))

class StopWatch extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.stopWatchSocketConnect()
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.stopwatch && nextProps.stopwatch.stopwatch === 0){
      this.props.playListFetch();
    }
    return true
  }

    // If the render method will be too long (at some point in the future)
    // it should be sliced to multiple methods like `renderLoading`, `renderError`, `renderList` etc.
    render() {

      const duration = this.props.duration
      const stopwatch = this.props.stopwatch
      const classes = this.props

      if (this.props.duration){
        return (
          // <div >
          //   {stopwatch ? <p>{stopwatch.stopwatch}</p> : null}
          // </div>

          <div id="countdown">
            <div id="countdown-number">{stopwatch.stopwatch}</div>
            <svg>
              <circle r="18" cx="20" cy="20"></circle>
            </svg>
          </div>
        )
      }
      return ( <div>a</div> )


  }
}

const mapStateToProps = (state: MainState) => ({
    stopwatch: state.stopwatch
});

// Provide access to dispatching actions
const mapDispatchToProps = (dispatch: Dispatch<ArticlesAction>) => ({
    ...bindActionCreators({ playListFetch, stopWatchSocketConnect }, dispatch)
});
//
// Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);
// export default StopWatch;
