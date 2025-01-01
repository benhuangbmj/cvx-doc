# Header
```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.17.0/cdn/components/progress-bar/progress-bar.js"
></script>

<!-- Progress bar with value and dynamic label -->
<sl-progress-bar value="17" class="progress-bar-values">
  <!-- Slot for label -->
  <span slot="label">17%</span>
</sl-progress-bar>

<script>
  const progressBar = document.querySelector(".progress-bar-values");

  // Function to dynamically update the label based on the value
  const updateProgressBarLabel = () => {
    const value = progressBar.value;
    const label = progressBar.querySelector('span[slot="label"]');
    label.textContent = `${value}%`; // Dynamically update the label inside the slot
  };

  // Initial update on page load
  updateProgressBarLabel();

  // Add event listener in case progress bar value changes dynamically elsewhere
  progressBar.addEventListener("sl-change", updateProgressBarLabel);
</script>

<style>
  sl-progress-bar {
    width: 100%;
    height: 20px;
    display: block;
    visibility: visible !important;
    opacity: 1 !important;
  }

  sl-progress-bar::part(base) {
    --track-color: #e0e0e0;
    --indicator-color: #007bff;
  }

  sl-progress-bar::part(label) {
    color: black;
    font-weight: bold;
    text-align: center;
  }

  #loadingPopover {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: system-ui, sans-serif;
  }

  /* Add a subtle animation */
  @keyframes pulse {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }

  /* Style for the loading text */
  .loading-text {
    font-size: 1.25rem;
    color: #333;
    margin: 0;
    animation: pulse 2s infinite;
  }
</style>

//Show the "Creating Project ..." popover
<script>
  if (sessionStorage.getItem(creatingProject)) {
    sessionStorage.removeItem(creatingProject);
    const blocks = [
      "list-details5",
      "list-details2",
      "project-status",
      "milestones1",
      "milestones2",
      "list11",
      "inbox1",
    ];
    const timeouts = Array.from(Array(5), (_, i) => 3000*(i+1));
    timeouts.forEach((timeout, index) => {
      setTimeout(() => {
        blocks.forEach((block) => {
          window.dispatchEvent(new CustomEvent(`reload-block-${block}`));
        });
      }, timeout);
    });
    const body = document.querySelector("body");
    const html = document.querySelector("html");
    body.style.visibility = "hidden";
    const popover = document.createElement("div");
    popover.setAttribute("id", "loadingPopover");
    popover.setAttribute("popover", "");
    popover.innerHTML = `<p class="loading-text">Creating project ...</p>`;
    html.appendChild(popover);
    popover.showPopover();
    setTimeout(() => {
      popover.hidePopover();
      popover.remove();
      body.style.visibility = "visible";
    }, 6000);
  }
</script>
```
