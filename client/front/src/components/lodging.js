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
      
      <div class='main'>
        <button class="send-button">Enviar</button>
      </div>
      `

    const dataButton = this.shadow.querySelector('.send-button')

    dataButton.addEventListener('click', async () => {
      const response = await fetch('https://catalegdades.caib.cat/resource/j2yj-e83g.json')
      const data = await response.json()

      await fetch(`${import.meta.env.VITE_API_URL}/api/front/lodging`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    })
  }
}

customElements.define('lodging-component', Lodging)
