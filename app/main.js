import { ReservationsController } from "./Controllers/ReservationsController.js";
import { TripsController } from "./Controllers/TripsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();

  tripsController = new TripsController()
  reservationsController = new ReservationsController
}

window["app"] = new App();
