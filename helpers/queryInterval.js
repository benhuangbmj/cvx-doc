function queryInterval(target, method, interval = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const node = method(target);
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
module.exports = queryInterval;
