const elem = document.getElementsByTagName("div")[0];

setTimeout(async () => {
  const viewTransition = document.startViewTransition(() => {
    return new Promise((res) => {
      setTimeout(() => {
        elem.classList.remove("state-1");
      }, 1000);

      setTimeout(() => {
        elem.classList.add("state-2");
        res();
      }, 2000);
    });
  });

  viewTransition.updateCallbackDone.then(() =>
    console.log("updateCallbackDone fulfills")
  );
  viewTransition.ready.then(() => console.log("ready fulfills"));

  viewTransition.finished.then(() => console.log("finished fulfills"));
}, 1000);
