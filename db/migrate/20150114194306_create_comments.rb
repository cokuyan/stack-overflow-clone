class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content, null: false
      t.integer :author_id, null: false
      t.integer :commentable_id, null: false
      t.string :commentable_type, null: false

      t.timestamps
    end
    add_index :comments, :author_id
    add_index :comments, :commentable_id
    add_column :users, :comments_count, :integer, default: 0
    add_column :questions, :comments_count, :integer, default: 0
    add_column :answers, :comments_count, :integer, default: 0
  end
end
