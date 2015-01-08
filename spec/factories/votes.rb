FactoryGirl.define do
  factory :vote do
    vote_type 'up'
    user_id 1
    votable_id 1
    votable_type 'Question'

    factory :question_vote do
      user_id 2
      votable_id 2
      votable_type 'Question'
    end

    factory :answer_vote do
      user_id 2
      votable_id 2
      votable_type 'Answer'
    end
  end
end
