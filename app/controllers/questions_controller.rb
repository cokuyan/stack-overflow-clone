class QuestionsController < ApplicationController
  before_action :require_current_user!, only: [:new, :create]
  before_action :require_correct_user!, only: [:edit, :update, :destroy]

  def index
    @questions = Question.all
  end

  def show
    @question = Question.includes(:author, answers: :author).find(params[:id])
    @question.view_count += 1
    @question.save!
  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
    @question.author_id = current_user.id
    if @question.save
      flash[:notice] = "Question added successfully"
      redirect_to question_url(@question)
    else
      flash.now[:errors] = @question.errors.full_messages
      render :new
    end
  end

  def edit
    @question = Question.find(params[:id])
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      flash[:notice] = "Question edited successfully"
      redirect_to question_url(@question)
    else
      flash.now[:errors] = @question.errors.full_messages
      @question = Question.find(params[:id])
      render :edit
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    flash[:notice] = "Question deleted successfully"
    redirect_to root_url
  end

  private

  def question_params
    params.require(:question).permit(:title, :content)
  end

  def require_correct_user!
    @question = Question.find(params[:id])
    unless logged_in? && current_user.id == @question.author_id
      redirect_to question_url(@question)
    end
  end
end
