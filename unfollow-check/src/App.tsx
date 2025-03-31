import { ChakraProvider, Container, Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { GitHubChecker } from './components/GitHubChecker'

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <Heading mb={8} textAlign="center">맞팔안한 사람들 찾아드려요 🔍</Heading>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>GitHub</Tab>
            <Tab isDisabled>Instagram (준비중)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GitHubChecker />
            </TabPanel>
            <TabPanel>
              <p>Instagram 기능은 준비중입니다.</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ChakraProvider>
  )
}

export default App
