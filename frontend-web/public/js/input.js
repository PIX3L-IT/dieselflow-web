document.addEventListener("input", function (e) {
    if (e.target.classList.contains("auto-resize")) {
      const el = e.target;
  
      el.style.height = "auto";
  
      el.style.height = el.scrollHeight + "px";
    }
  });
  