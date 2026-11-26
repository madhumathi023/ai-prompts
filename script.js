
/* Get HTML elements */

const promptForm = document.getElementById("promptForm");

const roleInput = document.getElementById("role");
const taskInput = document.getElementById("task");
const contextInput = document.getElementById("context");
const constraintsInput = document.getElementById("constraints");
const formatInput = document.getElementById("format");

const outputBox = document.getElementById("output");

const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const message = document.getElementById("message");


/* Generate prompt */

promptForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get values from input fields
    const role = roleInput.value.trim();
    const task = taskInput.value.trim();
    const context = contextInput.value.trim();
    const constraints = constraintsInput.value.trim();
    const format = formatInput.value;

    // Task is required
    if (task === "") {
        message.textContent = "Please enter a task.";
        message.style.color = "#e05252";
        taskInput.focus();
        return;
    }

    // Build the prompt
    let prompt = "";

    if (role !== "") {
        prompt += role + "\n\n";
    }

    prompt += "Task:\n" + task + "\n\n";

    if (context !== "") {
        prompt += "Context:\n" + context + "\n\n";
    }

    if (constraints !== "") {
        prompt += "Constraints:\n" + constraints + "\n\n";
    }

    if (format !== "") {
        prompt += "Output Format:\n" + format + "\n\n";
    }

    prompt += "Please provide a clear, accurate, and helpful response.";

    // Display the generated prompt
    outputBox.value = prompt;

    // Show success message
    message.textContent = "Prompt generated successfully!";
    message.style.color = "#27966b";

});


/* Copy prompt */

copyBtn.addEventListener("click", async function() {

    const prompt = outputBox.value;

    if (prompt === "") {
        message.textContent = "Generate a prompt before copying.";
        message.style.color = "#e05252";
        return;
    }

    try {
        await navigator.clipboard.writeText(prompt);

        message.textContent = "Prompt copied to clipboard!";
        message.style.color = "#27966b";

    } catch (error) {

        // Fallback for browsers where clipboard access fails
        outputBox.select();

        const copied = document.execCommand("copy");

        if (copied) {
            message.textContent = "Prompt copied to clipboard!";
            message.style.color = "#27966b";
        } else {
            message.textContent = "Copy failed. Please copy manually.";
            message.style.color = "#e05252";
        }
    }

});


/* Clear all fields */

clearBtn.addEventListener("click", function() {

    // Reset form inputs
    promptForm.reset();

    // Clear output
    outputBox.value = "";

    // Clear message
    message.textContent = "";

});


/* Load sample prompt */

sampleBtn.addEventListener("click", function() {

    roleInput.value =
        "Act as a computer science teacher";

    taskInput.value =
        "Explain computer networks to first-year college students";

    contextInput.value =
        "The students are beginners and have no prior knowledge of computer networks.";

    constraintsInput.value =
        "Use simple English, include a real-world example, and explain three important uses.";

    formatInput.value =
        "Bullet points";

    message.textContent =
        "Sample prompt loaded. Click Generate Prompt.";

    message.style.color = "#27966b";

});
