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
  childUsers!: UserModel[]; // Ensure alias 'children' does not conflict with any attribute

  @HasOne(() => UserModel, { as: 'parent', foreignKey: 'parentUserId' })
  parentUser!: UserModel; // Ensure alias 'parent' does not conflict with any attribute

  @BelongsToMany(() => RoleModel, () => UserRoleMappingModel, 'userId', 'roleId')
  roles!: RoleModel[];// Ensure alias 'roles' does not conflict with any attribute
}
