import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS, Fonts } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  search: {
    marginTop: normalize(24),
  },
  dream: {
    height: normalize(40),
    marginHorizontal: normalize(16),
    marginTop: normalize(24),
  },
  dreamTrack: {
    position: 'absolute',
    top: normalize(10),
    left: 0,
    right: 0,
    height: normalize(4),
    borderRadius: normalize(10),
    backgroundColor: '#EEEEEE',
    overflow: 'hidden',
  },
  dreamFill: {
    height: normalize(4),
    borderRadius: normalize(10),
    backgroundColor: '#FF8700',
  },
  dreamHeart: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  dreamCount: {
    position: 'absolute',
    left: normalize(30),
    top: normalize(20),
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(14),
    lineHeight: normalize(22),
    letterSpacing: 0.42,
  },
  dreamCurrent: {
    color: '#FF8700',
  },
  dreamRest: {
    color: '#979797',
  },
  list: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(24),
    paddingBottom: normalize(24),
    gap: normalize(24),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(12),
    minHeight: normalize(150),
  },
  photo: {
    width: normalize(135),
    height: normalize(150),
    borderRadius: normalize(5),
    backgroundColor: '#F3F3F3',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    gap: normalize(12),
  },
  marksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copy: {
    gap: normalize(2),
  },
  title: {
    fontFamily: Fonts.arm.semi_bold,
    fontSize: normalize(16),
    lineHeight: normalize(22),
    letterSpacing: 0.48,
    color: COLORS.black[50],
  },
  description: {
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(12),
    lineHeight: normalize(22),
    letterSpacing: 0.36,
    color: COLORS.black[50],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(24),
  },
  empty: {
    alignItems: 'center',
    marginTop: normalize(110),
  },
  emptyInList: {
    alignItems: 'center',
    marginTop: normalize(24),
  },
  emptyArt: {
    width: normalize(256),
    height: normalize(226),
    borderRadius: normalize(12),
    backgroundColor: '#F3F3F3',
  },
});

export default styles;
