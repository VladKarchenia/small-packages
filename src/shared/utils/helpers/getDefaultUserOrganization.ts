import { IUser, IUserOrganization } from "@/api/types"

export const getDefaultUserOrganization = (
  organizations: IUserOrganization[],
  user: IUser,
): IUserOrganization | null => organizations.find((i) => i.id === user.organizationIds[0]) || null
