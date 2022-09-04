import { TUser, TUserInfo, TUserInfoRaw } from '../Domain';

export const userMapper = (userRawInfo: TUserInfoRaw): TUser => {
  const { auth: authType, user: userRaw } = userRawInfo;
  const { Id, DN, Name, Groups } = userRaw;
  const user = {} as TUserInfo;
  if (Id) { user.id = Id; }
  if (DN) { user.dn = DN; }
  if (Name) { user.name = Name; }
  if (Groups) { user.groups = Groups; }
  return { authType, user };
};
