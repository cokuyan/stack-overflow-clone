class Vote < ActiveRecord::Base
  validates :user_id, :votable_id, :votable_type, presence: true
  validates :vote_type, inclusion: ['up', 'down']
  validates :user_id, uniqueness: { scope: [:votable_type, :votable_id] }
  validate :cannot_vote_for_own_votable

  belongs_to :user
  belongs_to :votable, polymorphic: true

  private

  def cannot_vote_for_own_votable
    if self.user_id == self.votable.author_id
      errors.add(:user, "cannot vote for own #{self.votable_type.downcase}")
    end
  end

end
