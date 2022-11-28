import router from "./router";

export default function renderPage(route = "login", query = ".app"): void {
  const root = document.querySelector(query);
  const page = router(route);
  const content = page.getContent() as HTMLElement;
  root?.replaceChildren(content);
}

// interface Window {
//   renderPage: (route?: string, query?: string) => void;
// }
const global = window as any;

global.renderPage = renderPage;
