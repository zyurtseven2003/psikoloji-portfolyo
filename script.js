document.addEventListener("DOMContentLoaded", function () {

  // 1. Karanlık mod

  const themeButton = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

  }

  if (themeButton) {

    function updateThemeButton() {

      const dark = document.body.classList.contains("dark-mode");

      themeButton.textContent = dark ? "☀️" : "☾";

      themeButton.setAttribute(

        "aria-label",

        dark ? "Açık modu aç" : "Karanlık modu aç"

      );

    }

    updateThemeButton();

    themeButton.addEventListener("click", function () {

      document.body.classList.toggle("dark-mode");

      const dark = document.body.classList.contains("dark-mode");

      localStorage.setItem("theme", dark ? "dark" : "light");

      updateThemeButton();

    });

  }

  // 2. Mobil menü

  const menuButton = document.querySelector(".menu-toggle");

  const navigation = document.getElementById("site-nav");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));

      menuButton.setAttribute(

        "aria-label",

        isOpen ? "Menüyü kapat" : "Menüyü aç"

      );

    });

  }

  // 3. Proje arama ve filtreleme

  const searchInput = document.getElementById("project-search");

  const projectCards = document.querySelectorAll(".project-card");

  const searchFeedback = document.getElementById("search-feedback");

  if (searchInput && projectCards.length > 0) {

    searchInput.addEventListener("input", function () {

      const query = searchInput.value.toLocaleLowerCase("tr");

      let visibleCount = 0;

      projectCards.forEach(function (card) {

        const content = card.textContent.toLocaleLowerCase("tr");

        const matches = content.includes(query);

        card.hidden = !matches;

        if (matches) visibleCount++;

      });

      if (searchFeedback) {

        searchFeedback.textContent =

          visibleCount + " proje bulundu.";

      }

    });

  }

  // 4. İletişim formu doğrulama

  const contactForm = document.getElementById("contact-form");

  const formFeedback = document.getElementById("form-feedback");

  if (contactForm && formFeedback) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const name = document.getElementById("contact-name");

      const email = document.getElementById("contact-email");

      const message = document.getElementById("contact-message");

      if (!name || !email || !message) return;

      if (!name.value.trim() || !email.validity.valid ||

          !message.value.trim()) {

        formFeedback.textContent =

          "Lütfen tüm alanları doğru şekilde doldurun.";

        return;

      }

      formFeedback.textContent =

        "Form doğrulandı. Bu demo form mesaj göndermez.";

      contactForm.reset();

    });

  }

});
