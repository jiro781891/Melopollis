import * as React from 'react';
// import { socketSend } from '../../actions';
// import { Article } from '../actions';
//
// interface Props {
//     Article: Article;
// }

const Song: React.SFC<Props> = props => {

    // const classes = useStyles();
    // let title: string | JSX.Element = props.article.webTitle;
    console.log(props)
    // Force update for functional component
    // Since react 16.8 released with hooks, function components are now have the ability to hold persistent state. With that ability you can now mimic a forceUpdate:
    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);
    // var existsInPins = false;


    return (
      <>
        <div> {props.vote.title} </div>
        <div> {props.vote.votes} </div>
        { !props.vote.voted ?
        <button onClick={ () => props.socketSend(props.vote.yt_id, '+') }>Up</button>
        :
        <button onClick={ () => props.socketSend(props.vote.yt_id, '-') }>Down</button>
        }
      </>
    );
};

export default Song
