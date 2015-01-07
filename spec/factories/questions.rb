FactoryGirl.define do
  factory :question do
    content Faker::Lorem.sentence
    author_id 1
  end

end
