import { Reservation } from "./Models/Reservation.js"
import { Trip } from "./Models/Trip.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []

/** @type {import('./Models/Trip').Trip[]} */

  trips = [
    new Trip({
      name: 'Disneyland', 
      type:'Personal'}),

    new Trip({
    name: 'Big Annual Conference', 
    type:'Business'})
  ]

/** @type {import('./Models/Reservation').Reservation[]} */

  reservations = [new Reservation({
    type: 'hotel',
    name: 'big ass hotel',
    confirmation: 'aefese',
    address: '3119 E. Bonview Dr.',
    date: '03/03/1995',
    cost: 33.33
    })
  ]
}



export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
