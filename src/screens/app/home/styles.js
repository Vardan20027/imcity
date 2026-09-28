import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS, Fonts } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    feedContent: {
      paddingBottom: normalize(24),
    },
    postSeparator: {
      height: normalize(24),
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: normalize(16),
      height: normalize(34),
    },
    citySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(4),
    },
    cityName: {
      fontFamily: Fonts.arm.medium,
      fontSize: normalize(16),
      lineHeight: normalize(22),
      letterSpacing: 0.48,
      color: COLORS.black[50],
    },
    cityMenuBackdrop: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 20,
    },
    cityMenu: {
      position: 'absolute',
      top: normalize(50),
      left: normalize(16),
      minWidth: normalize(145),
      paddingVertical: normalize(11),
      backgroundColor: COLORS.white,
      borderRadius: normalize(12),
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
      zIndex: 21,
    },
    cityOptionSelected: {
      backgroundColor: '#FAFAFA',
    },
    cityOption: {
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(7),
    },
    cityOptionText: {
      fontFamily: Fonts.arm.medium,
      fontSize: normalize(16),
      lineHeight: normalize(26),
      color: COLORS.black[50],
    },

    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      height: normalize(44),
      marginHorizontal: normalize(16),
      marginTop: normalize(16),
      paddingHorizontal: normalize(12),
      borderWidth: 1,
      borderColor: '#DCDCDC',
      borderRadius: normalize(16),
      backgroundColor: '#FAFAFA',
      gap: normalize(10),
    },
    searchInput: {
      flex: 1,
      padding: 0,
      fontFamily: Fonts.arm.regular,
      fontSize: normalize(16),
      color: COLORS.black[50],
    },

    chipsContent: {
      paddingHorizontal: normalize(16),
      paddingTop: normalize(16),
      paddingBottom: normalize(24),
      gap: normalize(4),
      alignItems: 'center',
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: normalize(43),
      paddingHorizontal: normalize(12),
      borderRadius: normalize(20),
      gap: normalize(8),
    },
    chipIdle: {
      borderWidth: 1,
      borderColor: '#D0D0D0',
      backgroundColor: COLORS.white,
    },
    chipPressed: {
      opacity: 0.85,
    },
    chipLabel: {
      fontFamily: Fonts.arm.semi_bold,
      fontSize: normalize(12),
      letterSpacing: 0.36,
    },
    chipLabelIdle: {
      color: '#7B7B7B',
    },
    chipIcon: {
      width: normalize(16),
      height: normalize(16),
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
      width: '100%',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: normalize(16),
      marginBottom: normalize(12),
    },
    authorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(8),
    },
    authorAvatar: {
      width: normalize(32),
      height: normalize(32),
      borderRadius: normalize(16),
    },
    landmarkBadge: {
      width: normalize(32),
      height: normalize(32),
      borderRadius: normalize(16),
      backgroundColor: 'rgba(255,135,0,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    authorName: {
      fontFamily: Fonts.arm.medium,
      fontSize: normalize(16),
      lineHeight: normalize(22),
      letterSpacing: 0.48,
      color: COLORS.black[50],
    },

    media: {
      width: '100%',
      height: normalize(450),
      backgroundColor: COLORS.mediaPlaceholder,
      overflow: 'hidden',
    },
    mediaFill: {
      width: '100%',
      height: '100%',
    },

    pillsRow: {
      position: 'absolute',
      top: normalize(32),
      left: normalize(16),
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(10),
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      height: normalize(30),
      paddingHorizontal: normalize(16),
      borderRadius: 999,
      backgroundColor: 'rgba(255,255,255,0.4)',
      gap: normalize(4),
    },
    pillText: {
      fontFamily: Fonts.arm.semi_bold,
      fontSize: normalize(14),
      lineHeight: normalize(22),
      color: '#F9F9F9',
    },
    pillDivider: {
      width: 1,
      height: normalize(10),
      marginHorizontal: normalize(4),
      backgroundColor: '#F9F9F9',
    },

    likeBtn: {
      position: 'absolute',
      top: normalize(35),
      right: normalize(40),
      width: normalize(24),
      height: normalize(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    playBtn: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: normalize(40),
      height: normalize(40),
      marginTop: -normalize(20),
      marginLeft: -normalize(20),
    },
    volumeBtn: {
      position: 'absolute',
      left: normalize(16),
      bottom: normalize(14),
    },
    reactions: {
      position: 'absolute',
      right: normalize(16),
      bottom: normalize(16),
      width: normalize(95),
      height: normalize(87),
    },
    reactorWrap: {
      position: 'absolute',
      width: normalize(40),
      height: normalize(40),
    },
    reactor: {
      width: normalize(40),
      height: normalize(40),
      borderRadius: normalize(20),
      borderWidth: 2,
      borderColor: COLORS.white,
      overflow: 'hidden',
      backgroundColor: COLORS.border,
    },
    reactorHighlight: {
      width: normalize(40),
      height: normalize(40),
      borderColor: COLORS.gold,
    },
    reactorImage: {
      width: '100%',
      height: '100%',
    },
    reactorBadge: {
      position: 'absolute',
      right: normalize(-2),
      bottom: normalize(-4),
      width: normalize(16),
      height: normalize(16),
      borderRadius: normalize(8),
      backgroundColor: COLORS.overlay,
      alignItems: 'center',
      justifyContent: 'center',
    },

    actionsRow: {
      marginTop: normalize(14),
      marginHorizontal: normalize(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: normalize(39),
    },
    emotionIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(2),
    },
    actionsRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(12),
    },
    countChip: {
      flexDirection: 'row',
      alignItems: 'center',
      height: normalize(39),
      width: normalize(134),
      paddingHorizontal: normalize(8),
      borderWidth: 1,
      borderColor: '#171717',
      borderRadius: normalize(20),
    },
    countChipInner: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    countChipLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(4),
    },
    countChipLabel: {
      fontFamily: Fonts.arm.semi_bold,
      fontSize: normalize(10),
      letterSpacing: 0.3,
      color: '#171717',
    },
    countChipDivider: {
      width: 1,
      height: normalize(12),
      backgroundColor: '#171717',
    },
    countChipValue: {
      fontFamily: Fonts.arm.medium,
      fontSize: normalize(10),
      lineHeight: normalize(22),
      color: '#171717',
    },

    cardBody: {
      paddingHorizontal: normalize(16),
      marginTop: normalize(14),
      gap: normalize(14),
    },
    description: {
      fontFamily: Fonts.arm.regular,
      fontSize: normalize(14),
      lineHeight: normalize(22),
      color: COLORS.black[50],
    },
    descriptionMuted: {
      color: '#545454',
      lineHeight: normalize(20),
    },
    more: {
      fontFamily: Fonts.arm.medium,
      fontSize: normalize(10),
      lineHeight: normalize(22),
      color: '#979797',
      marginTop: normalize(12),
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(8),
    },
    locationText: {
      fontFamily: Fonts.arm.regular,
      fontSize: normalize(14),
      lineHeight: normalize(22),
      color: 'rgba(0,0,0,0.6)',
    },
    locationTextBold: {
      fontFamily: Fonts.arm.semi_bold,
    },
    price: {
      fontFamily: Fonts.arm.semi_bold,
      fontSize: normalize(18),
      lineHeight: normalize(22),
      color: COLORS.black[50],
      marginTop: normalize(14),
    },
    memoryAuthor: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(12),
      marginBottom: normalize(12),
    },
    memoryAuthorAvatar: {
      width: normalize(24),
      height: normalize(24),
      borderRadius: normalize(12),
    },
    memoryAuthorName: {
      fontFamily: Fonts.arm.medium,
      fontSize: normalize(14),
      lineHeight: normalize(22),
      letterSpacing: 0.42,
      color: COLORS.black[50],
    },
  });

export default styles;
