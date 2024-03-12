import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  usePlatform,
  List,
  Avatar,
  Title,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon28LockOutline, Icon36Users3Outline } from "@vkontakte/icons";
import { useEffect, useMemo, useState } from "react";
import { mockCommunities } from "./mockCommunities";
import type { GetCommunitiesResponse, Community, FiltersType } from "./types";
import { FriendsPopover } from "./components/FriendsPopover";
import { Filters } from "./components/Filters";
import { Modal } from "./Modal";

const getCommunitites = () =>
  new Promise<GetCommunitiesResponse>((resolve) => {
    setTimeout(() => {
      resolve({ result: 1, data: mockCommunities });
    }, 1000);
  });

export function App() {
  const platform = usePlatform();

  const [communities, setCommunities] = useState<Community[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    privateType: "all",
    colors: [],
    withFriendsOnly: false,
  });

  useEffect(() => {
    getCommunitites()
      .then((response) => {
        if (!response.result) throw new Error("Failed get communities");
        if (!response.data) throw new Error("Data is empty");
        setCommunities(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // MODAL FILTERS logic
  const [activeModal, setActiveModal] = useState<"filters" | null>(null);

  const openModalFilters = () => {
    setActiveModal("filters");
  };
  const closeModalFilters = () => {
    setActiveModal(null);
  };

  const updateFilters = (filters: FiltersType) => {
    setFilters(filters);
  };

  const filteredCommunities: Community[] = useMemo(() => {
    return communities.filter((c) => {
      if (filters.privateType === "private" && c.closed === false) return false;
      if (filters.privateType === "public" && c.closed === true) return false;
      if (filters.colors.length && !filters.colors.includes(c.avatar_color))
        return false;
      if (filters.withFriendsOnly && !c.friends) return false;

      return true;
    });
  }, [filters, communities]);
  //

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
        modal={
          <Modal
            onClose={closeModalFilters}
            activeModal={activeModal}
            communities={communities}
            filters={filters}
            updateFilters={updateFilters}
          />
        }
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VK</PanelHeader>
              <Group header={<Header mode="secondary">Filters</Header>}>
                <Filters
                  openModal={openModalFilters}
                  filters={filters}
                  updateFilters={updateFilters}
                ></Filters>
              </Group>
              <Group header={<Header mode="secondary">Communities</Header>}>
                <List>
                  {filteredCommunities.map((community) => (
                    <SimpleCell
                      key={community.id}
                      before={
                        <Avatar
                          size={100}
                          initials={community.name[0]}
                          src="#"
                          gradientColor={community.avatar_color}
                        />
                      }
                    >
                      <Title
                        level="2"
                        style={{
                          marginBottom: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {community.name}
                        {community.closed && (
                          <Icon28LockOutline
                            width={20}
                            height={20}
                            title={"Закрытое сообщество"}
                          />
                        )}
                      </Title>

                      {community.members_count > 0 && (
                        <div style={{ display: "flex", gap: 4 }}>
                          <Icon36Users3Outline
                            width={20}
                            height={20}
                            title={"Подписчики"}
                          />
                          {community.members_count}
                        </div>
                      )}

                      {community.friends && (
                        <FriendsPopover friends={community.friends} />
                      )}
                    </SimpleCell>
                  ))}
                </List>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
