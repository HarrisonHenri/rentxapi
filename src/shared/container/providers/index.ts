import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherialMailProvider } from "./MailProvider/implementations/EtherialMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherialMailProvider()
);
