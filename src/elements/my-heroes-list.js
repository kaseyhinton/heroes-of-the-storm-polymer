import {Element} from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-styles/typography.js';
import '../../node_modules/@polymer/paper-styles/color.js';
import "../../node_modules/@polymer/paper-button/paper-button.js";
import "../../node_modules/@polymer/paper-fab/paper-fab.js";
import "../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../node_modules/@polymer/polymer/lib/elements/dom-if.js";
import "../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../../node_modules/@polymer/paper-item/paper-item.js";
import "../../node_modules/@polymer/app-route/app-location.js";
import "../../node_modules/@polymer/app-route/app-route.js";
import "../../node_modules/@polymer/iron-pages/iron-pages.js";

const html = (template) => template.toString();

export class MyHeroesList extends Element {
    static get template() {
        return html `
        <style>
            hero-item {
                display: flex;
                padding: 0.5rem 0;
            }
            hero-item a {
                color: #757575;
                text-decoration: none;
            }
            hero-item a:hover {
                color: var(--paper-blue-500);
            }
        </style>
        <dom-repeat items="{{heroes}}">
            <template>
                <hero-item>
                    <a href="/hero/[[item.PrimaryName]]">
                            [[item.PrimaryName]]
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