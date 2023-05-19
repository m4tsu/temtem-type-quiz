import { Container, Flex, Header, Tabs, Text, Title } from "@mantine/core";
import { SingleTypeQuiz } from "./feature/tem-type-quiz/SingleTypeQuiz";
import { MultipleTypeQuiz } from "./feature/tem-type-quiz/MutipleTypeQuiz";

function App() {
  return (
    <Flex gap="md" direction="column" sx={{ height: "100vh" }}>
      <Header height={50}>
        <Container
          size="xs"
          sx={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <Title order={1} size="h2">
            TemTemのタイプ覚えたい
          </Title>
        </Container>
      </Header>
      <Container size="xs">
        <Tabs defaultValue="single">
          <Tabs.List grow>
            <Tabs.Tab value="single">
              <Text size="lg" fw="bold">
                単タイプのみ
              </Text>
            </Tabs.Tab>
            <Tabs.Tab value="multiple">
              <Text size="lg" fw="bold">
                複合タイプ有り
              </Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="single" pt="lg">
            <SingleTypeQuiz />
          </Tabs.Panel>
          <Tabs.Panel value="multiple" pt="lg">
            <MultipleTypeQuiz />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Flex>
  );
}

export default App;
