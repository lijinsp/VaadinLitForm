import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './form.js'
//const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

@customElement('registration-form')
export class RegistrationForm extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = css`
    
  `;

  render() {
    return html`
     <form-layout-basic></form-layout-basic>
    `;
  }
}
