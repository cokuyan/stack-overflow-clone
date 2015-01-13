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
