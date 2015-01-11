class Answer < ActiveRecord::Base
  include Votable

  validates :content, :author_id, :question_id, presence: true
  validates :accepted, inclusion: [true, false]
  validates :author_id, uniqueness: { scope: :question_id }
  validate :cannot_answer_own_question

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id,
    inverse_of: :answers,
    counter_cache: true

  belongs_to :question, inverse_of: :answers, counter_cache: true

  after_initialize :ensure_accepted, :ensure_vote_count

  private

  def cannot_answer_own_question
    if self.author_id == self.question.author_id
      errors.add(:author, "cannot answer own question")
    end
  end

  def ensure_accepted
    self.accepted ||= false
  end

  def ensure_vote_count
    self.vote_count ||= 0
  end
end
