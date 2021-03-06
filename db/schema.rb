# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150115225031) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: true do |t|
    t.text     "content",                        null: false
    t.integer  "author_id",                      null: false
    t.integer  "question_id",                    null: false
    t.boolean  "accepted",       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "vote_count",     default: 0
    t.integer  "comments_count", default: 0
  end

  add_index "answers", ["author_id", "question_id"], name: "index_answers_on_author_id_and_question_id", unique: true, using: :btree

  create_table "comments", force: true do |t|
    t.text     "content",          null: false
    t.integer  "author_id",        null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree

  create_table "favorites", force: true do |t|
    t.integer  "user_id",     null: false
    t.integer  "question_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "favorites", ["user_id", "question_id"], name: "index_favorites_on_user_id_and_question_id", unique: true, using: :btree

  create_table "questions", force: true do |t|
    t.string   "title",                          null: false
    t.text     "content",                        null: false
    t.integer  "author_id",                      null: false
    t.integer  "view_count",     default: 0,     null: false
    t.boolean  "answered",       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "answers_count",  default: 0
    t.integer  "vote_count",     default: 0
    t.integer  "comments_count", default: 0
  end

  add_index "questions", ["author_id"], name: "index_questions_on_author_id", using: :btree

  create_table "taggings", force: true do |t|
    t.integer  "tag_id",      null: false
    t.integer  "question_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["tag_id", "question_id"], name: "index_taggings_on_tag_id_and_question_id", unique: true, using: :btree

  create_table "tags", force: true do |t|
    t.string   "tag_name",                    null: false
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "questions_count", default: 0
  end

  add_index "tags", ["tag_name"], name: "index_tags_on_tag_name", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username",                           null: false
    t.string   "email",                              null: false
    t.string   "password_digest",                    null: false
    t.string   "session_token",                      null: false
    t.string   "activation_token",                   null: false
    t.boolean  "activated",          default: false
    t.boolean  "admin",              default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "answers_count",      default: 0
    t.integer  "questions_count",    default: 0
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "comments_count",     default: 0
  end

  add_index "users", ["activation_token"], name: "index_users_on_activation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: true do |t|
    t.string   "vote_type",    null: false
    t.integer  "user_id",      null: false
    t.integer  "votable_id",   null: false
    t.string   "votable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["user_id", "votable_id", "votable_type"], name: "index_votes_on_user_id_and_votable_id_and_votable_type", unique: true, using: :btree

end
