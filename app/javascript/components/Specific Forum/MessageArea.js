import React, {useEffect} from "react"
import PropTypes from 'prop-types';
import Message from './Message';

import { connect } from 'react-redux';
import { GetAllComments } from '../../redux/SpecificForumActions'

function GetSize(obj) 
{
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function DrawContents(allComments, commentEditState, editCommentStates)
{
    let left = false;
    let nameToImage = {};
    return allComments.map((entry, id) => 
    {        
        left = !left;

        const name = entry['author'];
        const text = entry['contents'];
        const commentId = entry['id'];
        if (!(name in nameToImage))
        {
            nameToImage[name] = 1 + (GetSize(nameToImage) % 36);
        }
        
        return <span key={id}><Message 
        image={nameToImage[name]} 
        name={name} text={text} 
        editState={editCommentStates[id]} inEditView={commentEditState[id]} editIndex={id} commentId={commentId} 
        imagePosition={left ? Message.ImagePosition.LEFT: Message.ImagePosition.RIGHT}/>
        </span>
    });
}

const MessageArea =({GetAllComments, id, allComments, commentEditState, editCommentStates})=>
{
    useEffect(
        ()=>{GetAllComments(id);}
    ,[])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-11">
                    {DrawContents(allComments, commentEditState, editCommentStates)}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps =(state)=> {
    const { allComments, commentEditState, editCommentStates } = state

    return {
        allComments: allComments,
        commentEditState: commentEditState,
        editCommentStates: editCommentStates
    }; 
}
// export default MessageArea
export default connect(mapStateToProps, {GetAllComments})(MessageArea);