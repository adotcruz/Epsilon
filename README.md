# Epsilon
# Inspiration
As college students, we have very busy lives and often need a calendar management system like Google Calendar. Whenever a new task comes up, we must manually go to our calendar and find an empty slot. We felt this could be done even more efficiently by building an application which found those empty times for you.

# What it does
Epsilon connects to your Google Calendar account to access all events you have scheduled. A user can then specify a new event which has arisen, along with information about how long it will be when and when it needs to be done by. The app will then find an open time in the calendar that the event can be scheduled to.

# How We built it
We built the front-end of the app using Bootstrap. The actual algorithm was implemented in javascript. AngularJS was used to connect the front-end UI and backend logic.

# Challenges We ran into
The original algorithm was implemented in Python. We initially tried to connect the Javascript through an AJAX interface. However, this was deemed not feasible after some time, so the algorithm was rewritten in Javascript. There were also some issues dealing with asynchronous calls to the Google Calendar API.

# Accomplishments that we're proud ofsdasd
Getting a working app in 36 hours.

# What we learned
Google Calendar API, building any application is hard; it requires a lot of thought and effort on everyone's part.

# What's next for Epsilon
Extending functionality, such as supporting multiple events to be added at once, inserting recommended event into user's calendar.
