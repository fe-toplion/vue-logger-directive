import "intersection-observer";
import { ITrackOptions } from "./types";

let ksLogShow: (arg0: any) => void;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        let value: any = entry.target.getAttribute("kstrackParams");
        const once = entry.target.getAttribute("once");
        if (!value) {
          return;
        }
        value = JSON.parse(value);
        ksLogShow(value);
        if (once === "true") {
          observer.unobserve(entry.target);
        }
      }
    });
  },
  {
    threshold: [0.5],
  }
);

export default {
  install(Vue: any, options: ITrackOptions) {
    const { logClick, logPV, logShow } = options;
    ksLogShow = logShow;
    Vue.directive("track", {
      bind(el: any, binding: any) {
        const { arg, value, modifiers } = binding;
        if (arg === "click") {
          el.addEventListener("click", () => {
            logClick(value);
          });
        } else if (arg === "show") {
          if (modifiers.once) {
            el.setAttribute("once", modifiers.once.toString());
          }
          el.setAttribute("kstrackParams", JSON.stringify(value));
          observer.observe(el);
        } else if (arg === "pv") {
          logPV(value);
        }
      },
    });
  },
};
