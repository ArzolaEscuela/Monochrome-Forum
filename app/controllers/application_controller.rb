class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    protected

    def all_forums
        Forum.find_each
    end

    def selected_forum
        $selected_forum = Forum.find_by(:id => selected_forum_id)
    end
    
    def selected_forum_id
        # if a valid value already exists use that one instead
        value = $selected_forum_id.to_i
        if (value != nil) && value > 0
            return $selected_forum_id;
        end

        targetForum = Forum.first

        if targetForum == nil
            return -1
        end

        $selected_forum_id = targetForum.id
    end

    def comments_from_forum
        Comment.where(:forums_id => selected_forum_id)
    end

    def comment_to_edit_id
        # Initialize if needed
        value = $comment_to_edit_id.to_i
        if (value == nil) || value <= 0
            $comment_to_edit_id = 1
        end

        currentTarget = Comment.where(:id => comment_to_edit_id).first
        if currentTarget == nil || currentTarget.forums_id != selected_forum_id
            $comment_to_edit_id = Comment.where(:forums_id => selected_forum_id).first.id
        end

        return $comment_to_edit_id
    end

    def comment_to_edit
        $comment_to_edit = Comment.find_by(:id => comment_to_edit_id)
    end

    helper_method :all_forums, :selected_forum_id, :comments_from_forum, :comment_to_edit_id, :selected_forum, :comment_to_edit
end
