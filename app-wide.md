# Header
```javascript
  //Functions and variables used throughout the app
  
  const creatingProject = "creatingProject";
  const siteTimeout = 30000;
  const formFieldsCode = {
    "G&A Target Rate": "68f6c329-7147-4fe1-9b2f-eb3b3d7b1f40",
  };
  function querySelectorInterval(selector, callback = () => {}) {
    if (selector == undefined) {
      return;
    }
    const interval = setInterval(() => {
      const result = document.querySelector(selector);
      if (result) {
        clearInterval(interval);
        callback(result);
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, siteTimeout);
  }
  function querySelectorAllInterval(selector, callback = () => {}) {
    if (selector == undefined) {
      return;
    }
    const interval = setInterval(() => {
      const result = document.querySelectorAll(selector);
      if (result) {
        clearInterval(interval);
        callback(result);
      }
    }, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, siteTimeout);
  }
```
