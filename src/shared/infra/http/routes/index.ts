import { Router } from "express";
import addressesRoutes from "../../../../modules/addresses/infra/http/routes/addresses.routes";
import clientsRoutes from "../../../../modules/clients/infra/http/routes/clients.routes";

const routes = Router();

routes.use('/clients', clientsRoutes);
routes.use('/addresses', addressesRoutes);

export default routes;
