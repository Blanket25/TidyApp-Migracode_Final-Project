# Migracode's Final Project

## TidyApp

TidyApp is an easy tool to keep your house clean and organized. The main goal is to have a healthy relationship between flatmates thanks to simply splitting the tasks between them all.
Enjoy :

- A Happy house, by living in a clean and organized home
- A Happy relationship with your flatmates
- A happy pocket, by saving money on cleaning services

### The making of

#### Contracts can avoid a lot of problems

We decided to define 4 contracts for this project:

- [Migracode's Final Project](#migracodes-final-project)
  - [TidyApp](#tidyapp)
    - [The making of](#the-making-of)
      - [Contracts can avoid a lot of problems](#contracts-can-avoid-a-lot-of-problems)
      - [CSS Contract](#css-contract)
        - [Trello Contract](#trello-contract)
      - [GitHub Contract](#github-contract)
      - [Pull request contract](#pull-request-contract)
    - [Back-end](#back-end)
      - [Setup](#setup)

#### CSS Contract

**Colours**:

- These is the colors we are going to be working with:

Light: #FFF9F0
Orange: #F6752D
Purple: #8584E8

There is one variable for each color, so you don't have to put the hex code each time.

- Instead of pixels let’s use **rem**, in our project:
  **1 rem = 10px**, so it’s easy to count in rem if you used to work with px
- For margins try to use **utility classes** (they start with “.u-”)
- To center containers on the page try to use **“.u-center-container”** utility class
- To center text you can use **“.u-center-text”** utility class
- To center elements inside container use **flexbox** or **grid** properties
- You can add new utility classes below “Utility classes” comment in index.css
- You can change values of utility classes and headers if you don’t like the current values (right now they are set just as an example), but be consistent.
- The main idea to use some utility classes is to make changes in one place, instead of changing it everywhere you need to use the same property.
- If you notice that you use one property with the same value in many places, make a utility class.

##### Trello Contract

- **Product Backlog** column: here you’ll find all the tasks we need to do during the Project
- **Sprint n** column: we have a column for each Sprint with its tasks
- Adding tasks:
  Create small tasks with a label that refers to an Epic
- Picking tickets(tasks) to do:
  1.  Assign the ticket to yourself
  2.  Put the ticket in the **Doing** column
  3.  Create a branch with the task name
  4.  Once the task is finished, put the ticket in the **Done** column
  5.  Choose another ticket and repeat points 1, 2, 3 and 4.

#### GitHub Contract

- Fork the repo and clone it in your device
- Commit regularly
- Before starting working on your code, do a pull to have the latest updates in the repo

#### Pull request contract

- Everytime you do a task, create a new branch with the task name, push it and do a Pull Request
- Always add one or two team members to review your Pull Request
- When receiveing a Pull Request for reviewing, always check the code before approving it

### Back-end

- This project's database has 3 tables: Users, Tasks and Tidy_group. 
- The URLs for them are
  ```
    /users
    /tasks
    /groups
  ```
- The endpoints GET, ADD and DELETE were created for ```/users``` and ```/tasks```
- The endpoint ADD was created for ``/groups``
#### Setup

- Create the Database tidy_app locally by running the file *tidyApp.sql*;
  
- Inside the back-end folder, create a file named secrets.json and add the following:
    ```json
    { 
      "user": "name of your user",
      "database": "tidy_app",
      "password": "your password",
      "host": "localhost",
      "port": 5432
    }
    ```

- Run ```nodemon server.js``` on you terminal.
  
