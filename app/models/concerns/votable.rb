module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable
  end

  def vote_count
    self.votes.select{|vote| vote.vote_type == 'up'}.count -
      self.votes.select{|vote| vote.vote_type == 'down'}.count
  end

end
