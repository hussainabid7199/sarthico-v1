"use-strict"
import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  BelongsToMany,
} from "sequelize-typescript";
import { UserRoleMappingModel } from "./UserRoleMappingModel";
import { RoleModel } from "./RoleModel";

@Table({
  timestamps: false,
  tableName: "users",
})
export class UserModel extends Model {

  userId!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string; 
  confirmPassword!: string;
  phone!: string;
  createdOn!: Date;
  updatedOn?: Date;
  isActive!: boolean;
  isDeleted!: boolean;
  parentUserId?: string;


  @Column({
    field: "userId",
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  })
  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
    field: "firstName",
  })
  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
    field: "lastName",
  })
  @Column({
    type: DataTypes.STRING(250),
    allowNull: false,
    field: "email",
  })
  @Column({
    type: DataTypes.STRING(20),
    allowNull: false,
    field: "password",
  })
  @Column({
    type: DataTypes.STRING(20),
    allowNull: false,
    field: "confirmPassword",
  })
  @Column({
    type: DataTypes.STRING(20),
    allowNull: false,
    field: "phone",
  })
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "createdOn",
  })
  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: "updatedOn",
  })
  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: "isActive",
  })
  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "isDeleted",
  })
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    field: "parentUserId",
    allowNull: true,
  })



  @HasMany(() => UserModel, { as: 'children', foreignKey: 'parentUserId' })
  childUsers!: UserModel[];

  @HasOne(() => UserModel, { as: 'parent', foreignKey: 'parentUserId' })
  parentUser!: UserModel; 

  @BelongsToMany(() => RoleModel, () => UserRoleMappingModel, 'userId', 'roleId')
  roles!: RoleModel[];
}
