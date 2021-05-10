import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like, In } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResUser } from './../user/models/res.user.model';
import { IPagination } from 'src/base-model/pagination-result';
import { Mapper } from 'src/common/mapper';
import { GetAllAction, Problem, GetAction, UpdateAction, CreateAction, DeleteAction } from 'src/common';
import { ReqUser } from './models/req.user.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { Company } from 'src/company/entities/company.entity';
import { GroupUser } from 'src/group-user/entities/group-user.entity';
import { MailerService } from "@nestjs-modules/mailer";
import { Crypto } from '../auth/crypt';
interface MailData {
    to: string, subject: string, text: string, html: string
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Company)
        private companyRepository: Repository<Company>,

        @InjectRepository(GroupUser)
        private groupUserRepository: Repository<GroupUser>,

        private mailerService: MailerService,
    ) {

    }

    // Get all data
    async findAll(req: Request, paging?: Pagination) {
        try {

            const rows = await this.userRepository.findAndCount({
                where: {
                    DeleteFlag: DeleteFlag.None,
                    andWhere: [{
                        Name: Like(`%${paging.filter || ''}%`),
                    }, {
                        Description: Like(`%${paging.filter || ''}%`),
                    }],
                },
                order: {
                    Name: 'ASC',
                },
                //skip: paging.page * paging.pageSize,
                //take: paging.pageSize,
            });

            return {
                data: Mapper.map(ResUser, rows[0]),
                paging: { page: paging.page, pageSize: paging.pageSize, count: rows[1] },
            } as IPagination;
        } catch (error) {
            Logger.error(GetAllAction.GetFromDB, error);
            return Problem.InternalServerError();
        }
    }

    // Get all data
    async getUserByIds(req: Request, paging?: Pagination) {
        try {
            console.log(req.body.ids);
            const rows = await this.userRepository.find({
                where: {
                    DeleteFlag: DeleteFlag.None,
                    Id: In(req.body.ids)
                },
                order: {
                    Name: 'ASC',
                },
            });
            console.log(rows)
            return rows && Mapper.map(ResUser, rows);

        } catch (error) {
            Logger.error(GetAllAction.GetFromDB, error);
            return Problem.InternalServerError();
        }


    }

    async get(req: Request, id: string) {
        try {
            const user = await this.userRepository.findOne({ Id: id, DeleteFlag: DeleteFlag.None });
            if (!user) {
                return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(User.name));
            }
            return Mapper.map(ResUser, user);
        } catch (error) {
            Logger.error(GetAction.GetFromDB, error);
            return Problem.InternalServerError();
        }

    }

    async create(req: Request, body: ReqUser): Promise<User | Problem> {
        // [1] validate data
        const validMessages = ReqUser.runValidator(body);
        if (validMessages?.length > 0) {
            Logger.log(CreateAction.ValidateRequest);
            return Problem.BadRequest(validMessages);
        }
        // cai nay sua lai, dau tien get thong tin của nguoi dang nhap, sau do clone thong tin chung : company id....
        // check company_id
        console.log(req.body.user);
        let createUser: User = await this.userRepository.findOne({
            Email: req.body.user.email
        })
        let company: Company;
        try {
            company = await this.companyRepository.findOne({ Id: createUser.CompanyId, DeleteFlag: DeleteFlag.None });
            if (!company) {
                return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Company.name));
            }
        } catch (ex) {
            Logger.log(CreateAction.ValidateRequest);
            return Problem.InternalServerError();
        }

        // check group_user_id
        let groupUser: GroupUser;
        try {
            groupUser = await this.groupUserRepository.findOne({ Id: body.group_user_id, DeleteFlag: DeleteFlag.None });
            // if (!groupUser) {
            //     return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(GroupUser.name));
            // }
        } catch (ex) {
            Logger.log(CreateAction.ValidateRequest);
            return Problem.InternalServerError();
        }
        let code = '';
        // Tạo ngẫu nhiên 6 ký tự được cấp dưới dạng (0-9 a-z A-Z) 
        try {

            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                code += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        } catch (ex) {
            return Problem.InternalServerError();
        }
        try {
            const user = new User();
            user.Name = body.name;
            user.Description = body.description;
            user.Birthday = body.birthday;
            user.Phone = body.phone;
            user.Adress = body.adress;
            user.Email = body.email;
            user.Gender = body.gender;
            user.Avatar = body.avatar;
            user.Position = body.position;
            user.Username = body.user_name;
            // user.Password = body.password;
            user.Company = company;
            // user.GroupUser = groupUser;
            user.IsVerified = 0;
            user.Code = code;
            user.setBaseDataInfo(req);

            await this.userRepository.save(user);

            // send email to verify code

            try {
                // send email
                const mailer = {
                    to: user.Email, subject: 'register', text: 'verify code: ' + user.Code,
                    html: `<a href="http://localhost:4200/authentication/verify/${user.Code}">Verify Code</a>`
                } as MailData;
                await this
                    .mailerService
                    .sendMail({
                        to: mailer.to, // list of receivers
                        from: 'htlipstick@gmail.com', // sender address
                        subject: mailer.subject, // Subject line
                        text: mailer.text, // plaintext body
                        html: mailer.html, // HTML body content
                    });
            } catch (error) {
                console.log(error);

                return Problem.InternalServerError();
            }


            return Mapper.map(ResUser, user);
        } catch (error) {
            Logger.error(CreateAction.CheckFromDB, error);
            return Problem.InternalServerError();
        }
    }


    async update(req: Request, id: string, body: ReqUser): Promise<User | Problem> {
        // [1] validate data
        const validMessages = ReqUser.runValidator(body);
        if (validMessages?.length > 0) {
            Logger.log(UpdateAction.ValidateRequest);
            return Problem.BadRequest(validMessages);
        }
        // [2] Check exist on DB
        // tslint:disable-next-line:prefer-const
        let user;
        try {
            user = await this.userRepository.findOne({ Id: id, DeleteFlag: DeleteFlag.None });
            if (!user) {
                return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(User.name));
            }
        } catch (error) {
            Logger.error(UpdateAction.CheckFromDB, error);
            return Problem.InternalServerError();
        }

        // check company id
        let company: Company;
        if (body.company_id && user.CompanyId !== body.company_id) {
            let company: Company;
            try {
                company = await this.companyRepository.findOne({ Id: body.company_id, DeleteFlag: DeleteFlag.None });
                if (!company) {
                    return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Company.name));
                }
            } catch (ex) {
                Logger.log(CreateAction.ValidateRequest);
                return Problem.InternalServerError();
            }
        }


        let groupUser: GroupUser;
        if (body.group_user_id && user.GroupUserID !== body.group_user_id) {
            // check groupUser id
            let groupUser: GroupUser;
            try {
                groupUser = await this.groupUserRepository.findOne({ Id: body.group_user_id, DeleteFlag: DeleteFlag.None });
                if (!groupUser) {
                    return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(GroupUser.name));
                }
            } catch (ex) {
                Logger.log(CreateAction.ValidateRequest);
                return Problem.InternalServerError();
            }
        }
        // Update value
        try {
            user.Name = body.name || user.Name;
            user.Description = body.description || user.Description;
            user.Birthday = body.birthday || user.Birthday;
            user.Phone = body.phone || user.Phone;
            user.Adress = body.adress || user.Adress;
            user.Email = body.email || user.Email;
            user.Position = body.position || user.Position;
            user.PassWord = body.password || user.PassWord;
            user.Avatar = body.avatar || user.Avatar;
            user.UserName = body.user_name || user.UserName;
            user.Gender = body.gender || user.Gender;
            user.CompanyId = company?.Id || user.CompanyId;
            user.GroupUserID = groupUser?.Id || user.GroupUserID;
            user.setBaseDataInfo(req);

            await this.userRepository.save(user);
            return Mapper.map(ResUser, user);
        } catch (error) {
            Logger.log(UpdateAction.UpdateValue, error);
            return Problem.InternalServerError();
        }
    }

    async delete(req: Request, id: string): Promise<Problem> {
        // Check id
        if (!(id)) {
            return new Problem({ status: HttpStatus.BAD_REQUEST, message: Consts.MSG_FIELD_REQUIRED(BaseFields.Id) });
        }
        // Get user by id from db
        let user;
        try {
            user = await this.userRepository.findOne({ Id: id, DeleteFlag: DeleteFlag.None });
            if (!user) {
                return Problem.NotFound(user.MSG_OBJ_NOT_FOUND(User.name));
            }
        } catch (error) {
            Logger.log(DeleteAction.CheckFromDB, error);
            return Problem.InternalServerError();
        }

        // change flag save to db
        try {
            user.DeleteFlag = DeleteFlag.Yes;
            await this.userRepository.save(user);
            return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(User.name, user.Id));
        } catch (error) {
            return error;
        }
    }


    async verifyCode(req: Request, code: string) {
        // get data user registed 
        let user: User;
        try {
            user = await this.userRepository.findOne({
                relations: ['Company'],
                where: {
                    Code: code
                }
            })
            // neeus ko tim duoc user da dang ky theo code
            if (!user) {
                return Problem.NotFound('User not found');
            }

            user.IsVerified = 1;
            await this.userRepository.save(user);
        } catch (error) {
            return Problem.InternalServerError();
        }
        // loign
        return user;
    }
}
