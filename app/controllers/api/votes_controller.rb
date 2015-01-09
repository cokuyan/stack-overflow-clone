class Api::VotesController < ApplicationController
  def create
    vote = current_user.votes.new(vote_params)
    if vote.save
      votable = vote.votable_type.constantize.find(vote.votable_id)
      votable.set_vote!(vote.vote_type)
      render json: votable
    else
      render json: vote.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:votable_id, :votable_type, :vote_type)
  end
end
