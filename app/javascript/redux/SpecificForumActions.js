import axios from 'axios'
import swal from 'sweetalert';
import * as Actions from './ActionConstants'
import * as Const from "../../../config/_constants";

export const addNewComment = (comment, authorName, id) => {
    return function(dispatch)
    {
        dispatch({type: Actions.A_ASYNC_OPERATION_STARTED})
        
        if (!authorName)
        {
            swal("There needs to be an author to a comment.\n\nPlease insert how you'd like to be called.",
            {
                icon: "error"
            });

            dispatch({
                type: Actions.A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }

        if (!comment)
        {
            swal("Please insert a comment before submitting.\n\nPlease pick one.",
            {
                icon: "error"
            });

            dispatch({
                type: Actions.A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }

        axios.post( Const.API_CREATE_NEW_COMMENT, { params: { forumId: 3,authorName: authorName, comment: comment } })
            .then(response => 
            {
                const { newComment } = response.data.data

                if(!newComment){
                    return dispatch({type: Actions.A_ASYNC_OPERATION_ERROR, error: error });
                }

                swal("New forum sucessfully created",
                {
                    icon: "success"
                });

                dispatch({
                    type: Actions.A_CREATE_NEW_COMMENT,
                    newComment
                })
            })
            .catch((error) => {asyncError()})
        
    }
}

export function ToggleEditComment(indexToToggle)
{
    return function(dispatch) 
    {
        dispatch({
            type: Actions.A_TOGGLE_EDIT_COMMENT,
            indexToToggle: indexToToggle
        });
    } 
}

export function SaveCommentChanges(comment, arrayIndex)
{
    return function(dispatch) 
    {
        dispatch({
            type: Actions.A_ASYNC_OPERATION_STARTED
        });
        
        swal
        ({
            title: "Save Changes?",
            text: "You are about to modify an existing comment.\n\nDo you want to proceed?",
            icon: "info",
            cancelButtonColor: Const.CANCEL_BUTTON_COLOR,
            buttons: ["No, Please Cancel", "Save Changes"],
        })
        .then((willAttemptToPurchase) => 
        {
            if (!willAttemptToPurchase) 
            {
                swal("No changes were saved.");
                dispatch({
                    type: Actions.A_ASYNC_OPERATION_CANCELLED,
                });
                return;
            }

            swal('Updating selected comment...',
            {
                icon: "info",
                button: []
            });

            axios.post(Const.API_SAVE_COMMENT_CHANGES, { params: { id: comment.id, newComment: comment.comment, newAuth: comment.auth } })
            .then(response => 
            {
                swal("Comment updated successfully.",
                {
                    icon: "success"
                });
                return dispatch({
                    type: Actions.A_SAVE_COMMENT_CHANGES,
                    arrayIndex: arrayIndex,
                    newComment: comment.comment,
                    newAuth: comment.auth
                });
            })
            .catch((error) => {dispatch({type: Actions.A_ASYNC_OPERATION_ERROR, error: error })})         
        });
    }
}

export function DeleteComment(idToDelete, indexInArray)
{
    return function(dispatch) 
    {
        dispatch({
            type: Actions.A_ASYNC_OPERATION_STARTED
        });
        
        swal
        ({
            title: "Are you sure you want to delete this comment?",
            text: "You are about to delete a comment.\n\nDo you really want to proceed?",
            icon: "info",
            cancelButtonColor: Const.CANCEL_BUTTON_COLOR,
            buttons: ["No, Please Cancel", "Delete Comment"],
        })
        .then((willAttemptToPurchase) => 
        {
            if (!willAttemptToPurchase) 
            {
                swal("Comment was NOT deleted.");
                dispatch({
                    type: Actions.A_ASYNC_OPERATION_CANCELLED,
                });
                return;
            }

            swal('Deleting selected comment...',
            {
                icon: "info",
                button: []
            });
            console.log(idToDelete)
            axios.post(Const.API_DELETE_COMMENT, { params: { id: idToDelete } })
            .then(response => 
            {
                swal("Comment deleted successfully.",
                {
                    icon: "success"
                });

                return dispatch({
                    type: Actions.A_DELETE_COMMENT,
                    indexInArray: indexInArray
                });
            })
            .catch((error) => {dispatch({type: Actions.A_ASYNC_OPERATION_ERROR, error: error })})         
        });
    }
}

export function ChangeExistingComment(arrayIndex, newComment)
{
    return function(dispatch) 
    {
        dispatch({
            type: Actions.A_CHANGE_EXISTING_COMMENT,
            newComment: newComment,
            arrayIndex: arrayIndex
        });
    } 
}

export function ChangeExistingTopicAuthor(arrayIndex, newAuth)
{
    return function(dispatch) 
    {
        dispatch({
            type: Actions.A_CHANGE_EXISTING_COMMENT_AUTHOR,
            arrayIndex: arrayIndex,
            newAuth: newAuth
        });
    } 
}

export function GetAllComments(id)
{
    return function(dispatch) 
    {
        dispatch({
            type: Actions.A_ASYNC_OPERATION_STARTED
        });
        
        axios.get(`${Const.API_GET_FORUM_COMMENTS}?id=${id}`)
        .then(response => 
        {
            const { allComments } = response.data.data;
            return dispatch ({
                type: Actions.A_GET_COMMENTS,
                allComments: allComments
            })
        })
        .catch((error) => {dispatch({type: Actions.A_ASYNC_OPERATION_ERROR, error: error })})
    }
}
