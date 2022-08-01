import { ProxyState } from "../AppState.js";
import { Reservation } from "../Models/Reservation.js";

class ReservationsService{

  createReservation(newReservation){
    console.log('service loaded');
    ProxyState.reservations = [...ProxyState.reservations, new Reservation(newReservation)]
    ProxyState.reservations = ProxyState.reservations.sort((a, b) => a.date - b.date)
    console.log('reserve service', ProxyState.reservations);
  }

  deleteReservation(id){
    ProxyState.reservations = ProxyState.reservations.filter(r => r.id != id)
  }


}

export const reservationsService = new ReservationsService()