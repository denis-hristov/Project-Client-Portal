document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  const tableContainer = document.getElementById("scrollable-container");
  const mainContainer = document.querySelector(".container");

  if (!scrollBtn || !tableContainer || !mainContainer) {
    console.warn("Missing required elements in DOM.");
    return;
  }


  function isMobileView() {
    return window.innerWidth <= 768;
  }


  function toggleButtonVisibility(scrollTopValue) {
    if (scrollTopValue > 20) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  }


  mainContainer.addEventListener("scroll", function () {
    if (isMobileView()) {
      toggleButtonVisibility(mainContainer.scrollTop);
    }
  });


  tableContainer.addEventListener("scroll", function () {
    if (!isMobileView()) {
      toggleButtonVisibility(tableContainer.scrollTop);
    }
  });


  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
