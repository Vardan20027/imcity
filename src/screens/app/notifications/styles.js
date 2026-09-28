import { Platform, StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS, Fonts } from '../../../assets/rootStyles';

const androidText = Platform.select({
  android: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  default: {},
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: normalize(22),
    marginHorizontal: normalize(16),
    marginTop: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  title: {
    fontFamily: Fonts.arm.semi_bold,
    fontSize: normalize(16),
    lineHeight: normalize(22),
    letterSpacing: 0.48,
    color: COLORS.black[50],
    textAlign: 'center',
    ...androidText,
  },
  list: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(32),
    paddingBottom: normalize(32),
    gap: normalize(32),
  },
  inviteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inviteCover: {
    width: normalize(85),
    height: normalize(79),
    borderRadius: normalize(12),
  },
  inviteBody: {
    width: normalize(214),
    gap: normalize(12),
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  inviteAvatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
  },
  name: {
    fontFamily: Fonts.arm.semi_bold,
    fontSize: normalize(14),
    lineHeight: normalize(22),
    letterSpacing: 0.42,
    color: COLORS.black[50],
    flexShrink: 1,
    ...androidText,
  },
  inviteCopy: {
    width: '100%',
  },
  inviteLine: {
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    letterSpacing: 0.36,
    color: '#626265',
    ...androidText,
  },
  inviteEvent: {
    fontFamily: Fonts.arm.medium,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    letterSpacing: 0.36,
    color: '#626265',
    ...androidText,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  accept: {
    width: normalize(101),
    height: normalize(28),
    borderRadius: normalize(10),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptLabel: {
    fontFamily: Fonts.arm.medium,
    fontSize: normalize(12),
    lineHeight: normalize(16),
    letterSpacing: 0.36,
    color: COLORS.white,
    ...androidText,
  },
  decline: {
    width: normalize(101),
    height: normalize(28),
    borderRadius: normalize(10),
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineLabel: {
    fontFamily: Fonts.arm.medium,
    fontSize: normalize(12),
    lineHeight: normalize(16),
    letterSpacing: 0.36,
    color: COLORS.black[50],
    ...androidText,
  },
  time: {
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(10),
    lineHeight: normalize(16),
    letterSpacing: 0.3,
    color: '#A1A1A6',
    ...androidText,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E6E6E6',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(14),
  },
  eventCover: {
    width: normalize(85),
    height: normalize(79),
    borderRadius: normalize(5),
  },
  eventBody: {
    flex: 1,
    gap: normalize(12),
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  eventLogo: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
  },
  eventDescription: {
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    color: '#626265',
    ...androidText,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(10),
  },
  userAvatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
  },
  userBody: {
    flex: 1,
    gap: normalize(4),
  },
  userLine: {
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(12),
    lineHeight: normalize(18),
    letterSpacing: 0.36,
    color: '#626265',
    ...androidText,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: normalize(110),
    paddingHorizontal: normalize(30),
    gap: normalize(54),
  },
  emptyCopy: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: Fonts.arm.semi_bold,
    fontSize: normalize(16),
    lineHeight: normalize(22),
    letterSpacing: 0.48,
    color: COLORS.black[50],
    textAlign: 'center',
    ...androidText,
  },
  emptyText: {
    marginTop: normalize(12),
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(14),
    lineHeight: normalize(20),
    letterSpacing: 0.42,
    color: '#919191',
    textAlign: 'center',
    ...androidText,
  },
});

export default styles;
