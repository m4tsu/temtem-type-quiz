"use client";
import {
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Text,
} from "@/components/ui";
import {
  TemTypeEffectivenessAgainstMultiple,
  calculateEffectiveness,
  temTypeImage,
} from "@/models/tem-type";
import { useMultipleTypeQuiz } from "./useMultipleTypeQuiz";

const EffectivenessList = [
  0.25, 0.5, 1, 2, 4,
] satisfies TemTypeEffectivenessAgainstMultiple[];

export const MultipleTypeQuiz = () => {
  const {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  } = useMultipleTypeQuiz();

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
          <Text size="lg" fw="bold">
            正解: {correctCount}/{problems.length}
          </Text>
        ) : (
          <>
            <Text size="lg" fw="bold">
              {round}問目 ({`${problems.length}問中`})
            </Text>
            <Flex sx={{ width: "100%" }} align="center" justify="center">
              <Image
                src={temTypeImage(currentProblem.quiz.attack)}
                width={60}
                alt={currentProblem.quiz.attack}
              />
              <Image src="/arrow-right-solid.svg" width={40} />
              {currentProblem.quiz.defense.length === 1 ? (
                <Image
                  src={temTypeImage(currentProblem.quiz.defense[0])}
                  alt={currentProblem.quiz.defense[0]}
                  width={60}
                />
              ) : (
                <Flex align="center">
                  <Image
                    src={temTypeImage(currentProblem.quiz.defense[0])}
                    alt={currentProblem.quiz.defense[0]}
                    width={60}
                  />
                  <Text size="xl" fw="bold">
                    +
                  </Text>
                  <Image
                    src={temTypeImage(currentProblem.quiz.defense[1])}
                    alt={currentProblem.quiz.defense[1]}
                    width={60}
                  />
                </Flex>
              )}
            </Flex>
          </>
        )}
      </Flex>
      <Divider />
      <Flex direction="column" gap="lg">
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
                  <Card bg={problem.status === "correct" ? "green.6" : "red.6"}>
                    <Flex
                      sx={{ width: "100%" }}
                      align="center"
                      justify="center"
                    >
                      <Image
                        src={temTypeImage(problem.quiz.attack)}
                        alt={problem.quiz.attack}
                        width={40}
                      />
                      <Image src="/arrow-right-solid.svg" width={25} />
                      {problem.quiz.defense.length === 1 ? (
                        <Image
                          src={temTypeImage(problem.quiz.defense[0])}
                          alt={problem.quiz.defense[0]}
                          width={40}
                        />
                      ) : (
                        <Flex align="center">
                          <Image
                            src={temTypeImage(problem.quiz.defense[0])}
                            alt={problem.quiz.defense[0]}
                            width={40}
                          />
                          <Text size="xl" fw="bold" color="dark">
                            +
                          </Text>
                          <Image
                            src={temTypeImage(problem.quiz.defense[1])}
                            alt={problem.quiz.defense[1]}
                            width={40}
                          />
                        </Flex>
                      )}
                    </Flex>
                    <Text align="center" size="xl" fw="bold" color="gray.1">
                      {calculateEffectiveness(
                        problem.quiz.attack,
                        problem.quiz.defense
                      )}
                      x
                    </Text>
                  </Card>
                </Flex>
              ))}
            </SimpleGrid>
          </Flex>
        ) : (
          <Card sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {EffectivenessList.map((effectiveness) => (
              <Button
                key={`${effectiveness}`}
                onClick={() => {
                  answerCurrentProblem(effectiveness);
                }}
                sx={{ fontSize: 18, fontWeight: "bold" }}
              >
                {effectiveness}x
              </Button>
            ))}
          </Card>
        )}
      </Flex>
    </Flex>
  );
};
