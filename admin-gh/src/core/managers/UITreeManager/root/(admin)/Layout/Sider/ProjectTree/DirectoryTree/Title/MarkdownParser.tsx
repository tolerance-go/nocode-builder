import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface MarkdownParserProps {
  content: string;
}

const parseMarkdown = (content: string): React.ReactNode => {
  const parts = content.split(/(\*\*.*\*\*)/);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // 转义空格
          const escapedPart = part.replace(/ /g, '\u00A0');
          return (
            <Text strong key={index}>
              {escapedPart.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={index}>{part}</Text>;
      })}
    </>
  );
};

const MarkdownParser: React.FC<MarkdownParserProps> = ({ content }) => {
  return <Text>{parseMarkdown(content)}</Text>;
};

export default MarkdownParser;
