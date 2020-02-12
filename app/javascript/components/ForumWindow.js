import React from "react"
import MessageArea from './MessageArea';
import Controls from './Controls';
import ForumTopic from './ForumTopic';

import { Provider } from 'react-redux';
import AppReducer from '../redux/AppReducer';
const store = AppReducer();

class ForumWindow extends React.Component 
{
  render () 
  { 
    const { selectedForum, allComments } = this.props

    if (selectedForum == null)
    {
      return <ForumTopic author={null} title="Please Select A Forum" description='In order to be able to proceed, please <u><a href="/">go back</a></u> and select a valid forum to visit.'/>;
    }

    const { forumName, description, author } = selectedForum

    return (
        <Provider store={store}>

        <ForumTopic author={author} title={forumName} description={description}/>

        <br/>
        
        <div className="container">
            <div className="chat-background">
            <br/>
                <div><Controls/></div>
            <br/>
                <div><MessageArea allMessages={allComments}/></div>
            </div>
        </div>
        </Provider>
    );
  }
}

ForumWindow.defaultProps = 
{

}

ForumWindow.propTypes = 
{
    
};

export default ForumWindow