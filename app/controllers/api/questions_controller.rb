class Api::QuestionsController < ApplicationController
  def index
    questions = Question.includes(:author).all
    render json: questions
  end

  def show
    @question = Question.includes(:author, :tags, answers: :author)
      .find(params[:id])
    @question.view_count += 1
    @question.save!
    render :show
  end

  def create
    question = current_user.questions.new(question_params)
    if question.save
      question.tag_ids = params[:tag_ids]
      render json: question
    else
      render json: question.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    question = current_user.questions.find(params[:id])
    if question.update(question_params)
      render json: question
    else
      render json: question.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:title, :content, :answered)
  end
end
