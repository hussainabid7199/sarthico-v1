"use-strict";
import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({
  timestamps: false,
  tableName: "users_otp",
})
export default class UserOTPModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({
    field: "userId",
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  userId!: string;

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
    field: "otp",
  })
  otp!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "createdOn",
  })
  createdOn!: Date;

  @BelongsTo(() => UserModel)
  declare user: UserModel;
}
