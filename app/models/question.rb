class Question < ActiveRecord::Base
  validates :title, :content, :author_id, :view_count, presence: true
  validates :answered, inclusion: [true, false]
  after_initialize :ensure_view_count, :ensure_answered

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :questions

  has_many :answers, inverse_of: :question

  has_many :votes, as: :votable

  def vote_count
    self.votes.where(vote_type: 'up').count -
      self.votes.where(vote_type: 'down').count
  end

  private

  def ensure_view_count
    self.view_count ||= 0
  end

  def ensure_answered
    self.answered ||= false
  end
end
