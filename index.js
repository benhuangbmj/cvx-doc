import queryInterval from "./helpers/queryInterval.js";

async function queryLoop(query, callback, handleQueried, limit = 50) {
  let count = 0;
  while (count < limit) {
    try {
      const node = await query();
      callback(node);
      break;
    } catch (err) {
      if (err === "queried") {
        handleQueried();
      }
    } finally {
      count++;
    }
  }
}

export default class Utils {
  static async querySelectorSequence(
    selector,
    callback = () => {},
    locked = false,
    interval = 100,
    handleQueried = () => {}
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
          handleQueried();
        }
      } finally {
        count++;
      }
    }
    document.body.style.pointerEvents = "auto";
  }

  static evaluateSequence(
    xpath,
    callback = () => {},
    locked = false,
    handleQueried = () => {}
  ) {
    function evaluate(xpath) {
      return document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    }
    async function query() {
      return queryInterval(xpath, evaluate);
    }
    queryLoop(query, callback, handleQueried);
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
      console.log("next");
    }
    function handleClickPrev() {
      processNextPrevButtons();
    }
    function handleNextButton(node) {
      const button = node.closest("button");
      button.addEventListener("click", handleClickNext);
    }
    function handlePrevButton(node) {
      const button = node.closest("button");
      button.addEventListener("click", handleClickPrev);
    }
    function processNextPrevButtons() {
      Utils.evaluateSequence("//div[text()='Next']", handleNextButton, true);
      Utils.evaluateSequence("//div[text()='Previous']", handlePrevButton);
    }
    processNextPrevButtons();
  }
}
