document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  
  if (!scrollBtn) {
    console.warn("scrollToTopBtn not found in DOM.");
    return;
  }

  
  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
