class Comment < ApplicationRecord
    def self.Create(title, desc, parentForumID)
        newComment = create(
            author: auth,
            contents: desc,
            forums_id:  parentForumID
        )
        return newComment;
    end

    def self.Delete(idToDelete)
        toDelete = Comment.where(:id => idToDelete).first;
        toDelete.destroy
    end

    def self.Update(id, auth, desc)
        toUpdate = Comment.where(:id => id).first;
        
        toUpdate.author = auth
        toUpdate.contents = desc
        
        toUpdate.save
    end
end
