"use client";
import { speciesList } from "@/data/species";
import { useLanguage } from "@/libs/i18next/i18n";
import {
  Species,
  findSpecies,
  getIconImageUrl,
  getName,
} from "@/models/species";
import {
  TemType,
  TemTypes,
  calculateEffectiveness,
  temTypeImage,
} from "@/models/tem-type";
import {
  Button,
  Flex,
  Select,
  Table,
  Image,
  Box,
  Text,
  Avatar,
} from "@/components/ui";
import { FC, useState } from "react";

type TemTemCellProps = {
  species: Species;
};
const TemTemCell: FC<TemTemCellProps> = ({ species }) => {
  const { language } = useLanguage();

  return (
    <Box component="td" p="4px!important">
      <Flex align="center" gap="xs">
        <Avatar src={getIconImageUrl(species)} alt={species.name} />
        <Flex direction="column" align="center" w="100%">
          <Flex>
            {species.types.map((type) => (
              <Image key={type} src={temTypeImage(type)} width={30} />
            ))}
          </Flex>
          <Text
            size="md"
            color="gray.1"
            align="center"
            sx={{ whiteSpace: "nowrap" }}
          >
            {getName(species, language)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

type EffectivenessCellProps = {
  attack: TemType;
  defense: Species["types"];
};
const EffectivenessCell: FC<EffectivenessCellProps> = ({ attack, defense }) => {
  const effectiveness = calculateEffectiveness(attack, defense);

  if (effectiveness === 1) {
    return (
      <Box component="td" miw="62px">
        <Text size="lg" fw="bold" align="center" color="gray.1">
          -
        </Text>
      </Box>
    );
  }
  return (
    <Box
      component="td"
      miw="62px"
      sx={(theme) => ({
        backgroundColor:
          effectiveness === 0.25
            ? theme.colors.red[6]
            : effectiveness === 0.5
            ? theme.colors.yellow[6]
            : effectiveness === 2
            ? theme.colors.green[7]
            : theme.colors.green[4],
      })}
    >
      <Text size="md" fw="bold" align="center" color="gray.1">
        {effectiveness}x
      </Text>
    </Box>
  );
};

const speciesOptions = speciesList.map((species) => ({
  value: String(species.number),
  label: getName(species, "ja"),
}));

export const TypeMatchupTable: FC = () => {
  const [selectedSpeciesList, setSelectedSpeciesList] = useState<Species[]>([]);
  const addSpecies = (speciesNumber: Species["number"]) => {
    const species = findSpecies(speciesNumber);
    setSelectedSpeciesList((prev) => [...prev, species]);
  };
  const removeSpecies = (speciesNumber: Species["number"]) => {
    setSelectedSpeciesList((prev) =>
      prev.filter((s) => s.number !== speciesNumber)
    );
  };

  const [selectedSpeciesNumber, setSelectedSpeciesNumber] = useState<
    Species["number"] | null
  >(null);

  return (
    <Flex direction="column" gap="md">
      <Table withBorder withColumnBorders highlightOnHover>
        <thead>
          <tr>
            <Box component="th" rowSpan={2}>
              <Text align="center">種族</Text>
            </Box>
            <th colSpan={TemTypes.length}>
              <Text align="center">耐性</Text>
            </th>
            <th rowSpan={2} />
          </tr>
          <tr>
            {TemTypes.map((type) => (
              <Box component="th" key={type}>
                <Flex justify="center">
                  <Image src={temTypeImage(type)} alt={type} width={30} />
                </Flex>
              </Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedSpeciesList.map((species) => (
            <tr key={species.number}>
              <TemTemCell species={species} />
              {TemTypes.map((type) => (
                <EffectivenessCell
                  key={type}
                  attack={type}
                  defense={species.types}
                />
              ))}
              <td>
                <Button
                  aria-label="削除"
                  variant="light"
                  color="red"
                  size="xs"
                  onClick={() => removeSpecies(species.number)}
                >
                  ×
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Flex gap="md" align="center">
        <Select
          data={speciesOptions}
          onChange={(value) =>
            setSelectedSpeciesNumber(value ? Number(value) : null)
          }
          placeholder="Select TemTem"
          searchable
          nothingFound="Not Found"
          maxDropdownHeight={300}
        />
        <Button
          disabled={selectedSpeciesNumber === null}
          onClick={() =>
            selectedSpeciesNumber && addSpecies(selectedSpeciesNumber)
          }
        >
          追加
        </Button>
      </Flex>
    </Flex>
  );
};
