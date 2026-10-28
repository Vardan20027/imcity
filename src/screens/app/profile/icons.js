import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

const I = ({ size = 24, children }) => (
  <Svg width={normalize(size)} height={normalize(size)} viewBox="0 0 24 24" fill="none">
    {children}
  </Svg>
);

export const MenuIcon = () => (
  <I size={22}>
    <Path d="M4 7H20" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M4 12H20" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M4 17H20" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
  </I>
);

export const ChevronRight = ({ color = '#B5B5B5' }) => (
  <I size={20}>
    <Path
      d="M9 6L15 12L9 18"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </I>
);

export const SparkleIcon = ({ color = '#171717', size = 16 }) => (
  <I size={size}>
    <Path
      d="M12 2.2L13.4 8.6L19.8 12L13.4 15.4L12 21.8L10.6 15.4L4.2 12L10.6 8.6L12 2.2Z"
      fill={color}
    />
  </I>
);

export const ChatBubbleIcon = () => (
  <I size={20}>
    <Path
      d="M6 16.2L4.8 19L8.2 17.6C9.2 18 10.4 18.2 11.6 18.2C16 18.2 19.5 15.2 19.5 11.5C19.5 7.8 16 4.8 11.6 4.8C7.2 4.8 3.7 7.8 3.7 11.5C3.7 13.1 4.3 14.5 5.4 15.6L6 16.2Z"
      stroke="#171717"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </I>
);

export const PeopleIcon = ({ size = 18, color = '#171717' }) => (
  <I size={size}>
    <Circle cx="9" cy="8" r="2.4" stroke={color} strokeWidth="1.6" />
    <Path
      d="M4.8 17.2C5.2 14.8 7 13.4 9 13.4C11 13.4 12.8 14.8 13.2 17.2"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <Circle cx="15.2" cy="8.6" r="1.8" stroke={color} strokeWidth="1.5" />
    <Path
      d="M15 13.6C16.6 13.8 18 15 18.4 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </I>
);

export const PersonAddIcon = () => (
  <I size={20}>
    <Circle cx="10" cy="8" r="2.6" stroke="#171717" strokeWidth="1.6" />
    <Path
      d="M4.5 18C5.1 15.2 7.2 13.6 10 13.6C11.2 13.6 12.3 13.9 13.2 14.5"
      stroke="#171717"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <Path d="M17 11V17" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M14 14H20" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const CameraIcon = () => (
  <I size={16}>
    <Path
      d="M8 8.5H5.8C5.2 8.5 4.7 9 4.7 9.6V16C4.7 16.6 5.2 17.1 5.8 17.1H18.2C18.8 17.1 19.3 16.6 19.3 16V9.6C19.3 9 18.8 8.5 18.2 8.5H16L14.8 6.9H9.2L8 8.5Z"
      stroke="#171717"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12.6" r="2.2" stroke="#171717" strokeWidth="1.4" />
  </I>
);

export const PencilIcon = () => (
  <I size={22}>
    <Path
      d="M4 16.8V20H7.2L17.6 9.6L14.4 6.4L4 16.8Z"
      stroke="#171717"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <Path d="M13.2 7.6L16.4 10.8" stroke="#171717" strokeWidth="1.6" />
  </I>
);

export const CloseIcon = ({ color = '#9A9A9A', size = 18 }) => (
  <I size={size}>
    <Path d="M7 7L17 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M17 7L7 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </I>
);

