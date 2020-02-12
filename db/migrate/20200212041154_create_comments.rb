class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :author
      t.text :contents
      t.references :forums, null: false, foreign_key: true

      t.timestamps
    end
  end
end
