"use-strict"
import { DataTypes } from "sequelize";
import { Model, Column, ForeignKey, BelongsTo, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";
import { RoleModel } from "./RoleModel";

@Table({
  timestamps: false,
  tableName: "usersRolesMapping",
})
export class UserRoleMappingModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({
    field: "userId",
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  userId!: string;

  @ForeignKey(() => RoleModel)
  @Column({
    field: "roleId",
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  roleId!: string;

  @BelongsTo(() => UserModel)
  declare user: UserModel;

  @BelongsTo(() => RoleModel)
  declare role: RoleModel;
}
