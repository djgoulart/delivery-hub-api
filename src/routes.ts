import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticate";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController()


routes.post("/clients/", createClientController.handle);
routes.post("/clients/authenticate/", authenticateClientController.handle);

routes.post("/deliverers/", createDeliverymanController.handle);
routes.post("/deliverers/authenticate/", authenticateDeliverymanController.handle);

routes.post("/deliveries", ensureAuthenticateClient, createDeliveryController.handle);

export { routes };