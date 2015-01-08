class AddCounterCacheToTables < ActiveRecord::Migration
  def change
    add_column :users, :answers_count, :integer
    add_column :users, :questions_count, :integer
    add_column :questions, :answers_count, :integer
  end
end
