// Selecting DOM elements
const btnEl = document.querySelector("#btn");
const spanAdviceEl = document.querySelector("#span-advice");
const messageEl = document.querySelector("#message");

// Checking if all required elements are found
if (!btnEl || !spanAdviceEl || !messageEl) {
  console.error("One or more required elements not found");
} else {
  // Initialize advice slip counter
  let i = 1;

  // Function to update HTML content with advice text
  const adviceGenerator = (htmlEl, txt) => {
    htmlEl.textContent = txt;
  };

  // Event listener for button click to fetch new advice
  btnEl.addEventListener("click", () => {
    fetch(`https://api.adviceslip.com/advice/${i++}`)
      .then((res) => {
        // Check if the network response is OK
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Update HTML elements with new advice information
        adviceGenerator(spanAdviceEl, data.slip.id);
        adviceGenerator(messageEl, `"${data.slip.advice}"`);
      })
      .catch((error) => {
        // Log and handle fetch errors
        console.error("Fetch error:", error);
        // Handle the error (e.g., show a message to the user)
      });
  });
}
