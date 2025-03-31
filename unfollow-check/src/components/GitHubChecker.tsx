import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Grid,
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
    <Box p={6} maxW="1200px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Box 
          p={6} 
          bg="white" 
          borderRadius="xl" 
          boxShadow="md"
          border="1px"
          borderColor="gray.200"
        >
          <VStack spacing={4}>
            <HStack spacing={4} width="full">
              <Input
                size="lg"
                placeholder="GitHub 사용자명 입력"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                borderRadius="lg"
                border="1px"
                borderColor="gray.200"
                _focus={{ borderColor: 'blue.500' }}
              />
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleCheck}
                isLoading={loading}
                loadingText="확인 중..."
                minW="120px"
                borderRadius="lg"
                _hover={{ boxShadow: 'lg' }}
              >
                확인하기
              </Button>
            </HStack>

            {error && (
              <Box 
                p={4} 
                bg="red.50" 
                color="red.600" 
                borderRadius="lg"
                width="full"
                border="1px"
                borderColor="red.100"
                boxShadow="sm"
              >
                <Text fontWeight="semibold">에러</Text>
                <Text mt={1}>{error}</Text>
              </Box>
            )}

            {success && (
              <Box 
                p={4} 
                bg="green.50" 
                color="green.600" 
                borderRadius="lg"
                width="full"
                border="1px"
                borderColor="green.100"
                boxShadow="sm"
              >
                <Text fontWeight="semibold">축하합니다🎉</Text>
                <Text mt={1}>모든 사용자와 맞팔로우 상태입니다.</Text>
              </Box>
            )}
          </VStack>
        </Box>

        {results.length > 0 && (
          <Box>
            <Heading size="md" mb={6} color="gray.700">범인 목록</Heading>
            <Grid
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={6}
            >
              {results.map(({ user, isFollowingYou }) => (
                <Box
                  key={user.id}
                  borderWidth="1px"
                  borderRadius="xl"
                  p={5}
                  transition="all 0.2s"
                  _hover={{ 
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  bg={isFollowingYou ? 'red.50' : 'blue.50'}
                  borderColor={isFollowingYou ? 'red.100' : 'blue.100'}
                >
                  <HStack spacing={4}>
                    <Avatar 
                      size="lg" 
                      src={user.avatar_url}
                      borderRadius="lg"
                      shadow="md"
                    />
                    <VStack align="start" spacing={2} flex={1}>
                      <Link 
                        href={user.html_url} 
                        target="_blank"
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Text 
                          fontSize="lg" 
                          fontWeight="bold"
                          color="gray.700"
                          _hover={{ color: 'blue.500' }}
                        >
                          {user.login}
                        </Text>
                      </Link>
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="full"
                        colorScheme={isFollowingYou ? 'red' : 'blue'}
                        fontSize="sm"
                      >
                        {isFollowingYou
                          ? '당신을 팔로우하지만 맞팔 안됨'
                          : '당신이 팔로우하지만 맞팔 안됨'}
                      </Badge>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
