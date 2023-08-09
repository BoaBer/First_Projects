# First_Projects 
The folder contains the first projects related to programming.
Programming languages ​​used in the projects: HTML, CSS, JavaScript.

1) Expense_Tracker - I wrote Expense_Tracker to plan and control expenses. Expenses are saved in the LocalStorage of the browser. In the program we can add past and planned expenses, there are 5 expense categories: food, clothes, cosmetics, entertainment, sport. Past and future expenses are displayed separately, switching between them is realised by a slider on the right hand side. In addition, it is possible to segregate all entered expenses by date, category or both at the same time, and to display them in 4 options: date ascending/descending, amount ascending/descending. Below the slider is the total expense, which changes according to the filters set, so that we can easily compare expenses according to need. The calendar under "New expense" shows the current date and by clicking on the relevant day, the expenses for that day are displayed. By default, I have sorted past expenses (including today's) by date in descending order (today's date is at the very top and the oldest at the very bottom), and future expenses by date in ascending order (the closest expense will be at the very top, and the furthest expense in time will be at the very bottom).
I used the following methods and properties:
new Date()        getFullYear()         getMonth()         getDay()               getDate()
forEach()         map()                 reverse()          find()                 filter()
sort()            findIndex()           indexOf()          slice()                splice()
length            push()                querySelector()    querySelectorAll()     getElementById()

getElementById().value         querySelector().textContent            querySelector().reset()
addEventListener()             navigator.locale                       localStorage.setItem()
localStorage.getItem()         JSON.stringify()                       JSON.parse()
toUpperCase()                  new Intl.NumberFormat().format()       innerHTML
insertAdjacentHTML()           classList.add()                        classList.remove()
classList.contains()           preventDefault()                       target()
![Budget_Project](https://github.com/BoaBer/First_Projects/assets/132903600/09ebaf54-9904-4a27-abed-d3a4a6a81da6)

https://budget--boaber.repl.co/

3) Guess_Number - it is a simple browser game that is designed to offer entertainment.
   It is based on guessing a number between 1 and 20 which is drawn by the computer.
   The player has 20 chances to guess it, the highest score is entered into a 'highscore'.
   When the number given by the player is different from the number to be guessed, a message appears which contains a clue.

4) Roll_Game - is a simple two-player browser game that is designed to offer entertainment.
   It is based on throwing the dice, the number of dots thrown adds up until the player throws 1
   and loses points or presses the 'HOLD' button, with this way stopping the collected points and giving the move to the opponent.
   The player whose total score exceeds 50 points will win.

5) Digital_clock - Simple design for measuring time, showing date and time. The user has the option to change the format
   of the displayed time - time based on the 12 or 24 hour system.

6) To_Do_App - An app where you create a list of things to do. The app allows you to manage your time better and faster.
   You can easily edit the list. Saved items are stored in localStorage at your browser.

