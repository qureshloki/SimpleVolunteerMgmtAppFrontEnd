#### Description:

This is the ReactJs UI for a simple mobile responsive web application to create and search for volunteering opportunities.

This was coded as part of an interview assignment.

#### Given Requirements:

Build a simple mobile responsive web app that allows the user to do the following:

1. Create a volunteering opportunity. Suggested fields: email, opportunity title, opportunity
   description, location (includes city-area/address), day/time (from-to/specific day, no. of
   hours/day)
2. Discover volunteering opportunities in the most intuitive way.
3. [Bonus] Sign up for a particular opportunity they’re interested in. Suggested fields: Email,
   Mobile, Time commitment, a short note about why they want to volunteer and/or any
   previous volunteering experience.
4. [Bonus] Get an email if any user signs up for an opportunity created by him/her, which
   includes all details filled by the volunteering candidate.

#### Deployment:

1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

2. Make sure backend app is deployed and running (Refer the ql_volunteer_app_be repository).

3. Before building/running the app, set the environment variables.

   1. REACT_APP_API_URL must be set to the backend app api's url.

   Note: You can set environment variables directly in the shell or edit src/.env.production or src/.env.development files & set the REACT_APP_API_URL variable there.

4. Build/run the app using "npm run build"/"npm start" in the application root folder.

5. Access the app at http://localhost:3000 or whatever port it was started on.

6. An admin/staff user has been created in the mongo db database with credentials: "username" : "staff", "password" : "staff"

7. Heroku Deployment Url: https://ql-simple-volunteer-mgmt-fe.herokuapp.com/

#### Implementation:

The following functionality is implemented:

1. View and search volunteering opportunities based on certain criteria.
2. Sort opportunities along with pagination.
3. Apply for opportunities (not fully functional).
4. Staff can login (Only single staff user has been added to database)
5. Staff can create volunteering opportunities.
6. Staff can edit and delete volunteering opportunities.
7. Staff can search volunteering opportunities using extra criteria "email", so that a certain staff can find all opportunities created by him/her.
