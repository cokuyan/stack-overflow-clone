50.times do
  User.create({
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: 'password',
    password_confirmation: 'password',
    activated: true
  })
end

puts "Users initialized"

200.times do
  question = Question.create({
    title: Faker::Lorem.sentence,
    content: Faker::Lorem.paragraph,
    author_id: rand(50) + 1
  })
  10.times do
    question.answers.create({
      content: Faker::Hacker.say_something_smart,
      author_id: rand(50) + 1
    })
  end
end

answer_count = Answer.all.count

100.times do
  question = Question.create({
    title: Faker::Lorem.sentence,
    content: Faker::Lorem.paragraph,
    author_id: rand(50) + 1
  })
  2.times do
    question.answers.create({
      content: Faker::Hacker.say_something_smart,
      author_id: rand(50) + 1
    })
  end
end

puts "Questions and answers initialized"

50.times do
  Tag.create({
    tag_name: Faker::Hacker.noun,
    description: Faker::Lorem.paragraph
  })
end

1000.times do
  Tagging.create({
    tag_id: rand(50) + 1,
    question_id: rand(300) + 1
  })
end

puts "Tags initialized"

2000.times do
  Vote.create({
    user_id: rand(50) + 1,
    votable_id: rand(300) + 1,
    votable_type: "Question",
    vote_type: "up"
  })
end

100.times do
  Vote.create({
    user_id: rand(50) + 1,
    votable_id: rand(300) + 1,
    votable_type: "Question",
    vote_type: 'down'
  })
end

4000.times do
  Vote.create({
    user_id: rand(50) + 1,
    votable_id: rand(answer_count) + 1,
    votable_type: "Answer",
    vote_type: 'up'
  })
end

100.times do
  Vote.create({
    user_id: rand(50) + 1,
    votable_id: rand(answer_count) + 1,
    votable_type: "Answer",
    vote_type: 'down'
  })
end

puts "Votes initialized"

1000.times do
  Comment.create({
    author_id: rand(50) + 1,
    commentable_id: rand(200) + 1,
    commentable_type: "Question",
    content: Faker::Lorem.sentence
  })
end

2000.times do
  Comment.create({
    author_id: rand(50) + 1,
    commentable_id: rand(answer_count) + 1,
    commentable_type: "Answer",
    content: Faker::Lorem.sentence
  })
end

puts "Comments initialized"

1000.times do
  Favorite.create({
    user_id: rand(50) + 1,
    question_id: rand(200) + 1
  })
end

puts "Favorites initialized"
