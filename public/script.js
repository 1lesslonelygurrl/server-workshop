const taskList = document.querySelector("#task-list");

const tasks = [
    { title: "Learn Node.js", completed: false },
    { title: "Build REST API", completed: false }
];

tasks.forEach(task => {
    const li = document.createElement("li");

    li.textContent =
        task.title + " - " +
        (task.completed ? "Done" : "Not done");

    taskList.appendChild(li);
});