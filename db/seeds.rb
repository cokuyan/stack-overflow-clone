50.times do
  User.create({
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: 'password',
    password_confirmation: 'password',
    activated: true
  })
end

100.times do
  question = Question.create({
    title: Faker::Lorem.sentence,
    content: Faker::Lorem.paragraph,
    author_id: rand(10) + 1
  })
  5.times do
    question.answers.create({
      content: Faker::Hacker.say_something_smart,
      author_id: rand(10) + 1
    })
  end
end

20.times do
  Tag.create({
    tag_name: Faker::Hacker.noun,
    description: Faker::Lorem.paragraph
  })
end

500.times do
  Tagging.create({
    tag_id: rand(20) + 1,
    question_id: rand(100) + 1
  })
end
