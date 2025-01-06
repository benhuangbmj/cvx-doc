# Header

```javascript
//Functions and variables used throughout the app

const creatingProject = "creatingProject";
const siteTimeout = 30000;
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
  }, 10);
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
