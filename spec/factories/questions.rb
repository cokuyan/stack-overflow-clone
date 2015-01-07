FactoryGirl.define do
  factory :question do
    title Faker::Lorem.sentence
    content Faker::Lorem.paragraph
    author_id 1
  end

end
