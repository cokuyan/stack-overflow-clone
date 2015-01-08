class AddDefaultValuesToUsersAnswersAndQuestionsCount < ActiveRecord::Migration
  def change
    change_column :users, :answers_count, :integer, default: 0
    change_column :users, :questions_count, :integer, default: 0
  end
end
