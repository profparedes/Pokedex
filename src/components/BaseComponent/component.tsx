import { memo } from 'react';
import { Text } from '@gluestack-ui/themed';

interface IBaseComponentProps {
  children?: React.ReactNode;
}

const BaseComponent: React.FC<IBaseComponentProps> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default memo(BaseComponent);
