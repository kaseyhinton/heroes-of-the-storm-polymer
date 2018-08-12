/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

class MyHero extends PageViewElement {
  _render(props) {
    return html`
      <section>
       <h1>${props.hero.PrimaryName}</h1>
      </section>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    hero: Object
  }}

  constructor() {
    super();
    this.hero = {
      PrimaryName: ''
    }
  }
}

window.customElements.define('my-hero', MyHero);
