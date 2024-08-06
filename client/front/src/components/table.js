class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/front/lodging`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.data = await response.json()
  }  

  async render () {
    this.shadow.innerHTML =
      /* html */`
      
      <style>
        
        .table {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          height: 90vh
        }

        button {
          background-color: hsla(0, 0%, 0%, 1);
          color: hsla(0, 100%, 100%, 1);
          border: none;
          padding: 1.5rem 2rem;
          border-radius: 50px;
          font-size: 1.5rem;
          cursor: pointer
        }

        @media (hover: hover){
          button:hover {
            background-color: hsla(0, 100%, 100%, .1)
          }
        }

        table {
          border-collapse: collapse;
          width: 100%;
          max-width: 1200px
        }

        th, td {
          border: 1px solid hsla(0, 0%, 0%, 1);
          padding: 8px;
          text-align: left;
        }

        th {
          background-color: hsla(0, 100%, 100%, 1)
        }

      </style>
      
      <div class='table'>
        <button class="show-button">Mostrar</button>
        <table class="data-table">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      `

    const showButton = this.shadow.querySelector('.show-button')

    showButton.addEventListener('click', async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/front/lodging`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      this.data = await response.json()

    })

    const tableHeaderRow = this.shadow.querySelector('thead tr')
    const tableBody = this.shadow.querySelector('tbody')

    Object.keys(this.data[0]).forEach(element => {
      const tableHeader = document.createElement('th')
      tableHeader.textContent = element
      tableHeaderRow.appendChild(tableHeader)
    })

    this.data.forEach(element => {

      const tableBodyRow = document.createElement('tr')

      Object.values(element).forEach(value => {
        const tableEntry = document.createElement('td')
        tableEntry.textContent = value
        tableBodyRow.appendChild(tableEntry)
      })

      tableBody.appendChild(tableBodyRow)
    })


  }
}

customElements.define('table-component', Table)
