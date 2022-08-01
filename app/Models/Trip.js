import { generateId } from "../Utils/generateId.js"
import { ProxyState } from "../AppState.js"



export class Trip{
  constructor(data){
    this.id = data.id || generateId()
    this.name = data.name
    this.type = data.type
    this.notes = data.notes
    this.collapsed = data.collapsed || false
  }



  get Template(){
    return `
    <div class="col-md-12 mb-5 bg-main rounded elevation-5 text-light">
      <section class="row align-items-center">
        <div class="col-md-1">
          <button class="btn text-light fs-3">
            <i id="icon" class="mdi mdi-arrow-down-drop-circle-outline" onclick="app.tripsController.toggleCollapse('${this.id}') ; app.tripsController.changeIcon('${this.id}')"></i>
          </button>
        </div>
        <div class="col-md-4">
        <h2>
            ${this.name}
          </h2>
        </div>
        <div class="col-md-6">
          <h2>
            ${this.type}
          </h2>
        </div>
        <div class="col-md-1 text-end">
          <button class="btn text-light" onclick="app.tripsController.deleteTrip('${this.id}')">
          <i class="mdi mdi-delete fs-3"></i>
        </div>
      </section>
      <section class="${this.collapsed ? 'collapse' : ''}">
        <section id="reservations">
          
      ${this.Reservations}


        </section>
        <form class="row bg-reserve text-dark m-3 py-2 rounded elevation-3" onsubmit="app.reservationsController.createReservation('${this.id}')">
          <div class="col-12">
            <div class="row align-items-end text-reserve">
              <div class="col-md-1">
                <select class="form-control selectable" name="type" id="type" required>
                  <option value="">Type</option>
                  <option value="Flight">Flight</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Car Rental">Car Rental</option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label" for="name"></label>
                <input class="form-control" type="text" id="name" name="name" placeholder="Name..." required>
              </div>
              <div class="col-md-3">
                <label class="form-label" for="confirmation"></label>
                <input class="form-control" type="text" id="confirmation" name="confirmation" placeholder="Confirmation Number..." required>
              </div>
              <div class="col-md-3">
                <label class="form-label" for="address"></label>
                <input class="form-control" type="text" id="address" name="address" placeholder="Address..." required>
              </div>
              <div class="col-md-2">
                <label for="date" class="form-label"></label>
                <input class="form-control no-select" name="date" id="date" type="date" required
                  aria-describedby="helpId" placeholder="">
              </div>
              <div class="col-md-1">
                <label class="form-label" for="cost"></label>
                <input class="form-control" type="number" id="cost" name="cost" placeholder="Cost..." required>
              </div>
            </div>
          </div>
          <div class="col-12 text-end my-2">
            <button class="btn bg-main">Reserve</button>
          </div>
          <div class="col-12">
            <div class="row align-items-end justify-content-between">
              <div class="col-md-3 mt-5 mb-3">
                <label class="form-label fw-bold">Notes:</label>
                  <textarea rows="3" class="form-control text-reserve" onblur="app.tripsController.editTrip('${this.id}')">${this.notes}</textarea>
              </div>
              <div class="col-md-2 text-end">
                <h2>TOTAL: $${this.tripTotal}</h2>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
    
    `
  }


  get Reservations(){
    let template = ''
    // NOTE only get items that exist for this party, by matching the items partyId to this party's id
    let reservations = ProxyState.reservations.filter(r => r.tripId == this.id)
    reservations.forEach(r => template += r.Template)
    if(template){
      return template
    } else {
      return `
      <div class="row bg-reserve text-dark m-3 rounded elevation-3 align-items-center">
        <p class="p-3 fw-bold">PLEASE SCHEDULE A RESERVATION BELOW</p>
      </div>  
        `

    }
  }

  get tripTotal(){
    let total = 0
    let reservations = ProxyState.reservations.filter(r => r.tripId == this.id)
    console.log(reservations);
    reservations.forEach(r => total += r.cost)
    return total
  }
}



