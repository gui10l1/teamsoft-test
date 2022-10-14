import { container } from "tsyringe";
import locationConfig from "../../../config/locationConfig";
import FakeLocationProvider from "../LocationProvider/fakes/FakeLocationProvider";
import GoogleProvider from "../LocationProvider/implementations/GoogleProvider";
import ILocationProvider from "../LocationProvider/models/ILocationProvider";

const locationProviders = {
  sandbox: FakeLocationProvider,
  google: GoogleProvider,
}

container.registerSingleton<ILocationProvider>(
  'LocationProvider',
  locationProviders[locationConfig.provider]
);
