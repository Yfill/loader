export const loadStyle = (url: string, name: string) => {
  if (document.head.querySelector(`link[name="${name}"]`)) return;
  const link = document.createElement('link');
  link.href = url;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.setAttribute('name', name);
  document.head.appendChild(link);
};

export const unloadStyle = (name: string) => {
  const link = document.head.querySelector(`link[name="${name}"]`);
  link?.parentNode?.removeChild(link);
};

export default {
  loadStyle,
  unloadStyle,
};
