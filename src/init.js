const headerInit = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('dropdown');
  divElement.innerText = 'Got it!'
  return divElement;
};

const footerInit = () => {
  const footer = document.createElement('footer');
  footer.setAttribute('style', 'position: fixed; bottom: 0; left: 0; right: 0');
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-copyright', 'text-center', 'py-3');
  const copyrightLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';
  copyrightDiv.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${copyrightLink}`;
  footer.classList.add('page-footer', 'bg-light', 'border-top');
  footer.append(copyrightDiv);
  return footer;
};

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element.append(headerInit(), footerInit());
};