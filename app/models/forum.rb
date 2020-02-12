class Forum < ApplicationRecord
    def self.Create(title, desc, auth)
        newForum = create(
            author: auth,
            description: desc,
            forumName:  title
        )
        return newForum;
    end

    def self.Delete(idToDelete)
        toDelete = Forum.where(:id => idToDelete).first;
        toDelete.destroy
    end

    def self.Update(id, title, desc, auth)
        toUpdate = Forum.where(:id => id).first;
        
        toUpdate.author = auth
        toUpdate.forumName = title
        toUpdate.description = desc
        
        toUpdate.save
    end
end
