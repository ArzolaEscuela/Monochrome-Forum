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
    
        puts '---------------------'
        puts idToDelete

        Forum.Delete(idToDelete)

        return render json: { status: 'SUCCESS', message: 'Successfully deleted forum.', 
            data: { } }, status: :ok
    end
end