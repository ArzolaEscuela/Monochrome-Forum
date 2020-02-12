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
    return (
        <Provider store={store}>

        <ForumTopic/>

        <br/>
        
        <div className="container">
            <div className="chat-background">
            <br/>
                <div><Controls/></div>
            <br/>
                <div><MessageArea/></div>
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