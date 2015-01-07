Stack Overflow Clone
===
This will be my final project for App Academy. It will be a clone of the site Stack Overflow. Below is a general list of features I will most likely implement along with the following database schema.

Feature List
-----
- user auth
- email activation
- users post question
- users post answers to questions
- users accept answers to their questions
- users vote up/down questions and answers that are not their own

------------------------------------------------------------------
- users tag questions they ask
- tag show page lists all questions associated with it
- users comment on questions and answers
- sort questions based on time created, number of votes, answered/unanswered
- sort users based on username, time created, number of answers
- add dynamic search to users
- sort tags based on tag name, time created, number of questions
- add dynamic search to tags
- dynamically search for tags when tagging a question
- questions have a view count
- users favorite questions
- users have reputation
- sort users and questions by other parameters
- users can earn badges
- users can suggest edit to questions and answers
- users can accept edits to own questions and answers
- limit features based on reputation

Schema
-----

### Table: Users
name | type | null | other
--- | --- | --- | ---
username | string | null: false | unique
email | string | null: false | unique
password_digest | string | null: false | unique
session_token | string | null: false | unique
activation_token | string | null: false | unique
activated | boolean |  | default: false
admin | boolean |  | default: false

### Table: Questions
name | type | null | other
--- | --- | --- | ---
title | string | null: false |
content | text | null: false |
author_id | integer | null: false | indexed
view_count | integer | null: false | default: 0
answered | boolean | null: false | default: false

### Table: Answers
name | type | null | other
--- | --- | --- | ---
content | text | null: false |
author_id | integer | null: false | unique+
question_id | integer | null: false | unique+
accepted | boolean |  | default: false

### Table: Tags
name | type | null | other
--- | --- | --- | ---
tag_name | string | null: false | unique
desciption | text | null: true<sup>\*</sup> |
\* unsure about this

### Table: Taggings
name | type | null | other
--- | --- | --- | ---
tag_id | integer | null: false | unique+
question_id | integer | null: true | unique+

### Table: Comments
name | type | null | other
--- | --- | --- | ---
content | string | null: false |
author_id | integer | null: false | indexed
commentable_id | integer | null: false | indexed
commentable_type | string | null: false |

### Table: Votes
name | type | null | other
--- | --- | --- | ---
vote_type | string | null: false |
user_id | integer | null: false | unique+
votable_id | integer | null: false | unique+
votable_type | string | null: false |
