class Answer < ActiveRecord::Base
  include Votable

  validates :content, :author_id, :question_id, presence: true
  validates :accepted, inclusion: [true, false]
  validates :author_id, uniqueness: { scope: :question_id }

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id,
    inverse_of: :answers

  belongs_to :question, inverse_of: :answers

end
