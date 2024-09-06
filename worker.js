// Define a function to fetch and execute tasks from the server
async function fetchTask() {
    try {
        const response = await fetch('/get-task'); // Endpoint to get a task
        if (!response.ok) throw new Error('Network response was not ok');
        const task = await response.json();
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
        return null;
    }
}

// Define a function to send results to the server
async function sendResult(result) {
    try {
        const response = await fetch('/submit-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });
        if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error submitting result:', error);
    }
}

// Main function to handle task processing
async function main() {
    while (true) {
        const task = await fetchTask();
        if (task) {
            // Process the task here
            const result = processTask(task);
            await sendResult(result);
        }
        // Optionally, add a delay to avoid overloading the server
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// Simulate task processing (replace with actual task logic)
function processTask(task) {
    // Dummy task processing logic
    return { taskId: task.id, result: task.data * 2 }; // Example result
}

// Start processing tasks
main();
