import React, {useState} from "react"
import PropTypes from 'prop-types';
import * as Const from '../../../../config/_constants';
import * as Helpers from '../../../../config/_helperMethods';

import ChatButton from '../ChatButton';
import { ToggleEditComment, SaveCommentChanges, DeleteComment } from "../../redux/SpecificForumActions";
import { connect } from "react-redux";

const ImagePosition = 
{
    RIGHT:     false,
    LEFT:      true
}


function GenerateRandomTitle()
{
    return ["Member", "Member", "Member", "Member", "Member", "Member", "Member", "Trusted Member", "Trusted Member", "Moderator"][Math.floor(Math.random() * 10)];
}

function GenerateRandomStars()
{
    var filledStars = Math.floor(Math.random() * 5);
    var stars = "";
    for (var i = 0; i < filledStars; i++) { stars += "★"; }
    for (var i = filledStars; i < 5; i++) { stars += "☆"; }
    return stars;
}

function DrawEditView(editState, editIndex, ToggleEditComment, SaveCommentChanges)
{
  const { id, contents, author, created_at, updated_at } = editState
  const [comment, setComment] = useState(contents)
  const [auth, setAuth] = useState(author)
  return (
        <div className="row">
            <div className="col-3 forum-info vertical-center">
                <div className="container">
                <div className="row">
                    <div className="col-12">
                    <strong>                        
                    <input type="text" className="form-control" id={`comment-edit-${id}`} placeholder="New Commennt " value={comment} 
                        onChange={event => setComment(event.target.value)}/>
                    </strong>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    <span className="font-size-0-8">Created By:</span>
                    <input type="text" className="form-control" id={`author-edit-${id}`} placeholder="New Author" value={auth} 
                        onChange={event => setAuth(event.target.value)}/>
                    </div>
                </div>
                </div>
            </div>=
            <div className="col-2 forum-info vertical-center">
                {Helpers.GetSimpleDateString(new Date(created_at))}
            </div>
            <div className="col-2 forum-info">
                <div className="row vertical-center">
                    <div className="col-7">
                    <ChatButton text="Cancel" position={ChatButton.ButtonPosition.CENTER} action={() => ToggleEditComment(editIndex)}/>
                    </div>
                    <div className="col-5">
                    <ChatButton text="Save" position={ChatButton.ButtonPosition.CENTER} action={() => SaveCommentChanges({comment, auth, id}, editIndex)}/>
                    </div>
                </div>
            </div>
        </div>   
    );
}
const Message =({creationDate, index, name, text, image,ToggleEditComment, DeleteComment, SaveCommentChanges, editState, inEditView, editIndex,commentId})=> 
{
    const onToggleEditComment = () => {
        ToggleEditComment(editIndex)
    }
    const onDeleteComment = () => {
        DeleteComment(commentId, editIndex)
    }
    console.log(editState)
    if(inEditView){
        return DrawEditView(editState, editIndex, ToggleEditComment, SaveCommentChanges)
    }

    return (
        <div>
        <div  className="message">

            <div className="row">
                <div className="col-12">
                    <div  className="container message-top">
                        <div className="row">


                        <div className="col-6 text-left">
                        <strong>#{index} ({creationDate})</strong>
                            
                        </div>
                        <div className="col-6 text-right">
                            {name}
                        </div>
            
                        </div>  
                    </div>  
                </div>                
            </div>
            
            <br/>

            <div className="row">
                <div className="col-3 text-center">
                    <img className="img-responsive fit-image" src={Const.avatars[image]}/>
                    <strong>{name}</strong>
                    <br/>
                    {GenerateRandomTitle()}
                    <br/>
                    {GenerateRandomStars()}
                </div>
                <div className="col-9 full-width">
                    {text}
                </div>
            </div>
            
                <div className="row">
                    <ChatButton action={onToggleEditComment} text="Edit"/>
                    <ChatButton action={onDeleteComment} text="Delete"/>
                </div>            

                <br/>
            </div>

            <br/>

        </div>
    );
}

Message.defaultProps = 
{
    imagePosition: ImagePosition.LEFT,
    name: "Baggu",
    text: "I AM ERROR",
    image: 1,
    index: -1,
    creationDate: "11-11-2011",
    onEdit: () => { },
    onDelete: () => { }
}

Message.propTypes = 
{
    imagePosition: PropTypes.oneOf(Object.values(ImagePosition)),
    name: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.number,
    index: PropTypes.number,
    creationDate: PropTypes.object
};

Message.ImagePosition = ImagePosition
export default connect(null, {ToggleEditComment, SaveCommentChanges, DeleteComment})(Message)
