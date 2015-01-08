class VotesController < ApplicationController
  before_action :require_current_user!

  def create
    vote = Vote.new(vote_params)
    vote.user_id = current_user.id
    if vote.save
      flash[:notice] = "Voted successfully"
    else
      flash[:notice] = vote.errors.full_messages
    end

    # find a better way....
    # check if you can search history
    if vote.votable_type == 'Question'
      redirect_to question_url(vote.votable_id)
    else
      question_id = Answer.find(vote.votable_id).question_id
      redirect_to question_url(question_id)
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:votable_id, :votable_type, :vote_type)
  end
end
