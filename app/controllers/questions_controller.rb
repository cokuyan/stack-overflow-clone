class QuestionsController < ApplicationController
  def index
    if @user_id = params[:user_id]
      @questions = Question.where(user_id: @user_id)
    else
      @questions = Question.all
    end
  end

  def show
    @question = Question.find(params[:id])
  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
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
    params.require(:question).permit(:content)
  end
end
