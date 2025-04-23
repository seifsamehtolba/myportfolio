import { SvgIcon, SvgIconProps } from '@mui/material';

const HackerIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
    <path d="M12 5L9 8h6l-3-3zm0 14l3-3H9l3 3zm-4.95-4.95l2.12-2.12-2.12-2.12-1.06 1.06 1.06 1.06-1.06 1.06 1.06 1.06zm9.9 0l-2.12-2.12 2.12-2.12 1.06 1.06-1.06 1.06 1.06 1.06-1.06 1.06z" />
    <path d="M12 8v8M9 11l6 2M9 13l6-2" />
  </SvgIcon>
);

export default HackerIcon; 