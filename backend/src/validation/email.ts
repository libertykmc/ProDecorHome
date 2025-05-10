import { BadRequestException, PipeTransform } from '@nestjs/common';

export class EmailValidationPipe
  implements PipeTransform<{ login: string }, any>
{
  transform(value: { login: string }): any {
    if (!this.isValidEmail(value.login)) {
      throw new BadRequestException('Invalid email address');
    }
    return value;
  }

  isValidEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }
}
