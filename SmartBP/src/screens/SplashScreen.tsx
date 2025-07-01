import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ContainerComponent from './components/layout/ContainerComponent';
import { RowComponent, TextComponent } from './components/layout';

const SplashScreen = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [isLandscape, setIsLandscape] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Listen for orientation changes
  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
      setIsLandscape(result.window.width > result.window.height);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    // Set initial orientation
    const { width, height } = screenData;
    setIsLandscape(width > height);

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }),
    );

    const waveAnimation = Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    );

    const particleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );

    const entranceAnimation = Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    const logoRotateAnimation = Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true,
      }),
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    entranceAnimation.start();

    setTimeout(() => {
      rotateAnimation.start();
      waveAnimation.start();
      particleAnimation.start();
      breatheAnimation.start();
      logoRotateAnimation.start();
      glowAnimation.start();
    }, 500);

    return () => {
      rotateAnimation.stop();
      waveAnimation.stop();
      particleAnimation.stop();
      logoRotateAnimation.stop();
      glowAnimation.stop();
      breatheAnimation.stop();
    };
  }, []);

  // Animation interpolations
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const waveScale = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 0.2, 0],
  });

  const particleTranslateY = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const particleOpacity = particleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const logoRotateInterpolate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Get responsive styles
  const responsiveStyles = getResponsiveStyles(screenData, isLandscape);

  return (
    <ContainerComponent style={[styles.container, responsiveStyles.container]}>
      <View style={styles.backgroundContainer}>
        <View style={styles.gradientOverlay} />

        {/* Geometric shapes with responsive positioning */}
        <Animated.View
          style={[
            styles.geometricShape,
            responsiveStyles.shape1,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.geometricShape,
            responsiveStyles.shape2,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.geometricShape,
            responsiveStyles.shape3,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />

        {/* Wave animations */}
        {[...Array(3)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.wave,
              responsiveStyles.wave,
              {
                transform: [{ scale: waveScale }],
                opacity: waveOpacity,
              },
            ]}
          />
        ))}
      </View>

      {/* Floating particles */}
      <View style={styles.particlesContainer}>
        {[...Array(8)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                left: `${10 + i * 12}%`,
                transform: [{ translateY: particleTranslateY }],
                opacity: particleOpacity,
                top: isLandscape
                  ? screenData.height * 0.7
                  : screenData.height * 0.8,
              },
            ]}
          />
        ))}
      </View>

      {/* Main content with responsive layout */}
      <View style={[styles.content, responsiveStyles.content]}>
        {isLandscape ? (
          // Landscape layout - horizontal arrangement
          <RowComponent style={responsiveStyles.landscapeContainer}>
            {/* Left side - Logo */}
            <Animated.View
              style={[
                styles.logoContainer,
                responsiveStyles.logoContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: Animated.multiply(scaleAnim, breatheAnim) },
                    { rotate: logoRotateInterpolate },
                  ],
                },
              ]}
            >
              <View style={[styles.glassCard, responsiveStyles.glassCard]}>
                <Animated.View
                  style={[styles.glowEffect, { opacity: glowAnim }]}
                />

                <View style={styles.heartContainer}>
                  <Text style={[styles.heartIcon, responsiveStyles.heartIcon]}>
                    🫀
                  </Text>
                  <View style={styles.heartbeat}>
                    <View style={styles.heartbeatLine} />
                  </View>
                </View>

                <View style={styles.medicalSymbol}>
                  <View style={styles.caduceus}>
                    <View style={styles.caduceusStaff} />
                    <View style={styles.caduceusWing1} />
                    <View style={styles.caduceusWing2} />
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* Right side - Text content */}
            <View style={responsiveStyles.textSide}>
              <Animated.View
                style={[
                  styles.brandingContainer,
                  responsiveStyles.brandingContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUpAnim }],
                  },
                ]}
              >
                <Text style={[styles.brandTitle, responsiveStyles.brandTitle]}>
                  <TextComponent
                    label="Blood"
                    style={[
                      styles.brandHighlight,
                      responsiveStyles.brandHighlight,
                    ]}
                  />
                  <TextComponent
                    label="Pressure"
                    style={[styles.brandNormal, responsiveStyles.brandNormal]}
                  />
                </Text>
                <TextComponent
                  label="IoT Health Monitor"
                  style={[styles.brandSubtitle, responsiveStyles.brandSubtitle]}
                />
                <RowComponent
                  style={[
                    styles.taglineContainer,
                    responsiveStyles.taglineContainer,
                  ]}
                >
                  <View style={styles.taglineDot} />
                  <TextComponent
                    style={[styles.tagline, responsiveStyles.tagline]}
                    label="Giám sát sức khỏe thông minh"
                  />
                  <View style={styles.taglineDot} />
                </RowComponent>
              </Animated.View>

              {/* Loading section */}
              <Animated.View
                style={[
                  styles.loadingSection,
                  responsiveStyles.loadingSection,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUpAnim }],
                  },
                ]}
              >
                <View style={styles.loadingContainer}>
                  <View
                    style={[styles.loadingTrack, responsiveStyles.loadingTrack]}
                  >
                    <Animated.View
                      style={[
                        styles.loadingFill,
                        { transform: [{ scaleX: particleAnim }] },
                      ]}
                    />
                  </View>
                  <TextComponent
                    label="Đang kết nối IoT..."
                    style={[styles.loadingText, responsiveStyles.loadingText]}
                  />
                  <View style={styles.statusContainer}>
                    <View style={styles.statusDot} />
                    <TextComponent
                      label="Khởi động hệ thống"
                      style={[styles.statusText, responsiveStyles.statusText]}
                    />
                    <View style={styles.statusDot} />
                  </View>
                </View>
              </Animated.View>
            </View>
          </RowComponent>
        ) : (
          // Portrait layout - vertical arrangement
          <>
            <Animated.View
              style={[
                styles.logoContainer,
                responsiveStyles.logoContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: Animated.multiply(scaleAnim, breatheAnim) },
                    { rotate: logoRotateInterpolate },
                  ],
                },
              ]}
            >
              <View style={[styles.glassCard, responsiveStyles.glassCard]}>
                <Animated.View
                  style={[styles.glowEffect, { opacity: glowAnim }]}
                />

                <View style={styles.heartContainer}>
                  <Text style={[styles.heartIcon, responsiveStyles.heartIcon]}>
                    🫀
                  </Text>
                  <View style={styles.heartbeat}>
                    <View style={styles.heartbeatLine} />
                  </View>
                </View>

                <View style={styles.medicalSymbol}>
                  <View style={styles.caduceus}>
                    <View style={styles.caduceusStaff} />
                    <View style={styles.caduceusWing1} />
                    <View style={styles.caduceusWing2} />
                  </View>
                </View>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.brandingContainer,
                responsiveStyles.brandingContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideUpAnim }],
                },
              ]}
            >
              <Text style={[styles.brandTitle, responsiveStyles.brandTitle]}>
                <TextComponent
                  label="Blood"
                  style={[
                    styles.brandHighlight,
                    responsiveStyles.brandHighlight,
                  ]}
                />
                <TextComponent
                  label="Pressure"
                  style={[styles.brandNormal, responsiveStyles.brandNormal]}
                />
              </Text>
              <TextComponent
                label="IoT Health Monitor"
                style={[styles.brandSubtitle, responsiveStyles.brandSubtitle]}
              />
              <RowComponent
                style={[
                  styles.taglineContainer,
                  responsiveStyles.taglineContainer,
                ]}
              >
                <View style={styles.taglineDot} />
                <TextComponent
                  style={[styles.tagline, responsiveStyles.tagline]}
                  label="Giám sát sức khỏe thông minh"
                />
                <View style={styles.taglineDot} />
              </RowComponent>
            </Animated.View>

            <Animated.View
              style={[
                styles.loadingSection,
                responsiveStyles.loadingSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideUpAnim }],
                },
              ]}
            >
              <View style={styles.loadingContainer}>
                <View
                  style={[styles.loadingTrack, responsiveStyles.loadingTrack]}
                >
                  <Animated.View
                    style={[
                      styles.loadingFill,
                      { transform: [{ scaleX: particleAnim }] },
                    ]}
                  />
                </View>
                <TextComponent
                  label="Đang kết nối IoT..."
                  style={[styles.loadingText, responsiveStyles.loadingText]}
                />
              </View>

              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <TextComponent
                  label="Khởi động hệ thống"
                  style={[styles.statusText, responsiveStyles.statusText]}
                />
                <View style={styles.statusDot} />
              </View>
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer */}
      <Animated.View
        style={[
          styles.footer,
          responsiveStyles.footer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }],
          },
        ]}
      >
        <View style={[styles.techBadge, responsiveStyles.techBadge]}>
          <Text style={[styles.techText, responsiveStyles.techText]}>
            ⚡ AI-Powered
          </Text>
          <Text style={[styles.techText, responsiveStyles.techText]}>
            🔗 IoT Connected
          </Text>
          <Text style={[styles.techText, responsiveStyles.techText]}>
            📊 Real-time Analytics
          </Text>
        </View>
        <Text style={[styles.versionText, responsiveStyles.versionText]}>
          Version 2.0.0 • Built with ❤️
        </Text>
      </Animated.View>
    </ContainerComponent>
  );
};

