FactoryGirl.define do
  factory :vote do
    vote_type 'up'
    user_id 1
    votable_id 1
    votable_type 'Question'

    factory :down_vote do
      vote_type 'down'
      user_id 2
      votable_id 2
      votable_type 'Answer'
    end
  end
end
