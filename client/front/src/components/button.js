class Button extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.apiUrl = this.getAttribute('api-url')
    this.route = this.getAttribute('route')
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
          height: 100vh
        }

        button {
          background-color: hsla(0, 0%, 0%, 1);
          color: hsla(0, 100%, 100%, 1);
          border: none;
          padding: 1.5rem 2rem;
          border-radius: 50px;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (hover: hover){
          button:hover {
            background-color: hsla(0, 100%, 100%, .1);
          }
        }

      </style>
      
      <button class="data-button">Datos</button>

      `

    const dataButton = this.shadow.querySelector('.data-button')

    dataButton.addEventListener('click', async () => {  
      const data = await this.getData()
      const response = await this.sendData(data)
      document.dispatchEvent(new CustomEvent('show-table', {
        detail: {
          route: this.route
        }
      }))
    })
  }

  async getData() {
    const response = await fetch(`${this.apiUrl}`)
    const rawData = await response.json()

    return rawData
  }

  async sendData(data) {
    await fetch(`${import.meta.env.VITE_API_URL}${this.route}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }


}

customElements.define('button-component', Button)