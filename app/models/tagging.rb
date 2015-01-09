class Tagging < ActiveRecord::Base
  validates :tag_id, :question_id, presence: true
  validates :tag_id, uniqueness: { scope: :question_id }

  belongs_to :tag
  belongs_to :question
end
