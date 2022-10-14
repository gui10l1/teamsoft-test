import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ClientsController from "../controller/ClientsController";

const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.get('', clientsController.index);
clientsRoutes.get(
  '/:clientId',
  celebrate({
    [Segments.PARAMS]: {
      clientId: Joi.string().required(),
    }
  }),
  clientsController.find
);

clientsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
      socialReason: Joi.string().required(),
      contactName: Joi.string().required(),
      phone: Joi.string().required(),
    }
  }),
  clientsController.create
);

clientsRoutes.put(
  '/:clientId',
  celebrate({
    [Segments.PARAMS]: {
      clientId: Joi.string().required(),
    },
    [Segments.BODY]: {
      document: Joi.string().empty(''),
      socialReason: Joi.string().empty(''),
      contactName: Joi.string().empty(''),
      phone: Joi.string().empty(''),
    }
  }),
  clientsController.update
);

clientsRoutes.delete(
  '/:clientId',
  celebrate({
    [Segments.PARAMS]: {
      clientId: Joi.string().required(),
    }
  }),
  clientsController.delete
);


export default clientsRoutes;
