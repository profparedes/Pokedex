import { memo } from 'react';
import { View } from '@gluestack-ui/themed';

interface IStatusBarProps {
  value: number;
}

const StatusBar: React.FC<IStatusBarProps> = ({ value }) => {
  const widthBar = (value / 100) * 100; // Suponhamos que 100% seja a largura máxima da barra.
  const color = value > 50 ? '#48D0B0' : '#fb6c6c';

  return (
    <View sx={{ width: '52%', height: 6, backgroundColor: '#fff' }}>
      <View
        rounded={10}
        sx={{ width: `${widthBar}%`, height: 6, backgroundColor: color }}
      />
    </View>
  );
};

export default memo(StatusBar);
