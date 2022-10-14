import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import AddressesController from "../controllers/AddressesController";

const addressesRoutes = Router();
const addressesController = new AddressesController();

addressesRoutes.get('', addressesController.index);
addressesRoutes.get(
  '/:addressId',
  celebrate({
    [Segments.PARAMS]: {
      addressId: Joi.string().required(),
    }
  }),
  addressesController.find
);

addressesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      address: Joi.string().required(),
      number: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
      complement: Joi.string().empty(''),
      clientId: Joi.string().required(),
    }
  }),
  addressesController.create
);

addressesRoutes.put(
  '/:addressId',
  celebrate({
    [Segments.PARAMS]: {
      addressId: Joi.string().required(),
    },
    [Segments.BODY]: {
      address: Joi.string().empty(''),
      number: Joi.string().empty(''),
      neighborhood: Joi.string().empty(''),
      city: Joi.string().empty(''),
      state: Joi.string().empty(''),
      postalCode: Joi.string().empty(''),
      complement: Joi.string().empty(''),
      clientId: Joi.string().empty(''),
    }
  }),
  addressesController.update
);

addressesRoutes.delete(
  '/:addressId',
  celebrate({
    [Segments.PARAMS]: {
      addressId: Joi.string().required(),
    }
  }),
  addressesController.delete
);

export default addressesRoutes;
