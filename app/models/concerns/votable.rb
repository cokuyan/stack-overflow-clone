module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable
  end

  def set_vote!(vote_type)
    self.vote_count += vote_type == 'up' ? 1 : -1
    self.save!
  end
end
