export function jumpToSection(id) {
  const element = document.getElementById(id);
  if (!element) return false;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function goToSection(navigate, id) {
  if (jumpToSection(id)) return;
  navigate("/");
  window.setTimeout(() => jumpToSection(id), 80);
}