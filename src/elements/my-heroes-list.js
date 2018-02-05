import {Element} from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../styles/my-shared-styles.js';

const html = (template) => template.toString();

export class MyHeroesList extends Element {
    static get template() {
        return html `
        <style>
            hero-item {
                @apply --layout-flex-auto;
            }
            hero-item a {
                color: var(--paper-grey-600);
                text-decoration: none;
                transition: .5s ease;
            }
            hero-item a:hover {
                color: var(--paper-blue-500);
            }
        </style>
        <dom-repeat items="{{heroes}}">
            <template>
                <hero-item>
                    <a href="/hero/[[item.PrimaryName]]">
                        <paper-item>
                            [[item.PrimaryName]]
                        </paper-item>
                    </a>
                </hero-item>
            </template>
        </dom-repeat>
    `;
    }

    static get properties() {
        return {
            heroes: {
                type: Array,
                value: []
            },
            isLoading: {
                type: Boolean,
                notify: true
            }
        }
    }

    query() {
        this.heroes = [];
        this.isLoading = true;
        fetch('http://207.246.117.229/heroes-of-the-storm/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({query: '{ heroes { PrimaryName } }'})
            })
            .then(res => res.json())
            .then(res => {
                let data = res.data.heroes;
                let heroes = Object
                    .keys(data)
                    .map(key => data[key])
                this.heroes = heroes;
                this.isLoading = false;
            });
    }

    connectedCallback() {
        super.connectedCallback();
        this.query();
    }
}

customElements.define('my-heroes-list', MyHeroesList);