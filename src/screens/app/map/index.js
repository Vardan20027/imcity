import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '../profile/parts';
import { PinIcon } from '../business/icons';
import { confirmMapPick } from '../business/mapPick';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS, Fonts } from '../../../assets/rootStyles';

const DEFAULT_ADDRESS = 'Երևան, Աբովյան 22';

const MapScreen = ({ navigation, route }) => {
  const address = route.params?.address || DEFAULT_ADDRESS;
  const picker = !!route.params?.picker;

  const confirm = () => {
    if (picker) {
      confirmMapPick(address || DEFAULT_ADDRESS);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Քարտեզ" onBack={() => navigation.goBack()} />
      <View style={styles.map}>
        <View style={styles.park} />
        <View style={styles.roadH} />
        <View style={styles.roadV} />
        <View style={styles.blockA} />
        <View style={styles.blockB} />
        <View style={styles.pin}>
          <PinIcon />
        </View>
      </View>
      <View style={styles.bar}>
        <View style={styles.address}>
          <Text style={styles.addressText}>{address}</Text>
          <Text style={styles.addressSub}>Հասցե</Text>
        </View>
        <TouchableOpacity style={styles.go} onPress={confirm} activeOpacity={picker ? 0.8 : 1}>
          <Text style={styles.goText}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  map: {
    flex: 1,
    marginHorizontal: normalize(16),
    marginTop: normalize(12),
    borderRadius: normalize(16),
    overflow: 'hidden',
    backgroundColor: '#E7F0E4',
  },
  park: {
    position: 'absolute',
    left: '8%',
    top: '12%',
    width: '34%',
    height: '28%',
    borderRadius: normalize(12),
    backgroundColor: '#C9E2BF',
  },
  roadH: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '46%',
    height: normalize(18),
    backgroundColor: '#F4F1EA',
  },
  roadV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '58%',
    width: normalize(18),
    backgroundColor: '#F4F1EA',
  },
  blockA: {
    position: 'absolute',
    right: '8%',
    top: '18%',
    width: '22%',
    height: '16%',
    borderRadius: normalize(8),
    backgroundColor: '#D5DDE8',
  },
  blockB: {
    position: 'absolute',
    left: '14%',
    bottom: '16%',
    width: '28%',
    height: '18%',
    borderRadius: normalize(8),
    backgroundColor: '#F7E7D2',
  },
  pin: {
    position: 'absolute',
    left: '52%',
    top: '40%',
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    marginHorizontal: normalize(16),
    marginVertical: normalize(16),
    minHeight: normalize(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address: {
    flex: 1,
    marginRight: normalize(12),
  },
  addressText: {
    fontFamily: Fonts.arm.semi_bold,
    fontSize: normalize(14),
    color: COLORS.black[50],
  },
  addressSub: {
    marginTop: normalize(2),
    fontFamily: Fonts.arm.regular,
    fontSize: normalize(12),
    color: '#8E8C8C',
  },
  go: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: '#FF8700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goText: {
    color: COLORS.white,
    fontSize: normalize(18),
    fontFamily: Fonts.arm.semi_bold,
  },
});

export default MapScreen;
