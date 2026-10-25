import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';

const XmlIcon = ({ xml, width, height }) => (
  <SvgXml xml={xml} width={width} height={height} />
);

const GRID = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor"/></svg>`;
const INFO = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3H14L19 8V20C19 20.5523 18.5523 21 18 21H7C6.44772 21 6 20.5523 6 20V4C6 3.44772 6.44772 3 7 3Z" stroke="currentColor" stroke-width="1.8"/><path d="M14 3V8H19" stroke="currentColor" stroke-width="1.8"/><path d="M9 12H16M9 16H14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const INFO_FILL = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3H14L19 8V20C19 20.5523 18.5523 21 18 21H7C6.44772 21 6 20.5523 6 20V4C6 3.44772 6.44772 3 7 3Z" fill="currentColor"/><path d="M9 12H16M9 16H14" stroke="white" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const CAL = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 10H20" stroke="currentColor" stroke-width="1.8"/><path d="M8 3V7M16 3V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const CAL_FILL = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="15" rx="2" fill="currentColor"/><path d="M4 10H20" stroke="white" stroke-width="1.6"/><path d="M8 3V7M16 3V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const LIST = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7H19M5 12H19M5 17H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const SPARK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5L9.2 6.8L14.5 8L9.2 9.2L8 14.5L6.8 9.2L1.5 8L6.8 6.8L8 1.5Z" fill="white"/></svg>`;
const SPARK_DARK = SPARK.replace('fill="white"', 'fill="#6A6A6A"');
const COIN = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="#F4C430"/><circle cx="9" cy="9" r="5.5" fill="#FFE58A"/><path d="M9 5.2V12.8M7.2 7.1H10.2C10.9 7.1 11.4 7.6 11.4 8.3C11.4 9 10.9 9.5 10.2 9.5H7.8C7.2 9.5 6.6 10 6.6 10.7C6.6 11.4 7.2 11.9 7.8 11.9H11" stroke="#C79200" stroke-width="1.1" stroke-linecap="round"/></svg>`;
const CHAT = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 15.5L3 18L6.2 16.4C7.3 16.8 8.6 17 10 17C14.4 17 18 13.9 18 10C18 6.1 14.4 3 10 3C5.6 3 2 6.1 2 10C2 11.6 2.6 13.1 3.6 14.3L4 15.5Z" stroke="#8E8C8C" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
const HEART = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4 3.75C19.1 3.75 20.47 4.31 21.58 5.4C22.69 6.5 23.25 7.86 23.25 9.53C23.25 11.6 22.48 13.52 20.89 15.3C19.21 17.18 17.3 19.07 15.16 20.97L13.12 22.82C12.95 22.98 12.79 23.08 12.61 23.14C12.39 23.22 12.19 23.25 12 23.25C11.81 23.25 11.61 23.22 11.39 23.14C11.21 23.08 11.05 22.98 10.91 22.82L8.81 20.95C6.71 19.04 4.81 17.15 3.12 15.29C1.52 13.51 0.75 11.6 0.75 9.53C0.82 8 1.38 6.73 2.42 5.4C3.53 4.31 4.9 3.75 6.6 3.75C7.55 3.75 8.44 3.95 9.28 4.35C10.13 4.75 10.84 5.29 11.43 5.98L12 6.65L12.57 5.98C13.16 5.29 13.87 4.75 14.72 4.35C15.45 4 16.23 3.8 17.05 3.76L17.4 3.75Z" stroke="#8E8C8C" stroke-width="1.5"/></svg>`;
const PIN = `<svg width="16" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 7.6C5.43 7.6 4.89 7.39 4.48 7.01C4.08 6.64 3.86 6.13 3.86 5.6C3.86 5.07 4.08 4.56 4.48 4.19C4.89 3.81 5.43 3.6 6 3.6C6.57 3.6 7.11 3.81 7.52 4.19C7.92 4.56 8.14 5.07 8.14 5.6C8.14 6.13 7.92 6.64 7.52 7.01C7.11 7.39 6.57 7.6 6 7.6ZM6 0C4.41 0 2.88 0.59 1.76 1.64C0.63 2.69 0 4.11 0 5.6C0 9.8 6 16 6 16C6 16 12 9.8 12 5.6C12 4.11 11.37 2.69 10.24 1.64C9.12 0.59 7.59 0 6 0Z" fill="#626265"/></svg>`;
const PHONE = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8 11.3V12.8C13.8 13.1 13.69 13.39 13.49 13.61C13.29 13.83 13.02 13.96 12.73 13.97C10.91 14.11 9.15 13.64 7.64 12.64C6.23 11.72 5.04 10.53 4.12 9.12C3.11 7.59 2.64 5.81 2.79 3.98C2.8 3.69 2.93 3.42 3.14 3.21C3.35 3 3.63 2.89 3.93 2.89H5.39C5.92 2.88 6.38 3.26 6.47 3.79C6.55 4.32 6.68 4.84 6.86 5.33C7 5.71 6.91 6.13 6.62 6.38L6 6.99C6.85 8.36 8 9.51 9.37 10.36L9.98 9.75C10.23 9.46 10.65 9.37 11.03 9.51C11.52 9.69 12.04 9.82 12.57 9.9C13.11 10 13.49 10.47 13.47 11.01L13.8 11.3Z" stroke="#626265" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const WEB = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="#626265" stroke-width="1.3"/><path d="M2.5 8H13.5M8 2C9.7 3.7 10.6 5.6 10.6 8C10.6 10.4 9.7 12.3 8 14C6.3 12.3 5.4 10.4 5.4 8C5.4 5.6 6.3 3.7 8 2Z" stroke="#626265" stroke-width="1.3"/></svg>`;
const CLOCK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="#12B900" stroke-width="1.3"/><path d="M8 5V8.3L10 9.5" stroke="#12B900" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const WARN = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.8L14.5 13.2H1.5L8 1.8Z" stroke="#FF8700" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 6.4V9.3" stroke="#FF8700" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="#FF8700"/></svg>`;
const EYE = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 8C1.5 8 3.7 3.5 8 3.5C12.3 3.5 14.5 8 14.5 8C14.5 8 12.3 12.5 8 12.5C3.7 12.5 1.5 8 1.5 8Z" stroke="#8E8C8C" stroke-width="1.3"/><circle cx="8" cy="8" r="2.2" stroke="#8E8C8C" stroke-width="1.3"/></svg>`;
const COMMENT = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.2 12.2L2.4 14.2L5 13C5.9 13.3 6.9 13.5 8 13.5C11.6 13.5 14.5 11 14.5 8C14.5 5 11.6 2.5 8 2.5C4.4 2.5 1.5 5 1.5 8C1.5 9.3 2 10.5 2.8 11.4L3.2 12.2Z" stroke="#8E8C8C" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

