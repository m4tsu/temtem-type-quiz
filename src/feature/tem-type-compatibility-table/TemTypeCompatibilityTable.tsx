import { FC } from "react";
import { Box, Image, Table, Text } from "@mantine/core";
import {
  TemType,
  TemTypes,
  calculateEffectiveness,
  temTypeImage,
} from "@/models/tem-type";

type TdProps = {
  attack: TemType;
  defense: TemType;
};
const Td: FC<TdProps> = ({ attack, defense }) => {
  const effectiveness = calculateEffectiveness(attack, [defense]);
  if (effectiveness === 1) {
    return <td />;
  } else {
    return (
      <Box
        component="td"
        sx={(theme) => ({
          backgroundColor:
            effectiveness === 0.5
              ? theme.colors.yellow[2]
              : theme.colors.green[2],
        })}
        p="0!important"
      >
        <Text size="lg" fw="bold" align="center" color="dark">
          {effectiveness}x
        </Text>
      </Box>
    );
  }
};

// 相性設定の確認のため作ったけど使わないかも
export const TemTypeCompatibilityTable: FC = () => {
  return (
    <Table withBorder withColumnBorders>
      <tbody>
        <tr>
          <th />
          {TemTypes.map((type) => (
            <th key={type}>
              <Image src={temTypeImage(type)} alt={type} width={30} />
            </th>
          ))}
        </tr>
        {TemTypes.map((attackType) => (
          <tr key={attackType}>
            <th>
              <Image
                src={temTypeImage(attackType)}
                alt={attackType}
                width={30}
              />
            </th>
            {TemTypes.map((defenseType) => (
              <Td key={defenseType} attack={attackType} defense={defenseType} />
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
