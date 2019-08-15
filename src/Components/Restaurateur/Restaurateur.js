import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { playListFetch, socketConnect, socketSend } from '../../actions';
import YouTube from 'react-youtube';
import { currentSongFetch } from '../../actions/current'
import { stopWatchSocketConnect, stopWatchSocketSend, stopSend } from '../../actions/stopwatch';
// import { socketConnect, socketSend } from '../../actions/stopwatch'

class Restaurateur extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
    this.timer = -2
    this.first = true
  }

  componentDidMount() {
    this.props.currentSongFetch()
    // this.props.socketConnect()
    this.props.stopWatchSocketConnect()

  }

  sendTimer = () => {
    this.timer = this.timer +1;
    return this.timer
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps)
    var _this = this;
    if(nextProps.songState.song.duration && this.first===true){
      this.first=false
      setTimeout(function(){ nextProps.currentSongFetch(); }, nextProps.songState.song.duration * 1000);
    }

    if (nextProps && nextProps.stopWatch.socketConneced === true){
      var sec = 1
      nextProps.stopSend()
      var setI = setInterval(function(){nextProps.stopWatchSocketSend(_this.sendTimer())}, 1000)
    }

    if (this.timer === this.props.songState.song.duration -2) {
      clearInterval(setI)
      this.timer = 0
      this.first = true
    }
      return true
  }


  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }


  render() {

    // console.log(this.props)
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    if (this.props.songState.song){
    return (
      <YouTube
        videoId={this.props.songState.song.yt_id}
        opts={opts}
        onReady={this._onReady}
      />
    )}
    else{
      return(<div>Loading...</div>)
    }
}


  }
//
const mapStateToProps = (state: MainState) => ({
    songState: state.song,
    stopWatch: state.stopwatch
});

// const mapStateToProps = (state: MainState) => (console.log(state));
//
// Provide access to dispatching actions

const mapDispatchToProps = (dispatch: Dispatch<SongFetchAction>) => ({
    ...bindActionCreators({currentSongFetch, socketConnect, socketSend, stopWatchSocketConnect, stopWatchSocketSend, stopSend}, dispatch)
});
// //
// // Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(Restaurateur);
// export default Restaurateur;
