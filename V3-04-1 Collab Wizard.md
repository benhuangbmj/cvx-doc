```javascript
  //Prevent the enter key from submitting the form
  function disableEnterKey(node) {
    if (node) {
      node.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          if (e.target.tagName === "INPUT") e.preventDefault();
        }
      });
    }
  }
  querySelectorInterval("form", disableEnterKey);

  //Validate the G&A target rate
  function handleClickNext(e) {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const GnA =
      data[formFieldsCode["G&A Target Rate"]] === ""
        ? NaN
        : Number(data[formFieldsCode["G&A Target Rate"]]);
    if (GnA <= 0 || GnA >= 100) {
      alert("Please enter a number between 0 and 100");
      e.stopPropagation();
      e.target.removeEventListener("click", handleClickNext);
    }
    processNextPrevButtons();
  }
  function handleClickPrev(e) {
    processNextPrevButtons();
  }
  function handleNextButton(node) {
    document.body.style.pointerEvents = "auto";
    node.addEventListener("click", handleClickNext);
  }
  function handlePrevButton(node) {
    node.addEventListener("click", handleClickPrev);
  }
  function processNextPrevButtons() {
    document.body.style.pointerEvents = "none";
    querySelectorInterval(
      "button._51290ae_nw87ex7._51290ae_nw87ex8._51290ae_nw87exb",
      handleNextButton
    );
    querySelectorInterval(
      "button._51290ae_nw87ex7._51290ae_nw87ex9._51290ae_nw87exb",
      handlePrevButton
    );
  }
  processNextPrevButtons();

  //Hide the wizard upon submission
  window.addEventListener("submit-form-success-form1", function () {
    const form = document.querySelector("form");
    form.style.visibility = "hidden";
  });
```
