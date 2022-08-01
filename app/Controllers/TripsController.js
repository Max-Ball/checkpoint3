import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js";


function _draw(){
  let template = ''
  let trips = ProxyState.trips.sort((a, b) => a.date - b.date)
  trips.forEach(t => template += t.Template)
  document.getElementById('trips').innerHTML = template
  console.log(trips);
}



export class TripsController{
  constructor(){
    console.log(ProxyState.trips);
    ProxyState.on('trips', _draw)
    ProxyState.on('reservations', _draw)
    ProxyState.on('trips', saveState)
    ProxyState.on('reservations', saveState)
    loadState()
    _draw()

  }

  createTrip(){
    window.event.preventDefault()
    let form = window.event.target

    let newTrip = {
      name: form.name.value,
      type: form.type.value,
      notes: form.notes.value,
    }
    console.log(newTrip);

    tripsService.createTrip(newTrip)
    form.reset()
    Pop.toast('Trip Created!')
  }

  async deleteTrip(id){
    if(await Pop.confirm()){
      tripsService.deleteTrip(id)
    }
  }

  toggleCollapse(tripId){
    tripsService.toggleCollapse(tripId)
    console.log('???');
  }

  changeIcon(){
    let icon = document.getElementById('icon')
    icon.classList.toggle('mdi-plus');
    icon.classList.toggle('mdi-arrow-down-drop-circle-outline')
    console.log('working?');
  } 

  editTrip(id){
    console.log('editing', id);
    let newText = window.event.target.value
    tripsService.editTrip(id, newText)
  }


}