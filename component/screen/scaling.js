import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//가이드라인 크기는 표준 ~5" 화면 모바일 기기 기준 350*680∂
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale, width, height};