class PagesController < ApplicationController

  def home
  end

  def forum
    forumId = request.query_parameters['id']
    forum = Forum.find(forumId)
    comments = Comment.find_by forums_id: forumId
    # render json: { status: 'SUCCESS', message: "Fetched forum #{forumId}.", 
    #   data: { selected_forum: forum } }, status: :ok 
  end
end