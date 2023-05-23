'use client'
import { Suspense, lazy } from 'react'

import {
  Box,
  Container,
  Flex,
  Header,
  Tabs,
  Text,
  Title,
} from '@/components/ui'

import { MultipleTypeQuiz } from './feature/tem-type-quiz/MutipleTypeQuiz'
import { SingleTypeQuiz } from './feature/tem-type-quiz/SingleTypeQuiz'
import { TypeMatchupTable } from './feature/type-matchup-table/TypeMatchupTable'

const TemSpeciesQuiz = lazy(() => import('./feature/tem-species-quiz'))

function App() {
  console.log('App')
  return (
    <Flex gap="md" direction="column" sx={{ height: '100vh' }}>
      <Header height={50}>
        <Container
          size="xs"
          fluid
          sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <Title order={1} size="h2" align="center" sx={{ width: '100%' }}>
            <div className="text-3xl font-bold underline">
              TemTem タイプクイズ
            </div>
          </Title>
        </Container>
      </Header>
      <Box pb="xl">
        <Container size="xs">
          <Tabs defaultValue="single">
            <Tabs.List grow>
              <Tabs.Tab value="single">
                <Text size="lg" fw="bold">
                  タイプ相性(単)
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="multiple">
                <Text size="lg" fw="bold">
                  タイプ相性(複)
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="species">
                <Text size="lg" fw="bold">
                  種族
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="matchup">*</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="single" pt="lg">
              <SingleTypeQuiz />
            </Tabs.Panel>
            <Tabs.Panel value="multiple" pt="lg">
              <MultipleTypeQuiz />
            </Tabs.Panel>
            <Tabs.Panel value="species" pt="lg">
              <Suspense fallback={'Loading...'}>
                <TemSpeciesQuiz />
              </Suspense>
            </Tabs.Panel>
            <Tabs.Panel value="matchup" pt="lg">
              <TypeMatchupTable />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>
    </Flex>
  )
}

export default App
