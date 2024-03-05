// used phind.com for troubleshooting
// please open on Safari/other browsers if not working!

// Event Listener for DOM Content Loaded:
document.addEventListener('DOMContentLoaded', function() {
    // 5. today's date
    var today = new Date();
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('todaysDate').textContent = "Today's Date: " + today.toLocaleDateString('en-US', options);
    document.getElementById('deadline').valueAsDate = today;

    // 7. load from cookie if available - functions defined at bottom
    var storedTasks = getCookie('tasks');
    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        tasks.uncompleted.forEach(function(task) {
            addTaskToTable(task.description, task.priority, task.deadline, 'uncompletedTasksTable');
            addTaskToTable(task.description, task.priority, task.deadline, 'allTasksTable'); // Add to All Tasks table
        });
        tasks.completed.forEach(function(task) {
            addTaskToTable(task.description, task.priority, task.deadline, 'completedTasksTable', task.completed); // Pass completed parameter
            addTaskToTable(task.description, task.priority, task.deadline, 'allTasksTable'); // Add to All Tasks table
        });
    }

// 2. Add Task:
// Listen for form submission in the 'Add Task' section
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var taskDescription = document.getElementById('taskDescription').value;
    var priority = document.getElementById('priority').value;
    var deadline = document.getElementById('deadline').value;

    // 5. check for missing information
    if (!taskDescription || !priority || !deadline) {
        displayErrorMessage('Please fill in all fields!');
        return;
    }

    // 5. check no. of uncompleted tasks
    var uncompletedTasksCount = document.querySelectorAll('#uncompletedTasksTable tbody tr').length;

    // 5. check 10?
    if (uncompletedTasksCount >= 10) {
        displayErrorMessage('You have 10 outstanding tasks. Complete some tasks before adding more.');
        return;
    }

    // 5. check repeats
    var oustandingTasks = document.querySelectorAll('#uncompletedTasksTable tbody tr td:nth-child(2)'); // Select all uncompleted task descriptions
    var taskExistsUncompleted = false;
    for (var i = 0; i < oustandingTasks.length; i++) {
        if (oustandingTasks[i].textContent === taskDescription) {
            taskExistsUncompleted = true;
            break;
        }}

    // 5. check completed repeats
    var finishedTasks = document.querySelectorAll('#completedTasksTable tbody tr td:nth-child(2)'); // Select all completed task descriptions
    var taskExistsCompleted = false;
    for (var i = 0; i < finishedTasks.length; i++) {
        if (finishedTasks[i].textContent === taskDescription) {
            taskExistsCompleted = true;
            break;
        }}

    if (taskExistsUncompleted) {
        displayErrorMessage('Task already added!');
    } else {
        // add regardless of completion status
        addTaskToTable(taskDescription, priority, deadline, 'uncompletedTasksTable');
        addTaskToTable(taskDescription, priority, deadline, 'allTasksTable');
        // save tasks to cookie
        bootstrap();
    }

    // reset form fields
    document.getElementById('taskDescription').value = '';
    document.getElementById('priority').value = 'Low';
    document.getElementById('deadline').value = today;
});


    function addTaskToTable(taskDescription, priority, deadline, tableId, dateOfCompletion) {
        var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
    
        // 2. add task in new row
        newRow.innerHTML = `
            <td>${table.rows.length}</td>
            <td>${taskDescription}</td>
            <td><span class="priority ${priority.toLowerCase()}">${priority}</span></td>
            <td>${deadline}</td>
            <td><input type="checkbox" class="completedCheckbox"></td>
        `;
        
        if (dateOfCompletion) {
            newRow.insertCell().textContent = dateOfCompletion;
            newRow.classList.add('completed');
            newRow.deleteCell(4);
        }
    
        return newRow;
    }    

// 3. Checkbox Event Listener:
// Listen for changes in checkboxes within the 'Uncompleted Tasks' table
//     a. moves the corresponding task to the 'Completed Tasks' table, 
//     b. updates serial numbers, and 
//     c. saves changes to cookies
    document.getElementById('uncompletedTasksTable').addEventListener('change', function(event) {
        if (event.target.classList.contains('completedCheckbox')) {
            var checkbox = event.target;
            var row = checkbox.parentNode.parentNode;
            var table = row.parentNode;

            if (checkbox.checked) {
                // 3. move to completed
                var completedTasksTable = document.getElementById('completedTasksTable').getElementsByTagName('tbody')[0];
                completedTasksTable.appendChild(row);

                // 5. date of completion
                var dateOfCompletion = new Date().toLocaleDateString('en-US', options);
                row.insertCell().textContent = dateOfCompletion;

                // apply completed styling
                row.classList.add('completed');
                row.deleteCell(4);
            }

            // 3. update S/N
            updateSerialNumbers(table);
            // 7. save to cookie
            bootstrap();
        }
    });

// 1. Navigation Event Listener:
// Listen for clicks on navigation links.
    // a. hides all sections and 
    // b. displays the section corresponding to the clicked link
    var navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var targetSection = link.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });

    // specific section
    function showSection(sectionId) {
        var sections = document.querySelectorAll('section');
        sections.forEach(function(section) {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    // default section
    showSection('addTaskSection');

// 5. Error Handling:
//     there are missing fields in 'Add Task' form,
//     there are more than 10 uncompleted tasks, or
//     the task description already exists
    function displayErrorMessage(message) {
        var errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.color = 'red';
        document.getElementById('addTaskSection').appendChild(errorMessage);
        setTimeout(function() {
            errorMessage.remove();
        }, 5000);
    }

// 7. bootstrap() collects data from the task tables #uncompletedTasksTable and #completedTasksTable
// Create object 'tasks' with properties 'uncompleted' and 'completed'
//      each property holds an array of task objects
//      each task object contains description, priority, deadline, completion date
//      'tasks' object converted to a JSON string using 'JSON.stringify()'
//  Call setCookie() with the name 'tasks', JSON string, and expiry duration
    function bootstrap() {
        var uncompletedTasks = Array.from(document.querySelectorAll('#uncompletedTasksTable tbody tr')).map(function(row) {
            return {
                description: row.cells[1].textContent,
                priority: row.cells[2].textContent,
                deadline: row.cells[3].textContent
            };
        });

        var completedTasks = Array.from(document.querySelectorAll('#completedTasksTable tbody tr')).map(function(row) {
            return {
                description: row.cells[1].textContent,
                priority: row.cells[2].textContent,
                deadline: row.cells[3].textContent,
                completed: row.cells[4].textContent
            };
        });

        var tasks = {
            uncompleted: uncompletedTasks,
            completed: completedTasks
        };

        setCookie('tasks', JSON.stringify(tasks), 365);
    }

// 7. setCookie() constructs a string containing cookie data (name, value, expiration, path)
// sets 'document.cookie' property to this constructed string
    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

// 7. getCookie() contructs a string 'nameEQ'
//      append = to provided name
//      split the 'document.cookie' string into array of individual cookies
//      loop through each cookie, remove whitespace, check if cookie name matches nameEQ
//      MATCH - return portion of cookie string containing the value of the cookie after =
//      NO MATCH - return null
    function getCookie(name) {
        var nameEQ = name + '=';
        var cookies = document.cookie.split(';');
        for(var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }}
        return null;
    }

// 3. update S/N
    function updateSerialNumbers(table) {
        var rows = table.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            rows[i].getElementsByTagName('td')[0].textContent = i + 1;
        }
    }
});