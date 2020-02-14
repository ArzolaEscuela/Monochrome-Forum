import axios from 'axios';
import swal from 'sweetalert';
import * as Const from "../../../config/_constants";

export const A_ASYNC_OPERATION_STARTED = "A_AOS";
export const A_ASYNC_OPERATION_CANCELLED = "A_AOC";
export const A_ASYNC_OPERATION_ERROR = "A_AOE";

export const A_CREATE_NEW_TOPIC = "A_CNT";
export const A_SAVE_TOPIC_CHANGES = "A_STC";
export const A_EDIT_TOPIC = "A_ET";
export const A_TOGGLE_EDIT_TOPIC = "A_TET";
export const A_DELETE_TOPIC = "A_DT";
export const A_CHANGE_NEW_TOPIC_NAME  = "A_CNTN";
export const A_CHANGE_NEW_TOPIC_DESCRIPTION   = "A_CNTD";
export const A_CHANGE_NEW_TOPIC_AUTHOR   = "A_CNTA";
export const A_CHANGE_EXISTING_TOPIC_NAME  = "A_CETN";
export const A_CHANGE_EXISTING_TOPIC_DESCRIPTION   = "A_CETD";
export const A_CHANGE_EXISTING_TOPIC_AUTHOR   = "A_CETA";
export const A_GET_TOPICS   = "A_GAT";

export function CreateNewTopic(topicName, topicDescription, topicAuthor)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_ASYNC_OPERATION_STARTED,
        });

        if (!topicName)
        {
            swal("All forum entries need to have a title.\n\nPlease pick one.",
            {
                icon: "error"
            });

            dispatch({
                type: A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }

        if (!topicDescription)
        {
            swal("Without a description there wouldn't be a conversation.\n\nPlease describe the new forum.",
            {
                icon: "error"
            });

            dispatch({
                type: A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }


        if (!topicAuthor)
        {
            swal("Please type in the name of the person to attribute this forum's creation to.",
            {
                icon: "error"
            });

            dispatch({
                type: A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }

        axios.post( Const.API_CREATE_NEW_FORUM, { params: { "title": topicName, "description": topicDescription, "author": topicAuthor} })
        .then(response => 
        {
            const { newForum } = response.data.data

            if (!newForum)
            {
               return dispatch({type: A_ASYNC_OPERATION_ERROR, error: error });
            }
            
            swal("New forum sucessfully created",
            {
                icon: "success"
            });

            return dispatch({
                type: A_CREATE_NEW_TOPIC,
                newTopic: newForum
            });
            
        })
        .catch((error) => {dispatch({type: A_ASYNC_OPERATION_ERROR, error: error })})

    }
}

export function ToggleEditTopic(indexToToggle)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_TOGGLE_EDIT_TOPIC,
            indexToToggle: indexToToggle
        });
    } 
}

export function SaveTopicChanges(topic, arrayIndex)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_ASYNC_OPERATION_STARTED
        });
        
        swal
        ({
            title: "Save Changes?",
            text: "You are about to modify an existing forum.\n\nDo you want to proceed?",
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
                    type: A_ASYNC_OPERATION_CANCELLED,
                });
                return;
            }

            swal('Updating selected forum...',
            {
                icon: "info",
                button: []
            });

            axios.post(Const.API_SAVE_FORUM_CHANGES, { params: { id: topic.id, newName: topic.forumName, newDesc: topic.description, newAuth: topic.author } })
            .then(response => 
            {
                swal("Forum updated successfully.",
                {
                    icon: "success"
                });

                return dispatch({
                    type: A_SAVE_TOPIC_CHANGES,
                    arrayIndex: arrayIndex,
                    newName: topic.forumName,
                    newDesc: topic.description,
                    newAuth: topic.author
                });
            })
            .catch((error) => {dispatch({type: A_ASYNC_OPERATION_ERROR, error: error })})         
        });
    }
}

export function DeleteMessage(idToDelete, indexInArray)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_ASYNC_OPERATION_STARTED
        });
        
        swal
        ({
            title: "Are you sure you want to delete this forum?",
            text: "You are about to delete a forum.\n\nDo you really want to proceed?",
            icon: "info",
            cancelButtonColor: Const.CANCEL_BUTTON_COLOR,
            buttons: ["No, Please Cancel", "Delete Forum"],
        })
        .then((willAttemptToPurchase) => 
        {
            if (!willAttemptToPurchase) 
            {
                swal("Forum was NOT deleted.");
                dispatch({
                    type: A_ASYNC_OPERATION_CANCELLED,
                });
                return;
            }

            swal('Deleting selected forum...',
            {
                icon: "info",
                button: []
            });

            axios.post(Const.API_DELETE_FORUM, { params: { id: idToDelete } })
            .then(response => 
            {
                swal("Forum deleted successfully.",
                {
                    icon: "success"
                });

                return dispatch({
                    type: A_DELETE_TOPIC,
                    indexInArray: indexInArray
                });
            })
            .catch((error) => {dispatch({type: A_ASYNC_OPERATION_ERROR, error: error })})         
        });
    }
}

export function ChangeTopicName(newName)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_NEW_TOPIC_NAME,
            newTopicName: newName
        });
    } 
}

export function ChangeExistingTopicName(arrayIndex, newName)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_EXISTING_TOPIC_NAME,
            newName: newName,
            arrayIndex: arrayIndex
        });
    } 
}

export function ChangeTopicDescription(newDesc)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_NEW_TOPIC_DESCRIPTION,
            newTopicDescription: newDesc
        });
    } 
}

export function ChangeExistingTopicDescription(arrayIndex, newDesc)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_EXISTING_TOPIC_DESCRIPTION,
            newDesc: newDesc,
            arrayIndex: arrayIndex
        });
    } 
}

export function ChangeTopicAuthor(newAuth)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_NEW_TOPIC_AUTHOR,
            newTopicAuthor: newAuth
        });
    } 
}

export function ChangeExistingTopicAuthor(arrayIndex, newAuth)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_EXISTING_TOPIC_AUTHOR,
            arrayIndex: arrayIndex,
            newAuth: newAuth
        });
    } 
}

export function GetAllTopics()
{
    return function(dispatch) 
    {
        dispatch({
            type: A_ASYNC_OPERATION_STARTED
        });
        
        axios.get(Const.API_GET_ALL_FORUMS)
        .then(response => 
        {
            const { allTopics } = response.data.data;
            return dispatch ({
                type: A_GET_TOPICS,
                allTopics: allTopics
            })
        })
        .catch((error) => {dispatch({type: A_ASYNC_OPERATION_ERROR, error: error })})
    }
}

