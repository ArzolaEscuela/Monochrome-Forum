import axios from 'axios';
import swal from 'sweetalert';

export const A_ASYNC_OPERATION_STARTED = "A_AOS";
export const A_ASYNC_OPERATION_CANCELLED = "A_AOC";
export const A_ASYNC_OPERATION_ERROR = "A_AOE";

export const A_GET_MESSAGES = "A_GETM";
export const A_SENT_MESSAGE = "A_SENDM";
export const A_CHANGE_NAME  = "A_CN";
export const A_CHANGE_TEXT   = "A_CT";

const API_URL = "http://167.71.154.9/messages";

export function ChangeName(newName)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_NAME,
            name: newName
        });
    } 
}

export function ChangeText(newText)
{
    return function(dispatch) 
    {
        dispatch({
            type: A_CHANGE_TEXT,
            text: newText
        });
    } 
}

export function GetMessages()
{
    return function(dispatch) 
    {
        dispatch({
            type: A_ASYNC_OPERATION_STARTED,
        });
        
        axios.get(API_URL)
        .then(response => 
        {
            dispatch ({
                type: A_GET_MESSAGES,
                allMessages: response.data
            })
        })
        .catch((error) => {dispatch({type: A_ASYNC_OPERATION_ERROR, error: error })})
    } 
}

export function SendMessage(name, text)
{   
    return function(dispatch) 
    {
        dispatch({
            type: A_ASYNC_OPERATION_STARTED,
        });


        if (!name)
        {
            swal("As much as I would like to empower your anonymity, I still need you to have a name to go with your message.\n\nPlease pick a name.",
            {
                icon: "error"
            });

            dispatch({
                type: A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }

        if (!text)
        {
            swal("I understand socializing can be hard, but if you join a chat at least have the decency to write a message to show.",
            {
                icon: "error"
            });

            dispatch({
                type: A_ASYNC_OPERATION_CANCELLED,
            });
            return;
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        };

        axios.post( API_URL, { "name": name, "text": text}, config)
        .then(response => 
        {
            const newMessage = { name: name, text: text }
            
            dispatch({
                type: A_SENT_MESSAGE,
                newMessage: newMessage
            });

            return dispatch(GetMessages());
        })
        .catch((error) => {dispatch({type: A_ASYNC_OPERATION_ERROR, error: error })})
    } 
}