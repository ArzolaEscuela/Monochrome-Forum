import React from "react"
import MessageArea from './MessageArea';
import CreateMessageControls from './CreateMessageControls';
import Header from '../Header';

class CommentList extends React.Component 
{
  render () 
  { 
    const { selectedForum, allComments } = this.props

    if (selectedForum == null)
    {
      return <Header author={null} title="Please Select A Forum" description='In order to be able to proceed, please <u><a href="/">go back</a></u> and select a valid forum to visit.'/>;
    }

    const { forumName, description, author } = selectedForum

    return (
        <>

        <Header author={author} title={forumName} description={description}/>

        <br/>
        
        <div className="container">
            <div className="chat-background">
            <br/>
                <div><CreateMessageControls/></div>
            <br/>
                <div><MessageArea allMessages={allComments}/></div>
            </div>
        </div>
        </>
    );
  }
}

CommentList.defaultProps = 
{

}

CommentList.propTypes = 
{
    
};

export default CommentList