// Function to get responsive styles based on screen dimensions and orientation
const getResponsiveStyles = (screenData: any, isLandscape: any) => {
  const { width, height } = screenData;

  return StyleSheet.create({
    container: {
      flexDirection: isLandscape ? 'row' : 'column',
    },

    content: {
      paddingHorizontal: isLandscape ? 20 : 30,
      paddingVertical: isLandscape ? 10 : 0,
      alignSelf: 'center',
    },

    landscapeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
    },

    textSide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 40,
    },

    logoContainer: {
      marginBottom: isLandscape ? 0 : 50,
      flex: isLandscape ? 0 : undefined,
    },

    glassCard: {
      width: isLandscape ? 120 : 160,
      height: isLandscape ? 120 : 160,
    },

    heartIcon: {
      fontSize: isLandscape ? 35 : 50,
    },

    brandingContainer: {
      alignItems: isLandscape ? 'flex-start' : 'center',
      marginBottom: isLandscape ? 30 : 60,
    },

    brandTitle: {
      fontSize: isLandscape ? 28 : 36,
      textAlign: isLandscape ? 'left' : 'center',
    },

    brandHighlight: {
      fontSize: isLandscape ? 28 : 36,
    },

    brandNormal: {
      fontSize: isLandscape ? 28 : 36,
    },

    brandSubtitle: {
      fontSize: isLandscape ? 14 : 16,
      textAlign: isLandscape ? 'left' : 'center',
    },

    taglineContainer: {
      justifyContent: isLandscape ? 'flex-start' : 'center',
    },

    tagline: {
      fontSize: isLandscape ? 12 : 14,
    },

    loadingSection: {
      marginBottom: isLandscape ? 20 : 40,
      alignItems: isLandscape ? 'flex-start' : 'center',
    },

    loadingTrack: {
      width: isLandscape ? 200 : 250,
    },

    loadingText: {
      fontSize: isLandscape ? 12 : 14,
    },

    statusText: {
      fontSize: isLandscape ? 10 : 12,
    },

    footer: {
      paddingBottom: isLandscape ? 15 : 30,
      paddingHorizontal: isLandscape ? 40 : 20,
    },

    techBadge: {
      marginBottom: isLandscape ? 8 : 15,
    },

    techText: {
      fontSize: isLandscape ? 8 : 10,
      paddingHorizontal: isLandscape ? 6 : 8,
      paddingVertical: isLandscape ? 3 : 4,
    },

    versionText: {
      fontSize: isLandscape ? 9 : 11,
    },

    // Background elements responsive positioning
    shape1: {
      width: isLandscape ? 100 : 150,
      height: isLandscape ? 100 : 150,
      top: isLandscape ? height * 0.05 : height * 0.1,
      right: isLandscape ? -30 : -50,
      borderRadius: isLandscape ? 20 : 30,
    },

    shape2: {
      width: isLandscape ? 70 : 100,
      height: isLandscape ? 70 : 100,
      bottom: isLandscape ? height * 0.1 : height * 0.2,
      left: isLandscape ? -20 : -30,
      borderRadius: isLandscape ? 35 : 50,
    },

    shape3: {
      width: isLandscape ? 60 : 80,
      height: isLandscape ? 60 : 80,
      top: isLandscape ? height * 0.2 : height * 0.3,
      left: isLandscape ? width * 0.05 : width * 0.1,
      borderRadius: isLandscape ? 30 : 40,
    },

    wave: {
      width: width * (isLandscape ? 1.5 : 2),
      height: width * (isLandscape ? 1.5 : 2),
      borderRadius: width * (isLandscape ? 0.75 : 1),
      top: height * (isLandscape ? 0.3 : 0.4),
      left: -width * (isLandscape ? 0.25 : 0.5),
    },
  });
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a2e',
  },

  geometricShape: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
  },

  wave: {
    position: 'absolute',
    backgroundColor: 'rgba(79, 172, 254, 0.05)',
  },

  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#4facfe',
    borderRadius: 2,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  logoContainer: {
    alignItems: 'center',
  },

  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
    position: 'relative',
    overflow: 'hidden',
  },

  glowEffect: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(79, 172, 254, 0.3)',
    borderRadius: 40,
  },

  heartContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  heartIcon: {
    marginBottom: 10,
  },

  heartbeat: {
    width: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartbeatLine: {
    width: 50,
    height: 2,
    backgroundColor: '#ff6b6b',
    borderRadius: 1,
  },

  medicalSymbol: {
    alignItems: 'center',
  },

  caduceus: {
    width: 30,
    height: 30,
    position: 'relative',
  },

  caduceusStaff: {
    width: 2,
    height: 30,
    backgroundColor: '#ffd93d',
    position: 'absolute',
    left: 14,
    borderRadius: 1,
  },

  caduceusWing1: {
    width: 15,
    height: 8,
    backgroundColor: '#4facfe',
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: 8,
    transform: [{ rotate: '15deg' }],
  },

  caduceusWing2: {
    width: 15,
    height: 8,
    backgroundColor: '#4facfe',
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 8,
    transform: [{ rotate: '-15deg' }],
  },

  brandingContainer: {
    alignItems: 'center',
  },

  brandTitle: {
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 2,
  },

  brandHighlight: {
    color: '#ff6b6b',
    textShadowColor: 'rgba(255,107,107,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  brandNormal: {
    color: '#4facfe',
    textShadowColor: 'rgba(79, 172, 254, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  brandSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },

  taglineContainer: {
    alignItems: 'center',
  },

  taglineDot: {
    width: 4,
    height: 4,
    backgroundColor: '#ffd93d',
    borderRadius: 2,
    marginHorizontal: 10,
  },

  tagline: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
  },

  loadingSection: {
    alignItems: 'center',
    width: '100%',
  },

  loadingContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },

  loadingTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },

  loadingFill: {
    height: '100%',
    backgroundColor: '#4facfe',
    borderRadius: 3,
    width: '70%',
    alignSelf: 'center',
  },

  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#6bcf7f',
    borderRadius: 4,
    marginHorizontal: 8,
  },

  statusText: {
    color: 'rgba(255, 255, 255, 0.6)',
  },

  footer: {
    alignItems: 'center',
  },

  techBadge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  techText: {
    color: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 2,
  },

  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
});
