class CreateForums < ActiveRecord::Migration[6.0]
  def change
    create_table :forums do |t|
      t.string :forumName
      t.text :description
      t.string :author

      t.timestamps
    end
  end
end
