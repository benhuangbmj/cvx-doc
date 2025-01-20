# Header

```html
<style>
  #grid1 div {
    display: block;
  }
  .more-margin {
    margin: 1.5em auto;
    max-width: fit-content;
  }
</style>
```

# Footer

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
  Utils.querySelectorSequence("#grid1 a", (node) => {
    node.closest("div").classList.add("more-margin");
  });
  let unattended = true;
  //Ensure the exchange rate table is loaded properly, even right after the bonus pool is created.
  const intervalTable3 = setInterval(() => {
    window.dispatchEvent(new CustomEvent("reload-block-table3"));
  }, 1000);
  window.addEventListener("get-records-table3", (e) => {
    if (e.detail.length > 0) {
      const tBDRows = e.detail.filter((row) => row.fields.Level === "TBD");
      if (tBDRows.length > 0) return;
      //Check if the exchange rate is set for all staking tiers, otherwise, prompt the user to set it.
      const unsetRowsIndex = [];
      for (let i = 0; i < e.detail.length; i++) {
        const row = e.detail[i];
        if (row.fields.ExchangeRate === "") {
          unsetRowsIndex.push(Number(i));
        }
      }
      const backToCollabButton = document.querySelector("#grid1 a");
      if (unsetRowsIndex.length > 0) {
        backToCollabButton?.classList.add("disabled");
        if (unattended) {
          alert("Please set the staking tier exchange rate.");
          const table = document.getElementById("table3");
          table.addEventListener("click", () => {
            unattended = false;
          });
        }
        Utils.querySelectorAllSequence("#table3 button", (nodes) => {
          nodes = Array.from(nodes);
          nodes = nodes.filter((node) => node.innerText !== "");
          let scrollTo = true;
          nodes.forEach((node, i) => {
            if (unsetRowsIndex.includes(i)) {
              node.classList.add("animated-glow");
              if (scrollTo) {
                node.scrollIntoView({ behavior: "smooth", block: "center" });
                scrollTo = false;
              }
            }
          });
        });
      } else {
        const bonusPoolCreated = sessionStorage.getItem("bonusPoolCreated");
        if (bonusPoolCreated === "true") {
          alert("Well done! Now go to the Collaborative Manager.");
          sessionStorage.removeItem("bonusPoolCreated");
          backToCollabButton.closest("div").classList.add("animated-glow");
          backToCollabButton
            .closest("div")
            .scrollIntoView({ behavior: "smooth", block: "end" });
        }
        backToCollabButton?.classList.remove("disabled");
      }
      clearInterval(intervalTable3);
    }
  });

  window.addEventListener("beforeunload", () => {
    clearInterval(intervalTable3);
    sessionStorage.removeItem("bonusPoolCreated");
  });
</script>
```
