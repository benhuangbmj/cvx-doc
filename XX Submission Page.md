# Footer
```html
<script>
  let submissionAttemptStatus;
  let intervalReload;
  window.addEventListener("update-record-success-list2", (e) => {
    window.parent.dispatchEvent(
      new CustomEvent("reload-block-milestone-submission-until")
    );
    submissionAttemptStatus =
      e.detail.response.data.fields["Submission Attempt Status"];
  });
  window.addEventListener("get-record-list-details2", (e) => {
    if (
      e.detail.fields["Submission Status"] === submissionAttemptStatus &&
      intervalReload !== undefined
    ) {
      clearInterval(intervalReload);
    }
  });
  window.parent.addEventListener("get-records-milestone-submission", () => {
    window.dispatchEvent(new CustomEvent("reload-block-list-details2"));
  });
</script>
```
