import {
    Element
}
from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/paper-styles/typography.js';
import '../node_modules/@polymer/paper-styles/color.js';
import "../node_modules/@polymer/paper-button/paper-button.js";
import "../node_modules/@polymer/paper-fab/paper-fab.js";
import "../node_modules/@polymer/iron-icons/iron-icons.js";
import "../node_modules/@polymer/polymer/lib/elements/dom-if.js";
import "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../node_modules/@polymer/paper-item/paper-item.js";

const html = (template) => template.toString();

export class MyApp extends Element {
    static get template() {
        return html `
        <style>
            * {
                user-select: none;
                cursor: default;
            }
            .indigo {
                background-color:  var(--paper-indigo-500);
                color: #fff;
            }
            paper-fab {
                position: fixed;
                bottom: 16px;
                right: 16px;
            }
        </style>
        <h1>[[name]]</h1>
        <paper-button id="toggleSecretsButton" raised class="indigo">Toggle Secret</paper-button>
        <dom-if if="[[showSecret]]">
            <template>
                I AM A SECRET.
            </template>
        </dom-if>
        <div>
            <paper-button id="getHeroesButton">Query Heroes</paper-button>
        </div>
        <div hidden$="[[!isLoading]]">
            Loading...
        </div>
        <dom-repeat items="{{heroes}}">
            <template>
                <paper-item>
                    <div>[[item.PrimaryName]]</div>
                </paper-item>
            </template>
        </dom-repeat>
        <paper-fab id="increment" icon="add"></paper-fab>
    `;
    }

    static get properties() {
        return {
            name: {
                type: String,
                value: 'Heroes Of The Storm'
            },
            showSecret: {
                type: Boolean,
                value: false
            },
            heroes: {
                type: Array,
                value: []
            },
            isLoading: {
                type: Boolean,
                value: false
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
                body: JSON.stringify({
                    query: '{ heroes { PrimaryName } }'
                }),
            })
            .then(res => res.json())
            .then(res => {
                let data = res.data.heroes;
                let heroes = Object.keys(data).map(key => data[key])
                this.heroes = heroes;
                this.isLoading = false;
            });
    }

    toggle() {
        this.showSecret = !this.showSecret;
    }

    ready() {
        super.ready();
        this.$.toggleSecretsButton.addEventListener('click', this.toggle.bind(this));
        this.$.getHeroesButton.addEventListener('click', this.query.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
    }
}

customElements.define('my-app', MyApp);