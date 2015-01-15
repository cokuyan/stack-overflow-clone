class Favorite < ActiveRecord::Base
  validates :user_id, :question_id, presence: true
  validates :user_id, uniqueness: { scope: :question_id }

  belongs_to :user, dependent: :destroy
  belongs_to :question, dependent: :destroy
end
