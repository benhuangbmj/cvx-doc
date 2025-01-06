class Utils {
  static generateFormDataValidation({
    fieldArr,
    transformArr,
    validateArr,
    alertArr,
  }) {
    function handleClickNext(e) {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      for (let i = 0; i < fieldArr.length; i++) {
        const field = fieldArr[i];
        const transform = transformArr[i];
        const validate = validateArr[i];
        const alertMsg = alertArr[i];
        const value = data[field];
        const transformedValue = transform(value);
        if (!validate(transformedValue)) {
          alert(alertMsg);
          e.stopPropagation();
          e.target.removeEventListener("click", handleClickNext);
        }
      }
      processNextPrevButtons();
    }
    function handleClickPrev() {
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
  }
}
