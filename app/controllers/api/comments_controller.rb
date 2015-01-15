class Api::CommentsController < ApplicationController
  def show
    @comment = comment.includes(:author).find(params[:id])
  end

  def create
    unless logged_in?
      render json: "must be logged in", status: :unprocessable_entity
      return
    end
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.includes(:author).find(params[:id])
    if @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :commentable_id, :commentable_type)
  end
end
