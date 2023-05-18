import { Button, Card, Flex, Grid, Image, Text, Title } from "@mantine/core";
import { useSingleTypeQuiz } from "./useSingleQuiz";
import {
  TemType,
  TemTypeEffectiveNess,
  calculateEffectiveness,
} from "../../models/tem-type";

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
  } = useSingleTypeQuiz();

  return (
    <Flex direction="column" gap="lg" justify="center">
      <Title order={2} size="h3" align="center">
        単タイプ
      </Title>
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
        {isEnded ? (
          <Flex direction="column" gap="md">
            <Button onClick={reset}>リセット</Button>
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
                  <Card bg={problem.status === "correct" ? "green" : "red"}>
                    <Flex
                      sx={{ width: "100%" }}
                      align="center"
                      justify="center"
                    >
                      <Image src={typeImage(problem.quiz.attack)} width={40} />
                      <Image src="/arrow-right-solid.svg" width={25} />
                      <Image src={typeImage(problem.quiz.defense)} width={40} />
                    </Flex>
                    <Text align="center" size="xl" fw="bold">
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
