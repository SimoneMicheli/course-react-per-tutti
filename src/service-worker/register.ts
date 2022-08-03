function register() {
  if ("serviceWorker" in navigator) {
    console.log("Registering service worker....")
    window.addEventListener("load", async () => {
      navigator.serviceWorker
        .register("/worker.js", {
          scope: "/",
        })
        .then((registration) => {
          console.log("Worker registration successfull")
          Notification.requestPermission()
            .then((permission) => {
              console.log("Permission state: " + permission)
            })
            .catch(() => {
              console.log("Notification permission error")
            })
        })
        .catch((error) => {
          console.error("Service worker registration fail!", error)
        })
    })
  } else {
    console.log("Service worker not supported by this browser")
  }
}

export { register }
