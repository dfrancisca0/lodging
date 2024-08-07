class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []

  }

  async connectedCallback () {
    document.addEventListener('show-table', this.handleShowTable.bind(this))
  }

  async handleShowTable(event){
    await this.loadData(event.detail.route)
    await this.render()
  }

  async loadData(route){
    const response = await fetch(`${import.meta.env.VITE_API_URL}${route}`)
    this.data = await response.json()
  }

  async render () {
    this.shadow.innerHTML =
      /* html */`
      
      <style>

        .table {
          display: flex;
          justify-content: center;
          align-items: center
        }
        table {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 90%;
          border-collapse: collapse;
          table-layout: fixed;
          color: hsla(0, 100%, 100%, 1)
        }

        th, td {
          border: 1px solid hsla(0, 100%, 100%, 1);
          padding: 8px;
          text-align: left;
          word-wrap: break-word
        }

        th {
          background-color: hsla(257, 53%, 63%, 1);
        }

        tbody {
          overflow-y: auto;
          display: block;
          max-height: 70vh;
          width: 100%
        }

        thead, tbody tr {
          display: table;
          width: 100%;
          table-layout: fixed
        }

      </style>
      
      <div class='table'>
        <table class="data-table">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      `

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
