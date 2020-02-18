class ApiController < ApplicationController    

    include Constants
    include ActionController::MimeResponds

    skip_before_action :verify_authenticity_token

    def get_all_forums
        allForums =  Forum.find_each
        
        render json: { status: 'SUCCESS', message: 'Fetched all forums.', 
          data: { allTopics: allForums } }, status: :ok 
    end

    def create_new_forum          
        title = request['params']['title']
        description = request['params']['description']
        author = request['params']['author']

        newEntry = Forum.Create(title, description, author)

        return render json: { status: 'SUCCESS', message: 'Created new forum successfully.', 
            data: { newForum: newEntry } }, status: :ok        
    end

    def delete_forum
        idToDelete = request['params']['id']
    
        Forum.Delete(idToDelete)

        return render json: { status: 'SUCCESS', message: 'Successfully deleted forum.', 
            data: { } }, status: :ok
    end

    def save_forum_changes
        id = request['params']['id']
        newName = request['params']['newName']
        newDesc = request['params']['newDesc']
        newAuth = request['params']['newAuth']

        Forum.Update(id, newName, newDesc, newAuth)

        return render json: { status: 'SUCCESS', message: 'Forum updated successfully.', 
            data: { } }, status: :ok
    end

    def get_specific_forum
        forumId = request.query_parameters['id']
        forum = Forum.find(forumId)
        render json: { status: 'SUCCESS', message: "Fetched forum #{forumId}.", 
          data: { selectedForum: forum } }, status: :ok 
    end

    def get_forum_comments
        forumId = request.query_parameters['id']
        comments = Comment.where(:forums_id=> forumId)
        render json: { status: 'SUCCESS', message: "Fetched comments from forum #{forumId}.", 
          data: { allComments: comments } }, status: :ok 
    end

    def create_new_comment
        forumId = request['params']['forumId']
        author = request['params']['authorName']
        comment = request['params']['comment']

        newComment = Comment.Create(author, comment, forumId)

        return render json: { status: 'SUCCESS', message: 'Created new comment successfully.', 
            data: { newComment: newComment } }, status: :ok 
    end

    def delete_comment
        commentId = request['params']['id']
        Comment.Delete(commentId)

        return render json: { status: 'SUCCESS', message: 'Successfully deleted comment.', 
            data: { } }, status: :ok
    end
end