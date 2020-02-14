import axios from 'axios';
import swal from 'sweetalert';
import * as Const from "../../../config/_constants";

export const A_ASYNC_OPERATION_STARTED = "A_AOS";
export const A_ASYNC_OPERATION_CANCELLED = "A_AOC";
export const A_ASYNC_OPERATION_ERROR = "A_AOE";

export const A_CREATE_NEW_TOPIC = "A_CNT";
export const A_EDIT_TOPIC = "A_ET";
export const A_DELETE_TOPIC = "A_DT";
export const A_CHANGE_NEW_TOPIC_NAME  = "A_CNTN";
export const A_CHANGE_NEW_TOPIC_DESCRIPTION   = "A_CNTD";
export const A_CHANGE_NEW_TOPIC_AUTHOR   = "A_CNTA";
export const A_GET_TOPICS   = "A_GAT";

export function CreateNewTopic(topicName, topicDescription, topicAuthor)
{
    
}

export function EditTopic(idToEdit)
{

}

export function DeleteMessage(idToDelete, indexInArray)
{
    
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

