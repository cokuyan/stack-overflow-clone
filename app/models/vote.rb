class Vote < ActiveRecord::Base
  validates :user_id, :votable_id, :votable_type, presence: true
  validates :vote_type, inclusion: ['up', 'down']
  validates :user_id, uniqueness: { scope: [:votable_type, :votable_id] }
  # try with just votable <-- doesn't seem to work with specs
  belongs_to :user
  belongs_to :votable, polymorphic: true
end
