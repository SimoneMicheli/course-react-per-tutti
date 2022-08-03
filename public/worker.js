/// <reference no-default-lib="true"/>
/// <reference lib="ES2015" />
/// <reference lib="webworker" />

console.log("Hello from service worker")

// eslint-disable-next-line no-var
// declare const self: ServiceWorkerGlobalScope
// eslint-disable-next-line no-restricted-globals
this.addEventListener("install", (event) => {
  console.log("Installing service-worker")
})

// eslint-disable-next-line no-restricted-globals
this.addEventListener("activate", (event) => {
  console.log("Service-worker Activated")

  if (Notification.permission === "granted") {
    this.registration.showNotification("Test Notification")
  }
})

this.addEventListener("push", (event) => {
  console.log("Received event push", event)
})
