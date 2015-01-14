class Comment < ActiveRecord::Base
  validates :content, :author_id, :commentable_id, :commentable_type, presence: :true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id,
    inverse_of: :comments
  
  belongs_to :commentable, polymorphic: true
end
