class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :activation_token, null: false
      t.boolean :activated, default: false
      t.boolean :admin, default: false

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :password_digest, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, :activation_token, unique: true
  end
end
