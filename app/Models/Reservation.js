import { generateId } from "../Utils/generateId.js"



export class Reservation {
  constructor(data) {
    this.id = data.id || generateId()
    this.type = data.type
    this.name = data.name
    this.confirmation = data.confirmation
    this.address = data.address
    this.date = new Date(data.date)
    this.cost = data.cost
    this.tripId = data.tripId
  }

  get Template() {
    return `
    <div class="row m-3 fw-bold">
      <div class="col-6 col-md-2">Type</div>
      <div class="col-6 col-md-2">Name</div>
      <div class="col-6 col-md-3">Address</div>
      <div class="col-6 col-md-1">Confirmation</div>
      <div class="col-6 col-md-2">Date</div>
      <div class="col-6 col-md-1">Cost</div>
    </div>
    <div class="row bg-reserve text-reserve text-dark m-3 py-2 rounded elevation-3 align-items-center">
      <div class="col-6 col-md-2">${this.type}</div>
      <div class="col-6 col-md-2">${this.name}</div>
      <div class="col-6 col-md-3">${this.address}</div>
      <div class="col-6 col-md-1">${this.confirmation}</div>
      <div class="col-6 col-md-2">${this.date.toLocaleDateString('en-US')}</div>
      <div class="col-6 col-md-1">${this.cost}</div>
      <div class="col-12 col-md-1 text-end">
        <button class="btn text-dark fs-4"><i class="mdi mdi-minus-circle-outline" onclick="app.reservationsController.deleteReservation('${this.id}')"></i></button>
      </div>
    </div>
    `
  }

}
