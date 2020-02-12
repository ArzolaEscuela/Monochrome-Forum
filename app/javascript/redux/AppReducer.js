import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Actions from './AppActions';
import swal from 'sweetalert';

const initialState = 
{
    isLoading: true,

    allMessages: [],
    name: "",
    text: ""
}

function rootReducer(currentState, action) 
{
    switch(action.type)
    {
        case Actions.A_SENT_MESSAGE:
            const { newMessage } = action
            currentState.allMessages.push(newMessage);
            currentState.text = "";
            break;
        case Actions.A_CHANGE_NAME:
                currentState.name = action.name;  
            break;
        case Actions.A_CHANGE_TEXT:
                currentState.text = action.text;  
            break;
        case Actions.A_GET_MESSAGES:
            currentState.allMessages = action.allMessages;  
            break;
        case Actions.A_ASYNC_OPERATION_CANCELLED:
            // We only need to clean the isLoading flag, which is done outside the switch.
            break;
        case Actions.A_ASYNC_OPERATION_ERROR:
            swal('An error has ocurred performing this operation.',
            {
                icon: "error"
            });
            break;
        case Actions.A_ASYNC_OPERATION_STARTED:
            return {
                ...currentState,
                isLoading: true
            };
        default:
            return currentState;    
    }

    return {
        ...currentState,
        isLoading: false
    }
}

export default function AppReducer() {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    return store;
}