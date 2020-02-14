import React from "react"
import * as Const from '../../../../config/_constants';
import * as Helpers from '../../../../config/_helperMethods';

import { connect } from 'react-redux';
import { DeleteMessage, EditTopic } from '../../redux/TopicListAppActions';

class Forum extends React.Component 
{
  render () 
  { 
    const { info } = this.props
    const { id, forumName, description, author, created_at, updated_at } = info
       
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-3 forum-info">
                <strong>{forumName}</strong>
                <br/>
                <span className="font-size-0-8">{`Created By: ${author}`}</span>
                </div>
                <div className="col-6 forum-info">
                {description}
                </div>
                <div className="col-3 forum-info">
                 {Helpers.GetSimpleDateString(new Date(created_at))}
                </div>
            </div>   
        </React.Fragment>
    );
  }
}

function mapStateToProps(state) 
{
   return state; 
}

export default connect(mapStateToProps, {EditTopic, DeleteMessage})(Forum);
