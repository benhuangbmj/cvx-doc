class Utils {
  static async querySelectorSequence(
    selector,
    callback = () => {},
    locked = false,
    interval = 100,
    handleQueries = () => {}
  ) {
    if (locked) {
      //document.body.style.pointerEvents = "none";
    }
    function queryInterval() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const node = document.querySelector(selector);
          if (node && !node.dataset?.queried) {
            node.setAttribute("data-queried", true);
            resolve(node);
          } else if (node?.dataset?.queried) {
            reject("queried");
          } else {
            reject("not found");
          }
        }, interval);
      });
    }
    let count = 0;
    while (count < 50) {
      try {
        const node = await queryInterval();
        callback(node);
        break;
      } catch (err) {
        if (err === "queried") {
          handleQueries();
        }
      } finally {
        count++;
      }
    }
    document.body.style.pointerEvents = "auto";
  }

  static async evaluateSequence(xpath, callback = () => {}) {
    setTimeout(() => {
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      const element = result.singleNodeValue;
      const button = element?.closest("button");
      callback(button);
    }, 2000);
  }

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
      let reapply = true;
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
          reapply = false;
        }
      }
      if (reapply) processNextPrevButtons();
    }
    function handleClickPrev() {
      processNextPrevButtons();
    }
    function handleNextButton(node) {
      node.addEventListener("click", handleClickNext);
    }
    function handlePrevButton(node) {
      node.addEventListener("click", handleClickPrev);
    }
    function processNextPrevButtons() {
      Utils.evaluateSequence("//div[text()='Next']", handleNextButton, true);
      Utils.evaluateSequence("//div[text()='Previous']", handlePrevButton);
    }
    processNextPrevButtons();
  }
}
