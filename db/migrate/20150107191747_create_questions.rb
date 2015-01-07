class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.integer :author_id, null: false
      t.integer :view_count, null: false, default: 0
      t.boolean :answered, default: false

      t.timestamps
    end
    add_index :questions, :author_id
  end
end
