import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  SimpleGrid,
  Badge,
  Link,
  Avatar,
  Heading,
} from '@chakra-ui/react';
import { analyzeFollowStatus } from '../services/github';
import { FollowStatus } from '../types/github';

export const GitHubChecker = () => {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<FollowStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCheck = async () => {
    if (!username) {
      setError('사용자명을 입력해주세요');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = await analyzeFollowStatus(username);
      const nonMutualFollows = data.filter(
        item => item.isFollowingYou !== item.youAreFollowing
      );
      setResults(nonMutualFollows);
      
      if (nonMutualFollows.length === 0) {
        setSuccess(true);
      }
    } catch (error) {
      setError('사용자를 찾을 수 없거나 API 한도를 초과했습니다');
    }
    setLoading(false);
  };

  return (
    <VStack spacing={6} align="center" w="100%">
      <Box 
        p={{ base: 3, md: 4 }}
        bg="white" 
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        w="100%"
      >
        <VStack spacing={3}>
          <VStack spacing={3} width="100%">
            <Input
              size="md"
              placeholder="GitHub 사용자명 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              borderRadius="md"
              border="1px"
              borderColor="gray.200"
              _focus={{ borderColor: 'blue.300' }}
              _hover={{ borderColor: 'blue.300' }}
              bg="white"
              textAlign="center"
            />
            <Button
              colorScheme="blue"
              size="md"
              onClick={handleCheck}
              isLoading={loading}
              loadingText="확인 중..."
              minW="150px"
              borderRadius="md"
            >
              확인하기
            </Button>
          </VStack>

          {error && (
            <Box 
              p={3}
              bg="blue.50" 
              color="blue.500" 
              borderRadius="md"
              width="100%"
              border="1px"
              borderColor="blue.200"
              fontSize="sm"
            >
              <Text fontWeight="medium">에러</Text>
              <Text>{error}</Text>
            </Box>
          )}

          {success && (
            <Box 
              p={3}
              bg="blue.50" 
              color="blue.500" 
              borderRadius="md"
              width="100%"
              border="1px"
              borderColor="blue.200"
              fontSize="sm"
            >
              <Text fontWeight="medium">축하합니다🎉</Text>
              <Text>모든 사용자와 맞팔로우 상태입니다.</Text>
            </Box>
          )}
        </VStack>
      </Box>

      {results.length > 0 && (
        <Box w="100%">
          <Heading size="sm" mb={4} color="blue.600" textAlign="center">범인 목록</Heading>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            spacing={{ base: 3, md: 4 }}
            w="100%"
          >
            {results.map(({ user, isFollowingYou }) => (
              <Box
                key={user.id}
                borderWidth="1px"
                borderRadius="lg"
                p={3}
                bg="white"
                borderColor="blue.200"
              >
                <VStack spacing={2} align="center">
                  <Avatar 
                    size="md" 
                    src={user.avatar_url}
                  />
                  <VStack spacing={1} align="center">
                    <Link 
                      href={user.html_url} 
                      target="_blank"
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Text 
                        fontSize="sm" 
                        fontWeight="medium"
                        color="blue.700"
                        _hover={{ color: 'blue.500' }}
                      >
                        {user.login}
                      </Text>
                    </Link>
                    <Badge
                      variant="subtle"
                      colorScheme={isFollowingYou ? 'red' : 'blue'}
                      fontSize="xs"
                      px={2}
                    >
                      {isFollowingYou
                        ? '나를 팔로우'
                        : '내가 팔로우'}
                    </Badge>
                  </VStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
};
