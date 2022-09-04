import { TUserInfo, TUserInfoRaw } from '../Domain';

export const userMapper = (userRaw: TUserInfoRaw): TUserInfo => {
  const { Id, DN, Name, Groups } = userRaw;
  const user = {} as TUserInfo;
  if (Id) { user.id = Id; }
  if (DN) { user.dn = DN; }
  if (Name) { user.name = Name; }
  if (Groups) { user.groups = Groups; }
  return user;
};