const paint = (xml, color) => xml.replace(/currentColor/g, color);

export const TabGridIcon = ({ active }) => (
  <XmlIcon xml={paint(GRID, active ? '#171717' : '#B2B2B2')} width={normalize(24)} height={normalize(24)} />
);
export const TabInfoIcon = ({ active }) => (
  <XmlIcon xml={paint(active ? INFO_FILL : INFO, active ? '#171717' : '#B2B2B2')} width={normalize(24)} height={normalize(24)} />
);
export const TabCalIcon = ({ active }) => (
  <XmlIcon xml={paint(active ? CAL_FILL : CAL, active ? '#171717' : '#B2B2B2')} width={normalize(24)} height={normalize(24)} />
);
export const TabListIcon = ({ active }) => (
  <XmlIcon xml={paint(LIST, active ? '#171717' : '#B2B2B2')} width={normalize(24)} height={normalize(24)} />
);
export const SparkleIcon = ({ dark }) => (
  <XmlIcon xml={dark ? SPARK_DARK : SPARK} width={normalize(16)} height={normalize(16)} />
);
export const CoinIcon = () => (
  <XmlIcon xml={COIN} width={normalize(18)} height={normalize(18)} />
);
export const ChatIcon = () => (
  <XmlIcon xml={CHAT} width={normalize(20)} height={normalize(20)} />
);
export const HeartOutlineIcon = () => (
  <XmlIcon xml={HEART} width={normalize(24)} height={normalize(24)} />
);
export const PinIcon = () => (
  <XmlIcon xml={PIN} width={normalize(12)} height={normalize(16)} />
);
export const PhoneIcon = () => (
  <XmlIcon xml={PHONE} width={normalize(16)} height={normalize(16)} />
);
export const WebIcon = () => (
  <XmlIcon xml={WEB} width={normalize(16)} height={normalize(16)} />
);
export const ClockIcon = () => (
  <XmlIcon xml={CLOCK} width={normalize(16)} height={normalize(16)} />
);
export const WarnIcon = () => (
  <XmlIcon xml={WARN} width={normalize(16)} height={normalize(16)} />
);
export const EyeIcon = () => (
  <XmlIcon xml={EYE} width={normalize(16)} height={normalize(16)} />
);
export const CommentIcon = () => (
  <XmlIcon xml={COMMENT} width={normalize(16)} height={normalize(16)} />
);

export const IconBox = ({ children }) => (
  <View style={{ width: normalize(24), height: normalize(24), alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </View>
);
