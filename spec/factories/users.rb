FactoryGirl.define do
  factory :user do
    username Faker::Internet.user_name
    email Faker::Internet.email
    password 'password'

    factory :activated_user do
      activated true
    end

    factory :admin do
      admin true
    end
  end

end
