import { appColors } from '../../utils/appColors';

export const menuInfo = [
  {
    id: '1',
    title: 'Learn About Blood Pressure',
    background: appColors.cardLearn,
    icon: require('../../assets/images/learn-blood-pressure.png'),
    uriBackground: require('../../assets/images/cloud1.png'),
    screen: 'learn',
  },

  {
    id: '3',
    title: 'Who is at risk for hight blood pressure',
    background: appColors.cardWhoHighBP,
    icon: require('../../assets/images/hight-blood-pressure.png'),
    uriBackground: require('../../assets/images/cloud3.png'),
    screen: 'risk',
  },
  {
    id: '4',
    title: 'How can i prevent hight blood pressure?',
    background: appColors.cardpPreventBP,
    icon: require('../../assets/images/protect-blood-pressure.png'),
    uriBackground: require('../../assets/images/cloud4.png'),
    screen: 'prevent',
  },
  {
    id: '5',
    title: 'Lower Blood Pressure by Exercises',
    background: appColors.cardLowerBP,
    icon: require('../../assets/images/low-blood-pressure.png'),
    uriBackground: require('../../assets/images/cloud3.png'),
    screen: 'lower',
  },
  {
    id: '6',
    title: 'How can i prevent hight blood pressure?',
    background: appColors.cardHowHighBP,
    icon: require('../../assets/images/problem-blood-pressure.png'),
    uriBackground: require('../../assets/images/cloud1.png'),
    screen: 'prevent',
  },
];
