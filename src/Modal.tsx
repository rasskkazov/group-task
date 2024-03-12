import {
  usePlatform,
  ModalRoot,
  AvatarProps,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderButton,
  FormLayoutGroup,
  FormItem,
  Checkbox,
  Radio,
  Button,
} from "@vkontakte/vkui";
import { Icon24Dismiss } from "@vkontakte/icons";
import { useState } from "react";
import { privateTypes, type Community, type FiltersType } from "./types";

type ModalProps = {
  onClose: () => void;
  activeModal: "filters" | null;
  communities: Community[];
  filters: FiltersType;
  updateFilters: (filters: FiltersType) => void;
};

export const Modal = (props: ModalProps) => {
  const platform = usePlatform();

  //get unique colors
  const FILTERS_COLORS: Set<AvatarProps["gradientColor"]> = new Set();
  props.communities.forEach((c) => {
    if (c.avatar_color) FILTERS_COLORS.add(c.avatar_color);
  });
  //

  // filters logic
  const curFilters = props.filters;

  const [selectedRadio, setSelectedRadio] = useState(curFilters.privateType);

  const [selectedColors, setSelectedColors] = useState(curFilters.colors);
  const handleColorsChange = (event: any) => {
    const targetColor = event.target.value;
    if (selectedColors.includes(targetColor)) {
      setSelectedColors(
        selectedColors.filter((color) => color !== targetColor)
      );
    } else {
      setSelectedColors([...selectedColors, targetColor]);
    }
  };

  const resetClose = () => {
    props.onClose();
    setSelectedRadio(curFilters.privateType);
    setSelectedColors(curFilters.colors);
  };
  //
  return (
    <ModalRoot activeModal={props.activeModal} onClose={resetClose}>
      <ModalPage
        id={"filters"}
        header={
          <ModalPageHeader
            before={
              platform !== "ios" && <PanelHeaderClose onClick={resetClose} />
            }
            after={
              platform === "ios" && (
                <PanelHeaderButton onClick={resetClose}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
          >
            Фильтры
          </ModalPageHeader>
        }
      >
        <FormLayoutGroup>
          <FormItem top="Тип приватности">
            {privateTypes.map((p) => (
              <Radio
                key={p}
                name="radio"
                value={p}
                checked={selectedRadio === p}
                onChange={() => {
                  setSelectedRadio(p);
                }}
              >
                {p}
              </Radio>
            ))}
          </FormItem>
          <FormItem top="Цвет">
            {Array.from(FILTERS_COLORS).map((value, index) => {
              return (
                <Checkbox
                  key={index}
                  value={value}
                  checked={selectedColors.includes(value)}
                  onChange={handleColorsChange}
                >
                  {value}
                </Checkbox>
              );
            })}
          </FormItem>

          <FormItem>
            <Button
              size="l"
              stretched
              onClick={() => {
                props.updateFilters({
                  ...curFilters,
                  privateType: selectedRadio,
                  colors: selectedColors,
                });
                props.onClose();
              }}
            >
              Показать результаты
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </ModalPage>
    </ModalRoot>
  );
};
