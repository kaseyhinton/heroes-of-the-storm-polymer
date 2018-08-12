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

class MyHeroes extends PageViewElement {
  constructor(){
    super();
    this.heroes = [];
  }

  static get properties() {
    return {
      heroes: Array
    }
  }
  _render(props) {
    return html`
    <style>
      a {
        display: block;
      }
    </style>
      <section>
        <h2>Heroes</h2>
        <p>
        ${props.heroes.length > 0 ? props.heroes.map(hero => html`<a href="/hero/${hero.PrimaryName}">${hero.PrimaryName}</a>`) : html`<p>Loading...</p>`}
        </p>
      </section>
    `;
  }
}

window.customElements.define('my-heroes', MyHeroes);
