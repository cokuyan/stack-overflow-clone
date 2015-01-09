class Api::QuestionsController < ApplicationController
  def index
    questions = Question.includes(:author).all
    render json: questions
  end

  def show
    @question = Question.includes(:author, answers: :author).find(params[:id])
    @question.view_count += 1
    @question.save!
    render :show
  end

  def create
    question = current_user.questions.new(question_params)
    if question.save
      render json: question
    else
      render json: question.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:title, :content)
  end
end
