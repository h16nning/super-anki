import React, { useState } from "react";
import {
  ActionIcon,
  Center,
  Group,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useDeckFromUrl } from "../../logic/deck";
import MissingObject from "../MissingObject";
import { CardType } from "../../logic/card";
import { useNavigate } from "react-router-dom";
import { getViewFromCardType } from "./ViewFromCardType";

interface NewCardProps {}

function NewCard({}: NewCardProps) {
  const navigate = useNavigate();

  const [deck, failed, reloadDeck] = useDeckFromUrl();
  const [cardType, setCardType] = useState<string | null>(CardType.Normal);

  if (failed) {
    return <MissingObject />;
  }

  return (
    <Center>
      <Stack sx={{ width: "600px" }}>
        <Group position="apart">
          <Group spacing="xs">
            <ActionIcon onClick={() => navigate(-1)}>
              <IconChevronLeft />
            </ActionIcon>
            <Stack spacing={0}>
              <Text fz="sm" c="gray">
                Adding Cards to
              </Text>
              <Text fw="600">{deck?.name}</Text>
            </Stack>
          </Group>

          <Select
            value={cardType}
            onChange={setCardType}
            label="Card Type"
            data={[
              { label: "Normal", value: CardType.Normal },
              { label: "Cloze", value: CardType.Cloze },
              { label: "Image Occlusion", value: CardType.ImageOcclusion },
            ]}
          />
        </Group>
        <Space h="md" />
        {getViewFromCardType(deck, cardType)}
      </Stack>
    </Center>
  );
}

export default NewCard;