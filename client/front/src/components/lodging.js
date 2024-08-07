class Lodging extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
  }

  async render () {
    this.shadow.innerHTML =
      /* html */`
      
      <style>
        
        .main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 10vh
        }

      </style>
      
      <div class='main'>
        <slot></slot>
      </div>
      `

  }
}

customElements.define('lodging-component', Lodging)
