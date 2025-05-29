document.addEventListener("DOMContentLoaded", function () {
  	const scrollBtn = document.getElementById("scrollToTopBtn");
  	const tableContainer = document.getElementById("scrollable-container");
  	const mainContainer = document.querySelector(".container");

	// check for missing elements
  	if (!scrollBtn || !tableContainer || !mainContainer) {
		console.warn("Missing elements in DOM.");
  	    return;
  	}

	// check for mobile
  	function isMobileView() {
  	  	return window.innerWidth <= 768;
  	}

	// fisibility
  	function toggleButtonVisibility(scrollTopValue) {
  	  	if (scrollTopValue > 20) {
  	  	  	scrollBtn.style.display = "block";
  	  	} else {
  	  	  	scrollBtn.style.display = "none";
  	  	}
  	}

	// scroll for mobile
  	mainContainer.addEventListener("scroll", function () {
  	  	if (isMobileView()) {
  	    	toggleButtonVisibility(mainContainer.scrollTop);
  	  	}
  	});

	// scrol for desktop
  	tableContainer.addEventListener("scroll", function () {
  	  	if (!isMobileView()) {
  	    	toggleButtonVisibility(tableContainer.scrollTop);
  	  	}
  	});

	// scrol up mobile
	scrollBtn.addEventListener("click", function () {
		mainContainer.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});

	// scrol up desktop
	scrollBtn.addEventListener("click", function () {
		tableContainer.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
});
