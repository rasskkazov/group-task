import { Group, SimpleCell, Popover, Button } from "@vkontakte/vkui";
import { User } from "../types";
import React from "react";

type frList = {
  friends?: User[];
};
export function FriendsPopover(props: frList) {
  const friends: User[] = props.friends ? props.friends : [];

  return (
    <Popover
      trigger="focus"
      role="dialog"
      aria-describedby="dialog-2"
      content={({ onClose }) => (
        <Group separator="hide">
          {friends.map((friend, index) => (
            <SimpleCell
              key={index}
            >{`${friend.first_name} ${friend.last_name}`}</SimpleCell>
          ))}
        </Group>
      )}
    >
      <Button id="dialog-2">{`Друзья: ${friends.length}`}</Button>
    </Popover>
  );
}
