class VotesController < ApplicationController
  before_action :require_current_user!
  before_action :require_not_author!

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

  def author?
    if vote_params[:votable_type] == 'Answer'
      @votable = Answer.find(vote_params[:votable_id])
    else
      @votable = Question.find(vote_params[:votable_id])
    end

    @votable.author_id == current_user.id
  end

  def require_not_author!
    flash[:notice] = "Cannot vote for own question/answer"
    if author?
      redirect_to question_url(@votable.try(:question_id) || @votable.id)
    end
  end
end
