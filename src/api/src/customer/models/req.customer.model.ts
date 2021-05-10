import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqCustomer {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  identity_card: string;

  @ApiProperty()
  login_code: string;

  @ApiProperty()
  logincode_expired: string;

  constructor(json?: Customer) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.birthday = json?.Birthday || undefined;
    this.phone = json?.Phone || '';
    this.address = json?.Address || '';
    this.email = json?.Email || '';
    this.gender = json?.Gender || '';
    this.identity_card = json?.IdentityCard || '';
    this.login_code = json?.LoginCode || '';
    this.logincode_expired = json?.LogincodeExpired || '';
  }
  public static runValidator(customer: ReqCustomer) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(customer.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}
