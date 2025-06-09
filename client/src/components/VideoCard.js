import styled from 'styled-components';
import { device } from '../styles/responsive';
import { useState, useEffect } from 'react'; // ← Need to import these hooks!

// 1. First define your styled component
const SimpleBox = styled.div`
  background: red;
  width: 100px;
  height: 100px;
`;

// 2. Then define your hook
function useDeviceType() {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceType;
}

// 3. Define your responsive text component
const ResponsiveText = styled.p`
  font-size: ${({ $size }) => $size};
  border: 2px solid black;
  padding: 10px;
`;

function VideoCard() {
  const deviceType = useDeviceType(); // ← Use the hook here

  // Calculate size based on device
  const textSize = deviceType === 'mobile' ? '14px' :
                   deviceType === 'tablet' ? '16px' : '18px';

  return (
    <div>
      <SimpleBox />
      <ResponsiveText $size={textSize}>
        This text changes size on different devices!
      </ResponsiveText>
    </div>
  );
}

export default VideoCard;