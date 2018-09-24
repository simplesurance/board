window.__ = (q) => document.querySelector(q)
window.on = (el, ev, c) => el.addEventListener(ev,c)
window.off = (el, type, ev) => el.removeEventListener(type, ev)
window.$ = q => document.querySelector(q)
