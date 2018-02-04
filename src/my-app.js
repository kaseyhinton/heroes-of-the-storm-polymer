import {Element} from '../node_modules/@polymer/polymer/polymer-element.js';
import "../node_modules/@polymer/app-route/app-location.js";
import "../node_modules/@polymer/app-route/app-route.js";
import "../node_modules/@polymer/app-layout/app-header/app-header.js";
import "../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js";
import "../node_modules/@polymer/iron-pages/iron-pages.js";
import "../node_modules/@polymer/paper-progress/paper-progress.js";
import "./elements/my-heroes-list.js";
import "./elements/my-heroes-detail.js";
import './styles/my-shared-styles.js';

const html = (template) => template.toString();

export class MyApp extends Element {
    static get template() {
        return html `
        <style>
            app-container {
                @apply --layout-vertical;
                padding: 2rem;
            }
            paper-progress {
                width: 100%;
                --paper-progress-active-color: var(--paper-blue-500);
                --paper-progress-container-color: var(--paper-blue-200);
            }
            [invisible] {
                visibility: hidden;
            }
            app-toolbar {
                background-color: var(--paper-blue-500);
                color: #fff;
            }
            app-toolbar [main-title]{
            }
        </style>
        <app-location route="{{route}}"></app-location>
        <app-route
            route="{{route}}"
            pattern="/:page"
            data="{{routeData}}">
        </app-route>
        <app-header reveals>
            <app-toolbar>
                <div main-title>Heroes Of The Storm</div>
                <paper-progress invisible$="[[!isLoading]]" indeterminate bottom-item></paper-progress>
            </app-toolbar>
        </app-header>
        <app-container>
            <iron-pages selected="[[page]]" attr-for-selected="name">
                <my-heroes-list is-loading="{{isLoading}}" name="heroes-list"></my-heroes-list>
                <my-heroes-detail is-loading="{{isLoading}}" name="hero"></my-heroes-detail>
            </iron-pages>
        </app-container>
    `;
    }

    static get properties() {
        return {
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            isLoading: {
                type: Boolean,
                value: false
            }
        }
    }

    _pageChanged(page) {
        // Lazy Import Later
    }

    static get observers() {
        return [
          '_routePageChanged(routeData.page)',
        ];
      }

      _routePageChanged(page) {
        // If no page was found in the route data, page will be an empty string.
        // Default to 'view1' in that case.
        this.page = page || 'heroes-list';
      }
}

customElements.define('my-app', MyApp);