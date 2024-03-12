import { AvatarProps } from "@vkontakte/vkui/dist/components/Avatar/Avatar";

export interface GetCommunitiesResponse {
  result: 1 | 0;
  data?: Community[];
}

export interface Community {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: AvatarProps["gradientColor"]; //изменил, чтобы можно было работать с Avatar
  members_count: number;
  friends?: User[];
}

export interface User {
  first_name: string;
  last_name: string;
}

export type FiltersType = {
  privateType: "all" | "public" | "private";
  colors: AvatarProps["gradientColor"][];
  withFriendsOnly: boolean;
};
