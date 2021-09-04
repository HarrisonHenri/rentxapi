import { IMailProvider } from "../IMailProvider";

class EtherialMailProviderInMemory implements IMailProvider {
  mails: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.mails.push({ to, subject, variables, path });
  }
}

export { EtherialMailProviderInMemory };
