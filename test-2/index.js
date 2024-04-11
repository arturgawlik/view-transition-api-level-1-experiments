navigation.addEventListener("navigate", (e) => {
  e.intercept({
    handler: () => {
      try {
        function navigate() {
          const url = new URL(window.location1.href);
          const root = document.getElementById("root");

          const tmpl = document.querySelector(
            `#${url.pathname.replaceAll("/", "-")}`
          );
          if (tmpl) {
            const tmplClone = tmpl.content.cloneNode(true);
            root.replaceChildren(tmplClone);
          }
        }

        document.startViewTransition(navigate);
      } catch (error) {
        console.error(error);
      }
    },
  });
});
