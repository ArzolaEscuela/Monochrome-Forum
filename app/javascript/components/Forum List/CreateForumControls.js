import React from "react"
import PropTypes from 'prop-types';
import ChatButton from '../ChatButton';

import { connect } from 'react-redux';
import { CreateNewTopic, ChangeTopicName, ChangeTopicDescription, ChangeTopicAuthor } from '../../redux/TopicListAppActions';

class CreateForumControls extends React.Component 
{
    OnForumNameChanged(e)
    {
        this.props.ChangeTopicName(e.target.value)
    }

    OnForumDescriptionChanged(e)
    {
        this.props.ChangeTopicDescription(e.target.value)
    }

    OnAuthorNameChanged(e)
    {
        this.props.ChangeTopicAuthor(e.target.value)
    }

    OnCreateNewTopic(topicName, topicDescription, topicAuthor)
    {
        this.props.CreateNewTopic(topicName, topicDescription, topicAuthor)
    }

    render () 
    { 
        const { newTopicName, newTopicDescription, newTopicAuthor } = this.props;

        return (
            <div className="container">            
                <div className="row justify-content-center align-center">
                    <div className="col-8 background">
                    
                        <div className="row container-fluid justify-content-center align-center">   
                            <div className="form-group col-12 text-center">
                                <h1>Create New Forum</h1>
                            </div>
                        </div>

                        <div className="row container-fluid justify-content-center align-center">            
                            <div className="form-group col-6 text-center">
                                <label>Forum Name</label>
                                <input type="text" className="form-control" id="name" placeholder="My First Forum" value={newTopicName} onChange={this.OnForumNameChanged.bind(this)}/>
                            </div>
                            <div className="form-group col-6 text-center">
                                <label>Author Name</label>
                                <input type="text" className="form-control" id="author" placeholder="John Doe" value={newTopicAuthor} onChange={this.OnAuthorNameChanged.bind(this)}/>
                            </div>
                        </div>

                        <div className="row container-fluid justify-content-center align-center">   
                            <div className="form-group col-12 text-center">
                                <label>Forum Description</label>
                                <input type="text" className="form-control" id="decription" placeholder="Hello World. (Yea, I'm just THAT original.)" value={newTopicDescription} onChange={this.OnForumDescriptionChanged.bind(this)}/>
                            </div>
                        </div>

                        <div className="row"> 
                                <ChatButton text="Create New Forum" action={ () => {this.OnCreateNewTopic(newTopicName, newTopicDescription, newTopicAuthor)} }/>
                        </div>

                        <br/>

                    </div>
                </div>
            </div>
        );
    }
}

CreateForumControls.defaultProps = 
{
    name: "",
    text: ""
}

CreateForumControls.propTypes = 
{
    name: PropTypes.string,
    text: PropTypes.string
};

function mapStateToProps(state) 
{
   const { newTopicName, newTopicDescription, newTopicAuthor } = state

    return {
        ...state,
        newTopicName: newTopicName,
        newTopicDescription: newTopicDescription,
        newTopicAuthor: newTopicAuthor
    }; 
}

export default connect(mapStateToProps, {CreateNewTopic, ChangeTopicName, ChangeTopicDescription, ChangeTopicAuthor})(CreateForumControls);