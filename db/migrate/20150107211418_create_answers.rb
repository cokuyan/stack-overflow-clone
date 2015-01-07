class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :content, null: false
      t.integer :author_id, null: false
      t.integer :question_id, null: false
      t.boolean :accepted, default: false

      t.timestamps
    end
    add_index :answers, [:author_id, :question_id], unique: true
  end
end
