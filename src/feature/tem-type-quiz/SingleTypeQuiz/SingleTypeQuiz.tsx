import { Button, Card, Divider, Flex, Grid, Image, Text } from "@mantine/core";
import { useSingleTypeQuiz } from "./useSingleQuiz";
import {
  TemType,
  TemTypeEffectiveNess,
  calculateEffectiveness,
} from "../../../models/tem-type";

const typeImage = (type: TemType) => `/images/types/${type}.png`;
const EffectivenessList = [0.5, 1, 2] satisfies TemTypeEffectiveNess[];

export const SingleTypeQuiz = () => {
  const {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  } = useSingleTypeQuiz();

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
      <Flex direction="column" gap="lg">
        <Flex sx={{ width: "100%" }} align="center" justify="center">
          <Image src={typeImage(currentProblem.quiz.attack)} width={60} />
          <Image src="/arrow-right-solid.svg" width={40} />
          <Image src={typeImage(currentProblem.quiz.defense)} width={60} />
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
                  <Card bg={problem.status === "correct" ? "green.6" : "red.6"}>
                    <Flex
                      sx={{ width: "100%" }}
                      align="center"
                      justify="center"
                    >
                      <Image src={typeImage(problem.quiz.attack)} width={40} />
                      <Image src="/arrow-right-solid.svg" width={25} />
                      <Image src={typeImage(problem.quiz.defense)} width={40} />
                    </Flex>
                    <Text align="center" size="xl" fw="bold" color="gray.1">
                      {calculateEffectiveness(
                        problem.quiz.attack,
                        problem.quiz.defense
                      )}
                      x
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
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
