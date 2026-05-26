import React from 'react';
import { Box, Page, Text } from 'zmp-ui';

function LoadingScreen({ message = 'Đang tải...' }) {
  return (
    <Page>
      <Box className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-slate-50">
        {/* Spinner */}
        <Box className="relative w-16 h-16">
          <Box className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <Box className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin" />
        </Box>

        {/* Message */}
        <Text className="text-center text-slate-600 font-medium">
          {message}
        </Text>

        {/* Animated dots */}
        <Box className="flex space-x-1">
          <Box className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <Box className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <Box className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </Box>
      </Box>
    </Page>
  );
}

export default LoadingScreen;
