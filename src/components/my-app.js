/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';

class MyApp extends LitElement {
  _render({appTitle, _page, _drawerOpened, _snackbarOpened, _offline}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      :host {
        display: block;

        --app-primary-color: #E91E63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

    </style>

    <div role="main">
      <my-heroes class="page" heroes="${this._heroes}" active?="${_page === 'heroes'}"></my-heroes>
      <my-hero class="page" hero="${this._hero}" active?="${_page === 'hero'}"></my-hero>
    </div>

    <snack-bar active?="${_snackbarOpened}">Error</snack-bar>
    `;
  }

  static get properties() {
    return {
      _page: String,
      _heroes: Array,
      _hero: Object
    }
  }

  constructor() {
    super();
    this.heroes = [];
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => this._locationChanged(location));
  }

  _locationChanged() {
    const path = window.decodeURIComponent(window.location.pathname);
    const page = path === '/' ? 'heroes' : path.slice(1);

    const parts = path.split('/');
    if(parts.length > 2){
      this._loadPage(parts[1]);
      return;
    }

    this._loadPage(page);
    }


  _loadPage(page) {
    switch(page) {
      case 'hero':
        import('../components/my-hero.js').then(() => {

          const path = window.decodeURIComponent(window.location.pathname);
          const parts = path.split('/');
          const PrimaryName = parts[2];
          const variables = { PrimaryName }
      
          const query = `
              query getHero($PrimaryName: String!) {
                  hero(PrimaryName: $PrimaryName) {
                    PrimaryName
                    ImageURL
                    Group
                    SubGroup
                  }
                }
            `

            fetch('http://207.246.117.229/heroes-of-the-storm/graphql',
                  {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({query, variables})
                  })
                .then(res => res.json())
                .then(res => {
                  this._hero = res.data.hero;
                });
              });
        break;
      case 'heroes':
      default:
        import('../components/my-heroes.js').then((module) => {
          fetch('http://207.246.117.229/heroes-of-the-storm/graphql',
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({query: '{ heroes { PrimaryName } }'})
            })
          .then(res => res.json())
          .then(res => {
            let data = res.data.heroes;
            let heroes = Object.keys(data).map(key => data[key]);
            this._heroes = heroes;
          });
        });
        break;
    }

    this._page = page;
  }
}

window.customElements.define('my-app', MyApp);
