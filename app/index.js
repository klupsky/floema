import each from 'lodash/each';
import About from 'pages/About';
import Collections from 'pages/Collections';
import Detail from 'pages/Detail';
import Home from 'pages/Home';

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.addLinkListeners();
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
    console.log(this.template);
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  // the following two functions prevent a link from happening, fetch the url of that link, take its html and preload it in the content div

  async onChange(url) {
    const request = await window.fetch(url);
    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');
      div.innerHTML = html;
      const divContent = div.querySelector('.content');
      this.content.setAttribute(
        'data-template',
        divContent.getAttribute('data-template')
      );
      this.content.innerHTML = divContent.innerHTML;
      console.log(html);
    } else {
      console.log('error');
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a');

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;
        this.onChange(href);
        console.log(event, href);
      };
    });
  }
}

new App();
