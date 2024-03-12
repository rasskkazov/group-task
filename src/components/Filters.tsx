import { Icon24Filter } from "@vkontakte/icons";
import { SubnavigationBar, SubnavigationButton } from "@vkontakte/vkui";
import { useState } from "react";
import { FiltersType } from "../types";

type CommunitiesFilterGroupProps = {
  openModal: () => void;
  filters: FiltersType;
  updateFilters: (filters: FiltersType) => void;
};

export const Filters = (props: CommunitiesFilterGroupProps) => {
  const [withFriendsOnly, setWithFriendsOnly] = useState(
    props.filters.withFriendsOnly
  );

  return (
    <SubnavigationBar>
      <SubnavigationButton
        before={<Icon24Filter />}
        expandable
        onClick={props.openModal}
      >
        Фильтры
      </SubnavigationButton>

      <SubnavigationButton
        selected={withFriendsOnly}
        onClick={() => {
          setWithFriendsOnly(!withFriendsOnly);
          props.updateFilters({
            ...props.filters,
            withFriendsOnly: !props.filters.withFriendsOnly,
          });
        }}
      >
        С друзьями
      </SubnavigationButton>
    </SubnavigationBar>
  );
};
