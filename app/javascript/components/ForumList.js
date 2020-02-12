import React from "react"
import MessageArea from './MessageArea';
import Controls from './Controls';
import ForumTopic from './ForumTopic';

class ForumList extends React.Component 
{
  render () 
  { 
    return (
        <React.Fragment>

        <div className="container">
            <div className="chat-background">
                The forum creation mini form will go here.
                <br/><br/>
                The existing forums list will go here.
            </div>
        </div>
        </React.Fragment>
    );
  }
}

ForumList.defaultProps = 
{

}

ForumList.propTypes = 
{
    
};

export default ForumList