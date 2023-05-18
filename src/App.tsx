import { Container, Flex, Header, Text, Title } from "@mantine/core";
import { SingleTypeQuiz } from "./feature/tem-type-quiz/SingleTypeQuiz";

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
        <SingleTypeQuiz />
      </Container>
    </Flex>
  );
}

export default App;