export const CheckCircleIcon = () => (
  <Svg width={normalize(64)} height={normalize(64)} viewBox="0 0 64 64" fill="none">
    <Circle cx="32" cy="32" r="22" stroke="#2F9BFF" strokeWidth="3" />
    <Path
      d="M22 32.5L28.5 39L42 25"
      stroke="#22C55E"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ShareIcon = () => (
  <I size={22}>
    <Path
      d="M12 15V4"
      stroke="#171717"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <Path
      d="M8 8L12 4L16 8"
      stroke="#171717"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12V18.5C6 19.3 6.7 20 7.5 20H16.5C17.3 20 18 19.3 18 18.5V12"
      stroke="#171717"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </I>
);

export const BellOffIcon = () => (
  <I size={22}>
    <Path
      d="M6 16.5H18L16.6 15.1V11.4C16.6 9.2 15.2 7.4 13.2 6.8"
      stroke="#171717"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 6.4C10.6 6.1 11.3 6 12 6C14.4 6 16.2 7.8 16.2 10.2"
      stroke="#171717"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <Path d="M10.2 18.2C10.5 19.2 11.2 19.8 12 19.8C12.8 19.8 13.5 19.2 13.8 18.2" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M5 5L19 19" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const BlockIcon = () => (
  <I size={22}>
    <Circle cx="12" cy="12" r="7.2" stroke="#171717" strokeWidth="1.6" />
    <Path d="M7.2 7.2L16.8 16.8" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const TrashIcon = ({ color = '#F4466E' }) => (
  <I size={22}>
    <Path d="M5 8H19" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M9 8V6.2C9 5.5 9.5 5 10.2 5H13.8C14.5 5 15 5.5 15 6.2V8" stroke={color} strokeWidth="1.6" />
    <Path d="M7 8L7.8 18.2C7.9 19 8.5 19.5 9.2 19.5H14.8C15.5 19.5 16.1 19 16.2 18.2L17 8" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
  </I>
);

export const DotsIcon = () => (
  <I size={22}>
    <Circle cx="6" cy="12" r="1.4" fill="#171717" />
    <Circle cx="12" cy="12" r="1.4" fill="#171717" />
    <Circle cx="18" cy="12" r="1.4" fill="#171717" />
  </I>
);

export const PlusBoxIcon = () => (
  <View style={iconStyles.plusBox}>
    <I size={18}>
      <Path d="M12 6V18" stroke="#8A8A8A" strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M6 12H18" stroke="#8A8A8A" strokeWidth="1.8" strokeLinecap="round" />
    </I>
  </View>
);

export const PinIcon = ({ color = '#3C3C3C', size = 22 }) => (
  <I size={size}>
    <Path
      d="M12 21C12 21 18 15.2 18 10.2C18 6.8 15.3 4 12 4C8.7 4 6 6.8 6 10.2C6 15.2 12 21 12 21Z"
      stroke={color}
      strokeWidth="1.6"
    />
    <Circle cx="12" cy="10" r="1.8" stroke={color} strokeWidth="1.6" />
  </I>
);

export const GlobeIcon = () => (
  <I size={22}>
    <Circle cx="12" cy="12" r="7.2" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M5 12H19" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M12 4.8C13.8 6.8 14.8 9.2 14.8 12C14.8 14.8 13.8 17.2 12 19.2C10.2 17.2 9.2 14.8 9.2 12C9.2 9.2 10.2 6.8 12 4.8Z" stroke="#3C3C3C" strokeWidth="1.6" />
  </I>
);

export const BellIcon = () => (
  <I size={22}>
    <Path
      d="M6.2 16.2H17.8L16.4 14.8V11.2C16.4 8.6 14.4 6.6 12 6.6C9.6 6.6 7.6 8.6 7.6 11.2V14.8L6.2 16.2Z"
      stroke="#3C3C3C"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <Path d="M10.4 16.6C10.6 17.7 11.2 18.4 12 18.4C12.8 18.4 13.4 17.7 13.6 16.6" stroke="#3C3C3C" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const ShieldIcon = () => (
  <I size={22}>
    <Path
      d="M12 4.2L18 6.4V11.4C18 15 15.5 18 12 19.6C8.5 18 6 15 6 11.4V6.4L12 4.2Z"
      stroke="#3C3C3C"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <Path d="M9.5 11.4L11.2 13.1L14.6 9.7" stroke="#3C3C3C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </I>
);

export const HelpIcon = () => (
  <I size={22}>
    <Circle cx="12" cy="12" r="7.2" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M9.6 9.6C9.9 8.6 10.8 8 12 8C13.4 8 14.4 8.9 14.4 10.1C14.4 11.1 13.7 11.7 12.8 12.1C12.2 12.4 12 12.7 12 13.2" stroke="#3C3C3C" strokeWidth="1.6" strokeLinecap="round" />
    <Circle cx="12" cy="15.6" r="0.8" fill="#3C3C3C" />
  </I>
);

export const LogoutIcon = () => (
  <I size={22}>
    <Path d="M10 6H7.2C6.5 6 6 6.5 6 7.2V16.8C6 17.5 6.5 18 7.2 18H10" stroke="#F4466E" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M11 12H19" stroke="#F4466E" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M16 9L19 12L16 15" stroke="#F4466E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </I>
);

export const StoreIcon = () => (
  <I size={22}>
    <Path d="M5 10.5V18H19V10.5" stroke="#3C3C3C" strokeWidth="1.6" strokeLinejoin="round" />
    <Path d="M4 10.5L6 6H18L20 10.5" stroke="#3C3C3C" strokeWidth="1.6" strokeLinejoin="round" />
    <Path d="M4 10.5C4 11.6 4.9 12.5 6 12.5C7.1 12.5 8 11.6 8 10.5" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M8 10.5C8 11.6 8.9 12.5 10 12.5C11.1 12.5 12 11.6 12 10.5" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M12 10.5C12 11.6 12.9 12.5 14 12.5C15.1 12.5 16 11.6 16 10.5" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M16 10.5C16 11.6 16.9 12.5 18 12.5C19.1 12.5 20 11.6 20 10.5" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M10 18V14H14V18" stroke="#3C3C3C" strokeWidth="1.6" />
  </I>
);

export const LockIcon = () => (
  <I size={22}>
    <Rect x="6" y="11" width="12" height="8" rx="2" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M8.5 11V8.5C8.5 6.6 10.1 5 12 5C13.9 5 15.5 6.6 15.5 8.5V11" stroke="#3C3C3C" strokeWidth="1.6" />
  </I>
);

export const LinkIcon = () => (
  <I size={22}>
    <Path d="M10 13.5L8.6 14.9C7.4 16.1 5.5 16.1 4.3 14.9C3.1 13.7 3.1 11.8 4.3 10.6L7.2 7.7C8.4 6.5 10.3 6.5 11.5 7.7" stroke="#3C3C3C" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M14 10.5L15.4 9.1C16.6 7.9 18.5 7.9 19.7 9.1C20.9 10.3 20.9 12.2 19.7 13.4L16.8 16.3C15.6 17.5 13.7 17.5 12.5 16.3" stroke="#3C3C3C" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const MailIcon = () => (
  <I size={22}>
    <Rect x="4" y="6" width="16" height="12" rx="2" stroke="#3C3C3C" strokeWidth="1.6" />
    <Path d="M5 7.5L12 13L19 7.5" stroke="#3C3C3C" strokeWidth="1.6" strokeLinejoin="round" />
  </I>
);

export const PhoneIcon = () => (
  <I size={22}>
    <Path
      d="M8 5.5H10.2L11.4 8.2L9.8 9.2C10.6 10.8 11.9 12.1 13.5 12.9L14.5 11.3L17.2 12.5V14.7C17.2 15.4 16.6 16 15.9 15.9C9.8 15.4 5.6 10.2 5.1 8.1C5 7.4 5.6 6.8 6.3 6.8"
      stroke="#3C3C3C"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </I>
);

export const EyeIcon = ({ off }) => (
  <I size={20}>
    <Path
      d="M3 12C3 12 6.2 7 12 7C17.8 7 21 12 21 12C21 12 17.8 17 12 17C6.2 17 3 12 3 12Z"
      stroke="#8E8C8C"
      strokeWidth="1.6"
    />
    <Circle cx="12" cy="12" r="2.2" stroke="#8E8C8C" strokeWidth="1.6" />
    {off ? <Path d="M5 19L19 5" stroke="#8E8C8C" strokeWidth="1.6" strokeLinecap="round" /> : null}
  </I>
);

export const MicIcon = () => (
  <I size={20}>
    <Rect x="9" y="4" width="6" height="10" rx="3" stroke="#8E8C8C" strokeWidth="1.6" />
    <Path d="M7 11.5C7 14.5 9.2 16.5 12 16.5C14.8 16.5 17 14.5 17 11.5" stroke="#8E8C8C" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M12 16.5V19.5" stroke="#8E8C8C" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const SendIcon = () => (
  <I size={20}>
    <Path d="M4 12L20 4L13 20L11 13L4 12Z" fill="#FF8700" />
  </I>
);

export const PlaySmallIcon = () => (
  <I size={28}>
    <Circle cx="12" cy="12" r="10" fill="#616161" />
    <Path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
  </I>
);

export const InfoIcon = () => (
  <I size={18}>
    <Circle cx="12" cy="12" r="7" stroke="#8E8C8C" strokeWidth="1.6" />
    <Path d="M12 11V16" stroke="#8E8C8C" strokeWidth="1.6" strokeLinecap="round" />
    <Circle cx="12" cy="8.2" r="0.8" fill="#8E8C8C" />
  </I>
);

export const CalendarSmallIcon = () => (
  <I size={18}>
    <Rect x="4" y="6" width="16" height="13" rx="2" stroke="#8E8C8C" strokeWidth="1.6" />
    <Path d="M4 10H20" stroke="#8E8C8C" strokeWidth="1.6" />
    <Path d="M8 4V8M16 4V8" stroke="#8E8C8C" strokeWidth="1.6" strokeLinecap="round" />
  </I>
);

export const ImageAddIcon = () => (
  <I size={22}>
    <Rect x="4" y="5" width="16" height="14" rx="2" stroke="#8E8C8C" strokeWidth="1.6" />
    <Path d="M7 15L10.2 11.5L13 14L15.2 12L17 14" stroke="#8E8C8C" strokeWidth="1.5" strokeLinejoin="round" />
    <Circle cx="9" cy="9" r="1.2" fill="#8E8C8C" />
  </I>
);

export const WarnCircleIcon = () => (
  <Svg width={normalize(72)} height={normalize(72)} viewBox="0 0 72 72" fill="none">
    <Circle cx="36" cy="36" r="28" stroke="#F4466E" strokeWidth="2.4" />
    <Path d="M36 22V40" stroke="#F4466E" strokeWidth="2.6" strokeLinecap="round" />
    <Circle cx="36" cy="48" r="2" fill="#F4466E" />
  </Svg>
);

export const RadioMark = ({ selected }) => (
  <View style={[iconStyles.radio, selected && iconStyles.radioOn]}>
    {selected ? <View style={iconStyles.radioDot} /> : null}
  </View>
);

const iconStyles = StyleSheet.create({
  plusBox: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(10),
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: {
    borderColor: '#FF8700',
  },
  radioDot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    backgroundColor: '#FF8700',
  },
});
