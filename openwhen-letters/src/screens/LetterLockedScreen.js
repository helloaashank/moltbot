import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/colors';
import { calculateTimeRemaining, formatTimeUnit, getEmotionalCountdownMessage } from '../utils/countdown';
import Button from '../components/Button';

const LetterLockedScreen = ({ route, navigation }) => {
  const { letter } = route.params || {};
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false,
  });

  const fadeAnim = useState(new Animated.Value(0.5))[0];

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Update countdown every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(letter?.unlockDate);
      setTimeRemaining(remaining);

      // Check if letter is now unlocked
      if (remaining.isUnlocked) {
        clearInterval(interval);
        // In a real app, you'd navigate to opened screen or update state
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [letter]);

  if (!letter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>No letter found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const emotionalMessage = getEmotionalCountdownMessage(timeRemaining.days);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Lock Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.lockCircle}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        </View>

        {/* Status Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.statusTitle}>This letter isn't ready yet.</Text>
          <Text style={styles.emotionalMessage}>{emotionalMessage}</Text>
        </View>

        {/* Countdown Timer */}
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownLabel}>Unlocking in</Text>
          <View style={styles.countdownGrid}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{formatTimeUnit(timeRemaining.days)}</Text>
              <Text style={styles.timeLabel}>Days</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{formatTimeUnit(timeRemaining.hours)}</Text>
              <Text style={styles.timeLabel}>Hours</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{formatTimeUnit(timeRemaining.minutes)}</Text>
              <Text style={styles.timeLabel}>Minutes</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{formatTimeUnit(timeRemaining.seconds)}</Text>
              <Text style={styles.timeLabel}>Seconds</Text>
            </View>
          </View>
        </View>

        {/* Letter Info */}
        <View style={styles.letterInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>For:</Text>
            <Text style={styles.infoValue}>{letter.recipientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Open When:</Text>
            <Text style={styles.infoValue}>{letter.openWhenCondition}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Unlocks On:</Text>
            <Text style={styles.infoValue}>
              {new Date(letter.unlockDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Patience Message */}
        <View style={styles.patienceContainer}>
          <Text style={styles.patienceText}>
            Good things come to those who wait. {'\n'}
            This letter will be worth it.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Button
            title="Back to Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
            variant="secondary"
            size="medium"
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  iconContainer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  lockCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  lockIcon: {
    fontSize: 48,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  statusTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emotionalMessage: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  countdownLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  countdownGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    minWidth: 60,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  timeLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },
  timeSeparator: {
    fontSize: typography.sizes.xl,
    color: colors.textLight,
    marginHorizontal: spacing.sm,
    marginTop: spacing.lg,
  },
  letterInfo: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    width: 100,
  },
  infoValue: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    flex: 1,
  },
  patienceContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  patienceText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: typography.sizes.xl,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default LetterLockedScreen;
