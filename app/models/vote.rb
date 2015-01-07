class Vote < ActiveRecord::Base
  validates :user_id, :votable_id, :votable_type, null: false
  validates :vote_type, inclusion: ['up', 'down']
  validates :user_id, uniqueness: { scope: [:votable_id, :votable_type] }
  # try with just votable
  belongs_to :user
  belongs_to :votable, polymorphic: true
end
