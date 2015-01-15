class Api::QuestionsController < ApplicationController
  def index
    @questions = Question
                  .includes(:author, :tags)
                  .order((params[:sort] || "created_at") => :desc)
                  .page(params[:page])
    render :index
  end

  def show
    @question = Question
      .includes(:author, :tags, answers: [:author, comments: :author], comments: :author)
      .find(params[:id])
    @question.view_count += 1
    @question.save!
    render :show
  end

  def create
    question = current_user.questions.new(question_params)
    if question.save
      question.tag_ids = params[:question][:tag_ids]
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

  def unanswered
    @questions = Question
      .unanswered
      .includes(:author, :tags)
      .order((params[:sort] || "created_at") => :desc)
      .page(params[:page])
    render :index
  end

  def favorite
    Favorite.create!(user_id: current_user.id, question_id: params[:id])
    render json: Question.find(params[:id])
  end

  private

  def question_params
    params.require(:question).permit(:title, :content, :answered)
  end
end
