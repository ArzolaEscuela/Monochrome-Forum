class ApiController < ApplicationController    
    include Constants
    include ActionController::MimeResponds

    def get_all_forums
        allForums =  Forum.find_each
        
        render json: { status: 'SUCCESS', message: 'Fetched all forums.', 
          data: { allTopics: allForums } }, status: :ok 
    end

end