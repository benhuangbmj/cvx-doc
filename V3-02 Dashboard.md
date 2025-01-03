# Header
```html
<script>
window.addEventListener('block-loaded-list1', () => {
  window.addEventListener('update-record-success-list1', () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('reload-block-list4'));
    }, 3000);
  });
});
</script>
```

# Footer
```html
<script>
window.addEventListener('block-loaded-header1', () => {
  const accordionElements = document.querySelectorAll(".MuiAccordion-root");
  accordionElements.forEach((element) => {
    const button = element.querySelector('div[role=button]');
    if (button) {
      button.click();
    }
  });
});
</script>



<script>
window.addEventListener('block-loaded-list1', () => {
  // Add event listener for the "Stake at this Level" buttons in the list1 block
  const stakeButtons = document.querySelectorAll('button div');

  stakeButtons.forEach(button => {
    if (button.textContent.includes('Stake at this Level')) {
      // Add click event listener to each button
      button.addEventListener('click', function() {
        // Close the modal when the button is clicked
        MicroModal.close('sw-modal');
      });
    }
  });
});
</script>

<script>
  window.addEventListener("reload-block-milestone-submission-until", () => {
    const interval = setInterval(() => {
      window.dispatchEvent(
        new CustomEvent("reload-block-milestone-submission")
      );
    }, 2000);
    window.addEventListener("get-records-milestone-submission", () => {
      clearInterval(interval);
    });
  });
</script>
```
