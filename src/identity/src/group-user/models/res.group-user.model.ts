import { Mapper } from 'src/common';
import { ResUser } from 'src/user/models/res.user.model';
import { GroupUser } from '../entities/group-user.entity';

export class ResGroupUser {
    id: string;
    name: string;
    description: string;
    roles:string;

    constructor(json?: GroupUser) {
        this.id = json?.Id;
        this.name = json?.Name;
        this.description = json?.Description;
        this.roles = json?.Roles;
    }
}
