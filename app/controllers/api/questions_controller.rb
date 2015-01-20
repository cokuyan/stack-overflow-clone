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
    question = current_user.try(:questions).try(:where, { id: params[:id] }).try(:first)
    if question.nil?
      question = Question.find(params[:id])
      question.view_count = params[:question][:view_count]
      question.save!
      render json: question
      return
    end
    if question.update(question_params)
      render json: question
    else
      render json: question.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    question = current_user.questions.find(params[:id])
    if question.vote_count < 1
      question.destroy
      render json: question
    else
      render json: "Cannot delete question", status: :unprocessable_entity
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
    unless logged_in?
      render json: "must be logged in to favorite", status: :unprocessable_entity
      return
    end
    Favorite.create!(user_id: current_user.id, question_id: params[:id])
    render json: Question.find(params[:id])
  end

  def unfavorite
    favorite = Favorite.find_by(user_id: current_user.id, question_id: params[:id])
    favorite.destroy()
    render json: Question.find(params[:id])
  end

  private

  def question_params
    params.require(:question).permit(:title, :content, :answered, :view_count)
  end
end
