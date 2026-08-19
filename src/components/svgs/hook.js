import React from 'react';
import { ICON_NAMES } from './icon_names';
import WhiteLogo from './logo/whiteLogo';
import GoogleIcon from './social/google';
import CalmIcon from './emotions/calm';
import FunIcon from './emotions/fun';
import DiscoveryIcon from './emotions/discovery';
import DriveIcon from './emotions/drive';
import RomanceIcon from './emotions/romance';
import WorkingIcon from './emotions/working';
import CheckMarkIcon from './checkmark';
import InspirationIcon from './emotions/inspiration';
import ArrowBack from './arrows/back';
import CalendarIcon from './calendar';
import SearchIcon from "./search";
import PlusIcon from "./plus";
import ArrowDown from "./arrows/down";

export const ICONS = {
  [ICON_NAMES.WHITE_LOGO]: ({ width, height, color }) => (
    <WhiteLogo width={width} height={height} color={color} />
  ),
  [ICON_NAMES.SOCIAL.GOOGLE]: ({ width, height, color }) => (
    <GoogleIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.ARROWS.BACK]: ({ width, height, color }) => (
    <ArrowBack width={width} height={height} color={color} />
  ),
  [ICON_NAMES.ARROWS.DOWN]: ({ width, height, color }) => (
    <ArrowDown width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.CALM]: ({ width, height, color }) => (
    <CalmIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.DISCOVERY]: ({ width, height, color }) => (
    <DiscoveryIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.DRIVE]: ({ width, height, color }) => (
    <DriveIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.FUN]: ({ width, height, color }) => (
    <FunIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.ROMANCE]: ({ width, height, color }) => (
    <RomanceIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.WORKING]: ({ width, height, color }) => (
    <WorkingIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.EMOTIONS.INSPIRATION]: ({ width, height, color }) => (
    <InspirationIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.CHECKMARK]: ({ width, height, color }) => (
    <CheckMarkIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.CALENDAR]: ({ width, height, color }) => (
    <CalendarIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.SEARCH]: ({ width, height, color }) => (
    <SearchIcon width={width} height={height} color={color} />
  ),
  [ICON_NAMES.PLUS]: ({ width, height, color }) => (
    <PlusIcon width={width} height={height} color={color} />
  ),
};
