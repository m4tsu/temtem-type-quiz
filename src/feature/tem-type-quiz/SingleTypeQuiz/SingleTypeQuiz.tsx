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
import type { TemTypeEffectiveNess } from "@/models/tem-type";
import { calculateEffectiveness, temTypeImage } from "@/models/tem-type";

import { useSingleTypeQuiz } from "./useSingleQuiz";

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
                alt={currentProblem.quiz.attack}
                width={60}
              />
              <Image src="/arrow-right-solid.svg" alt="against to" width={40} />
              <Image
                src={temTypeImage(currentProblem.quiz.defense)}
                alt={currentProblem.quiz.defense}
                width={60}
              />
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
                      <Image
                        src="/arrow-right-solid.svg"
                        alt="against to"
                        width={25}
                      />
                      <Image
                        src={temTypeImage(problem.quiz.defense)}
                        alt={problem.quiz.defense}
                        width={40}
                      />
                    </Flex>
                    <Text align="center" size="xl" fw="bold" color="gray.1">
                      {calculateEffectiveness(problem.quiz.attack, [
                        problem.quiz.defense,
                      ])}
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
