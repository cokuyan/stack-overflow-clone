FactoryGirl.define do
  factory :answer do
    content Faker::Lorem.paragraph
    author_id 1
    question_id 1
  end

end
