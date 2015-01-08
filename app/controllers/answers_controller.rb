class AnswersController < ApplicationController
  before_action :require_current_user!, only: [:new, :create]
  before_action :require_correct_user!, only: [:edit, :update, :destroy]
  before_action :require_correct_asker!, only: :accept

  def new
    @answer = Answer.new(question_id: params[:question_id])
  end

  def create
    @answer = Answer.new(answer_params)
    @answer.author_id = current_user.id
    if @answer.save
      flash[:notice] = "Question added successfully"
      redirect_to question_url(@answer.question_id)
    else
      flash.now[:errors] = @answer.errors.full_messages
      render :new
    end
  end

  def edit
    @answer = Answer.find(params[:id])
  end

  def update
    @answer = Answer.find(params[:id])
    if @answer.update(answer_params)
      flash[:notice] = "Answer edited successfully"
      redirect_to question_url(@answer.question_id)
    else
      flash.now[:errors] = @answer.errors.full_messages
      @answer = Answer.find(params[:id])
      render :edit
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy
    flash[:notice] = "Answer deleted successfully"
    redirect_to root_url
  end

  def accept
    answer = Answer.includes(:question).find(params[:id])
    answer.toggle(:accepted).save!
    answer.question.toggle(:answered).save!
    flash[:notice] = "Answer accepted successfully"
    redirect_to question_url(answer.question)
  end

  private

  def answer_params
    params.require(:answer).permit(:content, :question_id)
  end

  def correct_user?
    @answer = Answer.find(params[:id])
    logged_in? && current_user.id == @answer.author_id
  end

  def require_correct_user!
    redirect_to question_url(@answer.question_id) unless correct_user?
  end

  def require_correct_asker!
    answer = Answer.includes(:question).find(params[:id])
    redirect_to question_url(answer.question) unless answer.question.author_id == current_user.id
  end

end
