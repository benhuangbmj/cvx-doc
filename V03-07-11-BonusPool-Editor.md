```html
<script>
  window.addEventListener("block-loaded-list5", () => {
    window.addEventListener("update-record-success-list5", () => {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("reload-block-list5"));
      }, 3000);
    });
  });
</script>

<script>
  window.addEventListener("block-loaded-list5", () => {
    window.addEventListener("update-record-success-list5", () => {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("reload-block-list2"));
      }, 3000);
    });
  });
</script>

<script>
  //Ensure the exchange rate table is loaded properly, even right after the bonus pool is created.
  const intervalTable3 = setInterval(() => {
    window.dispatchEvent(new CustomEvent("reload-block-table3"));
  }, 1000);
  window.addEventListener("get-records-table3", (e) => {
    if (e.detail.length > 0) {
      for (let row of e.detail) {
        if (row.fields.ExchangeRate === "") {
          alert("Please set the staking tier exchange rate.");
          const table = document.getElementById("table3");
          table.scrollIntoView({ behavior: "smooth", block: "start" });
          table.classList.add("animated-glow");
          table.addEventListener("click", () => {
            table.classList.remove("animated-glow");
          });
          break;
        }
      }
      clearInterval(intervalTable3);
    }
  });
</script>
```
