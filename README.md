# Todo Application By Eytan

## Production deployment

I was able to use Heroku for the backend deploy and Vercel for the frontend deploy. Here are the links

App: [https://codetest-zeta.vercel.app/](https://codetest-zeta.vercel.app/)

API: [https://eytan-todo-api-roaming-hunger-b74311822e2c.herokuapp.com/](https://eytan-todo-api-roaming-hunger-b74311822e2c.herokuapp.com/)

## Running the application locally

To run the application without docker please follow these instructions.

### 1. Setting Up the Rails API

1. Install Ruby 3.2.0 and set it as the local version for the project.
2. Install MySQL and ensure it is running.
3. Install the required gems:
    ```bash
    cd todo_api
    bundle install
    ```
4. Create and migrate the database:
    ```bash
    rake db:create
    rake db:migrate
    ```
5. Start the Rails server:
    ```bash
    rails server
    ```
6. You can access the application at `http://localhost:3000`

### 2. Setting Up the React Frontend

1. Install npm packages
    ```bash
    cd todo_frontend
    npm install
    ```
2. Run the application
    ```bash
    npm run dev
    ```
3. You can access the application at `http://localhost:5173`
    - The default port `5173`, might be different if you're running something else on this default port
    - The port will be displayed when you run `npm run dev`

--------------------------------------------------

# Roaming Hunger Code Test: ‘TODO’ App

*Please read this whole README before starting.*

Welcome to the code test! 

This test is meant to help us get an understanding of your technical knowledge and how you tackle problems. The way you go about finding your solutions and implementing them is just as important to us as the final product. This test should take you about 2 to 4 hours.

When you’re finished with the test, please email us to schedule a code review! We’ll ask for a demo of what you have working as well as have a conversation about how you made what you made. 

## Requirements
Create an application to create, view, update, and destroy ‘todo’ items. The application should be a single page application based in a popular framework (React, Vue, Svelte, or similar) with a backend based which interacts with a SQL or NoSQL style database.

### To begin the code test
* [x] Fork this repository into a public repository on your account

### While working on this, please:
* [x] Commit early and often. We'll likely be following along with your progress.

### Upon completion, please email to us:
* [ ] A link to your repository with code in it.

## Front End Requirements

### The default UI should show a list of TODO items, each item needs
* [x] A text description of the todo
* [x] A checkbox to mark the todo as done or undone

### Interactions
* [x] The user should be able to create a new TODO item
* [x] The user should be able to destroy a TODO item
* [x] The user should be able to update the text description of a TODO item

## Backend Requirements

### Interactions to support
* [x] TODOs should be Created, Updated, Listed, Viewed, and Destroyed via REST or graphQL
* [x] TODOs should be stored in your database on the backend.

## Extra Credit

If you find that you have completed the earlier items with time to spare, please consider adding the following

### Suggestions for improvements
* [ ] Deploy your TODO app to the internet so we can see it in action
* [ ] Test it on Mobile device sizes.
* [x] Write unit tests for your code.
* [ ] Edit this ReadMe with new suggestions for how to improve this code test
