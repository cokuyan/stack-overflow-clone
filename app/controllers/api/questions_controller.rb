class Api::QuestionsController < ApplicationController
  def index
    render json: Question.all
  end

  def show
    question = Question.find(params[:id])
    question.view_count += 1
    question.save!
    render json: question
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
