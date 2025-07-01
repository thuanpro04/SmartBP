import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import ContainerComponent from './components/layout/ContainerComponent';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Main entrance animation
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

    // Continuous animations
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
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

    const waveAnimation = Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    );

    const logoRotateAnimation = Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true,
      }),
    );

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

    // Start animations
    entranceAnimation.start();

    setTimeout(() => {
      rotateAnimation.start();
      particleAnimation.start();
      glowAnimation.start();
      waveAnimation.start();
      logoRotateAnimation.start();
      breatheAnimation.start();
    }, 500);

    return () => {
      rotateAnimation.stop();
      particleAnimation.stop();
      glowAnimation.stop();
      waveAnimation.stop();
      logoRotateAnimation.stop();
      breatheAnimation.stop();
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const logoRotateInterpolate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const particleTranslateY = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const particleOpacity = particleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const waveScale = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 0.2, 0],
  });

  return (
    <ContainerComponent style={styles.container}>
      {/* Animated background */}
      <View style={styles.backgroundContainer}>
        {/* Gradient overlay */}
        <View style={styles.gradientOverlay} />

        {/* Rotating geometric shapes */}
        <Animated.View
          style={[
            styles.geometricShape,
            styles.shape1,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.geometricShape,
            styles.shape2,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.geometricShape,
            styles.shape3,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />

        {/* Wave animations */}
        {[...Array(3)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.wave,
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
              },
            ]}
          />
        ))}
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo section with glassmorphism */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: Animated.multiply(scaleAnim, breatheAnim) },
                { rotate: logoRotateInterpolate },
              ],
            },
          ]}
        >
          <View style={styles.glassCard}>
            {/* Animated glow effect */}
            <Animated.View style={[styles.glowEffect, { opacity: glowAnim }]} />

            {/* 3D Heart with pulse */}
            <View style={styles.heartContainer}>
              <Text style={styles.heartIcon}>🫀</Text>
              <View style={styles.heartbeat}>
                <View style={styles.heartbeatLine} />
              </View>
            </View>

            {/* Medical symbol */}
            <View style={styles.medicalSymbol}>
              <View style={styles.caduceus}>
                <View style={styles.caduceusStaff} />
                <View style={styles.caduceusWing1} />
                <View style={styles.caduceusWing2} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* App branding */}
        <Animated.View
          style={[
            styles.brandingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
          <Text style={styles.brandTitle}>
            <Text style={styles.brandHighlight}>Blood</Text>
            <Text style={styles.brandNormal}>Pressure</Text>
          </Text>
          <Text style={styles.brandSubtitle}>IoT Health Monitor</Text>

          <View style={styles.taglineContainer}>
            <View style={styles.taglineDot} />
            <Text style={styles.tagline}>Giám sát sức khỏe thông minh</Text>
            <View style={styles.taglineDot} />
          </View>
        </Animated.View>

        {/* Modern loading indicator */}
        <Animated.View
          style={[
            styles.loadingSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
          <View style={styles.loadingContainer}>
            <View style={styles.loadingTrack}>
              <Animated.View
                style={[
                  styles.loadingFill,
                  {
                    transform: [{ scaleX: particleAnim }],
                  },
                ]}
              />
            </View>
            <Text style={styles.loadingText}>Đang kết nối IoT...</Text>
          </View>

          {/* Status indicators */}
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Khởi động hệ thống</Text>
          </View>
        </Animated.View>
      </View>

      {/* Footer with tech info */}
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }],
          },
        ]}
      >
        <View style={styles.techBadge}>
          <Text style={styles.techText}>⚡ AI-Powered</Text>
          <Text style={styles.techText}>🔗 IoT Connected</Text>
          <Text style={styles.techText}>📊 Real-time Analytics</Text>
        </View>
        <Text style={styles.versionText}>Version 2.0.0 • Built with ❤️</Text>
      </Animated.View>
    </ContainerComponent>
  );
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
    // Gradient: dark purple to dark blue
  },

  geometricShape: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
  },

  shape1: {
    width: 150,
    height: 150,
    top: height * 0.1,
    right: -50,
    borderRadius: 30,
  },

  shape2: {
    width: 100,
    height: 100,
    bottom: height * 0.2,
    left: -30,
    borderRadius: 50,
  },

  shape3: {
    width: 80,
    height: 80,
    top: height * 0.3,
    left: width * 0.1,
    borderRadius: 40,
  },

  wave: {
    position: 'absolute',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: 'rgba(79, 172, 254, 0.05)',
    top: height * 0.4,
    left: -width * 0.5,
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
    top: height * 0.8,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 1,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },

  glassCard: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    fontSize: 50,
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
    marginBottom: 60,
  },

  brandTitle: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },

  brandHighlight: {
    color: '#ff6b6b',
    textShadowColor: 'rgba(255, 107, 107, 0.5)',
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
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },

  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  taglineDot: {
    width: 4,
    height: 4,
    backgroundColor: '#ffd93d',
    borderRadius: 2,
    marginHorizontal: 10,
  },

  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
  },

  loadingSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },

  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  loadingTrack: {
    width: 250,
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
  },

  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#6bcf7f',
    borderRadius: 4,
    marginRight: 8,
  },

  statusText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  techBadge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },

  techText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 2,
  },

  versionText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },

  // Responsive styles
  '@media (max-width: 768)': {
    brandTitle: {
      fontSize: 32,
    },
    glassCard: {
      width: 140,
      height: 140,
    },
  },

  '@media (max-width: 480)': {
    content: {
      paddingHorizontal: 20,
    },
    brandTitle: {
      fontSize: 28,
    },
    glassCard: {
      width: 120,
      height: 120,
    },
    heartIcon: {
      fontSize: 40,
    },
    loadingTrack: {
      width: 200,
    },
  },
});
