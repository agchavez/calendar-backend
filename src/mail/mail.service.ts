import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface IUserMail {
  firstName: string;
  lastName: string;
  email: string;
  url: string;
}
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  //Enviar correo de confirmacion de usuario
  async sendConfirmationEmail(user: IUserMail) {
    try {
      console.log('Correo procesado');
      await this.mailerService.sendMail({
        to: user.email,
        from: 'Sistema de eventos <angelchavez.325.ac@gmail.com>',
        subject: 'Confirmacion de cuenta',
        context: {
          name: user.firstName + ' ' + user.lastName,
          url: user.url,
        },
        template: 'confirmation',
      });
      console.log('Correo enviado');
    } catch (error) {
      console.log(error);
    }
  }
}
