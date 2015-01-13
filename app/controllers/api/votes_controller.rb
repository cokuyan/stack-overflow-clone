class Api::VotesController < ApplicationController
  def create
    unless logged_in?
      render json: "must be logged in to vote", status: :unprocessable_entity
      return
    end
    vote = current_user.votes.new(vote_params)
    # TODO: allow checking for undoing or resetting votes until a certain time
    if vote.save
      votable = vote.votable_type.constantize.find(vote.votable_id)
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
