import React from "react"
import * as Const from '../../../../config/_constants';
import * as Helpers from '../../../../config/_helperMethods';

import ChatButton from '../ChatButton';

import { connect } from 'react-redux';
import { DeleteMessage, ToggleEditTopic, SaveTopicChanges, ChangeExistingTopicName, ChangeExistingTopicDescription, ChangeExistingTopicAuthor } from '../../redux/TopicListAppActions';

function DrawEditView(props)
{
  const { editState, editIndex, ChangeExistingTopicName, ChangeExistingTopicAuthor, ChangeExistingTopicDescription, ToggleEditTopic, SaveTopicChanges } = props
  const { id, forumName, description, author, created_at, updated_at } = editState

  return (
    <React.Fragment>
            <div className="row">
                <div className="col-3 forum-info vertical-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <strong>                        
                        <input type="text" className="form-control" id={`forum-name-edit-${id}`} placeholder="New Forum Name" value={forumName} 
                          onChange={event => ChangeExistingTopicName(editIndex, event.target.value)}/>
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <span className="font-size-0-8">Created By:</span>
                        <input type="text" className="form-control" id={`author-edit-${id}`} placeholder="New Author" value={author} 
                          onChange={event => ChangeExistingTopicAuthor(editIndex, event.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 forum-info vertical-center">
                <input type="text" className="form-control" id={`description-edit-${id}`} placeholder="New Forum Description" value={description} 
                  onChange={event => ChangeExistingTopicDescription(editIndex, event.target.value)}/>
                </div>
                <div className="col-2 forum-info vertical-center">
                 {Helpers.GetSimpleDateString(new Date(created_at))}
                </div>
                <div className="col-2 forum-info">
                    <div className="row vertical-center">
                      <div className="col-7">
                        <ChatButton text="Cancel" position={ChatButton.ButtonPosition.CENTER} action={() => ToggleEditTopic(editIndex)}/>
                      </div>
                      <div className="col-5">
                        <ChatButton text="Save" position={ChatButton.ButtonPosition.CENTER} action={() => SaveTopicChanges(editState, editIndex)}/>
                      </div>
                    </div>
                </div>
            </div>   
        </React.Fragment>
  );
}

class Forum extends React.Component 
{
  OnToggleEditButton(index)
  {
      this.props.ToggleEditTopic(index)
  }

  OnDeleteButton(id, indexInArray)
  {
      this.props.DeleteMessage(id, indexInArray)
  }

  render () 
  { 
    const { info, inEditView, editIndex } = this.props
    const { id, forumName, description, author, created_at, updated_at } = info
    
    if (inEditView)
    {      
      return <React.Fragment>{DrawEditView(this.props)}</React.Fragment>;
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-3 forum-info vertical-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <a href={`forum?id=${id}`}>{forumName}</a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <span className="font-size-0-8">{`Created By: ${author}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 forum-info vertical-center">
                {description}
                </div>
                <div className="col-2 forum-info vertical-center">
                 {Helpers.GetSimpleDateString(new Date(created_at))}
                </div>
                <div className="col-2 forum-info">
                    <div className="row vertical-center">
                      <div className="col-6">
                        <ChatButton text="Edit" position={ChatButton.ButtonPosition.CENTER} action={ () => {this.OnToggleEditButton(editIndex)} }/>
                      </div>
                      <div className="col-6">
                        <ChatButton text="Delete" position={ChatButton.ButtonPosition.CENTER} action={ () => {this.OnDeleteButton(id, editIndex)} }/>
                      </div>
                    </div>
                </div>
            </div>   
        </React.Fragment>
    );
  }
}

function mapStateToProps(state) 
{
  const { allTopics, topicEditState } = state

   return {
       ...state,
       allTopics: allTopics,
       topicEditState: topicEditState
   }; 
}

export default connect(mapStateToProps, {ToggleEditTopic, SaveTopicChanges, DeleteMessage, ChangeExistingTopicName, ChangeExistingTopicDescription, ChangeExistingTopicAuthor} )(Forum);
