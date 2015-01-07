class Answer < ActiveRecord::Base
  validates :content, :author_id, :question_id, presence: true
  validates :accepted, inclusion: [true, false]
  validates :author_id, uniqueness: { scope: :question_id }

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id,
    inverse_of: :answers

  belongs_to :question, inverse_of: :answers

  has_many :votes, as: :votable

  def vote_count
    self.votes.where(vote_type: 'up').count - self.votes.where(vote_type: 'down').count
  end

end
