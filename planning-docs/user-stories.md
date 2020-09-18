
# FUNCTIONALITY

Option 7: Resource Wall
Pinterest for learners.

Allow learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user.

# RESOURCE WALL USER STORIES 

*** all users are logged in *** 

- As a user (guest or logged in), I can see a home page with popular boards;
- As a logged-in user, I can see a list of MyBoards, because I can click a board to view its content; 
- As a user, I can categorize resources into a board under a particular topic 
- As a user, on the MyBoards page, I see a side bar of 'liked resources' 
- As a user, I can see another user's MyBoards page because I click these to view the resources contained within 
- As a logged in user, I can write comments about individual resources, because I have permission
- As a logged in user, I can rate individual resources, because I have permission
- As a logged in user, I can create boards, because I have permission
- As a logged in user, I can post resources within boards, because I have permission

# Pages/routes

- 2/3 page app 
1. main home page where all users see popular boards (also where you log in);
2. MyBoards page, shows user's boards and liked resources (this is where users create new boards and add resources to existing boards)
3. Update profile page ????? 

# Database and entities

- Users table - id PK, name, email, passHash
- Resources - id PK, board_id, title, url, description, tag(s), picture/video, owner_id FK (userID), comments_id FK (commentid), like_count
- Comments - id PK, author_id FK (userid), text, resource_id FK (resources_id), date posted, like_count (stretch - up/downvote)
- boards - id PK, owner_id FK (userId), resource_id FK (resources_id), title, description, like_count, category_id FK (categories_id)
- Categories - id PK, title, 


