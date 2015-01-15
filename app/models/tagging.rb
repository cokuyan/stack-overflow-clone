class Tagging < ActiveRecord::Base
  validates :tag_id, :question_id, presence: true
  validates :tag_id, uniqueness: { scope: :question_id }

  belongs_to :tag, counter_cache: :questions_count
  belongs_to :question, inverse_of: :taggings
end
