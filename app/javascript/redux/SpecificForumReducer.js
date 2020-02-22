import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Actions from './ActionConstants';
import swal from 'sweetalert';
import _ from 'lodash';

const initialState = 
{
    isLoading: true,

    allComments: [],
    editCommenntStates: [],
    commentEditState: [],

    changes: 0
}

function rootReducer(currentState, action) 
{
    console.log(`action: ${action.type}`)
    switch(action.type)
    {
        case Actions.A_CREATE_NEW_COMMENT:
                currentState.allComments.push(action.newComment);
                currentState.editCommentStates.push(action.newComment);
                currentState.commentEditState.push(false); 
                currentState.changes++; 
            break;
        case Actions.A_TOGGLE_EDIT_COMMENT:
                currentState.commentEditState[action.indexToToggle] = !currentState.commentEditState[action.indexToToggle];
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_SAVE_COMMENT_CHANGES:
                currentState.allComments[action.arrayIndex]['contents'] = action.newComment;  
                currentState.allComments[action.arrayIndex]['author'] = action.newAuth;
                currentState.commentEditState[action.arrayIndex] = false;
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_DELETE_COMMENT:
                currentState.allComments.splice([action.indexInArray],1);  
                currentState.editCommentStates.splice([action.indexInArray],1);  
                currentState.commentEditState.splice([action.indexInArray],1); 
                currentState.changes++; // For some reason, splice doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_CHANGE_EXISTING_COMMENT:
                currentState.editCommentStates[action.arrayIndex]['comment'] = action.newComment;  
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_CHANGE_EXISTING_COMMENT_AUTHOR:
                currentState.editCommentStates[action.arrayIndex]['author'] = action.newAuth;  
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_GET_COMMENTS:
            currentState.allComments = action.allComments; 
            currentState.editCommentStates = _.cloneDeep(action.allComments); // Clone array by value
            currentState.commentEditState = action.allComments.map(() => false);
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

export default function CommentListAppReducer() {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    return store;
}