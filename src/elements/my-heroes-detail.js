import {Element} from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-icons/iron-icons.js';
import '../../node_modules/@polymer/iron-image/iron-image.js';
import '../../node_modules/@polymer/paper-card/paper-card.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../styles/my-shared-styles.js';

const html = (template) => template.toString();

export class MyHeroesDetail extends Element {
  static get template() {
    return html `
        <style>
           iron-icon {
               color: var(--paper-grey-600);
               transition: .5s ease;
           }

           iron-icon:hover {
               color: var(--paper-blue-500);
           }

           card-details,
           detail-container {
               @apply --layout-flex-auto;
               @apply --layout-vertical;
           }

           card-details {
                padding: 2rem;
           }

           paper-card {
               @apply --layout-horizontal;
           }

           .card-image {
               background-color: var(--paper-grey-200);
               width: 206px;
               height: 300px;
           }

           hero-group {
               padding: 0 6rem;
           }

           header-container {
               @apply --layout-horizontal;
               @apply --layout-center;
               margin-bottom: 2rem;
           }

           header-container > h3 {
            margin: 0 0 0 2rem;
           }
           header-container > a {
               color: var(--paper-grey-600);
           }
        </style>
        <app-location route="{{route}}"></app-location>
        <app-route
            route="{{route}}"
            pattern="/hero/:hero"
            data="{{routeData}}">
        </app-route>
        <detail-container>
            <paper-card>
                <card-details>
                    <header-container>
                        <a href="/">
                            <paper-icon-button icon="arrow-back"></paper-icon-button>
                        </a>
                        <h3>[[hero.PrimaryName]]</h3>
                    </header-container>  
                    <hero-group>
                        <div>[[hero.Group]]</div>
                        <div>[[hero.SubGroup]]</div>
                    </hero-group>
                </card-details>
                <iron-image sizing="cover" src="[[hero.ImageURL]]" class="card-image">
                </iron-image>
            </paper-card>
        </detail-container>
        `;
  }

  constructor() {
    super();
    this.hero = {};
  }

  static get properties() {
    return {
      hero: {type: Object}, heroName: {type: String}, isLoading: {
        type: Boolean, notify: true
      }
    }
  }

  static get observers() { return ['_routePageChanged(routeData.hero)']; }

  _routePageChanged(heroName) {
    if (!heroName) return;
    this.heroName = heroName;
    this.query(heroName);
  }

  query(heroName) {
    this.isLoading = true;

    const variables =
    { PrimaryName: heroName }

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
                        let data = res.data;
                        this.hero = res.data.hero;
                        this.isLoading = false;
                      });
  }
}

customElements.define('my-heroes-detail', MyHeroesDetail);