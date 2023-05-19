import { FC } from "react";
import { useTemSpeciesQuiz } from "./useTemSpeciesQuiz";
import {
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from "@mantine/core";
import { Species } from "../../models/species";
import { TemType, TemTypes } from "../../models/tem-type";
import { isValidGuess, useSpeciesTypesGuess } from "./useSpeciesTypesGuess";

const typeImage = (type: TemType) => `/images/types/${type}.png`;
const iconImage = (species: Species) =>
  `https://temtem-api.mael.tech.${species.icon}`;

export const TemSpeciesQuiz: FC = () => {
  const {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  } = useTemSpeciesQuiz();

  const { selectedTypes, toggleType, resetSelectedTypes } =
    useSpeciesTypesGuess();

  return (
    <Flex direction="column" gap="lg" justify="center">
      <Text align="center" size="lg" fw="bold">
        {isEnded ? (
          <>
            正解: {correctCount}/{problems.length}
          </>
        ) : (
          <>
            {round}問目 ({`${problems.length}問中`})
          </>
        )}
      </Text>
      <Flex justify="center">
        <Card p="0" withBorder>
          <Image src={iconImage(currentProblem.species)} width={80} />
        </Card>
      </Flex>
      <Divider />
      {isEnded ? (
        <Flex direction="column" gap="md">
          <Grid grow>
            <Grid.Col span={6}>
              <Button onClick={reset} sx={{ width: "100%" }}>
                もう一度
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button onClick={regenerateProblems} sx={{ width: "100%" }}>
                別の問題
              </Button>
            </Grid.Col>
          </Grid>
          <Grid gutter={4}>
            {problems.map((problem, i) => (
              <Grid.Col
                key={i}
                span={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Card
                  bg={problem.status === "correct" ? "green.6" : "red.6"}
                  p="xs"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={iconImage(problem.species)}
                    width={50}
                    bg="dark.6"
                  />
                  <Text align="center" fw="bold" color="gray.1">
                    {problem.species.name}
                  </Text>
                  <Flex justify="center" gap="xs">
                    {problem.species.types.map((type) => (
                      <Image key={type} src={typeImage(type)} width={30} />
                    ))}
                  </Flex>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Flex>
      ) : (
        <Flex direction="column" gap="md">
          <Flex direction="column" justify="center" gap="xs">
            <Text size="lg" fw="bold" w="100%" align="center">
              選択中
            </Text>
            <Flex justify="center" gap="xs">
              {[0, 1].map((i) => (
                <Card
                  key={i}
                  p="xs"
                  withBorder
                  sx={{
                    width: 60,
                    height: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {selectedTypes[i] ? (
                    <Image src={typeImage(selectedTypes[i])} width={40} />
                  ) : (
                    <Text size="xl" fw="bold" w="40px" h="40px" align="center">
                      *
                    </Text>
                  )}
                </Card>
              ))}
            </Flex>
          </Flex>
          <Grid
            sx={{ width: "75%", justifyContent: "center", margin: "0 auto" }}
          >
            {TemTypes.map((type) => (
              <Grid.Col
                key={type}
                span={3}
                sx={{ justifyContent: "center", display: "flex" }}
              >
                <Button
                  variant="outline"
                  color="gray"
                  h="unset"
                  p="4px"
                  radius="xl"
                  onClick={() => toggleType(type)}
                >
                  <Image src={typeImage(type)} width={50} />
                </Button>
              </Grid.Col>
            ))}
          </Grid>
          <Center
            sx={{ width: "70%", justifyContent: "center", margin: "0 auto" }}
          >
            {isValidGuess(selectedTypes) ? (
              <Button
                fullWidth
                onClick={() => {
                  answerCurrentProblem(selectedTypes);
                  resetSelectedTypes();
                }}
              >
                決定
              </Button>
            ) : (
              <Button fullWidth disabled>
                決定
              </Button>
            )}
          </Center>
        </Flex>
      )}
    </Flex>
  );
};
