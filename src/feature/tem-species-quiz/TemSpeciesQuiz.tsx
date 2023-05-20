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
  SimpleGrid,
  Text,
} from "@mantine/core";
import { Species, getName } from "../../models/species";
import { TemTypes, temTypeImage } from "../../models/tem-type";
import { isValidGuess, useSpeciesTypesGuess } from "./useSpeciesTypesGuess";
import { useLanguage } from "@/libs/i18next/i18n";

const iconImage = (species: Species) =>
  `https://temtem-api.mael.tech${species.icon}`;

export const TemSpeciesQuiz: FC = () => {
  const { language } = useLanguage();
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
      <Flex
        sx={{ width: "100%" }}
        direction="column"
        gap="md"
        align="center"
        justify="center"
      >
        {isEnded ? (
          <Text align="center" size="lg" fw="bold">
            正解: {correctCount}/{problems.length}
          </Text>
        ) : (
          <>
            <Text align="center" size="lg" fw="bold">
              {round}問目 ({`${problems.length}問中`})
            </Text>
            {/* 種族名表示するか選べるようにする？ */}
            {/* <Flex direction="column" gap="4px" justify="center"> */}
            <Card p="0" withBorder>
              <Image
                src={iconImage(currentProblem.species)}
                alt={currentProblem.species.name}
                width={80}
              />
            </Card>
            {/* <Text align="center" size="md" fw="bold">
                {getName(currentProblem.species, language)}
              </Text> */}
            {/* </Flex> */}
          </>
        )}
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
          <SimpleGrid
            sx={{
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            }}
          >
            {problems.map((problem, i) => (
              <Flex
                key={i}
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
                    alt={getName(problem.species, language)}
                    width={50}
                    bg="dark.6"
                  />
                  <Text align="center" fw="bold" color="gray.1">
                    {getName(problem.species, language)}
                  </Text>
                  <Flex justify="center" gap="xs">
                    {problem.species.types.map((type) => (
                      <Image
                        key={type}
                        src={temTypeImage(type)}
                        alt={type}
                        width={30}
                      />
                    ))}
                  </Flex>
                </Card>
              </Flex>
            ))}
          </SimpleGrid>
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
                    <Image src={temTypeImage(selectedTypes[i])} width={40} />
                  ) : (
                    <Text size="xl" fw="bold" w="40px" h="40px" align="center">
                      *
                    </Text>
                  )}
                </Card>
              ))}
            </Flex>
          </Flex>
          <SimpleGrid
            sx={{
              width: "80%",
              margin: "0 auto",
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "repeat(auto-fill, minmax(60px, 20%))",
              justifyContent: "center",
            }}
          >
            {TemTypes.map((type) => (
              <Flex key={type} justify="center">
                <Button
                  variant="outline"
                  color="gray"
                  h="unset"
                  p="4px"
                  radius="xl"
                  onClick={() => toggleType(type)}
                  aria-label={type}
                >
                  <Image src={temTypeImage(type)} alt={type} width={50} />
                </Button>
              </Flex>
            ))}
          </SimpleGrid>
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
