class Question < ActiveRecord::Base
  include Votable

  validates :title, :content, :author_id, :view_count, presence: true
  validates :answered, inclusion: [true, false]
  after_initialize :ensure_view_count, :ensure_answered, :ensure_vote_count

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id,
    inverse_of: :questions,
    counter_cache: true

  has_many :answers, inverse_of: :question, dependent: :destroy

  has_many :taggings, dependent: :destroy, inverse_of: :question
  has_many :tags, through: :taggings

  has_many :comments, as: :commentable, dependent: :destroy

  has_many :favorites, dependent: :destroy
  has_many :favoriters, through: :favorites, source: :user

  def self.unanswered
    subquery = <<-SQL
      SELECT
      answers.question_id
      FROM
      answers
      WHERE
      answers.vote_count > 0
    SQL
    Question
      .joins("JOIN questions AS not_answered_questions ON questions.id = not_answered_questions.id")
      .joins("JOIN questions AS bad_answered_questions ON questions.id = bad_answered_questions.id")
      .where(answered: false)
      .where("not_answered_questions.answers_count = 0 OR bad_answered_questions.id NOT IN (#{subquery})")
      .distinct
  end

  private

  def ensure_view_count
    self.view_count ||= 0
  end

  def ensure_answered
    self.answered ||= false
  end

  def ensure_vote_count
    self.vote_count ||= 0
  end
end
