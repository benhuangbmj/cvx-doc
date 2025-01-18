# Header

```css
.animated-glow {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(203, 75, 14, 0.8);
  }
  50% {
    box-shadow: 0 0 40px rgba(203, 75, 14, 1);
  }
}
```

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
