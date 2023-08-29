document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = storedTasks[index] || false;
        checkbox.addEventListener('change', () => {
            handleCheckboxChange(index);
        });
    });
});

function handleCheckboxChange(index) {
    fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkedIndex: index }),
    })
    .then(() => {
        const span = document.querySelectorAll('span')[index];
        span.classList.toggle('completed');

        // Update localStorage after toggle
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks[index] = !storedTasks[index];
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    });
}
