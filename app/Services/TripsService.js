import { ProxyState } from "../AppState.js"
import { Trip } from "../Models/Trip.js"



class TripsService{

  createTrip(newTrip){
    ProxyState.trips = [...ProxyState.trips, new Trip(newTrip)]
    console.log(ProxyState.trips);
  }

  deleteTrip(id){
    ProxyState.trips = ProxyState.trips.filter(t => t.id != id)
    console.log('deleting', id);
  }

  toggleCollapse(tripId){
    let trip = ProxyState.trips.find(t => t.id == tripId)
    trip.collapsed = !trip.collapsed

    ProxyState.trips = ProxyState.trips
    console.log(tripId);
  }

  editTrip(id, newText){
    let trip = ProxyState.trips.find(t => t.id == id)
    trip.notes = newText
    ProxyState.trips = ProxyState.trips
  }



}

export const tripsService = new TripsService()