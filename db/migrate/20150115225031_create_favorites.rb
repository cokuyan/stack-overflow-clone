class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :question_id, null: false

      t.timestamps
    end
    add_index :favorites, [:user_id, :question_id], unique: true
  end
end
