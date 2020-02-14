import React from "react"
import * as Const from '../../../../config/_constants';
import * as Helpers from '../../../../config/_helperMethods';

import ChatButton from '../ChatButton';

import { connect } from 'react-redux';
import { DeleteMessage, ToggleEditTopic, EditTopic } from '../../redux/TopicListAppActions';

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
    const { info, editState, editIndex } = this.props
    const { id, forumName, description, author, created_at, updated_at } = info
    
    if (editState)
    {
      return <ChatButton text="Edit" position={ChatButton.ButtonPosition.CENTER} action={ () => {this.OnToggleEditButton(editIndex)} }/>;
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-3 forum-info vertical-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <strong>{forumName}</strong>
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

export default connect(mapStateToProps, {ToggleEditTopic, EditTopic, DeleteMessage} )(Forum);
