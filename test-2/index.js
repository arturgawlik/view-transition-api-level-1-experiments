navigation.addEventListener("navigate", (e) => {
  e.intercept({
    handler: () => {
      try {
        function navigate() {
          const url = new URL(window.location.href);
          const root = document.getElementById("root");

          const tmpl = document.querySelector(
            `#${url.pathname.replaceAll("/", "-")}`
          );
          if (tmpl) {
            const tmplClone = tmpl.content.cloneNode(true);
            root.replaceChildren(tmplClone);
          }
        }
        /**
         * 1. when calling startViewTransition the page screenshot is taken
         * 2. next cb is called which updated's the DOM
         * 3. updated state of DOM is captured as "live-representation" (whatever it means)
         * 4. pseudo elements (::view-transtion etc.) are available
         *    - ::view-tranistion - root element
         *    - ::view-transition-old - old DOM state (as screenshot)
         *    - ::view-transition-new - new DOM state
         *    - before animation will be fired "ready" promise will fulfill
         * 5. ::view-transition-old is by default animated with opacity from 1 to 0, and
         *    ::view-tranistion-new is by default animated with opacity 0 to 1
         * 6. finishred promise fulfills
         */
        const viewTranstion = document.startViewTransition(navigate);
        viewTranstion.updateCallbackDone.then(() =>
          console.log("1. cb that updateds DOM is done.")
        );
        viewTranstion.ready.then(() =>
          console.log(
            "2. animation is about to run. pseudo elements are available."
          )
        );
        viewTranstion.finished.then(() => console.log("3. animation is done."));
      } catch (error) {
        console.error(error);
      }
    },
  });
});
