This project uses :

  • Backend : Spring Boot (Maven project)
  • Frontend : Angular
  • Database : MongoDB

 • To run the backend, import the project as an existing Maven project.
 • To run the frontend, use the commands :
       • npm install
       • ng serve --open

•	Once the user accesses the app, the login form is displayed.

![login](https://user-images.githubusercontent.com/20567102/33341087-bd5a646e-d475-11e7-8b5a-9c5fc10a6dd7.png)

•	The user can sign in with a new account by clicking the link in the header.

![sign-up](https://user-images.githubusercontent.com/20567102/33341289-70ddb36a-d476-11e7-811c-90640710e601.png)

•	Once the user is logged in, he can see a list of nearby shops sorted by distance.

![shops](https://user-images.githubusercontent.com/20567102/33341377-b806144e-d476-11e7-8294-b1f595c1433a.png).

•	If the user hits"like", the shop is removed from the nearby shops page and displayed on the liked shops page.

![likedshops](https://user-images.githubusercontent.com/20567102/33341454-f01cb018-d476-11e7-9ade-bc9b9a77c4d8.png)

• The user can remove a shop from his liked shops so it won't be displayed on the liked shops page but in the nearby shops page.

• The user can dislike a shop, it gets removed from the nearby shops page for 2 hours.

• If the user tries to access an non-existent page, a 404 page is displayed.

![404](https://user-images.githubusercontent.com/20567102/33342983-c65b59e6-d47b-11e7-8cd3-68dea0ff0aca.png)

• If a server error occurs, a 500 page is displayed.

![500](https://user-images.githubusercontent.com/20567102/33343068-0057d566-d47c-11e7-8f6c-e51683b1a8a6.png)


